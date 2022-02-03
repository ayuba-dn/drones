## Drones

  

[[_TOC_]]

  

---

  

:scroll: **START**

  
  

### INSTALLATION

#### Option A: Using <a  href="https://www.docker.com/">Docker  </a>

  1. Clone this repository and open your terminal/command line app in the root folder
  2. Run the command below to start app container (accessible via localhost:4000)
  
        ```docker compose up --build ```
        
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

  

### Task description

  

We have a fleet of **10 drones**. A drone is capable of carrying devices, other than cameras, and capable of delivering small loads. For our use case **the load is medications**.

  

A **Drone** has:

- serial number (100 characters max);

- model (Lightweight, Middleweight, Cruiserweight, Heavyweight);

- weight limit (500gr max);

- battery capacity (percentage);

- state (IDLE, LOADING, LOADED, DELIVERING, DELIVERED, RETURNING).

  

Each **Medication** has:

- name (allowed only letters, numbers, ‘-‘, ‘_’);

- weight;

- code (allowed only upper case letters, underscore and numbers);

- image (picture of the medication case).

  

Develop a service via REST API that allows clients to communicate with the drones (i.e. **dispatch controller**). The specific communicaiton with the drone is outside the scope of this task.

  

The service should allow:

- registering a drone;

- loading a drone with medication items;

- checking loaded medication items for a given drone;

- checking available drones for loading;

- check drone battery level for a given drone;

  

> Feel free to make assumptions for the design approach.

  

---

  

### Requirements

  

While implementing your solution **please take care of the following requirements**:

  

#### Functional requirements

  

- There is no need for UI;

- Prevent the drone from being loaded with more weight that it can carry;

- Prevent the drone from being in LOADING state if the battery level is **below 25%**;

- Introduce a periodic task to check drones battery levels and create history/audit event log for this.

  

---

  

#### Non-functional requirements

  

- Input/output data must be in JSON format;

- Your project must be buildable and runnable;

- Your project must have a README file with build/run/test instructions (use DB that can be run locally, e.g. in-memory, via container);

- Required data must be preloaded in the database.

- JUnit tests are optional but advisable (if you have time);

- Advice: Show us how you work through your commit history.

  

---

  

:scroll: **END**