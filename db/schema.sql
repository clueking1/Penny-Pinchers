CREATE DATABASE pinchers_db;
USE pinchers_db;
CREATE table user (
	userID INT NOT NULL AUTO_INCREMENT,
    userName VARCHAR (30) NOT NULL,
    userPwd VARCHAR (30) NOT NULL,
    groceries INT DEFAULT 0,
    transportation INT DEFAULT 0,
    dining INT DEFAULT 0,
    shopping INT DEFAULT 0,
    groceriesBudget INT DEFAULT 200,
    transportationBudget INT DEFAULT 200,
    diningBudget INT DEFAULT 200,
    shoppingBudget INT DEFAULT 200,
    PRIMARY KEY (userID)
); 
