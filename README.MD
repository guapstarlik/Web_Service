# About the service

This API is a basic media inquiry service that allows users to find specifications of certain media (shows, media, and anime). The specifications that is provided is the episodes, seasons and a brief synopsis of the media’s premise. 

## Deployment site
[https://web-service-5hkn.onrender.com](https://web-service-5hkn.onrender.com/)

## API Endpoint documentation

- GET /
- GET /media/:id
- GET /media/:id/episode/:episodeNumber
- GET /media?category=

## Examples of Request and Response

1. Get specific media:
Request: GET /media/1
Response: {
"message": "Successfully found show: Star Wars: The Clone Wars",
"data": {
"id": 1,
"name": "Star Wars: The Clone Wars",
...
}
}
2. Get specific episode:
Request: GET /media/1/episode/5
Response: {
"message": "Episode 5 of Star Wars: The Clone Wars",
"data": {
"mediaId": 1,
"mediaName": "Star Wars: The Clone Wars",
"episodeNumber": 5,
"totalEpisodes": 133
}
}