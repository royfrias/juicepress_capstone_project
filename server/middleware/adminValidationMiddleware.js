import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";

export default async function adminValidationMiddleware(request, response, next) {
    
    try {
        const tokenAdmin = request.headers.authorization;
        if (!tokenAdmin) {
            return response.status(401).json({error: `No authentication token provided` }); 
        }
    
        // verify token via secret key 
        const decryptedToken = jwt.verify(tokenAdmin, process.env.SECRET_KEY); 
console.log(decryptedToken.id)
        // Getting admin from ID that was in JWT
        const admin = await Admin.findById(decryptedToken.id);
        if (!admin) { // If admin not found throw error 
            throw new Error("Admin not found");
        }

        // Attaching admin object to the request 
        request.admin = admin;
        next();
    } catch (error) {
        // Error handler
        return response.status(401).json({ error: "Unauthorized" });
    }
}
    