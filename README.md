# Technical Test for Arcaika

Technical test for the company Arcaika. This project is an API created in Node.js, Express and Mongoose, which aims to present the solution to the proposed challenge. To retrieve information about content creators and videos, TikApi was used.


## Installation

1. Clone this repo.
```
git clone https://github.com/cristianps1988/arcaika-challenge-api.git
```
2. Move inside to the directory.
```
cd arcaika-challenge-api
```
3. Run `npm install` to install the dependencies.
```
npm install
```

## Use
1. Add the enviroment variables to a .env file. The example is in the file .env.example. Reeplace <<YOURPASSWORD>> for the password provided for the DB admin. Reeplace <<YOURAPIKEY>> with your ApiKey provided for TikApi.

2. Run `npm start` for start the server.
```
npm run start
```
3. Open `http://localhost:4000` in your web browser.
4. For run the test run `npm run test`
```
npm run test
```

## EndPoints

- Get: /video/ : Returns all videos that are currently saved in the DB.
- Post: /video/newVideo/ : Add a new video to the database by providing a link to a video from tiktok
- Put: /video/:id/ : Updates a video stored in the database, according to the video ID provided.
- Delete: /video/:id/ : Deletes a video stored in the database, according to the video ID provided.

### Test Endpoints in your local in Postman

- https://elements.getpostman.com/redirect?entityId=27784559-1c5eec99-ec8a-40e1-9bad-222c332beb00&entityType=collection


## Deploy
- https://arcaika-challenge-api.vercel.app/

## Created by
@cristianps1988