import { Request, Response } from 'express';
import Sprint, { SprintStatus } from '../models/Sprint';
import Task from '../models/Task';
import { formatError } from '../utils/helpers';

// Get all sprints
export const getSprints = async (_req: Request, res: Response): Promise<void> => {
  try {
    const sprints = await Sprint.find().sort({ sprintNumber: 1 }).lean();

    // Get task counts per sprint
    const sprintsWithCounts = await Promise.all(
      sprints.map(async (sprint) => {
        const tasks = await Task.find({ sprint: sprint._id })
          .populate('assignee', 'name email')
          .populate('reporter', 'name email')
          .sort({ createdAt: -1 })
          .lean();

        const statusCounts = {
          todo: tasks.filter((t: any) => t.status === 'todo').length,
          inprogress: tasks.filter((t: any) => t.status === 'inprogress').length,
          inreview: tasks.filter((t: any) => t.status === 'inreview').length,
          completed: tasks.filter((t: any) => t.status === 'completed').length,
        };

        return { ...sprint, tasks, statusCounts, totalItems: tasks.length };
      })
    );

    // Get backlog tasks (no sprint assigned)
    const backlogTasks = await Task.find({ sprint: { $exists: false } })
      .populate('assignee', 'name email')
      .populate('reporter', 'name email')
      .sort({ createdAt: -1 })
      .lean();

    // Also include tasks with null sprint
    const backlogTasksNull = await Task.find({ sprint: null })
      .populate('assignee', 'name email')
      .populate('reporter', 'name email')
      .sort({ createdAt: -1 })
      .lean();

    const allBacklog = [...backlogTasks, ...backlogTasksNull];
    // Deduplicate by _id
    const seenIds = new Set<string>();
    const uniqueBacklog = allBacklog.filter((t: any) => {
      const id = t._id.toString();
      if (seenIds.has(id)) return false;
      seenIds.add(id);
      return true;
    });

    res.status(200).json({
      success: true,
      data: {
        sprints: sprintsWithCounts,
        backlog: { tasks: uniqueBacklog, totalItems: uniqueBacklog.length },
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching sprints.', error: formatError(error) });
  }
};

// Create sprint
export const createSprint = async (req: Request, res: Response): Promise<void> => {
  try {
    const lastSprint = await Sprint.findOne().sort({ sprintNumber: -1 }).lean();
    const nextNumber = lastSprint ? lastSprint.sprintNumber + 1 : 0;

    const sprint = await Sprint.create({
      name: req.body.name || `SCRUM Sprint ${nextNumber}`,
      projectKey: req.body.projectKey || 'SCRUM',
      sprintNumber: nextNumber,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      goal: req.body.goal || '',
    });

    res.status(201).json({ success: true, data: { sprint } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating sprint.', error: formatError(error) });
  }
};

// Start sprint
export const startSprint = async (req: Request, res: Response): Promise<void> => {
  try {
    const sprint = await Sprint.findByIdAndUpdate(
      req.params.id,
      {
        status: SprintStatus.ACTIVE,
        startDate: req.body.startDate || new Date(),
        endDate: req.body.endDate || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      },
      { new: true }
    );
    if (!sprint) { res.status(404).json({ success: false, message: 'Sprint not found' }); return; }
    res.status(200).json({ success: true, data: { sprint } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error starting sprint.', error: formatError(error) });
  }
};

// Complete sprint
export const completeSprint = async (req: Request, res: Response): Promise<void> => {
  try {
    const sprint = await Sprint.findByIdAndUpdate(
      req.params.id,
      { status: SprintStatus.COMPLETED },
      { new: true }
    );
    if (!sprint) { res.status(404).json({ success: false, message: 'Sprint not found' }); return; }

    // Move incomplete tasks to backlog (remove sprint reference)
    await Task.updateMany(
      { sprint: sprint._id, status: { $ne: 'completed' } },
      { $unset: { sprint: '' } }
    );

    res.status(200).json({ success: true, data: { sprint } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error completing sprint.', error: formatError(error) });
  }
};

// Update sprint
export const updateSprint = async (req: Request, res: Response): Promise<void> => {
  try {
    const sprint = await Sprint.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!sprint) { res.status(404).json({ success: false, message: 'Sprint not found' }); return; }
    res.status(200).json({ success: true, data: { sprint } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating sprint.', error: formatError(error) });
  }
};

// Move task to sprint
export const moveTaskToSprint = async (req: Request, res: Response): Promise<void> => {
  try {
    const { taskId, sprintId } = req.body;
    const update = sprintId ? { sprint: sprintId } : { $unset: { sprint: '' } };
    const task = await Task.findByIdAndUpdate(taskId, update, { new: true })
      .populate('assignee', 'name email')
      .populate('reporter', 'name email');
    if (!task) { res.status(404).json({ success: false, message: 'Task not found' }); return; }
    res.status(200).json({ success: true, data: { task } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error moving task.', error: formatError(error) });
  }
};
