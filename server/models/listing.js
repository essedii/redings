import mongoose from "mongoose";

const listingSchema = mongoose.Schema({
  title: String,
  body: String,
  author: String,
  tags: [String],
  selectedFile: String,
});

var Listing = mongoose.model("Listing", listingSchema);

export default Listing;
