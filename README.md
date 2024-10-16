# OfficeQueue_SoftwareEng2

- Document to show the format of the database and of the API designed in the backend of the application.

## Database Tables

All of the fields of the tables are reported exactly as they have been defined using SQLlite. Pay attention to low or capital letters, everything should be consistent with respect to what it's written here.

- Table `users`
- Fields: id-name-surname-role-username-password
- Description: each user is uniquely identified through an id (autoincremental). Moreover, name, surname and role are stored in the database. Role is a string of text between admin and officier.
  ```
    CREATE TABLE "users" (
  "id"	INTEGER NOT NULL UNIQUE,
  "name"	TEXT NOT NULL,
  "surname"	TEXT NOT NULL,
  "role"	TEXT NOT NULL,
  "username"	TEXT NOT NULL,
  "password"	TEXT NOT NULL,
  PRIMARY KEY("id" AUTOINCREMENT)
  );
  ```
- Table `services`
- Fields: id-name-averageTime
- Description: each service is uniquely identified through a unique id (autoincremental). In addition, the name of the service is stored in the database and also the average time needed to serve it. I kept it separated from the following table to have a general overview of which are the services available in the office without the need of querying a bigger table.

  ```
   	CREATE TABLE "services" (
  "id"	INTEGER NOT NULL UNIQUE,
  "name"	INTEGER NOT NULL,
  "averageTime"	INTEGER NOT NULL,
  PRIMARY KEY("id" AUTOINCREMENT)
  );
  ```

- Table `servicesPerCounter`
- Fields: officeId-serviceId
- Description: We store the relations between different counters and the service they provide (represented by an integer that is the serviceId). The name of the service could be found by querying the 'services' table on the id (unique).
  ```
   CREATE TABLE "servicesPerCounter" (
  "counterId"	INTEGER NOT NULL,
  "serviceId"	INTEGER NOT NULL,
  FOREIGN KEY("serviceId") REFERENCES "services"("id") ON DELETE CASCADE,
  PRIMARY KEY("counterId","serviceId")
  );
  ```
- Table `served`
- Fields: id-officeId-serviceId-officer-date
- Description: We are storing each served user with an autoincrement id, storing also the office who served him, the type of service selected, the person working in the office at that time and the date that could be useful for statistics, even if not meant to be realised (I chose not to save the ticket number, it seemed useless to me).
  ```
    CREATE TABLE "served" (
  "id"	INTEGER NOT NULL UNIQUE,
  "counterId"	INTEGER NOT NULL,
  "serviceId"	INTEGER NOT NULL,
  "officer"	INTEGER NOT NULL,
  "date"	TEXT NOT NULL,
  FOREIGN KEY("counterId") REFERENCES "servicesPerCounter"("counterId") ON DELETE CASCADE,
  FOREIGN KEY("officer") REFERENCES "users"("id") ON DELETE CASCADE,
  FOREIGN KEY("serviceId") REFERENCES "servicesPerCounter"("serviceId") ON DELETE CASCADE,
  PRIMARY KEY("id" AUTOINCREMENT)
  );
  ```

## API Server

### Service APIs

#### POST `api/service/ticket`

- Request Paramaters: _None_
- Request Body:
  - `service`: a string that represents the name of the service being requested by the customer. Must be one of the following [`"Public Service", "Money Transfer", "Shipping and Receiving"`]
- Response Body: An object with the following paramters:
  - `ticket`: A string that represents the ticket number assigned to the customer. It is made up of two letters representing the service type and an integer representing the place in the queue.
  - `estimatedWaitTime`: A number that represents the estimated number of minutes the customer will have to wait for their turn.
  - Example: `{ "ticket": "PS1", "estimatedWaitTime": 5 }`
- Access Constraints: _None_
- Additional Constraints:
  - It should return a 400 error id the requested service does not exist

#### POST `api/service/ticket/next`

- Request Parameters: _None_
- Request Body: An object with the following parameters:
  - `date`: a string that represent a date. It must be in the format **YYYY-MM-DD**.
- Response Body: An object with the following parameters:
  - `serviceID`: an integer that represent the ID of the service.
  - `ticket`: a string that represent the next ticket to serve.
  - Example: `{ serviceCode: "PS", ticket: "PS1" }`
- Access Constraints: Can only be called by a logged in user whose role is Manager
- Additional Constraints:
  - It should return a 400 error if the queues are empty.
  - It should return a 400 error if the `date` is after the current date.
  - It should return a 404 error if the manager does not has any service assigned.

#### GET `api/service`

- Request Parameters: _None_
- Request Body: _None_
- Response Body: An array of **Service** object with the following parameters:
  - `id`: an integer that represent the ID of the service.
  - `name`: a string that represent the name of the service.
  - `code`: a string that represent the code of the service.
  - `averageTime`: an integer that represent the average service time (in minute).
  - Example: `[{ id: 1, name: "Public Service", averageTime: 10, code: "PS" }, ...]`
- Access Constraints: _None_
- Additional Constraints: _None_

#### GET `api/service/manager`

- Request Parameters: _None_
- Request Body: _None_
- Response Body: An array of **Service** object with the following parameters:
  - `id`: an integer that represent the ID of the service.
  - `name`: a string that represent the name of the service.
  - `code`: a string that represent the code of the service.
  - `averageTime`: an integer that represent the average service time (in minute).
  - Example: `[{ id: 1, name: "Public Service", averageTime: 10, code: "PS" }, ...]`
- Access Constraints: Can only be called by a logged in user whose role is Manager
- Additional Constraints: _None_

#### DELETE `api/service/resetQueues`

- Request Parameters: _None_
- Request Body: _None_
- Response Body: Success Message
- Access Constraints: Can only be called by a logged in user whose role is either Admin or Manager
- Additional Constraints: _None_

### Counter APIs

#### GET `api/counter`

- Request Parameters: _None_
- Request Body: _None_
- Response Body: An array of integers that represent all the counter's ids.
  - Example: `[1, ...]`
- Access Constraints: Can only be called by a logged in user whose role is either Admin or Manager
- Additional Constraints: _None_

#### POST `api/counter/configuration`

- Request Parameters: _None_
- Request Body: An array of object with the following parameters:
  - `counterID`: an integer that represent the ID of the counter.
  - `serviceIDs`: an array of integers that represent all the service's ids.
- Response Body: **None**
- Access Contraints: Can only be called by a logged in user whose role is Admin
- Additional Contraints: TODO

#### DELETE `api/counter/configuration`

- Request Parameters: _None_
- Request Body: _None_
- Response Body: _None_
- Access Constraints: Can only be called by a logged in user whose role is Admin
- Additional Constraints:
  - It should return a 400 error if there is no configuration available.

### User APIs

#### POST `api/sessions/login`

#### DELETE `api/sessions/logout`

#### GET `api/sessions/current`

## Usernames and Passwords

- Username: admin  
  Password: admin@123

- Username: manager1  
  Password: manager@123

- Username: manager2  
  Password: manager@123
