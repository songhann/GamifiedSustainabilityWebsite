# Starter Repository for Assignment
You are required to build your folder structures for your project.

## Folder Structure
```
bed-ca2-songhann   
├─ public  
│  ├─ css  
│  │  └─ chat.css
│  │  └─ color.css
│  │  └─ history.css
│  │  └─ profile.css
│  │  └─ register.css
│  │  └─ style.css
│  ├─ images
│  │  └─ check2-circle.svg
│  │  └─ coin.svg
│  │  └─ door open.jpg
│  │  └─ door.jpg
│  │  └─ envelope.svg
│  │  └─ facebook.svg
│  │  └─ favicon-32x32.png
│  │  └─ instagram.svg
│  │  └─ linkedin.svg
│  │  └─ pencil-square.svg
│  │  └─ profilepic.png
│  │  └─ send-fill.svg
│  │  └─ telegram.svg
│  │  └─ telephone-fill.svg
│  │  └─ trash-fill.svg
│  │  └─ twitter.svg
│  ├─ js
│  │  └─ chat.js
│  │  └─ getAllminigames.js
│  │  └─ getAllPlanets.js
│  │  └─ getAllPlayers.js
│  │  └─ getAllTasks.js
│  │  └─ getCurrentURL.js
│  │  └─ getItemsinPlanet.js
│  │  └─ gift.js
│  │  └─ loginUser.js
│  │  └─ profile.js
│  │  └─ queryCmds.js
│  │  └─ registerUser.js
│  │  └─ shop.js
│  │  └─ singleGameInfo.js
│  │  └─ taskhistory.js
│  │  └─ tradehistory.js
│  │  └─ transaction.js
│  │  └─ userNavbarToggle.js
│  ├─ chat.html
│  ├─ gift.html
│  ├─ index.html
│  ├─ iteminplanet.html
│  ├─ login.html
│  ├─ minigames.html
│  ├─ planets.html
│  ├─ players.html
│  ├─ profile.html
│  ├─ register.html
│  ├─ shop.html
│  ├─ singleGameInfo.html
│  ├─ taskhistory.html
│  ├─ tradehistory.html
│  ├─ transaction.html
├─ src                       
│  ├─ configs           
│  │  └─ createSchema.js        
│  │  └─ initTables.js       
│  ├─ controllers            
│  │  ├─ itemController.js  
│  │  ├─ messageController.js  
│  │  ├─ minigameController.js 
│  │  ├─ planetController.js  
|  |  ├─ playerController.js
|  |  ├─ taskController.js
|  |  ├─ taskprogressController.js
|  |  └─ userController.js
│  ├─ middlewares
│  │  ├─ bcryptMiddleware.js   
│  │  ├─ jwtMiddleware.js   
│  ├─ models                  
│  │  ├─ itemModel.js   
│  │  ├─ messageModel.js           
│  │  ├─ minigameModel.js 
│  │  ├─ planetModel.js 
│  │  ├─ playerModel.js
│  │  ├─ taskModel.js
│  │  ├─ taskprogressModel.js
│  │  └─ userModel.js     
│  ├─ routes                 
│  │  ├─ itemRoutes.js       
│  │  ├─ mainRoutes.js
│  │  ├─ messageRoutes.js
│  │  ├─ minigameRoutes.js
│  │  ├─ planetRoutes.js
│  │  ├─ playerRoutes.js
│  │  ├─ taskprogressRoutes.js
│  │  ├─ taskRoutes.js      
│  │  └─ userRoutes.js      
│  ├─ services               
│  │  └─ db.js               
│  └─ app.js   
├─ .env
├─ .gitignore                 
├─ index.js                  
├─ package.json              
└─ README.md  
```
## Clone the Repository

1. Open Visual Studio Code (VSCode) on your local machine.

2. Click on the "Source Control" icon in the left sidebar (the icon looks like a branch).

3. Click on the "Clone Repository" button.

4. In the repository URL input field, enter `https://github.com/ST0503-BED/your-repository-name.git`.

5. Choose a local directory where you want to clone the repository.

6. Click on the "Clone" button to start the cloning process.

## Set Up the Environment

1. In the project root directory, create a new file named `.env`.

2. Open the `.env` file in a text editor.

3. Copy the following example environment variables into the `.env` file:

   ```plaintext
    DB_HOST=<your_database_host>
    DB_USER=<your_database_user>
    DB_PASSWORD=<your_database_password>
    DB_DATABASE=<your_database_name>

    JWT_SECRET_KEY=<your_secret_key>
    JWT_EXPIRES_IN=812741250825h
    JWT_ALGORITHM=HS256 
   ```

   Replace `<your_database_host>`, `<your_database_user>`, `<your_database_password>`, `<your_database_name>`  with the appropriate values for your database connection.
   
   Replace `<your_secret_key>` with your own customised secret key

   For example:

   ```
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=mysql123
    DB_DATABASE=ca2

     JWT_SECRET_KEY="hellomynameisbob"
   ```

   Note: Make sure there are no spaces around the equal sign (=) in each line.

