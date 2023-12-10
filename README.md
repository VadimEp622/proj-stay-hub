<p align="center">
  <img class="center" src="https://github.com/VadimEp622/proj-stay-hub/assets/118854398/bc92647c-1016-4c79-ac86-f8cb62985104">
</p>

# Introduction

**StayHub** is fullstack web application, which functions as an Airbnb clone.
This project was built from the **ground up** in **JavaScript**, as a final exam for the ***Full-stack developer*** bootcamp **Coding Academy** (Israel).

The project is currently deployed to the cloud service "render.com".

- Link:  [**StayHub**](https://stayhub-8w08.onrender.com)
- Tools: **React.js**, **Sass**, **Redux** (front-end) | **Node.js**, **Express.js**, **MongoDB**, **Socket.IO** (back-end)

# Samples

<h2>Desktop</h2>

![Home-page](https://github.com/VadimEp622/proj-stay-hub/assets/118854398/a330ffcb-021a-4666-b89d-08599e904c37)
<hr></hr>

![Header-filter](https://github.com/VadimEp622/proj-stay-hub/assets/118854398/df704cb6-6964-4c2d-9509-e712ae41eaff)
<hr></hr>

![Details-page](https://github.com/VadimEp622/proj-stay-hub/assets/118854398/e7e7c48d-2a7f-46f0-95fa-96955fa80915)
<hr></hr>

![Trips-page](https://github.com/VadimEp622/proj-stay-hub/assets/118854398/9558ad26-2e62-4c2e-abdc-83b0ea433c33)
<hr></hr>

<h2>Mobile</h2>

<p align="center">
    <img class="center" src="https://github.com/VadimEp622/proj-stay-hub/assets/118854398/f1057d15-8ff7-4afb-b335-56742caa7ffc"><hr></hr>
</p>
<p align="center">
    <img class="center" src="https://github.com/VadimEp622/proj-stay-hub/assets/118854398/118a6058-9b13-403b-be6f-0abb253505f9"><hr></hr>
</p>
<p align="center">
    <img class="center" src="https://github.com/VadimEp622/proj-stay-hub/assets/118854398/476c4a5f-828a-432b-95a2-1e42b84cefa7"><hr></hr>
</p>



# Summary

**StayHub** is divided into **Front-end** (Client-side) and a **Back-end** (Server-side).

<h3>Font-end</h3>

- Uses **React.js**
- Uses **Sass** for styling
- Uses **Redux** for the store
- Functions as a **Single Page Application**
- Fully **Responsive**

<h3>Back-end</h3>

- Uses **Node.js** as backend server
- Uses **Express.js** for RESTful APIs
- Uses **MongoDB** for the database
- Uses **Sockets** for instantaneous communication between client and server
- Uses **Async Local Storage (ALS)** to store unique client state, for middleware/security/authentication purposes  

# How To Run Locally

0. Dowload code zip, and unzip locally
1. Using local monogoDB ([MongoDB Community Server](https://www.mongodb.com/try/download/community) + [Studio 3T](https://studio3t.com/download/)), import the "StayHub" folder from the "data" folder (...\backend\data), using "BSON - mongodump folder", into a connection
2. Simultaneously, run the backend using "npm run dev", and then the frontend using "npm start"
3. In the backend folder, create an .env file, which will have: GOOGLE_MAPS_API_KEY='insert-string-here' and DB_URL='insert-string-here'.
   
* The GOOGLE_MAPS_API_KEY is needed for viewing the map in the "/stay-details/:id" route, though it's not an absolute requirement to run

* The DB_URL is needed for running the backend in production ("npm run prod" in backend and that's it) - needs having the database in the cloud, and a "connection SRV string"

* If you wish to run the back-end in production, additionally add in the backend .env file: SECRET1='insert-string-here' , a random string of your choice, for spicing up the hash for the password, on new user signup.



# Made By:
- [**Vlad Epov**](https://github.com/VadimEp622)
- [**Gideon Levinson**](https://github.com/GideonLevinson)
- [**Steve Bendersky**](https://github.com/Steveb599)
