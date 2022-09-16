const mongoose = require("mongoose");
const Listing = require("../model/Listing");

const getListings = async (req, res) => {
  try {
    const allListings = await Listing.find();

    res.status(200).json(allListings);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getListing = async (req, res) => {
  const { id } = req.params;

  try {
    const listing = await Listing.findById(id);

    res.status(200).json(listing);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createListing = async (req, res) => {
  const listing = req.body;

  const newListing = new Listing(listing);

  try {
    await newListing.save();

    res.status(200).json(newListing);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const updateListing = async (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No listing with id: ${id}`);

  const updatedListing = { title, body };

  await Listing.findByIdAndUpdate(id, updatedListing, { new: true });

  res.json(updatedListing);
};

const deleteListing= async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No listing with id: ${id}`);

  await Listing.findByIdAndRemove(id);

  res.json("Listing deleted successfully.");
};


module.exports = {
  createListing,
  updateListing,
  deleteListing,
  getListing,
  getListings
}