import { Router } from 'express';
import auth from '../middleware/auth';
import { getComments, addComment, deleteComment } from '../controllers/commentController';

const router = Router();

router.use(auth);

// GET /api/comments/:taskId — get all comments for a task
router.get('/:taskId', getComments);

// POST /api/comments/:taskId — add a comment to a task
router.post('/:taskId', addComment);

// DELETE /api/comments/delete/:commentId — delete a comment
router.delete('/delete/:commentId', deleteComment);

export default router;
