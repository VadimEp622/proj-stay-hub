import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { stayService } from "../services/stay.service";
import { showErrorMsg } from "../services/event-bus.service";
import { toggleWishlistStay } from "./wishlist-stay.slice";
import { wishlistStayService } from "../services/wishlist-stay.service";
import { RootState } from "./store";

enum RequestStatus {
  IDLE = "idle",
  PENDING = "pending",
  SUCCEEDED = "succeeded",
  FAILED = "failed",
}

interface Guests {
  adults: number;
  children: number;
  infants: number;
  pets: number;
}

interface FilterBy {
  where: string;
  from: null | number;
  to: null | number;
  capacity: number;
  guests: Guests;
  label: string;
}

interface ApiWishlistFilterBy {
  isalluntilpage: boolean;
}

interface ApiFilterBy {
  where: string;
  from: "" | number;
  to: "" | number;
  capacity: number;
  label: string;
  page: number;
}

interface StayState {
  stays: any[];
  stay: any;
  wishlistIds: any[];
  filterBy: null | FilterBy;
  isSetParamsToFilterBy: boolean;
  page: number;
  isFinalPage: boolean;
  reqStatusLoadStay: RequestStatus;
  reqStatusLoadStays: RequestStatus;
  reqStatusLoadWishlistId: RequestStatus;
  reqStatusLoadWishlistIds: RequestStatus;
  reqIdLoadStays: null | string;
}

// TODO: add event-bus success/error for relevant reqStatuses

// TODO: fix to make it work with React <StrictMode>:
//   * ✔ stay-index
//   * ✔ stay-detail
//   * user-trips
//   * user-wishlist
//   * final check for all possible API actions, that everything works in  <StrictMode> as intented

// TODO: Research using redux thunks requestId's, to prevent duplicate requests, and make sure only LATEST request is executed (required for this home-pages loadStays logic)
//          Use this link (https://redux-toolkit.js.org/api/createAsyncThunk#examples).
//          Use it to prevent a scenario where user changed to label #2, and then quickly to label #3, which with the current structure,
//          the two requests will be executed in parrallel, and race each other to update the store state.

const initialState: StayState = {
  stays: [],
  stay: null,
  wishlistIds: [],
  filterBy: null,
  isSetParamsToFilterBy: false, // protection layer -> basically, before store filterBy is ready, don't fetch stays.
  page: 0, // current page of rendered staylist
  isFinalPage: false,
  reqStatusLoadStay: RequestStatus.IDLE,
  reqStatusLoadStays: RequestStatus.IDLE,
  reqStatusLoadWishlistId: RequestStatus.IDLE,
  reqStatusLoadWishlistIds: RequestStatus.IDLE,
  reqIdLoadStays: null,
};

