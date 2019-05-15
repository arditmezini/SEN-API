-- Create a new database called 'SEN_DB'
-- Connect to the 'master' database to run this snippet
USE master
GO
-- Create the new database if it does not exist already
IF NOT EXISTS (
    SELECT name
        FROM sys.databases
        WHERE name = N'SEN_DB'
)
CREATE DATABASE SEN_DB
GO

-- Create a new table called 'User' in schema 'SEN_DB'
-- Drop the table if it already exists
IF OBJECT_ID('SEN_DB.User', 'U') IS NOT NULL
DROP TABLE [User]
GO
-- Create the table in the specified schema
CREATE TABLE [User]
(
    Id INT NOT NULL PRIMARY KEY, -- primary key column
    Name [NVARCHAR](50) NOT NULL,
    Email [NVARCHAR](50) NOT NULL,
    Password [NVARCHAR](50) NOT NULL
);
GO