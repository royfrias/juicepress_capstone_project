import { Router, request } from "express";
import User from "../models/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import userValidationMiddleware from "../middleware/validationMiddleware.js";
// import validationMiddleware from "../middleware/validationMiddleware.js";

const router = Router();

//checks to see if user exists and if not adds new user to database
router.post("/signup", async (request, response) => {
  try {
    //checking if user exists in database
    const UserExists = await User.exists({
      employeeID: request.body.employeeID
    })

    //user does not exist in database, create new user
    if (UserExists === null) {

      //created variable for hashing password
      const hashedPassword = await bcryptjs.hash(request.body.password, 10);

      const user = new User({
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        password: hashedPassword,
        employeeID: request.body.employeeID

      });


      //save new user to database
      await user.save();

      //allowing user to access chat server
      const token = jwt.sign({ id: user._id },
        process.env.SECRET_KEY);

      response.send({
        message: "User Successfully added!",
        token,
        user
      });
    } else {
      response.send("User already taken!");
    }
  } catch (error) {
    response.send(error.message);
  }
});



// log user in and verify token
router.post("/login", async (request, response) => {
  try {
    const user = await User.findOne({
      employeeID: request.body.employeeID
    });

    if (user && await bcryptjs.compare(request.body.password, user.password)) {
      // User not found
      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
      response.send({
        message: "Success",
        token
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

//displaying username and user pic on home pg after user logs in
router.get("/username", userValidationMiddleware, (request, response) => {
  try {

    response.send(request.user)

  } catch (error) {
    response.status(500).send({ message: err.message })
  }
});

export default router;