# Expressjs Powered Api

This is an expressjs based api that was originally made as a part of an application challange.
As a direct result of that, there is no commit history as I moved the folder which contained the solution out of the mono repoo.

The sole purpose of this repository is to showcase my ability to write a JS based backend with TypeScript.

## How to run:

Open this folder as root in console and  ```npm run dev```

or

Repeat above but use ```npm run build-start```

## Api docs

> /export

```JSON 
//Example payload
body: {
	"bookId": "Don Quichotte",
	"type": "epub"
}
```

> /import

```JSON 
//Example payload
body: {
	"bookId": "Don Quichotte",
	"type": "epub",
    "url": "http://localhost:8080"
}
```

> /exportRequests/?state="finished|pending"

> /importRequests/?state="finished|pending"

## Dependencies used:

### Main deps
express - Rest API framework

node-cache - simulating storage


### Dev deps
Types for integrating typescript with node and express

@types/express

@types/node

nodemon - Hot reloading

typescript - strongly typed types, interfaces etc.

ts-node - typescript execution engine for node.js

mocha, chai - Unit testing
