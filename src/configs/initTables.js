const pool = require("../services/db");

const SQLSTATEMENT=`
  DROP TABLE IF EXISTS User;

  DROP TABLE IF EXISTS TaskProgress;

  DROP TABLE IF EXISTS Task;

  DROP TABLE IF EXISTS Player;

  DROP TABLE IF EXISTS CoinTransactionHistory;

  DROP TABLE IF EXISTS Items;

  DROP TABLE IF EXISTS PlayerItems;

  DROP TABLE IF EXISTS Planets;

  DROP TABLE IF EXISTS TradeHistory;

  DROP TABLE IF EXISTS Minigames;

  DROP TABLE IF EXISTS PlayerPreset;
  
  DROP TABLE IF EXISTS Messages;

  CREATE TABLE User(
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username TEXT,
    email TEXT,
    password TEXT NOT NULL,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE TaskProgress(
    progress_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    task_id INT NOT NULL,
    completion_date TIMESTAMP,
    notes TEXT
  );

  CREATE TABLE Task(
    task_id INT PRIMARY KEY AUTO_INCREMENT,
    title TEXT,
    description TEXT,
    points INT
  );

  CREATE TABLE Player(
    player_id INT PRIMARY KEY AUTO_INCREMENT,
    planet_id INT NOT NULL,
    coins INT NOT NULL,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  
  CREATE TABLE CoinTransactionHistory(
    cointransfer_id INT PRIMARY KEY AUTO_INCREMENT,
    amount_transacted INT NOT NULL,
    transaction_note TEXT NOT NULL,
    player_id INT NOT NULL,
    transaction_datetime TIMESTAMP 
  );
  
  CREATE TABLE Items(
    item_id INT PRIMARY KEY AUTO_INCREMENT,
    item_name TEXT NOT NULL,
    cost INT NOT NULL,
    planet_id INT NOT NULL,
    rarity TEXT NOT NULL,
    power INT NOT NULL
  );
  
  CREATE TABLE PlayerItems (
    playeritem_id INT PRIMARY KEY AUTO_INCREMENT,
    player_id INT NOT NULL,
    item_id INT NOT NULL
  );
  
  CREATE TABLE Planets(
    planet_id INT PRIMARY KEY AUTO_INCREMENT,
    planet_name TEXT NOT NULL,
    multiplier INT NOT NULL
  );
  
  CREATE TABLE TradeHistory(
    trade_id INT PRIMARY KEY AUTO_INCREMENT,
    item_id INT NOT NULL,
    oldplayer_id INT NOT NULL,
    newplayer_id INT NOT NULL,
    trade_datetime TIMESTAMP
  );
  
  CREATE TABLE Minigames(
    game_id INT PRIMARY KEY AUTO_INCREMENT,
    game_name TEXT NOT NULL,
    itemwon_id INT NOT NULL,
    created_on TIMESTAMP
  );

  CREATE TABLE PlayerPreset(
    presetid INT PRIMARY KEY AUTO_INCREMENT,
    player_id INT NOT NULL,
    helmet INT NOT NULL, 
    top INT NOT NULL,
    bottom INT NOT NULL,
    boots INT NOT NULL,
    weapon INT NOT NULL
  );

  CREATE TABLE Messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    message_text TEXT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  INSERT INTO Task (title, description, points) VALUES
  ('Plant a Tree', 'Plant a tree in your neighbourhood or a designated green area.', 50),
  ('Use Public Transportation', 'Use public transportation or carpool instead of driving alone.', 30),
  ('Reduce Plastic Usage', 'Commit to using reusable bags and containers.', 40),
  ('Energy Conservation', 'Turn off lights and appliances when not in use.', 25),
  ('Composting', 'Start composting kitchen scraps to create natural fertilizer.', 35);
  
  INSERT INTO Items (item_name, cost, planet_id,rarity,power) VALUES
  ('Boots', 100, 1, 'Common', 25),
  ('Wooden Sword', 175, 1, 'Common', 40),
  ('Helmet', 245, 2, 'Rare', 55),
  ('Iron Sword', 305, 2, 'Rare', 75),
  ('Pants', 365, 3, 'Epic', 95),
  ('Diamond Sword',425, 3, 'Epic', 120),
  ('Chestplate', 515, 4, 'Legendary', 150),
  ('Crossbow', 605, 4, 'Legendary', 200);

  INSERT INTO Minigames (game_name, itemwon_id, created_on) VALUES
  ('Number Guessing', 2, '2023-07-30'),
  ('Guess the Door', 4, '2023-08-30'),
  ('Solve the Math Problem', 6, '2023-09-30'),
  ('Memory Game', 8, '2023-10-30');

  INSERT INTO Planets (planet_name , multiplier) VALUES
  ('Earth', 1),
  ('Nebula Nova', 2),
  ('Aurora Celestia', 3),
  ('Pyroclastia', 4);

  INSERT INTO Messages (message_text, user_id) VALUES
  ("Hello world!", 1),
  ("Hey!", 2),  
  ("Hello!", 3),
  ("How are you guys?", 1),
  ("Good!", 2),  
  ("Not Bad", 3),
  ("I love BED!", 1),
  ("me too!", 2),  
  ("same here!", 3),
  ("back to coding!", 1),
  ("Okay!", 2),  
  ("Exciting!", 3);

`;

pool.query(SQLSTATEMENT, (error, results, fields) => {
    if (error) {
      console.error("Error creating tables:", error);
    } else {
      console.log("Tables created successfully", results);
    }
    process.exit();
  });