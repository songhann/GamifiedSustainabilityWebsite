const model = require("../models/userModel.js");

// get users if number of coins is null
module.exports.getUserIfNull = (req, res, next) => {
    
    const data = {
        userid: req.params.user_id
    }

    const callback = (error, results, fields) => { 
        if (error) {
            console.error("Error getUserIfNull:", error);
            res.status(500).json(error);
        } else {
            if (results.length === 0) { 
                res.status(404).json({ message: 'User does not exist' })
            } else {
                results[0].total_points = "0"
                res.status(200).json(results[0])
            }
        }
    }

    model.getUserIfNull(data, callback);
}

// controller to check if email is associated
module.exports.checkEmail = (req, res, next) => {

    if(req.body.email == undefined)
    {
        res.status(400).send("Error: Email is undefined");
        return;
    }

    const data = {
        email: req.body.email
        
    }

    const callback = (error, results, fields) => { 
        if (error) {
            console.error("Error checkEmail:", error);
            res.status(500).json(error);
        } else {
            if(results.length>0 && results[0].user_id != req.params.user_id){
                res.status(409).json({"message": "the provided email is already associated with another user"})
            } else next();
        }
    }

    model.checkEmail(data, callback);
}

// controller to check if username is already associated
module.exports.checkUsername = (req, res, next) => {

    if(req.body.username == undefined)
    {
        res.status(400).send("Error: Username is undefined");
        return;
    }

    const data = {
        username: req.body.username
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkUsername:", error);
            res.status(500).json(error);
        } else {
            if(results.length>0 && results[0].user_id != req.params.user_id){
                res.status(409).json({"message": "the provided username is already associated with another email"})
            } else next();
        }
    }

    model.checkUsername(data, callback);
}

// gets all users
module.exports.readAllUsers = (req, res, next) => {

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllUsers:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }

    model.selectAllUsers(callback);
}

// gets users by userID
module.exports.readUserbyId = (req, res, next) => {

    if(req.params.user_id == undefined){
        res.status(400).send("Error: user ID is undefined");
        return;
    }
    const data = {
        userid: req.params.user_id,
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readUserbyId:", error);
            res.status(500).json(error);
        } else {
            if (results.length === 0) {
                res.status(404).json({ message: 'User does not exist' })
            } else {
                res.status(200).json(results[0]);
            }
        }
    }
    
    model.selectUserbyId(data, callback);
}

// updates user by userID
module.exports.modifyUser = (req, res, next) => {

    if(req.params.user_id == undefined)
    {
        res.status(400).json({
            message: "Error: user ID is undefined"
        });
        return;
    }

    const data = { 
        userid: req.params.user_id,
        username: req.body.username,
        email: req.body.email
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error modifyUser:", error);
            res.status(500).json(error);
        } else {
            if(results[0].affectedRows == 0) 
            {
                res.status(404).json({
                    message: "User not found"
                });
            }
            else res.status(200).send(results[1][0]);
        }
    }

    model.updateUserById(data, callback);
}

// deletes user by userID
module.exports.deleteUser = (req, res, next) => {

    if(req.params.user_id == undefined){
        res.status(400).json({
            message : "Error: User is undefined"
        });
        return;
    }

    const data = {
        userid : req.params.user_id
    }

    const callback = (error, results, fields) => {
        if(error){
            console.error("Error deleteUser:", error);
            res.status(500).json(error);
        } else {
            if(results[0].affectedRows == 0){
                res.status(404).json({
                    message: "User not found"
                });
            }
            else res.status(204).send();
        }
    }

    model.deleteUserbyId(data, callback);
}

// check if userID exists
module.exports.checkUserId = (req, res, next) =>{

    if(req.body.user_id == undefined)
    {
        res.status(400).send("Error: User is undefined");
        return;
    }

    const data = {
        userid: req.body.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkUserId:", error);
            res.status(500).json(error);
        } else {
            if(results.length==0){
                res.status(404).json({"message": "User ID does not exist"})
            }
            else next();
        }
    }
    
    model.checkUserId(data, callback);
}

// checks if user password entered is correct
module.exports.login = (req, res, next) => {
    if (req.body.password == undefined) {
        res.status(400).send("Error: Password is undefined");
        return;
    }
    if (req.body.username == undefined) {
        res.status(400).send("Error: Username is undefined");
        return;
    }
    const data = {
        username: req.body.username
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error login:", error);
            res.status(500).json(error);
        } else if(results.length == 0) {
            res.status(404).send({"message" : "User not found"});
        }else {
            res.locals.hash = results[0].password;
            res.locals.userId = results[0].user_id;
            next();
        }
    }
    model.getUserbyUsername(data, callback);
}

//////////////////////////////////////////////////////
// CONTROLLER FOR REGISTER
//////////////////////////////////////////////////////
module.exports.register = (req, res, next) => {
    const data = {
        hash: res.locals.hash,
        username: req.body.username,
        email: req.body.email
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error register:", error);
            res.status(500).json(error);
        } else {
            res.locals.userId = results[1][0].user_id;
            res.locals.message = `User ${data.username} created successfully.`;
            next();
        }
    }
    model.insertSingle(data, callback);
}

//////////////////////////////////////////////////////
// MIDDLEWARE FOR CHECK IF USERNAME OR EMAIL EXISTS
//////////////////////////////////////////////////////
module.exports.checkUsernameOrEmailExist = (req, res, next) => {
    if (req.body.email == undefined) {
        res.status(400).send("Error: Email is undefined");
        return;
    }
    if (req.body.username == undefined) {
        res.status(400).send("Error: Username is undefined");
        return;
    }

    const data = {
        username: req.body.username,
        email: req.body.email
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkUsernameOrEmailExist:", error);
            res.status(500).json(error);
        } else {
            if (results.length > 0) {
                res.status(409).json({ "message": "Username or email already exists" })
            } else next();
        }
    }
    model.checkUsernameOrEmailExist(data, callback);
}

// get all users sorted by total points 
module.exports.getSortedUsers = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getSortedUsers:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }

    model.getSortedUsers(callback);
}