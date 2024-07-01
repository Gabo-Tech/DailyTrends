import axios from 'axios';
import * as cheerio from 'cheerio';
import { Feed } from '../../models/feed';

const scrapeElPais = async () => {
  try {
    const { data } = await axios.get('https://elpais.com/');
    const $ = cheerio.load(data);

    const articles: any[] = [];
    $('section[data-dtm-region="portada_superdestacados"] article').each((i, element) => {
      const title = $(element).find('h2.c_t a').text().trim();
      const link = $(element).find('h2.c_t a').attr('href');
      const description = $(element).find('p.c_d').text().trim();
      const pubDate = new Date();

      if (title && link) {
        articles.push({
          title,
          link,
          guid: link,
          imageLink: $(element).find('img').attr('src') || '',
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
    console.log('El País articles scraped and saved.');
  } catch (error) {
    console.error('Error scraping El País:', error);
  }
};

export default scrapeElPais;
