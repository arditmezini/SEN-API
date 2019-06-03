# SEN-API 
Simple API build in [Nodejs](https://nodejs.org/), [Express](https://expressjs.com/) and [SQL Server](https://www.npmjs.com/package/mssql) database.

## Before running the api:
> run the script inside the folder scripts sql (create database and table)  
> modify config.js with your database configuration.

## To run the app:
> npm install  
> and  
> npm run dev (node monitor watching changes and restart server)  
> or  
> npm run start

## Instructions (use [Postman](https://www.getpostman.com/))
1. To create a user, send in the request body: (POST - http://localhost:8080/api/user)
	```json
    Request Object
	{
    	"FirstName": "Demo", 
		"LastName":"User",
		"Username":"demo-user",
		"Email":"user@demo.com",
		"Password": "Demo123"
    }
    
    Response Object
    {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTU5NTYxNDc2LCJleHAiOjE1NTk2NDc4NzZ9.vgjkGT2Do1D1y7mrzXWMPT3ENOBlJOZVeekeksWTf-Q",
        "message":"Succesfully created user"
    }
	```
2. To do the login: (POST - http://localhost:8080/api/user/login)
	```json
    Request Object
    { 
		"Username":"demo-user",
		"Password": "Demo123"
	} 
    
    Response Object
    {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTU5NTYxNDc2LCJleHAiOjE1NTk2NDc4NzZ9.vgjkGT2Do1D1y7mrzXWMPT3ENOBlJOZVeekeksWTf-Q",
        "message": "User succesfully login"
    }
    ```
3. Access a protected route: (GET - http://localhost:8080/api/user)
	```json
    --add this line in the header request
    Key						Value
    x-access-token			eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTU5NTYxNDc2LCJleHAiOjE1NTk2NDc4NzZ9.vgjkGT2Do1D1y7mrzXWMPT3ENOBlJOZVeekeksWTf-Q
    
    ```