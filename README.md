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
  - [Solution](#solution)
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
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)
- [References](#references)

<!-- About the Project -->
## About the Project

<!-- Mockup -->
### Mockup
<img src="spynet/src/assets/readmeAssets/Login.jpg" alt="Mockup" style="height: 600px"/>

<!--PROJECT DESCRIPTION-->
### Project Description
SpyNet is a management website where users can purchase ingredients and craft items using those ingredients. Each user is located by a different warehouse, meaning each warehouse tracks its inventory separately. In addition, administrators can create ingredients to be sold on the marketplace. 
### Technologies Used
* TypeScript
* Angular TS
* PostgreSQL

### Built With
<!-- Typescript -->
#### TypeScript
* Built on JavaScript.
* Uses the TypeScript Type system to ensure consistency among variable types, such as Strings or Numbers.
* Ensures that your variable declarations and assignments remain consistent, which reduces bugs.
* Being built on JavaScript, TypeScript functions in any place JS does, most importantly Node.js.
<p>TypeScript was used to build the front end, as well as the backend.</p>
<img src="spynet/src/assets/readmeAssets/TS.png" alt="TS_Logo" style="width: 300px; height: auto;" />

<!-- Angular TS -->
#### Angular TS
* It is a TypeScript library.
* It is maintained by Google, and follows single-page routing.
* Used to create the frontend of the website.
<p>Angular TS allowed us to build and test the frontend of the website.</p>
<img src="spynet/src/assets/readmeAssets/Angular.png" alt="Angular-Logo" style="width: 400px; height: 225px;"/>

<!-- PostgreSQL -->
#### PostgreSQL
* Open Source Object-Relational Database Management System (ORDBMS).
* Uses Structured Query Language (SQL)
* Supports more complex data models than MySQL.
<p>PostgreSQL was used to implement backend functionality to implement CRUD functionality to the website.</p>
<img src="spynet/src/assets/readmeAssets/PostgreSQL.png" alt="Bootstrap-Logo" style="width: 400px; height: auto;"/>

<!-- GETTING STARTED -->
## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
For development and testing, the latest version of Node.js is required, which is available here: [Node.js](https://nodejs.org/en).

### Installation
Here are a couple of ways to clone this repo:

1.  GitHub Desktop </br>
    Enter `https://github.com/Pantonym/DV300_Term1.git` into the URL field and press the `Clone` button.

2.  Clone Repository </br>
    Run the following in the command-line to clone the project:

    ```sh
    git clone https://github.com/Pantonym/DV300_Term1.git
    ```
The following installations are required if you do not clone the repository:
* Click on Terminal and open a new terminal
* Type the following:
1. npm i typescript --save-dev
2. npx tsc
3. npm i -g @angular/cli
4. cd appName
5. ng add @angular/material
6. ng serve --open
* To close the app: `ctrl+c`, `Y` in the terminal.

<!-- Main Features and Functionality -->
## Features and Functionality
1. Landing Page - Page Navigation (Group Mate Responsibility: Glen)
* Pages are connected through routing, specifically the `app.routes.ts` file.
```
export const routes: Routes = [
    { path: "dashboard", component: DashboardComponent },
    { path: "login", component: LoginComponent },
    { path: "marketplace", component: MarketplaceComponent, canActivate: [AuthGuard]  },
    { path: "marketplace-admin", component: MarketplaceAdminComponent, canActivate: [AdminAuthGuard]  },
    { path: "warehouses/:id", component: WarehousesComponent, canActivate: [AuthGuard] },
    { path: "", redirectTo: "dashboard", pathMatch: "full" },
    { path: "**", component: PagenotfoundComponent }
];
```
* The routes are also protected using an AuthGuard system: (Group Mate Responsibility: Nico)
```
return inject(AuthService).checkCurrentUserLoggedIn()
  // if it is true, leave it as-is
  ? true
  // otherwise, redirect to "/login"
  : inject(Router).createUrlTree(['/login']);
```
* Navigation links are added though `<a>` tags which redirect the website through using `href`. Because a navigation bar is unnecessary, each page is connected through buttons at the top or bottom of the screen, giving the impression of moving from one location to another.

2. Landing Page - Website Information (Group Mate Responsibility: Glen)
* The website information is stored in an accordion, which was created using the HTMLDetailsElement, as well as the HTMLSummaryElement as such:
```
<details>
  <summary>
    What is this?
  </summary>
  <div style="background-color: white; color: black;">
    This is an inventory tracking/crafting website for agents in the field to use to make gadgets and tools for their missions.
  </div>
</details>
```
* This was done to not overwhelm the user with too much text - they can click to activate the accordion as they go from one item ot the next.

3. Authentication Page - Log In using unconventional verification methods (Group Mate Responsibility: Nico)
* Protect Users using BCrypt:
* When the user registers, the bcrypt password is generated. Using SALT, a random value is added to the end of the encrypted password to further encrypt it. After the SALT is generated, the password is Hashed.
```
const salt = await bcrypt.genSalt(Number(process.env.SALT));
const hashPassword = await bcrypt.hash(req.body.password, salt);
```
* When the user logs in, because the password is encrypted, it is tested using `bcrypt.compare()`.
```
// check if the passwords match
bcrypt.compare(password, userRequest.password, (error, result) => {
  // result will be true or false
  if (result) { //passwords match
    userRequest!.password = "Protected by SpyNet"; //set the password to empty to not expose it. This protects user information. This will not save the password to an empty string as it does not call the .save function.
    return res.json(userRequest) //send the user data if login is a success
  } else { //passwords do not match
    return res.status(500).json({ message: "Invalid Credentials" })
  }
})
```
* To add unconventional verification, the user must solve a puzzle involving Sliders:
```
if (sliderLeftValue === 100 && sliderRightValue === 0) {
// Validation
if (this.login.value.email != "" && this.login.value.password != "") {
   ...
  }
} else {
  this.errorMessage = "Competency Test Failed."
}
```
4. Warehouse Overview Page - Individual Warehouse Information (Group Mate Responsibility: Nico & Glen)
* Dynamic cards are used to generate the output for each of the warehouses. There are also three buttons, each of which sends a parameter to the URL which changes which set of the cards are displayed, therefore the user is able to see each warehouse's information. It also saves the active warehouse to SessionStorage for use in other files.
```
<button (click)="warehouseChange3()" class="btnWarehouse button-80" role="button"><a routerLink="/warehouses/1" routerLinkActive="active"> Agent Bigears: 003 
</a></button>
warehouseChange3() {
  this.warehouseID = 3;
  sessionStorage.setItem("warehouse", "3");
}
```
* This also shows the requirement of having three warehouses.

5. Warehouse Overview Page - Inventory Summary and Information (Group Mate Responsibility: Nico)
* Using a material card and an ngFor loop, the inventory item's image, name, description and total is shown.
```
<app-warehouse-card *ngFor="let item of ingredientList" [item]="item"></app-warehouse-card>
<mat-card class="card">
  <div style="padding: 5px;">
    <div class="left">
      <img [src]="item.image" width="80" />
    </div>
    <div class="left">
      <mat-card-content style="width: 300px; text-align: left;">
      <mat-card-title> Name: {{item.name}} </mat-card-title>
      <p> {{item.description}} </p>
      <p> Amount: {{item.totalWarehouse1}} </p>
      </mat-card-content>
    </div>
  </div>
</mat-card>
```
6. Inventory Stock Section - Inventory Displaying (Group Mate Responsibility: Nico)
* Using the methods listed above in point 4 and 5, the stock information is shown depending on which warehouse is selected.

7. Inventory Stock Section - Inventory Navigation (Group Mate Responsibility: Nico)
* Using the methods listed above in point 4 and 5, the stock changes depending on which warehouse is selected.

8. Inventory Stock Section - Inventory Information (Group Mate Responsibility: Nico)
* Displaying the Name, Category, Amount and Image:
```
<mat-card class="card">
  <div style="padding: 5px;">
    <div class="left">
      <img [src]="item.image" width="80" />
    </div>
    <div class="left">
      <mat-card-content style="width: 300px; text-align: left;">
      <mat-card-title> Name: {{item.name}} </mat-card-title>
      <p> {{item.description}} </p>
      <p> Amount: {{item.totalWarehouse1}} </p>
      </mat-card-content>
    </div>
  </div>
</mat-card>
```
9. Inventory Stock Section - Updating Inventory Amount (Group Mate Responsibility: Glen)
* The user is able to update the inventory amount through accessing the marketplace and buying an item. Please take note, the relevant ingredient will only increment by 1
only in the selected agents inventory. To change inventories, simply select a different one on the crafting page.
*The admin marketplace allows admin users to add a new item to the ingredients list, take note: this new item is set to 0 across all inventories upon creation, so new stock will
have to be purchased in every warehouse where applicable.
*The price simulates real world stock market behavior by randomizing itself after every purchase, across all items. It also gives some errors in the console, but they have no impact 
on the functionality of the website and can be ignored.
*Admin users are redirected automatically to the admin marketplace, while regular users can only access the regular marketplace due to the authguard system.

10. Craft Section - Crafting Recipes and Updating Inventory Amount (Group Mate Responsibility: Nico)
* First, the data is collected:
```
<button class="btnCraft" (click)="craftNewRecipe(recipeItem.id!, 1)">Craft</button></p>
craftNewRecipe(recipeID: number, warehouseID: number) {
  this.service.getSingleRecipe(recipeID).subscribe(async (recipe: Recipe) => {
    const ingredientsNeeded: number[] = recipe.ingredientsNeeded.map(id => Number(id)); // Cast each element to number
    const ingredientsObject = await this.getIngredients(ingredientsNeeded);
...
```
* The getIngredients Function forms an array of objects, consisting only of the ingredients needed in the recipe as the recipe table only saves the ingredient's ID. This is done asynchronously to ensure the data is collected before the put request is sent.
```
async getIngredients(ingredientsNeeded: number[]) {
    const ingredientsObjects: any[] = [];
    const fetchPromises: Promise<void>[] = [];
    for (let k = 0; k < ingredientsNeeded.length; k++) {
      const ingredientID = ingredientsNeeded[k]; // Directly using the ingredientID
      fetchPromises.push(
      new Promise<void>((resolve, reject) => {
        this.service.fetchIngredientData(ingredientID).subscribe((ingredientData: any) => {
          ingredientsObjects.push({ data: ingredientData });
          resolve();
        }, error => {
          reject(error);
        });
      })
    );
  }
  // Wait for all ingredient fetch promises to resolve
  await Promise.all(fetchPromises);
  return ingredientsObjects;
}
```
* After that, in the CraftRecipe Function, the put request is sent:
```
this.service.craftRecipe(recipeID, ingredientsObject, warehouseID).subscribe(
  (data) => {
    // Handle successful response here
      this.recipeItem.isCraftable = true;
      window.location.reload();
    },
  (error) => {
...
```
* Finally, the data is saved to the database, and the relevant amount is reduced:
```
recipeRouter.put("/:id/craft", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let { amount, ingredients, warehouse } = req.body;
    var recipeRequest = await appDataSource.getRepository(Recipe).findOneBy({ id: id });
    if (!recipeRequest) {
      return res.status(500).json({ message: "no recipe found" });
    } else {
      // change which warehouse is affected based on the values sent through the req.body
      if (warehouse === 1) {
      // update the amount that has been crafted
      recipeRequest!.totalWarehouse1 = recipeRequest!.totalWarehouse1 + amount; // updates (already incremented in frontend)
    } else if (warehouse === 2) {...}
    recipeRequest!.totalAmount = recipeRequest!.totalWarehouse1 + recipeRequest!.totalWarehouse2 + recipeRequest!.totalWarehouse3;
    // Loop through the ingredients and deduct the inventory amount
```
* The updateInventoryAmount Function increases the total of the recipe that was crafted in the applicable warehouse
```
    var canCraft = await updateInventoryAmount(ingredients, warehouse);
    if (canCraft) {
      // Save our recipe amount and return it
      var newRecipeData = await appDataSource.getRepository(Recipe).save(recipeRequest);
      return res.json(newRecipeData);
      } else {
        return res.status(500).json({ error: "uncraftable" });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
})
```
11. Craft Section - Crafting Recipes Only With Enough Inventory (Group Mate Responsibility: Glen)
* The updateInventoryAmount Function is used to both update the amount inside of the inventory, and test to see if there are enough ingredients to craft the recipe. The following if-else statement was used:
```
if (warehouse === 1) {
  // update the ingredient amount
  if (ingredientItem.totalWarehouse1 <= 0) {
    return false;
  } else {
    ingredientItems.push(ingredientItem);
  }
} else if (warehouse === 2) {...}
```
* The return immediately exits the function and returns a boolean showing the recipe is not craftable.

12. Craft Section - Crafting Recipes Only With a Single Warehouse's Inventory (Group Mate Responsibility: Nico)
* The following code is found in the updateInventoryAmount Function, directly after the code ensures ingredient has enough stock:
```
// change which warehouse is affected based on the values sent through the req.body
if (warehouse === 1) {
  // update the ingredient amount
  // Each item can only be used once, so there is no need for an amount needed table
  ingredientExample!.totalWarehouse1 = ingredientExample!.totalWarehouse1 - 1;
} else if (warehouse === 2) {
  // Each item can only be used once, so there is no need for an amount needed table
  ingredientExample!.totalWarehouse2 = ingredientExample!.totalWarehouse2 - 1;
} else if (warehouse === 3) {
  // Each item can only be used once, so there is no need for an amount needed table
  ingredientExample!.totalWarehouse3 = ingredientExample!.totalWarehouse3 - 1;
}
```
13. Craft Section - Crafting Recipes Only Adds to the Correct Warehouse's Amount (Group Mate Responsibility: Glen)
* The following excerpt from the code shown in point 10 is applicable, as it ensures only the correct warehouse is targeted:
```
if (warehouse === 1) {
      // update the amount that has been crafted
      recipeRequest!.totalWarehouse1 = recipeRequest!.totalWarehouse1 + amount; // updates (already incremented in frontend)
    } else if (warehouse === 2) {...}
```
14. Craft Section - At Least 5 Craftable Items (Group Mate Responsibility: Glen)
* There are 5 Craftable Items, as shown in the Demonstration Video.

<!-- Development PROCESS -->
## Development Process
### Architecture
The application consists of multiple TypeScript pages and Angular components. It communicates with an SQL database to receive and send information. `HTTPRequest` was used to contact the database, which was accessed through `pgAdmin 4` to create the database used in this project, as well as the application `Insomnia` to test the functionality.
### Design Frame
How might we create a solution to the problem of needing an online web application that hosts crafting and storing of information that can be accessed through several warehouses that don't share inventory?
### Solution
The SpyNet application, which can Create, Read and Update entries in an SQL-based Database for users, warehouse, recipe and ingredient data.
### Theme
We chose a theme that highlighted the 'international spy' idea, having multiple different agents who access warehouses to craft tools out of seemingly useless objects. The website imitates the types of websites you would see in spy movies, but adds a unique spin on the common trope of creating tools out of random objects. 

### Development Documents
<!-- Moodboard -->
* Moodboard
<img src="spynet/src/assets/readmeAssets/Moodboard.png" alt="Moodboard" style="height: 600px">

<!-- Iconography -->
* Iconography
<img src="spynet/src/assets/readmeAssets/Iconography.png" alt="Iconography" style="height: 200px">

<!-- Colour Palette -->
* Colour Palette
<img src="spynet/src/assets/readmeAssets/ColourPalette.png" alt="Colour Palette" style="height: 100px">

<!-- Data Planning - ERD -->
* Data Planning - ERD
<img src="spynet/src/assets/readmeAssets/ERD.png" alt="Data Planning - ERD" style="height: 300px">

<!-- Wireframes -->
* Wireframes
Login Page
<img src="spynet/src/assets/readmeAssets/LoginWireframe.jpg" alt="Login" style="width: 600px"/>
Dashboard Page
<img src="spynet/src/assets/readmeAssets/DashboardWireframe.jpg" alt="Dashboard" style="width: 600px"/>
Marketplace Page
<img src="spynet/src/assets/readmeAssets/MarketplaceWireframe.jpg" alt="Marketplace" style="width: 600px"/>
Marketplace Admin Page
<img src="spynet/src/assets/readmeAssets/MarketplaceAdminWireframe.jpg" alt="MarketplaceA" style="width: 600px"/>
Warehouses Page
<img src="spynet/src/assets/readmeAssets/WarehousesWireframe.jpg" alt="Warehouses" style="width: 600px"/>

<!-- Highlights -->
#### Highlights
* A great highlight was the team working together to create a functioning application. 
* Finding solutions to the problems we faced was very rewarding, such as how to form an ingredients array to send to the crafting functionality.
* It was very rewarding to see the project's UI change from the simplistic original design to a much more refined and complex design, making the project much more aesthetically pleasing.
* When the crafting section finally started working and came to life, the project felt like it was finally coming together.
* The CSS for each page was very fun to do

<!-- Challenges -->
<!-- Explain the challenges faced with the project and why you think you faced it or how you think you'll solve it (if not solved), or how you solved it -->
#### Challenges
* One of the biggest challenges faced was how to force the code to wait for the ingredient data before submitting the crafting request. This was solved through a Promise Async/Await loop.
* Changes being reverted through versions was a slight problem, however the team worked together to ensure this happened as little as possible.
* Learning angular SQL calls was a bit challenging
* Postgres' load times.
* The sliders on the login page are made out of minecraft bedrock, they cannot be changed in any way.

<!-- Future Implementation -->
### Future Implementation
* Change the crafting functionality to not use the recipe and ingredients tables, but to use a JoinTable function to create a combination of the two to allow for immediate access to information without the need for promises. 
* Implement the ability for users to craft unique recipes that they make themselves. 
* Make the website completely responsive.
* Experience points can be added per crafted item, and the more experience you have the more items you can purchase on the marketplace.
* Administrator can see how much stock is left in the marketplace, as well as a limited stock for the marketplace.

### Future Implementation - successfully implemented
* A summary page that lists the totals of each ingredient across all agents (warehouses)

<!-- Final Outcome -->
## Final Outcome
<!-- MOCKUPS -->
### Mockups
<img src="spynet/src/assets/readmeAssets/Dashboard.jpg" alt="Mockup" style="height: 600px"/>
<img src="spynet/src/assets/readmeAssets/Login.jpg" alt="Mockup" style="height: 600px"/>
<img src="spynet/src/assets/readmeAssets/MarketplaceAdmin.jpg" alt="Mockup" style="height: 600px"/>
<img src="spynet/src/assets/readmeAssets/Warehouses.jpg" alt="Mockup" style="height: 600px"/>

<br>

<!-- Video Demonstration -->
### Video Demonstration
**Video Demonstration:** <a href="https://drive.google.com/file/d/1Txd197Wk5i3jK9rxGzuZIU-WJIWO6FcR/view?usp=sharing">Google Drive Link</a>

<!-- LICENSE -->
## License
Distributed under the MIT License. See `LICENSE` for more information.

<!-- AUTHORS -->
## Authors
* **Glen Dorner** - [Github](https://github.com/GlenDorner221358)
* **Nico van Wyk** - [Github](https://github.com/Pantonym)

<!-- Contact -->
## Contact
**Glen Dorner** - [221358@virtualwindow.co.za](mailto:221358@virtualwindow.co.za)
**Nico van Wyk** - [221179@virtualwindow.co.za](mailto:221179@virtualwindow.co.za)

* **Project Link** - https://github.com/Pantonym/DV200_Term1_Backend

<!-- ACKNOWLEDGEMENTS -->
<!-- all resources that you used and Acknowledgements here -->
## Acknowledgements
* [Lecturer](https://github.com/ArmandPretorius)
* [Figma](https://www.figma.com/)
* [W3Schools](https://www.w3schools.com)

## References
* https://jng15.medium.com/typescript-basics-type-system-cac2e848b4aa (TypeScript Logo Image)
* https://en.m.wikipedia.org/wiki/File:Angular_full_color_logo.svg (Angular Logo Image)
* https://medium.com/@amitrani/getting-started-with-postgresql-5990b54f7169 (PostgreSQL Logo Image)

## Backend Link
* To see the backend of the application, follow [this link](https://github.com/Pantonym/DV300_Term1_Backend).