4. Save the `.env` file.

## Install Dependencies

1. Open the terminal in VSCode by going to `View` > `Terminal` or using the shortcut `Ctrl + ``.

2. Navigate to the project root directory.

3. Install the required dependencies using npm:

   ```
   npm install
   ```

## Database Initialization

1. Make sure you have a MySQL database available for this. Update the database configuration details in the `.env` file.

2. To initialize the database tables and populate them with sample data, open the terminal in VSCode and run the following command:

   ```
   npm run init_tables
   ```
### Item Routes
- `GET api/items`:
    - This endpoint should return an array of items objects.

- `GET api/items/planet/:planet_id`:
    - This endpoint should retrieve a specific item's information based on the provided `planet_id`.

- `GET api/items/:item_id`:
    - This endpoint should retrieve a specific item's information based on the provided `item_id`.

- `POST api/items/player`:
    -This endpoint should accept a request body containing `item_id` and `date` properties.This endpoint should allow player to purchase item and add it to their inventory.

    **Example Request Body**

    **Requires Authorization Token**

    ```json
    {
        "item_id": 1,
        "date" : "2017-11-11"
    }
    ```
### Register 
- `POST api/register`:
    -This endpoint should accept a request body containing `username` and `email` and `password` properties.This endpoint allows an unregistered user to register an account.

    **Example Request Body**
    ```json
    {
        "username": "john",
        "email" : "john@gmail.com",
        "password": "imthebest"
    }
    ```
### Login
- `POST api/login`:
    -This endpoint should accept a request body containing `username` and `password` properties.This endpoint allows user to login to their account

    **Example Request Body**
    ```json
    {
        "username": "john",
        "password": "imthebest"
    }
    ```

### Messages Routes
- `GET api/message`:
    - This endpoint should return an array of messages objects.

- `POST api/message`:
    -This endpoint should accept a request body containing `message_text` properties.This endpoint allows user to send a message 

    **Example Request Body**

    **Requires Authorization Token**

    ```json
    {
        "message_text": "Hello World!"
    }
    ```
- `GET api/message/:id`:
    - This endpoint should retrieve a specific message's information based on the provided `id`.

- `PUT api/message/:id`:
    -This endpoint should accept a request body containing `message_text` properties.This endpoint allows update a message on the provided `id`.

    **Example Request Body**

    **Requires Authorization Token**

    ```json
    {
        "message_text": "Hello World, Im new!"
    }
    ```

- `DELETE api/message/:id`:
    -This endpoint should delete message by the provided `id`.

    **Requires Authorization Token**

### Minigame Routes
- `GET api/minigames`:
    - This endpoint should return an array of minigames objects.

- `GET api/minigames/:game_id`:
    - This endpoint should retrieve a specific minigame's information based on the provided `game_id`.

- `POST api/minigames/item/player`:
    - This endpoint should accept a request body containing `game_id` properties.This endpoint should allows the player to collect their item reward after completing a minigame.

    **Example Request Body**

    **Requires Authorization Token**

    ```json
    {
        "game_id": 1
    }
    ```

### Planet Routes
- `GET api/planets`:
    - This endpoint should return an array of planets objects.

### Player Routes
- `GET api/players`:
    - This endpoint should return an array of players objects.

- `PUT api/players/unequip`:
    - This endpoint should accept a request body containing `item_id` properties.This endpoint should allow the player to unequip a item.

    **Example Request Body**

    **Requires Authorization Token**

    ```json
    {
        "item_id": 1
    }
    ```

- `PUT api/players/equip`:
    - This endpoint should accept a request body containing `item_id` properties.This endpoint should allow the player to equip a item.

    **Example Request Body**

    **Requires Authorization Token**

    ```json
    {
        "item_id": 1
    }
    ```
- `GET api/players/preset`:
    - This endpoint should return an array of items equipped by a user.This endpoint should allow the player to unequip a item.

    **Requires Authorization Token**

- `GET api/players/byauthorization/items`:
    - This endpoint should return an array of items owned by a user based on the provided token.

    **Requires Authorization Token**

- `GET api/players/:player_id/items`:
    - This endpoint should return an array of items owned by a user based on the provided `player_id`.

- `GET api/players/byauthorization/items/planet/:planet_id`:
    - This endpoint should return an array of items owned by a user based on the provided token and the provided `planet_id`.

    **Requires Authorization Token**

- `GET api/players/byauthorization/transaction`:
    - This endpoint should return an array of coin transaction history based on the provided token.

    **Requires Authorization Token**

- `GET api/players/byauthorization`:
    - This endpoint should retrieve a specific player's information based on the provided token.

    **Requires Authorization Token**

- `GET api/players/:player_id`:
    - This endpoint should retrieve a specific player's information based on the provided `player_id`.

- `GET api/players/byauthorization/tradehistory`:
    - This endpoint should return an array of trade history based on the provided token.

    **Requires Authorization Token**

-  `GET api/players/preset`:
    - This endpoint should return a specific player's customisation based on the provided token.

    **Requires Authorization Token**

- `PUT api/players/trade`:
    - This endpoint should accept a request body containing `item_id` and`player_id` and `date` properties.This endpoint should allow player to trade item to another player.

    **Example Request Body**

    **Requires Authorization Token**

    ```json
    {
        "item_id": 1,
        "player_id": 1,
        "date" : "2017-11-11"
    }
    ```

### Taskprogress Routes
- `POST api/task_progress`:
    - This endpoint should accept a request body containing `task_id` and `completion_date` and `notes` properties. This endpoint creates a task progress for a user.

    **Example Request Body**

    **Requires Authorization Token**

    ```json
    {
        "task_id": 1,
        "completion_date": "2017-11-11",
        "notes" : "I planted a tree!"
    }
    ```

- `GET api/task_progress/player`:
    - This endpoint should return a specific taskprogress information based on the provided token.

    **Requires Authorization Token**

- `GET api/task_progress/:progress_id`:
    - This endpoint should return a specific taskprogress information based on the provided `progress_id`.

- `PUT api/task_progress/:progress_id`:
    - This endpoint should accept a request body containg `notes` properties.This endpoint should modify the taskprogress notes.

    **Example Request Body**

    **Requires Authorization Token**

    ```json
    {
        "notes" : "I planted a tree!"
    }
    ```

- `DELETE api/task_progress/:progress_id`:
    - This endpoint should delete task progress by the provided `progress_id`.

    **Requires Authorization Token**

### Task Routes

- `GET api/tasks`:
    - This endpoint should return an array of task objects.

- `GET api/tasks/:task_id`:
    - This endpoint should retrieve a specific task's information based on the provided `task_id`. 

### User Routes
- `GET api/users`:
    - This endpoint should return an array of user objects.

- `GET api/users/leaderboard`:
    - This endpoint should return an array of user objects sorted by total points.

- `GET api/users/:user_id`:
    - This endpoint should retrieve a specific user's information based on the provided `user_id`.

- `PUT api/users/:user_id`:
    - This endpoint should allow the user to modify their user information by the provided `user_id`

- `DELETE api/users/:user_id`:
    - This endpoint should allow the user to delete their user information by the provided `user_id`



## Webpages

### Globat Chat Webpage

- This webpage allows users to see existing messages from other users , and also post a message of their own, edit or delete their own messages.Users are only allowed to edit and delete their own messages. If an unregistered user tries to post a message , a error message will pop up.

### Home (Index.html) Webpage

- This webpage shows all the tasks that can be done by users, and its details, if the user clicks on the Complete Task button,  a modal pops up for them to add Task Notes , if any.Then the points will be added to their balance.If they have a multiplier (from their planet level) , the points will be multiplied and added to the balance.If a unregistered user tries to complete a task, an error message will pop up

### Players Webpage

- This webpage shows all the existing users sorted by their lifetime points earned, a leaderboard system.If you click onto the users, it will direct you to the profile of the user you clicked.

### Shop Webpage

- This webpage shows all the items a user can buy ,with their details.If you click the buy button, they will be able to purchase the item and add it to their inventory. If the user does not have sufficient coins to buy the item or if they have not reached the planet level of the item, an error message will appear.If an unregistered user tries to purchase an item, an error message will appear.

### Minigames Webpage

-  Shows all the Games that can be played by a user , and shows the reward of each minigame.If an unregistered user tries to play a minigame, it will redirect them to the index.html

### Planets Webpage

- Shows all the planets available, and when clicked on , will show the items that can be collected in that planet .

### Profile Webpage

- Shows the profile of the user, with their planet level , lifetime points and rank.It also shows their inventory .Users are able to equip items.If the profile is a different user's profile, there will be a gift button which allows the user to gift an item to that user.

### Transaction History Webpage

- Shows the transaction history of the user, with the TransactionID, Note, Amount and Date.

### Task History Webpage

- Shows the task history of the user, with the TaskProgressID , Title, Points, Notes and Date.

### Trade History Webpage

- Shows trade history of the user, with the TradeId , Item Name, ReceiverID and Date.

### Register Webpage

- allows the user to enter a username, email and password to create a new account

### Login Webpage

- allows the user to login to their account with the username and password.

### Video Demo
https://youtu.be/okxEe8uuNxo 

https://youtu.be/g72db3QLGWM




