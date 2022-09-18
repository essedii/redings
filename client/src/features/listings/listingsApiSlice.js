import { apiSlice } from "../../app/api/apiSlice";

export const listingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getListings: builder.query({
      query: () => "/listings",
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
    editListing: builder.mutation({
      query: (initialListing) => ({
        url: `/listings/${initialListing._id}`,
        method: "PATCH",
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
  useEditListingMutation,
  useDeleteListingMutation,
} = listingApiSlice;
