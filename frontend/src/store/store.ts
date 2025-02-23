import { configureStore } from "@reduxjs/toolkit";
import stayReducer from "./staySlice";
import userReducer from "./userSlice";
import orderReducer from "./orderSlice";
import wishlistStayReducer from "./wishlist-stay.slice";
import systemReducer from "./systemSlice";

// ########################## redux-persist ##########################
// INFO: (redux-persist) ---> it persists all the reducers.
// *** people generally don't recommend using redux-persist, since it has not been maintained for a long time.
// * must have "persistConfig" object in store.ts
// * "const persistedReducer = persistReducer(persistConfig, rootReducer)" ---> must be in store.ts.
//      "rootReducer" is the value of "combineReducers" ---> "const rootReducer = combinerReducers({userModule: userReducer,...})"
// ** you can configure SPECIFIC reducers to be persisted using whitelists (or not persisted using blacklists), using "persistConfig"
// * "export let persistor = persistStore(store)" ---> must be in store.ts. (important! must be "let" and not "const"!)
// * in root-cmp, will have to create "<PersistGate loading={null} persistor={persistor}>" element which wraps the app,
//      and have "<Provider store={store}>" wrap the "PersistGate".
// ###################################################################

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
// Inferred type: {stayModule: stayState, userModule: userState, orderModule: OrderState, ...}
export type AppDispatch = typeof store.dispatch;
