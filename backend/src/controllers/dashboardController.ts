import { Request, Response } from 'express';
import Task from '../models/Task';
import { formatError } from '../utils/helpers';

export const getAnalytics = async (_req: Request, res: Response): Promise<void> => {
  try {
    const [
      tasksByStatus,
      tasksByPriority,
      tasksByAssignee,
      overdueTasks,
      recentTasks,
      totalTasks,
      completedThisWeek,
    ] = await Promise.all([
      // Tasks grouped by status
      Task.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
      ]),

      // Tasks grouped by priority
      Task.aggregate([
        { $group: { _id: '$priority', count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
      ]),

      // Tasks grouped by assignee
      Task.aggregate([
        {
          $group: {
            _id: '$assignee',
            total: { $sum: 1 },
            completed: {
              $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] },
            },
            inProgress: {
              $sum: { $cond: [{ $eq: ['$status', 'inprogress'] }, 1, 0] },
            },
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: '_id',
            foreignField: '_id',
            as: 'user',
          },
        },
        { $unwind: '$user' },
        {
          $project: {
            _id: 1,
            total: 1,
            completed: 1,
            inProgress: 1,
            userName: '$user.name',
            userEmail: '$user.email',
          },
        },
        { $sort: { total: -1 } },
        { $limit: 10 },
      ]),

      // Overdue tasks count
      Task.countDocuments({
        dueDate: { $lt: new Date() },
        status: { $ne: 'completed' },
      }),

      // Recent tasks (last 5)
      Task.find()
        .populate('assignee', 'name email')
        .populate('reporter', 'name email')
        .sort({ createdAt: -1 })
        .limit(5)
        .lean(),

      // Total tasks count
      Task.countDocuments(),

      // Completed this week
      Task.countDocuments({
        status: 'completed',
        completedAt: {
          $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      }),
    ]);

    // Calculate completion rate
    const completedCount = tasksByStatus.find((s: any) => s._id === 'completed')?.count || 0;
    const completionRate = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

    res.status(200).json({
      success: true,
      data: {
        overview: {
          totalTasks,
          completedCount,
          completionRate,
          overdueTasks,
          completedThisWeek,
        },
        tasksByStatus,
        tasksByPriority,
        tasksByAssignee,
        recentTasks,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching analytics.',
      error: formatError(error),
    });
  }
};
