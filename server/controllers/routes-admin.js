import { Router, request } from "express";
import Admin from "../models/admin.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
// import validationMiddleware from "../middleware/validationMiddleware.js";
import adminValidationMiddleware from "../middleware/adminValidationMiddleware.js";

const router = Router();

//checks to see if user exists and if not adds new user to database
router.post("/adminSignup", async (request, response) => {
  try {
    // Check if the admin already exists in the database
    const AdminExists = await Admin.exists({
      $or: [
        { employeeID: request.body.employeeID },
        { email: request.body.email },
      ],
    });

    if (AdminExists) {
      return response.status(409).json({ message: "Admin already exists!" });
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash(request.body.password, 10);

    // Create a new admin
    const admin = new Admin({
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      password: hashedPassword,
      employeeID: request.body.employeeID,
      email: request.body.email,
    });

    // Save the new admin to the database
    await admin.save();

    // Generate a JWT token for the admin
    const tokenAdmin = jwt.sign({ id: admin._id }, process.env.SECRET_KEY);

    response.status(201).json({
      message: "Admin successfully added!",
      tokenAdmin,
      admin,
    });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

// log user in and verify token
router.post("/adminLogin", async (request, response) => {
  try {
    // Find the admin by employeeID and email
    const admin = await Admin.findOne({
      employeeID: request.body.employeeID,
      email: request.body.email,
    });

    // If the admin is found and the password matches
    if (
      admin &&
      (await bcryptjs.compare(request.body.password, admin.password))
    ) {
      // Generate a JWT token for the admin
      const tokenAdmin = jwt.sign({ id: admin._id }, process.env.SECRET_KEY);

      response.status(200).json({
        message: "Login successful",
        tokenAdmin,
      });
    } else {
      // If the login credentials are invalid
      response.status(401).json({
        message: "Invalid employee ID, email, or password",
      });
    }
  } catch (err) {
    response.status(500).json({ message: err.message });
  }
});

//displaying admin username and admin pic on home pg after user logs in
router.get("/adminUsername", adminValidationMiddleware, (request, response) => {
  try {
    response.status(200).json(request.admin);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

export default router;
