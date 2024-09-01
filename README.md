<!-- Project Info -->
<br>

![GitHub repo size](https://img.shields.io/github/repo-size/JugheadStudio/Tradera)
![GitHub watchers](https://img.shields.io/github/watchers/JugheadStudio/Tradera)
![GitHub language count](https://img.shields.io/github/languages/count/JugheadStudio/Tradera)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/JugheadStudio/Tradera)

<!-- Logo and link to repository -->
<p align="center">
  <a href="https://github.com/JugheadStudio/Tradera">
    <img src="react-app\src\assets\logo.svg" width="100px">
  </a>
</p>

<!-- Short Description -->
<h3 align="center">Tradera: Banking app from space</h3>
<p align="center"> A Banking app where you can purchase and trade EONS!
    <br>
    <!-- Bug Links -->
    <a href="https://github.com/JugheadStudio/Tradera/issues">Report Bug</a>
    <br>
</p>

<!-- Name and Number In Alphabetical Order -->
<div>
    <h5 align="center" style="padding:0;margin:0;">Anke Du Raan</h5>
    <h5 align="center" style="padding:0;margin:0;">Student Number: 221202</h5>
    <br>
</div>
<div>
    <h5 align="center" style="padding:0;margin:0;">Emilio Carreira</h5>
    <h5 align="center" style="padding:0;margin:0;">Student Number: 221350</h5>
    <br>
</div>
<div>
    <h5 align="center" style="padding:0;margin:0;">Glen Dorner</h5>
    <h5 align="center" style="padding:0;margin:0;">Student Number: 221358</h5>
    <br>
</div>
<div>
    <h5 align="center" style="padding:0;margin:0;">Ruan Jordaan</h5>
    <h5 align="center" style="padding:0;margin:0;">Student Number: 150139</h5>
    <br>
</div>
<!-- Subject and Term -->
<h6 align="center">DV300 | Term 3</h6>

<!-- TABLE OF CONTENTS -->
## Table of Contents

- [Table of Contents](#table-of-contents)
- [About the Project](#about-the-project)
  - [Mockup](#mockup)
  - [Project Description](#project-description)
  - [Technologies Used](#technologies-used)
  - [Built With](#built-with)
    - [Electron](#typescript)
    - [C#](#angular-ts)
    - [PostgreSQL](#postgresql)
    - [React](#react)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Features and Functionality](#features-and-functionality)
- [Development Process](#development-process)
  - [Architecture](#architecture)
  - [Design Frame](#design-frame)
  - [Theme](#theme)
  - [Development Documents](#development-documents)
    - [Highlights](#highlights)
    - [Challenges](#challenges)
  - [Future Implementation](#future-implementation)
- [Final Outcome](#final-outcome)
  - [Mockups](#mockups)
  - [Video Demonstration](#video-demonstration)
- [License](#license)
- [Authors](#authors)
- [Acknowledgements](#acknowledgements)

<!-- About the Project -->
## About the Project

<!--PROJECT DESCRIPTION-->
### Project Description
Tradera is a banking app where the user can purchase and trade our in-house currency "Eons". From this app users can manage their account, buy & sell eons & see past transactions! Beware if you misbehave, the admin users can freeze or delete your account!
### Technologies Used
* React
* Electron
* PostgreSQL
* .NET

### Built With
<!-- React -->
#### React
* React is a free and open-source front-end JavaScript library for building user interfaces based on components by Facebook Inc. It is maintained by Meta and a community of individual developers and companies. React can be used to develop single-page, mobile, or server-rendered applications with frameworks like Next.js
<img src="react-app\src\assets\react.png" alt="React_Logo" style="width: 300px; height: auto;" />

<!-- Electron -->
#### Electron
* Electron is an open-sourced framework for building Desktop GUI applications using web technologies. It's developed and maintained by GitHub and uses the Chromium rendering engine and the Node. js runtime to process and render HTML and CSS.
<img src="react-app\src\assets\electron.png" alt="Angular-Logo" style="width: 300px; height: 225px;"/>

<!-- PostgreSQL -->
#### PostgreSQL
* PostgreSQL also known as Postgres, is a free and open-source relational database management system emphasizing extensibility and SQL compliance
<img src="react-app\src\assets\postgresql.png" alt="Bootstrap-Logo" style="width: 300px; height: auto;"/>

<!-- .NET -->
#### .NET
* The .NET Framework is a proprietary software framework developed by Microsoft that runs primarily on Microsoft Windows. It was the predominant implementation of the Common Language Infrastructure until being superseded by the cross-platform .NET project.
<img src="react-app\src\assets\dotnet.png" alt="Bootstrap-Logo" style="width: 300px; height: auto;"/>

<!-- GETTING STARTED -->
## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
For development and testing, the latest version of Node.js is required, which is available here: [Node.js](https://nodejs.org/en).
Also get the latest version of dotnet, which is available here: [.NET](https://dotnet.microsoft.com/en-us/download).
And the latest version of postgreSQL, which is available here: [PostgreSQL](https://www.postgresql.org/download/)

This application relies on aiven to provide a wireless connection to the database using postgreSQL. As such, you will need your own connection string.
Paste this connection string into the 'appsettings.json' file in the backend, not to mention you also require your own database that follows the structure 
of the back end models and appdbcontext file.

This app also relies on postmark for the OTP verification emails, as such we cannot disclose our API key in the files or on github.

### Installation
Here are a couple of ways to clone this repo:

1.  GitHub Desktop </br>
    Enter `https://github.com/JugheadStudio/Tradera` into the URL field and press the `Clone` button.

2.  Clone Repository </br>
    Run the following in the command-line to clone the project:

    ```sh
    git clone https://github.com/JugheadStudio/Tradera.git
    ```

Once installed, open the terminal and run "npm i" inside the the TRADERA folder, as well as the react-app folder.
Be sure to run the backend from visual studio code or another .NET supported IDE!

To create the database on pgadmin 4, you can create a new migration by navigating into the backend running the following command in the same directory as the program.ls file:
"dotnet ef migrations add \NAME\"

After creating a migration, update your database with this command: 
"dotnet ef database update"

<!-- Main Features and Functionality -->
## Features and Functionality
1. Authentication with OTP on signup & Login
* Logs of authentication are also kept in the database

2. Buying, selling and transferring EONS
* Done from the Dashboard & Home pages

3. Fluctuating EON prices
* Stock market like functionality on the Home page

4. Account tier system
* Accounts can be upgraded over time as you use the app more, with increasing benefits.

5. Benefits & fees
* Each account tier has its own interest rate & transaction fee. The fees are for transferring EONS to another account.

6. Admin functionality
* Admins can freeze/Delete other's accounts as well as see their transaction history.

7. Account management
* Users can manage their account details as well as their past transactions

<!-- Development PROCESS -->
## Development Process
### Architecture
The application consists of multiple tsx pages as well as an extensive .NET backend with controllers and models. The front end communicates with the database using paths specified in the
controllers in the back-end.
### Design Frame
How might we create an app that lets you trade currency online with other people, and looks great at the same time?
### Theme
The main idea behind our theme was "imagine a banking app that a spacefaring civilization would use". With this in mind, we wanted to develop a spacey kind of app.

### Development Documents
<!-- Moodboard & Color palette -->
* Moodboard & color palette
<img src="react-app\src\assets\Moodboard.png" alt="Moodboard" style="height: 600px">

<!-- Data Planning - ERD -->
* Data Planning - ERD
<img src="react-app\src\assets\ERD Diagram.png" alt="Data Planning - ERD" style="height: 300px">

<!-- Wireframes -->
* Wireframes
Login Page
<img src="react-app\src\assets\Home Wireframe.jpg" alt="Dashboard" style="width: 600px"/>
Dashboard Page
<img src="react-app\src\assets\Dashboard Wireframe.jpg" alt="Home" style="width: 600px"/>
Admin Page
<img src="react-app\src\assets\admin page Wireframe.jpg" alt="Admin" style="width: 600px"/>

<!-- Highlights -->
#### Highlights
* The team worked very well together, we have some very strong developers here
* The front end turned out beautifully, beyond all expectations
* Some of the functionality, like transactions, was actually very easy to implement
* When the admin dashboard was working

<!-- Challenges -->
<!-- Explain the challenges faced with the project and why you think you faced it or how you think you'll solve it (if not solved), or how you solved it -->
#### Challenges
* The biggest challenge of them all was "Internal server error 500: Connections reserved for Superuser" which hounded us on our last day of coding. Essentially we had a 75% chance of clicking on something and it just refusing to work. The only fix I know of is to try again later when more connections are open which doesnt make sense because we were literally doing everything in the demo video from 1 computer.
* Getting the authentication to even work was a titanic struggle, thats not even mentioning the OTP functionality
* We struggled in the beginning with committing because of the default connection string and because of how github desktop works
* Because Ruan is on a mac, every time we wanted to commit there were changes to so many unnecessary backend files that we had to discard every.single.time
* When the admin dashboard wasnt working

<!-- Future Implementation -->
### Future Implementation
* Maybe implement another currency to trade between?
* Definitely want to have profile pictures.
* The ability for admins to freeze other admins accounts.

<!-- Final Outcome -->
## Final Outcome
<!-- MOCKUPS -->
### Mockups
![MacBook Air (2022)-2](https://github.com/user-attachments/assets/379c7891-d255-4b4d-80fb-567fe9402767)
![MacBook Air (2022)](https://github.com/user-attachments/assets/975d3da4-2002-4eaf-bded-f83bc4637d81)
![MacBook Air (2022)-1](https://github.com/user-attachments/assets/1497356b-89db-46c8-8448-13103ebbbd36)

<br>

<!-- Video Demonstration -->
### Video Demonstration
**Video Demonstration:** <a href="https://drive.google.com/file/d/1RHl_5j6lXsXsVsP9Hpjn7Ya6SG7a6UfB/view?usp=sharing">Google Drive Link</a> -->

<!-- LICENSE -->
## License
See the `LICENSE` file for more information.

<!-- AUTHORS -->
## Authors
* **Anke Du Raan** - [Github](https://github.com/AnkeatOpenWindow)
* **Emilio Carreira** - [Github](https://github.com/EmilioCarreiraOWI)
* **Glen Dorner** - [Github](https://github.com/GlenDorner221358)
* **Ruan Jordaan** - [Github](https://github.com/JugheadStudio)

* **Project Link** - https://github.com/JugheadStudio/Tradera

<!-- ACKNOWLEDGEMENTS -->
<!-- all resources that you used and Acknowledgements here -->
## Acknowledgements
* [Lecturer](https://github.com/ArmandPretorius)
* [Figma](https://www.figma.com/)
* [W3Schools](https://www.w3schools.com)

