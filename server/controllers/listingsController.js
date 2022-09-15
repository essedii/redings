const mongoose = require("mongoose");
const Listing = require("../model/Listing");

exports.getListings = async (req, res) => {
  try {
    const allListings = await Listing.find();

    res.status(200).json(allListings);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getListing = async (req, res) => {
  const { id } = req.params;

  try {
    const listing = await Listing.findById(id);

    res.status(200).json(listing);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.create = async (req, res) => {
  const listing = req.body;

  const newListing = new Listing(listing);

  try {
    await newListing.save();

    res.status(200).json(newListing);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No listing with id: ${id}`);

  const updatedListing = { title, body };

  await Listing.findByIdAndUpdate(id, updatedListing, { new: true });

  res.json(updatedListing);
};

exports._delete = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No listing with id: ${id}`);

  await Listing.findByIdAndRemove(id);

  res.json("Listing deleted successfully.");
};