import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

const URL = "https://jsonplaceholder.typicode.com/posts";

const listingsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = listingsAdapter.getInitialState({
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
});

export const fetchListings = createAsyncThunk(
  "listings/fetchListings",
  async () => {
    //   const response = await axios.get(URL);
    //   return response.data;
    try {
      const response = await axios.get(URL);
      return response.data;
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
      prepare(title, body, id, author, selectedFile, tags) {
        return {
          payload: {
            id,
            title,
            body,
            date: new Date().toISOString(),
            tags,
            selectedFile,
            author,
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
        let min = 1;
        const loadedListings = action.payload.map((listing) => {
          listing.date = sub(new Date(), { minutes: min++ }).toISOString();

          return listing;
        });

        // Add any fetched listings to the array
        listingsAdapter.upsertMany(state, loadedListings);
        // state.listings = state.listings.concat(loadedListings);
      })
      .addCase(fetchListings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewListing.fulfilled, (state, action) => {
        // Fix for API post IDs:
        // Creating sortedPosts & assigning the id
        // would be not be needed if the fake API
        // returned accurate new post IDs
        const sortedListings = state.listings.sort((a, b) => {
          if (a.id > b.id) return 1;
          if (a.id < b.id) return -1;
          return 0;
        });
        action.payload.id = sortedListings[sortedListings.length - 1].id + 1;
        // End fix for fake API post IDs

        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();

        console.log(action.payload);
        // state.listings.push(action.payload);
        listingsAdapter.addOne(state, action.payload);
      })

      .addCase(updateListing.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Update could not complete");
          console.log(action.payload);
          return;
        }
        // const { id } = action.payload;
        action.payload.date = new Date().toISOString();

        // const listings = state.listings.filter((listing) => listing.id !== id);
        // state.listings = [...listings, action.payload];
        listingsAdapter.upsertOne(state, action.payload);
      })
      .addCase(deleteListing.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Delete could not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        // const listings = state.listings.filter((listing) => listing.id !== id);
        // state.listings = listings;
        listingsAdapter.removeOne(state, id);
      });
  },
});

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllListings,
  selectById: selectListingById,
  selectIds: selectListingIds,
  // Pass in a selector that returns the posts slice of state
} = listingsAdapter.getSelectors((state) => state.listings);

// export const selectAllListings = (state) => state.listings.listings;
export const getListingsStatus = (state) => state.listings.status;
export const getListingsError = (state) => state.listings.error;

// export const selectListingById = (state, listingId) =>
//   state.listings.listings.find((listing) => listing.id === listingId);

export const selectListingsByUser = createSelector(
  [selectAllListings, (state, userId) => userId],
  (listings, userId) => listings.filter((listing) => listing.userId === userId)
);

export const { listingAdded } = listingsSlice.actions;

export default listingsSlice.reducer;
