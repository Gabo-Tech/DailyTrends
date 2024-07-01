import { Feed } from '../models/feed';

export const getAllFeeds = async () => {
  return await Feed.find();
};

export const getFeedById = async (id: string) => {
  return await Feed.findById(id);
};

export const createFeed = async (feedData: any) => {
  const feed = new Feed(feedData);
  return await feed.save();
};

export const updateFeed = async (id: string, feedData: any) => {
  return await Feed.findByIdAndUpdate(id, feedData, { new: true });
};

export const deleteFeed = async (id: string) => {
  return await Feed.findByIdAndDelete(id);
};
