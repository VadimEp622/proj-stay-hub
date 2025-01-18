import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { wishlistStayService } from "../services/wishlist-stay.service";
import { showErrorMsg } from "../services/event-bus.service";

enum RequestStatus {
  IDLE = "idle",
  PENDING = "pending",
  SUCCEEDED = "succeeded",
  FAILED = "failed",
}

interface WishlistStayState {
  stays: any[];
  reqStatusGetStays: RequestStatus;
}

// TODO: connect this to wishlist-stay API (make sure it works!)

// INFO: getting wishlist stays to store WORKS ✔
// INFO: connect toggle wishlist to app  ✔
// TODO: make whole app function using the wishlist-stay API and wishlist-stay DB collection

const initialState: WishlistStayState = {
  stays: [],
  reqStatusGetStays: RequestStatus.IDLE,
};

const wishlistStaySlice = createSlice({
  name: "wishlistStay",
  initialState,
  reducers: {
    wishlistStaySetIsLoadingStays(state, action: PayloadAction<RequestStatus>) {
      _updateReqStatusGetStays(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadWishlistStays.pending, (state) => {
        state.stays = [];
        _updateReqStatusGetStays(state, RequestStatus.PENDING);
      })
      .addCase(
        loadWishlistStays.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          _updateStaysState(state, action.payload);
          _updateReqStatusGetStays(state, RequestStatus.SUCCEEDED);
        }
      )
      .addCase(loadWishlistStays.rejected, (state, action) => {
        _updateReqStatusGetStays(state, RequestStatus.FAILED);
        console.log("error - could not get wishlist stays", action.error);
        showErrorMsg("Could not load wishlist stays");
      });

    builder
      .addCase(
        toggleWishlistStay.fulfilled,
        (state, action: PayloadAction<any>) => {
          // TODO: need to think about this
          // INFO: many slice reducers can independently respond to the same action type (including actions generated by a createAsyncThunk!!)
          // INFO: here, we need to know if wishlist action in the backend, was "create" or "delete", so we can update the state accordingly
          if (action.payload.actionType === "delete") {
            state.stays = state.stays.filter(
              (stay) => stay._id !== action.payload.stayId
            );
          }
        }
      )
      .addCase(toggleWishlistStay.rejected, (state, action) => {
        console.log("error - could not update wishlist stay", action.error);
        showErrorMsg("Could not update wishlist stay");
      });
  },
});

export const loadWishlistStays = createAsyncThunk(
  "wishlistStay/loadWishlistStays",
  async () => {
    const stays = await wishlistStayService.queryWishlistStays();
    return stays;
  }
);

export const toggleWishlistStay = createAsyncThunk(
  "wishlistStay/toggleWishlistStay",
  async ({ stayId }: { stayId: string }) => {
    const result = await wishlistStayService.toggleWishlistStay(stayId);
    const { actionType } = result;
    return { actionType, stayId };
  }
);

export const { wishlistStaySetIsLoadingStays } = wishlistStaySlice.actions;

export default wishlistStaySlice.reducer;

// ************ Local utility functions ************
function _updateStaysState(state: WishlistStayState, stays: any[]) {
  state.stays = [...stays];
}

function _updateReqStatusGetStays(
  state: WishlistStayState,
  reqStatusGetStays: RequestStatus
) {
  state.reqStatusGetStays = reqStatusGetStays;
}
