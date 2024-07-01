import { Request, Response } from 'express';
import * as feedService from '../services/feedService';

export const getFeeds = async (req: Request, res: Response) => {
  try {
    const feeds = await feedService.getAllFeeds();
    res.json(feeds);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getFeedById = async (req: Request, res: Response) => {
  try {
    const feed = await feedService.getFeedById(req.params.id);
    if (!feed) {
      return res.status(404).json({ error: 'Feed not found' });
    }
    res.json(feed);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createFeed = async (req: Request, res: Response) => {
  try {
    const feed = await feedService.createFeed(req.body);
    res.status(201).json(feed);
  } catch (err) {
    res.status(400).json({ error: 'Bad Request' });
  }
};

export const updateFeed = async (req: Request, res: Response) => {
  try {
    const feed = await feedService.updateFeed(req.params.id, req.body);
    if (!feed) {
      return res.status(404).json({ error: 'Feed not found' });
    }
    res.json(feed);
  } catch (err) {
    res.status(400).json({ error: 'Bad Request' });
  }
};

export const deleteFeed = async (req: Request, res: Response) => {
  try {
    const feed = await feedService.deleteFeed(req.params.id);
    if (!feed) {
      return res.status(404).json({ error: 'Feed not found' });
    }
    res.json({ message: 'Feed deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
