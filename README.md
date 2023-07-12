# CareBnB

CareBnB (https://carebnb.onrender.com/) is a full-stack project reflecting the skills I have learned over the course of my Web Development journey. Being a solo project, CareBnB took in what I learned on the backend (databases, servers, routes) as well as the frontend (user/client side). Inspired by AirBnB, I was able to implement features such as Spots, Reviews, and Bookings. Provided below is a walkthrough of the site. Enjoy!

## Technologies

<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" /><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" /><img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" /><img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" /><img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" /><img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" /><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /><img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" />

![readme-example-1](https://cdn.discordapp.com/attachments/1117948168353628201/1128486179222847558/CareBnB_walkthrough.gif)

## Launching the App Locally

1. Clone this repository:

   `
   https://github.com/kevinhuang1208/API-project.git
   `
2. Install dependencies into the Backend and Frontend by making a terminal for each one and run the following:

   * `npm install`

3. Create a **.env** file using the **.envexample** provided

4. Set up your database with information from your **.env** and then run the following to create your database, migrations, and seeds:

   * `npx dotenv sequelize db:create`
   * `npx dotenv sequelize db:migrate`
   * `npx dotenv sequelize db:seed:all`

5. Start the app for both backend and frontend using:

   * `npm start`

6. You can now use Demo User or another user by Creating An Account!

# Features

## Spots
Logged-in Users can
* Users can create a Spot
* Users can update their Spot
* Users can delete their Spot
* Anyone can view each Spot

## Reviews
Logged-in Users can
* Users can create Reviews on Spots
* Users can delete their Reviews on a Spot
* Anyone can view all Reviews of a Spot

## Bookings
Logged-in Users can
* Create a booking at a Spot
* Update their booking at a Spot
* Read all of their bookings
* Delete/Cancel their bookings
