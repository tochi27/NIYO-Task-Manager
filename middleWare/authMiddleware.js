const asynchandler = require("express-async-handler");
const User = require("../models/userModel");
const Token = require("../models/tokenModel");
const jwt = require("jsonwebtoken");
const { respondsSender } = require('./responseHandler');
const { ResponseCode } = require('../utils/responseCode');

    const protect = asynchandler(async(req, res, next) =>{
        const authHeader = req.headers.authorization;
       
        // Check if authorization header is missing
        if (!authHeader) {
            respondsSender(null, "Authorization header missing please login", ResponseCode.unAuthorized, res); 
        }
    
        try {

                //splite Bearer away from header
                const bearerToken = authHeader.split(' ')[1];
                // Check if token exists in the database 
                const tokens = await Token.find({token:bearerToken});
               
                if (tokens.length === 0) {
                    respondsSender(null, "Not authorized, Please login: Bad Token", ResponseCode.invalidToken, res); 
                }

            // Verify token using jwt.verify
            jwt.verify(bearerToken, process.env.JWT_SECRET, (err, decodedToken) => {
                if (err) {
                    respondsSender(null, "Invalid token", ResponseCode.invalidToken, res); 
                } else {
                    //save this found user to req id so as to use it in next stage if need be
                    req.userId= tokens[0].userId;
                    //change login status true here
                    req.loginStatus=true;
                    req.usertoken = decodedToken; // Attach decoded user data to the request object
                    next(); // Proceed to the next middleware or route handler
                }
            });
        
        } catch (error) {
            respondsSender(null, "Not authorized, Please login"+error, ResponseCode.unAuthorized, res); 
        }
    });

    module.exports = protect