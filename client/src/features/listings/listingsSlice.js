import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import { apiSlice } from "../api/apiSlice";

const listingsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = listingsAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getListings: builder.query({
      query: () => "/listings",
      transformResponse: (responseData) => {
        let min = 1;
        const loadedListings = responseData.map((listing) => {
          if (!listing?.date)
            listing.date = sub(new Date(), { minutes: min++ }).toISOString();
          return listing;
        });
        return listingsAdapter.setAll(initialState, loadedListings);
      },
      providesTags: (result, error, arg) => [
        { type: "Listing", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Listing", id })),
      ],
    }),
    getListingsByUserId: builder.query({
      query: (id) => `/listings/?userId=${id}`,
      transformResponse: (responseData) => {
        let min = 1;
        const loadedListings = responseData.map((listing) => {
          if (!listing?.date)
            listing.date = sub(new Date(), { minutes: min++ }).toISOString();

          return listing;
        });

        return listingsAdapter.setAll(initialState, loadedListings);
      },
      providesTags: (result, error, arg) => [
        ...result.ids.map((id) => ({ type: "Listing", id })),
      ],
    }),
    addNewListing: builder.mutation({
      query: (initialListing) => ({
        url: "/listings",
        method: "POST",
        body: {
          ...initialListing,
          userId: Number(initialListing.userId),
          date: new Date().toISOString(),
        },
      }),
      invalidatesTags: [{ type: "Listing", id: "LIST" }],
    }),
    updateListing: builder.mutation({
      query: (initialListing) => ({
        url: `/listings/${initialListing.id}`,
        method: "PUT",
        body: {
          ...initialListing,
          date: new Date().toISOString(),
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Listing", id: arg.id },
      ],
    }),
    deleteListing: builder.mutation({
      query: ({ id }) => ({
        url: `/listings/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Listing", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetListingsQuery,
  useGetListingsByUserIdQuery,
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
