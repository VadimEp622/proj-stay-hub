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
  reqStatusLoadStays: RequestStatus;
  reqIdLoadStays: null | string;
}

// TODO: add event-bus success/error for relevant reqStatuses

const initialState: WishlistStayState = {
  stays: [],
  reqStatusLoadStays: RequestStatus.IDLE,
  reqIdLoadStays: null,
};

const wishlistStaySlice = createSlice({
  name: "wishlistStay",
  initialState,
  reducers: {
    wishlistStayUpdateReqStatusLoadStays(
      state,
      action: PayloadAction<RequestStatus>
    ) {
      _updateReqStatusLoadStays(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadWishlistStays.pending, (state, action) => {
        _updateReqStatusLoadStays(state, RequestStatus.PENDING);
        _resetStays(state);
        _updateReqIdLoadStays(state, action.meta.requestId);
      })
      .addCase(loadWishlistStays.fulfilled, (state, action) => {
        if (state.reqIdLoadStays !== action.meta.requestId) return;
        _updateReqStatusLoadStays(state, RequestStatus.SUCCEEDED);
        _setStays(state, action.payload);
        _updateReqIdLoadStays(state, null);
      })
      .addCase(loadWishlistStays.rejected, (state, action) => {
        _updateReqStatusLoadStays(state, RequestStatus.FAILED);
        _updateReqIdLoadStays(state, null);

        console.log("error - could not get wishlist stays", action.error);
        showErrorMsg("Could not load wishlist stays");
      });

    builder
      .addCase(
        toggleWishlistStay.fulfilled,
        (state, action: PayloadAction<any>) => {
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

export const { wishlistStayUpdateReqStatusLoadStays } =
  wishlistStaySlice.actions;

export default wishlistStaySlice.reducer;

// **************************************************************
// **************** Local utility functions *********************
// **************************************************************

// ------------------------- Request Status -------------------------
function _updateReqStatusLoadStays(
  state: WishlistStayState,
  reqStatusLoadStays: RequestStatus
) {
  state.reqStatusLoadStays = reqStatusLoadStays;
}

// ------------------------- Request Id -------------------------
function _updateReqIdLoadStays(state: WishlistStayState, reqId: string | null) {
  state.reqIdLoadStays = reqId;
}

// ------------------------- Stays Array -------------------------
function _resetStays(state: WishlistStayState) {
  state.stays = [];
}

function _setStays(state: WishlistStayState, stays: any[]) {
  state.stays = [...stays];
}

// function _addToStays(state: WishlistStayState, stays: any[]) {
//   state.stays = [...state.stays, ...stays];
// }

// ------------------------- Other -------------------------
