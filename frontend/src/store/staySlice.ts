import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { stayService } from "../services/stay.service";
import { showErrorMsg } from "../services/event-bus.service";
import { toggleWishlistStay } from "./wishlist-stay.slice";
import { wishlistStayService } from "../services/wishlist-stay.service";

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
}

// TODO: combine "loadWishlistedStayIds" and "loadWishlistedStayId" into one function (handle backend as well)

// TODO: add event-bus success/error for relevant reqStatuses

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
      .addCase(loadStays.pending, (state) => {
        _updateReqStatusLoadStays(state, RequestStatus.PENDING);
      })
      .addCase(
        loadStays.fulfilled,
        (
          state,
          action: PayloadAction<{
            stays: any;
            isFinalPage: boolean;
            isFirstBatch: boolean;
          }>
        ) => {
          if (!action.payload.isFirstBatch) state.page += 1;
          if (action.payload.isFinalPage)
            state.isFinalPage = action.payload.isFinalPage;
          state.stays = [...state.stays, ...action.payload.stays];
          _updateReqStatusLoadStays(state, RequestStatus.SUCCEEDED);
        }
      )
      .addCase(loadStays.rejected, (state, action) => {
        _updateReqStatusLoadStays(state, RequestStatus.FAILED);

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
      .addCase(loadWishlistedStayIds.pending, (state) => {
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
  async ({
    filterBy,
    page,
    isFirstBatch,
  }: {
    filterBy: FilterBy;
    page: number | undefined;
    isFirstBatch: boolean;
  }) => {
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
    isAllUntilPage = false,
  }: {
    filterBy: FilterBy;
    page: number;
    isAllUntilPage: boolean;
  }) => {
    const filter: ApiFilterBy = {
      where: "",
      from: "",
      to: "",
      capacity: 0,
      label: "",
      page,
    };
    if (filterBy.where) filter.where = filterBy.where;
    if (filterBy.from) filter.from = filterBy.from;
    if (filterBy.to) filter.to = filterBy.to;
    if (filterBy.capacity) filter.capacity = filterBy.capacity;
    if (filterBy.label) filter.label = filterBy.label;

    if (isAllUntilPage) {
      const wishlistIdsAllUntilPage =
        await stayService.getWishlistedStayIdsAllUntilPage(filter);
      return wishlistIdsAllUntilPage;
    }

    const wishlistIdsPerPage = await stayService.getWishlistedStayIdsPerPage(
      filter
    );
    return wishlistIdsPerPage;
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
}
