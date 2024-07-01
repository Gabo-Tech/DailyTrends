import { Router } from 'express';
import {
  getFeeds,
  getFeedById,
  createFeed,
  updateFeed,
  deleteFeed
} from '../controllers/feedController';

const router = Router();

router.get('/feeds', getFeeds);
router.get('/feeds/:id', getFeedById);
router.post('/feeds', createFeed);
router.put('/feeds/:id', updateFeed);
router.delete('/feeds/:id', deleteFeed);

export default router;
