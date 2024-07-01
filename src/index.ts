import express from 'express';
import cron from 'node-cron';
import feedRoutes from './routes/feedRoutes';
import connectDB from './config/db';
import { scrapeDailyNews } from './services/scrapping/feedReadingService';

const app = express();
app.use(express.json());
app.use('/api', feedRoutes);

const { PORT } = process.env;
const port = PORT || 3000;

connectDB();

cron.schedule('0 6 * * *', scrapeDailyNews);

app.listen(PORT, () => console.info(`Server running on port ${port}`));

export default app; 