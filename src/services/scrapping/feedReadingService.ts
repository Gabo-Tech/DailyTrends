import scrapeElMundo from './elMundo';
import scrapeElPais from './elPais';

export const scrapeDailyNews = async () => {
  await scrapeElMundo();
  await scrapeElPais();
};
