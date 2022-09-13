import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import { apiSlice } from "../api/apiSlice";

const listingsAdapter = createEntityAdapter({
  selectId: (listing) => listing._id,
});

const initialState = listingsAdapter.getInitialState({});

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getListings: builder.query({
      query: () => "/listings",
      transformResponse: (responseData) => {
        let min = 1;
        const loadedListings = responseData.map((listing) => {
          if (!listing?.createdAt)
            listing.createdAt = sub(new Date(), {
              minutes: min++,
            }).toISOString();

          return listing;
        });
        console.log(initialState);
        console.log("loadedListings", loadedListings);
        console.log("listingsAdapter", listingsAdapter);
        return listingsAdapter.setAll(initialState, loadedListings);
      },
    }),
    getListing: builder.query({
      query: (listingId) => `/listings/${listingId}`,
    }),
    addNewListing: builder.mutation({
      query: (initialListing) => ({
        url: "/listings/create",
        method: "POST",
        body: initialListing,
      }),
    }),
    updateListing: builder.mutation({
      query: (initialListing) => ({
        url: `/listings/${initialListing._id}`,
        method: "PUT",
        body: initialListing,
      }),
    }),
    deleteListing: builder.mutation({
      query: ({ id }) => ({
        url: `/listings/${id}`,
        method: "DELETE",
        body: { id },
      }),
    }),
  }),
});

//Hooks
export const {
  useGetListingsQuery,
  useGetListingQuery,
  useAddNewListingMutation,
  useUpdateListingMutation,
  useDeleteListingMutation,
} = extendedApiSlice;

// returns the ENTIRE query result object
export const selectListingsResult =
  extendedApiSlice.endpoints.getListings.select();

// Creates memoized selector
const selectListingsData = createSelector(
  selectListingsResult,
  (listingsResult) => listingsResult.data // normalized state object with ids & entities
);
export const {
  selectAll: selectAllListings,
  selectById: selectListingById,
  selectIds: selectListingIds,
  // Pass in a selector that returns the listings slice of state
} = listingsAdapter.getSelectors(
  (state) => selectListingsData(state) ?? initialState
);
