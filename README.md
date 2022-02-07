## Drones

  

[[_TOC_]]

  

---

  

:scroll: **START**

  
  

### INSTALLATION

#### Option A: Using <a  href="https://www.docker.com/">Docker  </a>

  1. Clone this repository and open your terminal/command line app in the root folder
  2. Run the command below to start app container (accessible via localhost:4000)
  
        ```docker compose up --build ```
   3. To run tests, open a new terminal/cmd and run the command below
  
        ```docker exec -it drones-drones-1 npm run test ```     
   ###### NB: You Access API documentation at localhost:4000/docs

#### Option B: Use this option only if you want to play around with the code on your local machine

1. Clone this repository and open your terminal/command line app in the root folder
2. Install  dependencies

     ```npm install ```
4. Delete docker-compose.yaml file and rename docker-compose-for-mongo-only.yml to docker-compose.yaml
5.  (Optional) You can customize the default database and app credentials in both .env and docker-compose.yaml files, ensure values in both files are thesame
6. Run the command below to start mongo container with the required credentials 

      ```docker compose up --build ```
     
 4. Run tests using the command below
 
      ```npm run test```
7. Run the command below to start server (app will run on default port 4000)
 
   ```npm run dev```
---

  


### Technologies Used

  

The following are the major tools that have been utilized for developing and deploying this service.

*  [Typescript](https://www.typescriptlang.org)

*  [Nodejs](https://nodejs.org/en/)

*  [Express](https://expressjs.com)

*  [Jest](https://jestjs.io/)

*  [Supertest](https://www.npmjs.com/package/supertest)

*  [Docker](https://docker.com/)

*  [Jenkins](https://www.jenkins.io/)

:scroll: **END**