import { Router } from "express";
import Announcement from "../models/announcements.js";
import validationMiddleware from "../middleware/validationMiddleware.js";
import userValidationMiddleware from "../middleware/validationMiddleware.js";
import User from "../models/user.js"
import multer from "multer";
import path from "path";
import announcements from "../models/announcements.js";


const router = Router();

//  multer for file uploads & multer configuration
const storage = multer.diskStorage({
  destination: function (request, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (request, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

//displays all announcements on homepage
router.get("/announcements", async (request, response) => {
  try {
    const allAnnouncements = await Announcement.find({}).sort({ date: -1 });
    response.send(allAnnouncements);
  } catch (err) {
    response.status(500).send({ message: err.message });
  }
});

// fetch a single annoucement based on ID
router.get("/announcements/:id", async (request, response)=>{
  try {
    const annoucement = await Announcement.findById(request.params.id);
    if(!annoucement){
      return response.status(404).send({message: "Announcement not found"})
    }
    response.send(annoucement)
  } catch (error) {
      response.status(500).send({message: error.message});
  }
});

router.post("/createannouncement", upload.fields([{name: "image"}, {name: "video"}]), async (request, response) => {
  try {
    const announcementData = {
      announcementTitle: request.body.announcementTitle,
      announcementContent: request.body.announcementContent,
      timestamp: request.body.timestamp,
    };

    if(request.files.image) {
      announcementData.image = request.files.image[0].filename;
    };

    if (request.files.video) {
      announcementData.video = request.files.video[0].filename;
    };


    const announcement = new Announcement(announcementData);
    await announcement.save();
    response.send({
      message: "Announcement was successfully posted.",
      announcement,
    });
  } catch (err) {
    response.status(500).send({
      message: err.message,
    });
  }
});


router.put("/announcement/:id", upload.fields([{name: "image"}, {name: "video"}]), async (request, response)=>{
    try {
      const announcementData = {
        announcementTitle: request.body.annoucementTitle,
        announcementContent: request.body.announcementContent,
        timestamp: request.body.timestamp,
      };

      if(request.files.image){
        announcementData.image = request.files.image[0].filename;
      };

      if(request.files.video) {
        announcementData.video = request.files.video[0].filename;
      };

      const announcement = await Announcement.findByIdAndUpdate(request.params.id, announcementData, {new: true});
      if(!announcement){
        return response.status(404).send({message: "Announcement not found"});
      }
      response.send({
        message: "Announcement was successfully updated.",
        announcement,
      });
    } catch (error) {
        response.status(500).send({
          message: error.message,
        });
    }
});


router.delete("/announcement/:_id", async(request, response)=>{
  try {
    const announcement = await Announcement.findByIdAndDelete(request.params._id);
    if(!announcement) {
      return response.status(404).send({message: "Announcement not found"});
    }
    response.send({message: "Announcement was successfully deleted."});
  } catch (error) {
    response.status(500).send({message: error.message});
  }
});
export default router;