import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const URL = "http://localhost:4000/listings";

const initialState = {
  listings: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchListings = createAsyncThunk(
  "listings/fetchListings",
  async () => {
    //   const response = await axios.get(URL);
    //   return response.data;
    try {
      const response = await axios.get(URL);
      return [...response.data];
    } catch (err) {
      return err.message;
    }
  }
);

export const addNewListing = createAsyncThunk(
  "listings/addNewListing",
  async (initialListing) => {
    const response = await axios.post(URL, initialListing);
    return response.data;
  }
);

export const updateListing = createAsyncThunk(
  "listings/updateListing",
  async (initialListing) => {
    const { id } = initialListing;
    try {
      const response = await axios.put(`${URL}/${id}`, initialListing);
      return response.data;
    } catch (err) {
      return initialListing;
    }
  }
);

export const deleteListing = createAsyncThunk(
  "listings/deleteListing",
  async (initialListing) => {
    const { id } = initialListing;
    try {
      const response = await axios.delete(`${URL}/${id}`);
      if (response?.status === 200) return initialListing;
      return `${response?.status}: ${response?.statusText}`;
    } catch (err) {
      return err.message;
    }
  }
);

const listingsSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {
    listingAdded: {
      reducer(state, action) {
        state.listings.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
          },
        };
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchListings.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchListings.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched posts to the array
        state.listings = state.listings.concat(action.payload);
      })
      .addCase(fetchListings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewListing.fulfilled, (state, action) => {
        state.listings.push(action.payload);
      })

      .addCase(updateListing.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Update could not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        const posts = state.listings.filter((listing) => listing.id !== id);
        state.posts = [...posts, action.payload];
      })
      .addCase(deleteListing.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Delete could not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        const posts = state.posts.filter((post) => post.id !== id);
        state.posts = posts;
      });
  },
});

export const selectAllListings = (state) => state.listings.listings;
export const getListingsStatus = (state) => state.listings.status;
export const getListingsError = (state) => state.listings.error;

export const selectListingById = (state, listingId) =>
  state.listings.listings.find((listing) => listing.id === listingId);

export const { listingAdded } = listingsSlice.actions;

export default listingsSlice.reducer;