const staySlice = createSlice({
  name: "stay",
  initialState,
  reducers: {
    stayUpdateFilterBy: (state, action: PayloadAction<FilterBy>) => {
      _updateFilterBy(state, action.payload);
    },

    stayResetFilterBy: (state) => {
      _resetFilterBy(state);
    },

    stayResetPageNum: (state) => {
      state.page = 0;
    },

    stayUpdateIsFinalPage: (state, action: PayloadAction<boolean>) => {
      state.isFinalPage = action.payload;
    },

    stayResetWishlistIds: (state) => {
      state.wishlistIds = [];
    },

    stayResetLoadStays: (state) => {
      _resetLoadStays(state);
    },

    stayUpdateReqStatusLoadStay: (
      state,
      action: PayloadAction<RequestStatus>
    ) => {
      _updateReqStatusLoadStay(state, action.payload);
    },

    stayUpdateReqStatusLoadStays: (
      state,
      action: PayloadAction<RequestStatus>
    ) => {
      _updateReqStatusLoadStays(state, action.payload);
    },

    stayUpdateReqStatusLoadWishlistId: (
      state,
      action: PayloadAction<RequestStatus>
    ) => {
      _updateReqStatusLoadWishlistId(state, action.payload);
    },

    stayUpdateReqStatusLoadWishlistIds: (
      state,
      action: PayloadAction<RequestStatus>
    ) => {
      _updateReqStatusLoadWishlistIds(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    // loadStays
    builder
      .addCase(loadStays.pending, (state, action) => {
        if (action.meta.arg.isFirstBatch) _resetLoadStays(state);
        _updateReqStatusLoadStays(state, RequestStatus.PENDING);
        state.reqIdLoadStays = action.meta.requestId;
      })
      .addCase(loadStays.fulfilled, (state, action) => {
        if (state.reqIdLoadStays !== action.meta.requestId) return; // protection, in case prev request completed AFTER current request completed
        if (!action.payload.isFirstBatch) state.page += 1;
        if (action.payload.isFinalPage)
          state.isFinalPage = action.payload.isFinalPage;
        state.stays = [...state.stays, ...action.payload.stays];
        _updateReqStatusLoadStays(state, RequestStatus.SUCCEEDED);
        state.reqIdLoadStays = null;
      })
      .addCase(loadStays.rejected, (state, action) => {
        _updateReqStatusLoadStays(state, RequestStatus.FAILED);
        state.reqIdLoadStays = null;

        console.log("Failed loading stays", action.error);
        showErrorMsg("Failed loading stays");
      });

    // loadStay
    builder
      .addCase(loadStay.pending, (state) => {
        _updateReqStatusLoadStay(state, RequestStatus.PENDING);
      })
      .addCase(loadStay.fulfilled, (state, action: PayloadAction<any>) => {
        state.stay = action.payload;
        _updateReqStatusLoadStay(state, RequestStatus.SUCCEEDED);
      })
      .addCase(loadStay.rejected, (state, action: PayloadAction<any>) => {
        _updateReqStatusLoadStay(state, RequestStatus.FAILED);
      });

    // loadWishlistedStayIds
    builder
      .addCase(loadWishlistedStayIds.pending, (state, action) => {
        // if page is undefined, meaning first request on page load, thus reset.
        if (action.meta.arg.page === undefined) _resetLoadWishlistIds(state);
        _updateReqStatusLoadWishlistIds(state, RequestStatus.PENDING);
      })
      .addCase(
        loadWishlistedStayIds.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.wishlistIds = [...state.wishlistIds, ...action.payload];
          _updateReqStatusLoadWishlistIds(state, RequestStatus.SUCCEEDED);
        }
      )
      .addCase(loadWishlistedStayIds.rejected, (state, action) => {
        _updateReqStatusLoadWishlistIds(state, RequestStatus.FAILED);
      });

    // loadWishlistedStayId
    builder
      .addCase(loadWishlistedStayId.pending, (state) => {
        // Since only happens in stay-details page, always reset wishlistIds array when calling loadWishlistedStayId
        _resetLoadWishlistId(state);
        _updateReqStatusLoadWishlistId(state, RequestStatus.PENDING);
      })
      .addCase(
        loadWishlistedStayId.fulfilled,
        (state, action: PayloadAction<any>) => {
          if (action.payload.isWishlist) {
            state.wishlistIds = [...state.wishlistIds, action.payload.stayId];
          }
          _updateReqStatusLoadWishlistId(state, RequestStatus.SUCCEEDED);
        }
      )
      .addCase(loadWishlistedStayId.rejected, (state, action) => {
        _updateReqStatusLoadWishlistId(state, RequestStatus.FAILED);
      });

    // toggleWishlistStay
    builder
      .addCase(
        toggleWishlistStay.fulfilled,
        (state, action: PayloadAction<any>) => {
          if (action.payload.actionType === "delete") {
            state.wishlistIds = state.wishlistIds.filter(
              (stayId) => stayId !== action.payload.stayId
            );
          }
          if (action.payload.actionType === "create") {
            state.wishlistIds = [...state.wishlistIds, action.payload.stayId];
          }
        }
      )
      .addCase(toggleWishlistStay.rejected, (state, action) => {
        console.log("error - could not update wishlist stay", action.error);
        showErrorMsg("Could not update wishlist stay");
      });
  },
});

export const loadStays = createAsyncThunk(
  "stay/loadStays",
  async (
    {
      filterBy,
      page,
      isFirstBatch,
    }: {
      filterBy: FilterBy;
      page: number | undefined;
      isFirstBatch: boolean;
    },
    { rejectWithValue }
  ) => {
    const filter: ApiFilterBy = {
      where: "",
      from: "",
      to: "",
      capacity: 0,
      label: "",
      page: 0,
    };
    if (filterBy.where) filter.where = filterBy.where;
    if (filterBy.from) filter.from = filterBy.from;
    if (filterBy.to) filter.to = filterBy.to;
    if (filterBy.capacity) filter.capacity = filterBy.capacity;
    if (filterBy.label) filter.label = filterBy.label;
    if (page) filter.page = page;

    const { stays, isFinalPage } = await stayService.query(filter);
    return { stays, isFinalPage, isFirstBatch };
  },
  {
    condition(arg, thunkApi) {
      // TODO: should probably add proper selectors to store - see: "https://redux.js.org/usage/deriving-data-selectors"

      // if isFirstBatch, and reqStatusLoadStays is not IDLE, then something is wrong, abort.
      const reqStatusLoadStays = selectStayReqStatusLoadStays(
        thunkApi.getState() as RootState
      );
      if (arg.isFirstBatch && reqStatusLoadStays !== RequestStatus.IDLE)
        return false;
    },
  }
);

export const loadStay = createAsyncThunk(
  "stay/loadStay",
  async (stayId: string) => {
    try {
      const stay = await stayService.getById(stayId);
      return stay;
    } catch (err: any) {
      showErrorMsg("Failed loading stay");
      throw new Error("Failed loading stay", err);
    }
  }
);

export const loadWishlistedStayIds = createAsyncThunk(
  "stay/loadWishlistedStayIds",
  async ({
    filterBy,
    page,
    isAllUntilPage,
  }: {
    filterBy: FilterBy;
    page: number | undefined;
    isAllUntilPage: boolean | undefined;
  }) => {
    const filter: ApiFilterBy = {
      where: "",
      from: "",
      to: "",
      capacity: 0,
      label: "",
      page: 0,
    };

    const wishlistFilter: ApiWishlistFilterBy = {
      isalluntilpage: false,
    };

    if (filterBy.where) filter.where = filterBy.where;
    if (filterBy.from) filter.from = filterBy.from;
    if (filterBy.to) filter.to = filterBy.to;
    if (filterBy.capacity) filter.capacity = filterBy.capacity;
    if (filterBy.label) filter.label = filterBy.label;
    if (page) filter.page = page;

    if (isAllUntilPage) wishlistFilter.isalluntilpage = true;

    const wishlistIds = await stayService.getWishlistedStayIds(
      filter,
      wishlistFilter
    );
    return wishlistIds;
  },
  {
    condition(arg, thunkApi) {
      const reqStatusLoadWishlistIds = selectStayReqStatusLoadWishlistIds(
        thunkApi.getState() as RootState
      );
      // if page is undefined, meaning first request on page load, and reqStatusLoadWishlistIds is not idle, then something is wrong, abort.
      if (
        arg.page === undefined &&
        reqStatusLoadWishlistIds !== RequestStatus.IDLE
      )
        return false;
    },
  }
);

export const loadWishlistedStayId = createAsyncThunk(
  "stay/loadWishlistedStayId",
  async (stayId: string) => {
    const result = await wishlistStayService.checkIsWishlistStayByStayId(
      stayId
    );
    return { stayId, isWishlist: result.isWishlist };
  }
);

export const {
  stayUpdateFilterBy,
  stayResetFilterBy,
  stayResetPageNum,
  stayUpdateIsFinalPage,
  stayResetWishlistIds,
  stayResetLoadStays,
  stayUpdateReqStatusLoadStay,
  stayUpdateReqStatusLoadStays,
  stayUpdateReqStatusLoadWishlistId,
  stayUpdateReqStatusLoadWishlistIds,
} = staySlice.actions;

export default staySlice.reducer;

// *************************************************************
// ************************* Selectors *************************
// *************************************************************
export const selectStayReqStatusLoadWishlistId = (state: RootState) =>
  state.stayModule.reqStatusLoadWishlistId;

export const selectStayReqStatusLoadWishlistIds = (state: RootState) =>
  state.stayModule.reqStatusLoadWishlistIds;

export const selectStayReqStatusLoadStays = (state: RootState) =>
  state.stayModule.reqStatusLoadStays;

export const selectStayReqStatusLoadStay = (state: RootState) =>
  state.stayModule.reqStatusLoadStay;

// **************************************************************
// **************** Local utility functions *********************
// **************************************************************

// ************ Request Status ************
function _updateReqStatusLoadWishlistId(
  state: StayState,
  reqStatusLoadWishlistId: RequestStatus
) {
  state.reqStatusLoadWishlistId = reqStatusLoadWishlistId;
}

function _updateReqStatusLoadWishlistIds(
  state: StayState,
  reqStatusLoadWishlistIds: RequestStatus
) {
  state.reqStatusLoadWishlistIds = reqStatusLoadWishlistIds;
}

function _updateReqStatusLoadStay(
  state: StayState,
  reqStatusLoadStay: RequestStatus
) {
  state.reqStatusLoadStay = reqStatusLoadStay;
}

function _updateReqStatusLoadStays(
  state: StayState,
  reqStatusLoadStays: RequestStatus
) {
  state.reqStatusLoadStays = reqStatusLoadStays;
}

// ************ Other ************
function _updateFilterBy(state: StayState, filterBy: FilterBy) {
  state.filterBy = {
    ...stayService.getEmptyFilterBy(),
    ...state.filterBy,
    ...filterBy,
  };
  state.isSetParamsToFilterBy = true;
}

function _resetFilterBy(state: StayState) {
  state.filterBy = null;
  state.isSetParamsToFilterBy = true;
}

function _resetLoadStays(state: StayState) {
  state.stays = [];
  state.page = 0;
  state.isFinalPage = false;
  state.isSetParamsToFilterBy = false;
  state.reqStatusLoadStays = RequestStatus.IDLE;
}

function _resetLoadWishlistIds(state: StayState) {
  state.wishlistIds = [];
  state.reqStatusLoadWishlistIds = RequestStatus.IDLE;
}

function _resetLoadWishlistId(state: StayState) {
  state.wishlistIds = [];
  state.reqStatusLoadWishlistId = RequestStatus.IDLE;
}
