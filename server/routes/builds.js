import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import { listBuilds, createBuild, getBuild, updateBuild, deleteBuild } from '../controllers/buildController.js';
const router = Router(); router.use(protect);
router.route('/').get(listBuilds).post(createBuild);
router.route('/:id').get(getBuild).put(updateBuild).delete(deleteBuild);
export default router;
