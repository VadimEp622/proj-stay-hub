import { configureStore } from "@reduxjs/toolkit";
import stayReducer from "./staySlice";
import userReducer from "./userSlice";
import orderReducer from "./orderSlice";
import wishlistStayReducer from "./wishlist-stay.slice";
import systemReducer from "./systemSlice";

export const store = configureStore({
  reducer: {
    stayModule: stayReducer,
    userModule: userReducer,
    orderModule: orderReducer,
    wishlistStayModule: wishlistStayReducer,
    systemModule: systemReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
