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
git clone https://github.com/chudah1/backendchallenge.git
```

```
Go into project directory

In the root folder run

docker compose up
```

The default port of the nodejs application is `3000`.


If for some reason your mongoDB server is not working stop the application by pressing `CTRL+C` and then executing
```
docker compose up --build
docker compose up
```

[view app on localhost://3000]
