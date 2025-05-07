import mongoose from "mongoose";
import User from "../models/auth.js";

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    const allUserDetails = [];
    allUsers.forEach((users) => {
      allUserDetails.push({
        _id: users._id,
        name: users.name,
        about: users.about,
        tags: users.tags,
        joinedOn: users.joinedOn,
        profileImage: users.profileImage,
      });
    });
    res.status(200).json(allUserDetails);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  const { id: _id } = req.params;
  const { name, about, tags } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("User unavailable...");
  }
  try {
    // (new: true) means updatedProfile will return the content after updation, not before updation
    const updatedProfile = await User.findByIdAndUpdate(
      _id,
      { $set: { name: name, about: about, tags: tags } },
      { new: true }
    );
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(405).json({ message: error.message });
  }
};

export const postImage = async (req, res) => {
  const { id: _id } = req.params;
  const { profileImage } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("User unavailable...");
  }
  try {
    const postedImage = await User.findByIdAndUpdate(
      _id,
      { $set: { profileImage: profileImage } },
      { new: true }
    );
    res.status(200).json(postedImage);
  } catch (error) {
    res.status(405).json({ message: error.message });
  }
};
