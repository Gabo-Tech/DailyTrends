Certainly! Here is the updated `README.md` file with the Docker instructions included:

```markdown
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
- [Dockerization](#dockerization)
- [License](#license)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/dailytrends.git
   cd dailytrends
   ```

2. Install the dependencies:
   ```sh
   npm install
   ```

3. Make sure MongoDB is installed and running on your machine. Follow the instructions [here](https://docs.mongodb.com/manual/installation/) if you need help with the installation.

## Configuration

1. Create a `.env` file in the root directory of the project and add the following environment variables:
   ```env
   MONGODB_URI=mongodb://localhost:27017/dailytrends
   PORT=3000
   ```

2. Ensure your MongoDB server is running:
   ```sh
   sudo systemctl start mongod
   ```

## API Endpoints

### Feeds

- **Get all feeds**
  ```http
  GET /api/feeds
  ```
  Response: List of all news feeds.

- **Get a feed by ID**
  ```http
  GET /api/feeds/:id
  ```
  Response: Feed object with the specified ID.

- **Create a new feed**
  ```http
  POST /api/feeds
  ```
  Request body: Feed object.  
  Response: Created feed object.

- **Update a feed by ID**
  ```http
  PUT /api/feeds/:id
  ```
  Request body: Updated feed object.  
  Response: Updated feed object.

- **Delete a feed by ID**
  ```http
  DELETE /api/feeds/:id
  ```
  Response: Success message.

## Running Tests

1. Ensure your MongoDB server is running:
   ```sh
   sudo systemctl start mongod
   ```

2. Run the tests:
   ```sh
   npm test
   ```

## Project Structure

```plaintext
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
```

## Usage

### Running the Application

1. Start the application:
   ```sh
   npm start
   ```

   The application will be running on `http://localhost:3000`.

### Scraping News

The application uses `node-cron` to schedule the scraping of news articles daily at 6 AM. You can manually trigger the scraping by calling the `scrapeDailyNews` function in `feedReadingService.ts`.

## Dockerization

### Step-by-Step Guide to Dockerize the Application

1. **Create a `Dockerfile`**

Create a `Dockerfile` in the root directory of your project:

#### `Dockerfile`

```Dockerfile
# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the TypeScript code
RUN npm run build

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define the environment variable
ENV PORT=3000

# Run the application
CMD ["node", "dist/index.js"]
```

2. **Create a `docker-compose.yml`**

Create a `docker-compose.yml` file in the root directory of your project to manage both the application and the MongoDB database:

#### `docker-compose.yml`

```yaml
version: '3.8'

services:
  mongo:
    image: mongo:4.4
    container_name: mongodb
    restart: always
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

  app:
    build: .
    container_name: dailytrends
    restart: always
    ports:
      - "3000:3000"
    environment:
      - MONGODB_URI=mongodb://mongo:27017/dailytrends
    depends_on:
      - mongo

volumes:
  mongo-data:
```

3. **Update `.env` File**

Ensure your `.env` file reflects the correct MongoDB URI that will be used within the Docker environment:

#### `.env`

```env
MONGODB_URI=mongodb://mongo:27017/dailytrends
PORT=3000
```

4. **Build and Run the Docker Containers**

Now you can build and run the Docker containers using Docker Compose:

```sh
docker-compose up --build
```

This command will:
- Build the Docker image for your application.
- Pull the MongoDB image from Docker Hub.
- Start both the MongoDB and application containers.

5. **Access the Application**

Once the containers are up and running, you can access your application at `http://localhost:3000`.

## Force Commit and Push

To commit and push your changes even when tests do not pass, you can bypass the Husky hooks:

```sh
HUSKY_SKIP_HOOKS=1 git add .
HUSKY_SKIP_HOOKS=1 git commit -m "Your commit message"
HUSKY_SKIP_HOOKS=1 git push origin your-branch
```

## License

This project is licensed under the MIT License.
```

This `README.md` file now includes instructions on how to dockerize the application and reflects all the necessary steps and configurations needed to get your project running in a Docker environment.