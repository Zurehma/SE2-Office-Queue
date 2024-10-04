# OfficeQueue_SoftwareEng2
- Document to show the format of the database and of the API designed in the backend of the application.
## Database Tables
All of the fields of the tables are reported exactly as they have been defined using SQLlite. Pay attention to low or capital letters, everything should be consistent with respect to what it's written here.
- Table `users` 
- Fields: id-name-surname-role
- Description: each user is uniquely identified through an id (autoincremental). Moreover, name, surname and role are stored in the database. Role is a string of text between admin and officier.
  ```
    CREATE TABLE "users" (
	"id"	INTEGER NOT NULL UNIQUE,
	"name"	TEXT NOT NULL,
	"surname"	TEXT NOT NULL,
	"role"	TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
    );
  ```
- Table `services` 
- Fields: id-name
- Description: each service is uniquely identified through a unique id (autoincremental). In addition, the name of the service is stored in the database. I kept it separated from the following table to have a general overview of which are the services available in the office without the need of querying a bigger table.
  ```
    CREATE TABLE "services" (
	"id"	INTEGER NOT NULL UNIQUE,
	"name"	INTEGER NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
    );
  ```

- Table `servecesPerOffice`
- Fields: officeId-serviceId
- Description: We store the relations between different offices (represented by an integer that is the officeId) and the serviceId, that is an integer that references the table 'services', the name of the service could be found by querying the previous table on the id (unique). 
  ```
    CREATE TABLE "servicesPerOffice" (
	"officeId"	INTEGER NOT NULL,
	"serviceId"	INTEGER NOT NULL,
	PRIMARY KEY("officeId","serviceId")
    );
  ```
- Table `served` 
- Fields: id-officeId-serviceId-officier-date
- Description: We are storing each served user with an autoincrement id, storing also the office who served him, the type of service selected, the person working in the office at that time and the date that could be useful for statistics, even if not meant to be realised (I chose not to save the ticket number, it seemed useless to me).
  ```
    CREATE TABLE "served" (
	"id"	INTEGER NOT NULL UNIQUE,
	"officeId"	INTEGER NOT NULL,
	"serviceId"	INTEGER NOT NULL,
	"officier"	INTEGER NOT NULL,
	"date"	TEXT NOT NULL,
	FOREIGN KEY("officeId") REFERENCES "servicesPerOffice"("officeId"),
	FOREIGN KEY("officier") REFERENCES "users"("id") ON DELETE CASCADE,
	FOREIGN KEY("serviceId") REFERENCES "servicesPerOffice"("serviceId"),
	PRIMARY KEY("id" AUTOINCREMENT)
    );
  ```

## API Server