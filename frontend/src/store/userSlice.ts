import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userService } from "../services/user.service";
import { authService } from "../services/auth.service";
import { socketService } from "../services/socket.service";
import { orderService } from "../services/order.service";

interface TripItem {
  orderId: string;
}

interface User {
  _id: string;
  fullname: string;
  imgUrl: string;
  trip: TripItem[];
}

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

interface Order {
  buyer?: BuyerSeller;
  seller?: BuyerSeller;
  orderDetails?: OrderDetails;
  orderPrice?: OrderPrice;
  stayDetails?: any; // some keys may not be valid to ALL stays
  explore?: Explore[];
  status?: "Approved" | "Rejected" | "Pending";
}

interface UserState {
  user: User | null;
  order: Order;
}

// TODO make sure "order" object, is EITHER: 1) null , 2) user object filled with keys
// * null -> since it represents absence of data, and user object filled with keys -> represents the presence of data

const initialState: UserState = {
  user: userService.getLoggedinUser(),
  order: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userSetOrder: (state, action: PayloadAction<any>) => {
      // TODO: check out why the order object keys are updated upon previous keys
      const order = { ...state.order, ...action.payload };
      state.order = order;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        const user = action.payload;
        _updateUserState(state, user);
        socketService.login(user._id);
      })
      .addCase(login.rejected, (state, action) => {
        _updateUserState(state, null);
        socketService.logout();
      });

    builder
      .addCase(signup.fulfilled, (state, action: PayloadAction<User>) => {
        const user = action.payload;
        _updateUserState(state, user);
        socketService.login(user._id);
      })
      .addCase(signup.rejected, (state, action) => {});

    builder
      .addCase(logout.fulfilled, (state) => {
        _updateUserState(state, null);
        socketService.logout();
      })
      .addCase(logout.rejected, (state, action) => {});

    builder.addCase(
      addConfirmedTrip.fulfilled,
      (state, action: PayloadAction<User>) => {
        const user = action.payload;
        userService.saveLocalUser(user);
        _updateUserState(state, user);
      }
    );
  },
});

export const login = createAsyncThunk(
  "user/login",
  async (credentials: any, { rejectWithValue }) => {
    try {
      const user = await authService.login(credentials);
      return user;
    } catch (err) {
      return rejectWithValue(null);
    }
  }
);

export const signup = createAsyncThunk(
  "user/signup",
  async (credentials: any) => {
    const user = await authService.signup(credentials);
    return user;
  }
);

export const logout = createAsyncThunk("user/logout", async () => {
  await authService.logout();
});

export const addConfirmedTrip = createAsyncThunk(
  "user/addConfirmedTrip",
  async (order: Order) => {
    try {
      if (!order.buyer) throw new Error("invalid order object");
      const user = await userService.getById(order.buyer._id); // check if buyer user exists
      const orderId = await orderService.addOrder(order); // creates order object at DB
      const updatedUser = await userService.addUserTrip(user._id, { orderId }); // add orderId to user's trip array in DB
      return updatedUser;
    } catch (err) {
      console.error("Cannot add confirmed trip", err);
      throw err;
    }
  }
);

export const { userSetOrder } = userSlice.actions;

export default userSlice.reducer;

// ************ Local utility functions ************
function _updateUserState(state: UserState, user: User | null) {
  state.user = user;
}
