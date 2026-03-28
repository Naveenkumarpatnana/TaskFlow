import { Request, Response } from 'express';
import Task from '../models/Task';
import { AuthRequest } from '../middleware/auth';
import { formatError } from '../utils/helpers';

export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const authReq = req as AuthRequest;

    // Only admin and manager can create tasks
    if (authReq.user!.role === 'employee') {
      res.status(403).json({
        success: false,
        message: 'Employees are not allowed to create tasks.',
      });
      return;
    }

    const { title, description, status, priority, assignee, dueDate, tags, estimatedHours } = req.body;

    if (!title || !assignee) {
      res.status(400).json({
        success: false,
        message: 'Title and assignee are required.',
      });
      return;
    }

    const task = await Task.create({
      title,
      description: description || '',
      status: status || 'todo',
      priority: priority || 'medium',
      assignee,
      reporter: authReq.user!._id,
      dueDate,
      tags: tags || [],
      estimatedHours,
    });

    const populatedTask = await Task.findById(task._id)
      .populate('assignee', 'name email role')
      .populate('reporter', 'name email role');

    // Emit socket event for real-time updates
    const io = req.app.get('io');
    if (io) {
      io.emit('taskCreated', populatedTask);
    }

    res.status(201).json({
      success: true,
      data: { task: populatedTask },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating task.',
      error: formatError(error),
    });
  }
};

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      status,
      priority,
      assignee,
      search,
      page = '1',
      limit = '50',
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = req.query;

    // Build filter
    const filter: Record<string, any> = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (assignee) filter.assignee = assignee;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const skip = (pageNum - 1) * limitNum;
    const sort: Record<string, 1 | -1> = { [sortBy as string]: sortOrder === 'asc' ? 1 : -1 };

    const [tasks, total] = await Promise.all([
      Task.find(filter)
        .populate('assignee', 'name email role')
        .populate('reporter', 'name email role')
        .sort(sort)
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Task.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      data: {
        tasks,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          pages: Math.ceil(total / limitNum),
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching tasks.',
      error: formatError(error),
    });
  }
};

export const getTaskById = async (req: Request, res: Response): Promise<void> => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('assignee', 'name email role')
      .populate('reporter', 'name email role');

    if (!task) {
      res.status(404).json({
        success: false,
        message: 'Task not found.',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: { task },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching task.',
      error: formatError(error),
    });
  }
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const allowedUpdates = ['title', 'description', 'status', 'priority', 'assignee', 'dueDate', 'tags', 'estimatedHours'];
    const updates = Object.keys(req.body)
      .filter((key) => allowedUpdates.includes(key))
      .reduce((obj: Record<string, any>, key) => {
        obj[key] = req.body[key];
        return obj;
      }, {});

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    )
      .populate('assignee', 'name email role')
      .populate('reporter', 'name email role');

    if (!task) {
      res.status(404).json({
        success: false,
        message: 'Task not found.',
      });
      return;
    }

    // Emit socket event for real-time updates
    const io = req.app.get('io');
    if (io) {
      io.emit('taskUpdated', task);
    }

    res.status(200).json({
      success: true,
      data: { task },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating task.',
      error: formatError(error),
    });
  }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      res.status(404).json({
        success: false,
        message: 'Task not found.',
      });
      return;
    }

    // Emit socket event
    const io = req.app.get('io');
    if (io) {
      io.emit('taskDeleted', { id: req.params.id });
    }

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully.',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting task.',
      error: formatError(error),
    });
  }
};
