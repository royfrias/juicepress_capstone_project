import { Schema, model } from "mongoose";

const announcementSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: String,
  },
  announcementTitle: {
    type: String,
  },
  announcementContent: {
    type: String,
  },
  image: {
    type: String
  },
  video: {
    type: String
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  AWSLink: {
    type: String
  }
});

export default model("Announcement", announcementSchema);
