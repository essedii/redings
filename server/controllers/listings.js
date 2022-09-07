import Listing from "../models/listing.js";

export const getListings = async (req, res) => {
  try {
    const listings = await Listing.find();

    res.status(200).json(listings);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
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
  const listing = req.body;

  const newListing = new Listing(newListing);

  try {
    await newListing.save();

    res.status(200).json(newListing);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
