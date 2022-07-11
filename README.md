# Project Title


## Backendchallenge

This project is part of a challenge for an interview

**Author** 

 @Chudah
 
### Tech Stack
**Server Side**: MongoDb, NodeJs, ExpressJs,

**Dependecies**: mongoose, multer, ejs, nodemon, validator

## Project Layout
  controller
  
  routes
  
  views
  
  models
 
  public
  
  tests (written with postman and exported to Vscode to run)
  
_  app.js: Entry point of the application 
_
## Installation
**Disclaimer: This app is dockerized**


```
Clone the repo

gh repo clone chudah1/Backendchallenge
```

Go into project directory
`cd backend`

//Install packages and dependencies

In the root folder run
```
docker-compose up
```

The default port of the nodejs application is `3000`.

For the first time always the nodeJS server will fail to connect to database just change some .js files and it will connect to database normally. This happens because mongoDB server takes time to start and nodeJS server start as soon as we do docker-compose up.

The setup will take time just for the first time afterwards it will be fast.

If for some reason your mongoDB server is not working stop the application by pressing `CTRL+C` and then executing
```
docker-compose up
```

[view app on localhost://3000]
