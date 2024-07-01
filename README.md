# DailyTrends

DailyTrends is a REST API that aggregates news from various newspapers. It combines the front pages of top newspapers like El País and El Mundo, and provides endpoints to manage and access these feeds. The project also includes web scraping functionality to fetch the latest news articles from these sources.

## Features

- CRUD operations for managing news feeds.
- Web scraping service to fetch front-page news articles from El País and El Mundo.
- Scheduled job to automatically scrape news articles daily.
- MongoDB integration for data storage.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Running Tests](#running-tests)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [License](#license)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/dailytrends.git
   cd dailytrends

    Install the dependencies:

    sh

    npm install

    Make sure MongoDB is installed and running on your machine. Follow the instructions here if you need help with the installation.

Configuration

    Create a .env file in the root directory of the project and add the following environment variables:

    env

MONGODB_URI=mongodb://localhost:27017/dailytrends
PORT=3000

Ensure your MongoDB server is running:

sh

    sudo systemctl start mongod

API Endpoints
Feeds

    Get all feeds

    http

GET /api/feeds

Response: List of all news feeds.

Get a feed by ID

http

GET /api/feeds/:id

Response: Feed object with the specified ID.

Create a new feed

http

POST /api/feeds

Request body: Feed object.
Response: Created feed object.

Update a feed by ID

http

PUT /api/feeds/:id

Request body: Updated feed object.
Response: Updated feed object.

Delete a feed by ID

http

    DELETE /api/feeds/:id

    Response: Success message.

Running Tests

    Ensure your MongoDB server is running:

    sh

sudo systemctl start mongod

Run the tests:

sh

    npm test

Project Structure

plaintext

.
├── src
│   ├── config
│   │   └── db.ts          # Database connection configuration
│   ├── controllers
│   │   └── feedController.ts # Controller for feed endpoints
│   ├── models
│   │   └── feed.ts        # Mongoose model for Feed
│   ├── routes
│   │   └── feedRoutes.ts  # Routes for feed endpoints
│   ├── services
│   │   ├── feedService.ts # Service layer for feed operations
│   │   ├── scrapping
│   │   │   ├── feedReadingService.ts # Service to scrape news
│   │   │   ├── elPais.ts  # Scraping script for El País
│   │   │   └── elMundo.ts # Scraping script for El Mundo
│   └── index.ts           # Entry point of the application
├── .env                   # Environment variables
├── .gitignore             # Git ignore file
├── jest.config.js         # Jest configuration
├── package.json           # Project metadata and dependencies
├── tsconfig.json          # TypeScript configuration
└── README.md              # Project documentation

Usage
Running the Application

    Start the application:

    sh

    npm start

    The application will be running on http://localhost:3000.

Scraping News

The application uses node-cron to schedule the scraping of news articles daily at 6 AM. You can manually trigger the scraping by calling the scrapeDailyNews function in feedReadingService.ts.

License

This project is licensed under the MIT License.