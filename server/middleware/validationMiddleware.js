import jwt from "jsonwebtoken";
import User from "../models/user.js";

export default async function userValidationMiddleware(request, response, next) {
    try {
        const token = request.headers.authorization;
        if (!token) {
            return response.status(401).json({error: `No authentication token provided` }); 
        }
    
        // verify token via secret key 
        const decryptedToken = jwt.verify(token, process.env.SECRET_KEY); 

        // Getting user from ID that was in JWT
        const user = await User.findById(decryptedToken.id);
        if (!user) { // If user not found throw error 
            throw new Error("User not found");
        }

        // Attaching user object to the request 
        request.user = user;
        next();
    } catch (error) {
        // Error handler
        return response.status(401).json({ error: "Unauthorized" });
    }
}
    