import { Router, request } from "express";
import Admin from "../models/admin.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
// import validationMiddleware from "../middleware/validationMiddleware.js";
import adminValidationMiddleware from "../middleware/adminValidationMiddleware.js"

const router = Router();

//checks to see if user exists and if not adds new user to database
router.post("/adminSignup", async (request, response) => {
    try {
        //checking if user exists in database
        const AdminExists = await Admin.exists({
            employeeID: request.body.employeeID,
            email: request.body.email
        })

        //user does not exist in database, create new user
        if (AdminExists === null) {

            //created variable for hashing password
            const hashedPassword = await bcryptjs.hash(request.body.password, 10);

            const admin = new Admin({
                firstName: request.body.firstName,
                lastName: request.body.lastName,
                password: hashedPassword,
                employeeID: request.body.employeeID,
                email: request.body.email
            });


            //save new user to database
            await admin.save();

            //allowing user to access chat server
            const tokenAdmin = jwt.sign({ id: admin._id },
                process.env.SECRET_KEY);

            //TODO: const tokenAdmin

            response.send({
                message: "Admin Successfully added!",
                tokenAdmin,
                admin
            });
        } else {
            response.send("Admin already taken!");
        }
    } catch (error) {
        response.send(error.message);
    }
});



// log user in and verify token
router.post("/adminLogin", async (request, response) => {
  try {
    const admin = await Admin.findOne({ 
        employeeID: request.body.employeeID,
        email: request.body.email
     });

    if (admin && await bcryptjs.compare(request.body.password, admin.password) ) {
      // User not found
      const tokenAdmin = jwt.sign({ id: admin._id }, process.env.SECRET_KEY);
      //TODO: const tokenAdmin
      response.send({
        message: "Success",
        tokenAdmin
      });
    } else {
        response.status(401).send({
        message: "Invalid username or password"
     })
    }
  } catch (err) {
    response.status(500).send({ message: err.message });
  }
});

//displaying admin username and admin pic on home pg after user logs in
router.get("/adminUsername", adminValidationMiddleware, (request, response) => {
  try {

    response.send(request.admin)

  } catch (error) {
    response.status(500).send({ message: err.message })
  }
});
export default router;