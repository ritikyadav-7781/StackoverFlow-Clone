//models are abstraction of data in mongoDB database; bluprint of how you want the added data to look and behave
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  about: { type: String },
  tags: { type: [String] },
  joinedOn: { type: Date, default: Date.now },
  profileImage: { type: String },
});

export default mongoose.model("User", userSchema);
