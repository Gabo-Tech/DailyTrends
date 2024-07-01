import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/index';
import { Feed } from '../src/models/feed';

beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/dailytrends_test');
  });

afterEach(async () => {
  await Feed.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Feed API', () => {
  it('should fetch all feeds', async () => {
    const res = await request(app).get('/api/feeds');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should create a new feed', async () => {
    const feedData = {
      title: 'Test News',
      link: 'http://test.com/test-news',
      guid: 'http://test.com/test-news',
      imageLink: 'http://test.com/test-news.jpg',
      pubDate: new Date(),
      description: 'Test description',
      categories: ['Test'],
      brand: 'Test Brand',
      inStock: true,
      stock: 10,
      recommend: true,
      tags: ['test', 'news'],
      recommended: [],
      attributes: [{ name: 'Color', value: ['Red'] }],
      price: { unitPrice: 10, currency: 'USD' },
    };

    const res = await request(app).post('/api/feeds').send(feedData);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('title', 'Test News');
  });

  it('should fetch a feed by ID', async () => {
    const feed = new Feed({
      title: 'Test News',
      link: 'http://test.com/test-news',
      guid: 'http://test.com/test-news',
      imageLink: 'http://test.com/test-news.jpg',
      pubDate: new Date(),
      description: 'Test description',
      categories: ['Test'],
      brand: 'Test Brand',
      inStock: true,
      stock: 10,
      recommend: true,
      tags: ['test', 'news'],
      recommended: [],
      attributes: [{ name: 'Color', value: ['Red'] }],
      price: { unitPrice: 10, currency: 'USD' },
    });

    await feed.save();

    const res = await request(app).get(`/api/feeds/${feed._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title', 'Test News');
  });

  it('should update a feed', async () => {
    const feed = new Feed({
      title: 'Test News',
      link: 'http://test.com/test-news',
      guid: 'http://test.com/test-news',
      imageLink: 'http://test.com/test-news.jpg',
      pubDate: new Date(),
      description: 'Test description',
      categories: ['Test'],
      brand: 'Test Brand',
      inStock: true,
      stock: 10,
      recommend: true,
      tags: ['test', 'news'],
      recommended: [],
      attributes: [{ name: 'Color', value: ['Red'] }],
      price: { unitPrice: 10, currency: 'USD' },
    });

    await feed.save();

    const res = await request(app)
      .put(`/api/feeds/${feed._id}`)
      .send({ title: 'Updated Test News' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title', 'Updated Test News');
  });

  it('should delete a feed', async () => {
    const feed = new Feed({
      title: 'Test News',
      link: 'http://test.com/test-news',
      guid: 'http://test.com/test-news',
      imageLink: 'http://test.com/test-news.jpg',
      pubDate: new Date(),
      description: 'Test description',
      categories: ['Test'],
      brand: 'Test Brand',
      inStock: true,
      stock: 10,
      recommend: true,
      tags: ['test', 'news'],
      recommended: [],
      attributes: [{ name: 'Color', value: ['Red'] }],
      price: { unitPrice: 10, currency: 'USD' },
    });

    await feed.save();

    const res = await request(app).delete(`/api/feeds/${feed._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Feed deleted successfully');
  });
});
