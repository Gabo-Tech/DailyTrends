import axios from 'axios';
import * as cheerio from 'cheerio';
import { Feed } from '../../models/feed';

const scrapeElMundo = async () => {
  try {
    const { data } = await axios.get('https://www.elmundo.es/');
    const $ = cheerio.load(data);

    const articles: any[] = [];
    $('.ue-c-cover-content').each((i, element) => {
      const title = $(element).find('.ue-c-cover-content__headline').text().trim();
      const link = $(element).find('.ue-c-cover-content__link').attr('href');
      const description = $(element).find('.ue-c-cover-content__kicker').text().trim();
      const pubDate = new Date();
      
      if (title && link) {
        articles.push({
          title,
          link,
          guid: link,
          imageLink: $(element).find('.ue-c-cover-content__image').attr('src') || '',
          pubDate,
          description,
          categories: [],
          brand: '',
          inStock: false,
          stock: 0,
          recommend: false,
          tags: [],
          recommended: [],
          attributes: [],
          price: {
            unitPrice: 0,
            currency: ''
          }
        });
      }
    });

    for (const article of articles) {
      const feed = new Feed(article);
      await feed.save();
    }
    console.log('El Mundo articles scraped and saved.');
  } catch (error) {
    console.error('Error scraping El Mundo:', error);
  }
};

export default scrapeElMundo;
