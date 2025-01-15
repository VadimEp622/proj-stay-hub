import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { wishlistStayService } from "../services/wishlist-stay.service";
import { showErrorMsg } from "../services/event-bus.service";

interface WishlistStayState {
  stays: any[];
  isLoadingStays: boolean;
}

// TODO: connect this to wishlist-stay API (make sure it works!)

const initialState: WishlistStayState = {
  stays: [],
  isLoadingStays: false,
};

// const wishlistSlice = createSlice({
//   name: "wishlistStay",
//   initialState,
//   reducers: {
//     wishlistStaySetIsLoadingStays(state, action: PayloadAction<boolean>) {
//       _updateIsLoadingStaysState(state, action.payload);
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loadWishlistStays.pending, (state) => {
//         _updateIsLoadingStaysState(state, true);
//       })
//       .addCase(
//         loadWishlistStays.fulfilled,
//         (state, action: PayloadAction<any[]>) => {
//           _updateStaysState(state, action.payload);
//           _updateIsLoadingStaysState(state, false);
//         }
//       )
//       .addCase(loadWishlistStays.rejected, (state, action) => {
//         _updateIsLoadingStaysState(state, false);
//         console.log("error - could not get wishlist stays", action.error);
//         showErrorMsg("Could not load wishlist stays");
//       });

//     builder
//       .addCase(
//         updateWishlistStay.fulfilled,
//         (state, action: PayloadAction<string>) => {
//           // TODO: need to think about this
//         }
//       )
//       .addCase(updateWishlistStay.rejected, (state, action) => {
//         console.log("error - could not update wishlist stay", action.error);
//         showErrorMsg("Could not update wishlist stay");
//       });
//   },
// });

// export const loadWishlistStays = createAsyncThunk(
//   "wishlistStay/loadWishlistStays",
//   async (userId: string) => {
//     const stays = await wishlistStayService.getStaysByUserId(userId);
//     console.log("async thunk loadWishlistStays -> stays", stays);
//     return stays;
//   }
// );

// export const updateWishlistStay = createAsyncThunk(
//   "wishlistStay/updateWishlistStay",
//   async ({ userId, stayId }: { userId: string; stayId: string }) => {
//     const result = await wishlistStayService.updateWishlistStay(userId, stayId);
//     console.log("async thunk updateWishlistStay -> result", result);
//     return stayId;
//   }
// );

// export const { wishlistStaySetIsLoadingStays } = wishlistSlice.actions;

// export default wishlistSlice.reducer;

// // ************ Local utility functions ************
// function _updateStaysState(state: WishlistStayState, stays: any[]) {
//   state.stays = stays;
// }

// function _updateIsLoadingStaysState(
//   state: WishlistStayState,
//   isLoadingStays: boolean
// ) {
//   state.isLoadingStays = isLoadingStays;
// }
