#  API
---

## Getting Started 🚀

---
### Docker
The first thing you need is to setup docker, please follow the step: 
1. https://www.docker.com/get-started/

### Running the project with docker
1. Create a file called .env at the root of the project with the following:
    ```
    PORT=3000
    DB_USER='postgres'
    DB_HOST='db'
    DB_NAME='origin'
    DB_PASSWORD='123456'
    DB_PORT=5432 
    ```
2. Open your terminal and at the root of the project run:
 ```docker compose up```
3. Run the migrations with the following:
  ```docker exec -it api sh -c "npm run migrations"```
4. The project is already running at **localhost:3000**. You can open the swagger at **localhost:3000/api**

### Running the project without docker
You can also run the project without using the docker. Following these steps:
1. Make sure you have NodeJS (recommend version is 19.7.0) installed
2. Create a file called .env at the root folder with the following:
    ```
    PORT=3000
    DB_USER='postgres'
    DB_HOST='localhost'
    DB_NAME='origin'
    DB_PASSWORD='123456'
    DB_PORT=5432 
    ```
3. Open your terminal on the root folder and run: 
  ```npm install```
3. Now run:
  ```npm start```
4. And finish running the migrations:
  ```npm run migrations```

---
## Running Tests 🧪

### Unit tests

To run all unit tests use the following command:
  ```
  npm run test
  ```

To view the coverage report you need to:
1. Run:
    ```
    npm run test:cov
    ```
2. Open the file located at:
coverage/lcov-report/index.html

### Integration tests
1. Run the following command:
  ```npm run test:e2e```

--- 
## Architecture 
The project uses NestJS and follows a simple structure which is:
Controller → Service → DataSource.

-  Controller validate the requests and handle the exceptions.
-  Bussiness logic lives inside the Service.
-  DataSource make the querys to the database or other API's.

## Structure Decisions
For the annual tax value I decided to store it at the database, this make possible to change the tax value without redeploying the project. You can check the endpoint at the swagger.

I also store the "annual thresholds" at the database for the same reason, but I didn't have time to make the endpoint for it.

And for each score calculated I save the value at the database. This is important for keeping track of the data created, and generating reports in the future.

### Next steps and improvements
1. Add error monitoring and logging to the project.
2. Create performance metrics.
3. Feature flags.
4. In-memory cache for tax and annual thresholds.
5. Run E2E tests at the pipeline.
