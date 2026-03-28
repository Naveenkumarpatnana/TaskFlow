import { Response } from 'express';
import Comment from '../models/Comment';
import { AuthRequest } from '../middleware/auth';
import { formatError } from '../utils/helpers';

// Get comments for a task
export const getComments = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { taskId } = req.params;
    const comments = await Comment.find({ task: taskId })
      .populate('author', 'name email role')
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({ success: true, data: { comments } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching comments.', error: formatError(error) });
  }
};

// Add a comment
export const addComment = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { taskId } = req.params;
    const { text } = req.body;

    if (!text || !text.trim()) {
      res.status(400).json({ success: false, message: 'Comment text is required.' });
      return;
    }

    const comment = await Comment.create({
      text: text.trim(),
      author: req.user!._id,
      task: taskId,
    });

    const populated = await Comment.findById(comment._id)
      .populate('author', 'name email role')
      .lean();

    res.status(201).json({ success: true, data: { comment: populated } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error adding comment.', error: formatError(error) });
  }
};

// Delete a comment
export const deleteComment = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);

    if (!comment) {
      res.status(404).json({ success: false, message: 'Comment not found.' });
      return;
    }

    // Only author or admin can delete
    if (comment.author.toString() !== req.user!._id.toString() && req.user!.role !== 'admin') {
      res.status(403).json({ success: false, message: 'Not authorized to delete this comment.' });
      return;
    }

    await Comment.findByIdAndDelete(commentId);
    res.status(200).json({ success: true, message: 'Comment deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting comment.', error: formatError(error) });
  }
};
