import mongoose from "mongoose";
import Listing from "../models/listing.js";

export const getListings = async (req, res) => {
  try {
    const listings = await Listing.find();

    res.status(200).json(listings);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateListing = async (req, res) => {
  const { id: _id } = req.params;
  const listing = req.body;
  //check if the id is of Mongoose type
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No listing with that id");
  const updatedListing = await Listing.findByIdAndUpdate(_id, listing, {
    new: true,
  });
  res.json(updatedListing);
};

export const getListing = async (req, res) => {
  const { id } = req.params;

  try {
    const listing = await Listing.findById(id);

    res.status(200).json(listing);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createListing = async (req, res) => {
  const { title, body, selectedFile, author, tags } = req.body;

  const newListing = new Listing({ title, body, selectedFile, author, tags });

  try {
    await newListing.save();

    res.status(201).json(newListing);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
