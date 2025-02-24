import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { orderService } from "../services/order.service";
import { showErrorMsg } from "../services/event-bus.service";

enum RequestStatus {
  IDLE = "idle",
  PENDING = "pending",
  SUCCEEDED = "succeeded",
  FAILED = "failed",
}

interface ApiOrderFilterBy {
  usertype: "all" | "buyer" | "seller";
}

interface OrderFilterBy {
  userType: "all" | "buyer" | "seller";
}

// TODO: add ts interfaces
interface BuyerSeller {
  _id: string;
  fullname: string;
  img: string;
  joined: string;
}

interface OrderDetails {
  checkIn: string;
  checkOut: string;
  nightsCount: number;
  guestCount: number;
  singleNightPrice: number;
}

interface OrderPrice {
  price: number;
  serviceFee: number;
  cleaningFee: number;
  total: number;
}

interface Explore {
  label: string;
  title: string;
  amount: number;
  img: string | null;
}

interface OrderContent {
  buyer: BuyerSeller;
  seller: BuyerSeller;
  orderDetails: OrderDetails;
  orderPrice: OrderPrice;
  stayDetails: any; // some keys may not be valid to ALL stays
  explore: Explore[];
  status: "Approved" | "Rejected" | "Pending";
}

interface MiniUser {
  _id: string;
  fullname: string;
}

interface Order {
  _id: string;
  content: OrderContent;
  byUser: MiniUser;
  aboutUser: MiniUser;
}

interface OrderState {
  orders: Order[];
  reqStatusLoadOrders: RequestStatus;
  reqIdLoadOrders: null | string;
}

const initialState: OrderState = {
  orders: [],
  reqStatusLoadOrders: RequestStatus.IDLE,
  reqIdLoadOrders: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    orderUpdateReqStatusLoadOrders: (
      state,
      action: PayloadAction<RequestStatus>
    ) => {
      _updateReqStatusLoadOrders(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    // loadOrders
    builder
      .addCase(loadOrders.pending, (state, action) => {
        _resetLoadOrders(state);
        _updateReqStatusLoadOrders(state, RequestStatus.PENDING);
        state.reqIdLoadOrders = action.meta.requestId;
      })
      .addCase(loadOrders.fulfilled, (state, action) => {
        if (state.reqIdLoadOrders !== action.meta.requestId) return; // protection, in case prev request completed AFTER current request completed
        _updateOrdersState(state, action.payload);
        _updateReqStatusLoadOrders(state, RequestStatus.SUCCEEDED);
        state.reqIdLoadOrders = null;
      })
      .addCase(loadOrders.rejected, (state, action) => {
        _updateReqStatusLoadOrders(state, RequestStatus.FAILED);
        state.reqIdLoadOrders = null;
        console.log("error - could not get orders", action.error);
        showErrorMsg("Could not load orders");
      });

    // approveOrder
    builder
      .addCase(
        approveOrder.fulfilled,
        (state, action: PayloadAction<string>) => {
          _approveAndUpdateOrders(state, action.payload);
        }
      )
      .addCase(approveOrder.rejected, (state, action) => {
        console.log("error - could not approve order", action.error);
        showErrorMsg("Could not update order");
      });

    // rejectOrder
    builder
      .addCase(
        rejectOrder.fulfilled,
        (state, action: PayloadAction<string>) => {
          _rejectAndUpdateOrders(state, action.payload);
        }
      )
      .addCase(rejectOrder.rejected, (state, action) => {
        console.log("error - could not reject order", action.error);
        showErrorMsg("Could not update order");
      });
  },
});

export const loadOrders = createAsyncThunk(
  "order/loadOrders",
  async (filterBy: OrderFilterBy, { rejectWithValue }) => {
    if (!filterBy || !["all", "buyer", "seller"].includes(filterBy.userType)) {
      return rejectWithValue({
        error: "Invalid filter parameters",
        invalidParams: {
          userType: filterBy?.userType,
          expectedValues: ["all", "buyer", "seller"],
        },
      });
    }

    const filter: ApiOrderFilterBy = {
      usertype: filterBy.userType,
    };

    const orders = await orderService.getOrders(filter);
    return orders;
  }
);

export const approveOrder = createAsyncThunk(
  "order/approveOrder",
  async (orderId: string) => {
    await orderService.updateOrderStatus({ status: "Approved", _id: orderId });
    return orderId;
  }
);

export const rejectOrder = createAsyncThunk(
  "order/rejectOrder",
  async (orderId: string) => {
    await orderService.updateOrderStatus({ status: "Rejected", _id: orderId });
    return orderId;
  }
);

export const { orderUpdateReqStatusLoadOrders } = orderSlice.actions;

export default orderSlice.reducer;

// =====================================================
// ============== Local utility functions ==============
// =====================================================
// ------------------------- Request Status -------------------------
function _updateReqStatusLoadOrders(
  state: OrderState,
  reqStatusLoadOrders: RequestStatus
) {
  state.reqStatusLoadOrders = reqStatusLoadOrders;
}

// ------------------------- State Resets -------------------------
function _resetLoadOrders(state: OrderState) {
  state.orders = [];
}

// ------------------------- State Updates -------------------------
function _updateOrdersState(state: OrderState, orders: Order[]) {
  state.orders = [...state.orders, ...orders];
}

// ------------------------- State Updates (Orders Array -> Update "status" for specific order) -------------------------
function _approveAndUpdateOrders(state: OrderState, orderId: string) {
  _updateOrdersStatus(state, orderId, "Approved");
}

function _rejectAndUpdateOrders(state: OrderState, orderId: string) {
  _updateOrdersStatus(state, orderId, "Rejected");
}

function _updateOrdersStatus(
  state: OrderState,
  orderId: string,
  status: string
) {
  const updatedOrders: Order[] = state.orders.map((order: any) =>
    order._id === orderId
      ? { ...order, content: { ...order.content, status } }
      : order
  );
  state.orders = updatedOrders;
}
// ------------------------- Other -------------------------
