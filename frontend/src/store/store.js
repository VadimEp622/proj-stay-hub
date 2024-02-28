import { configureStore } from '@reduxjs/toolkit'

import { stayReducer } from './stay.reducer'
import { userReducer } from './user.reducer'
import { orderReducer } from './order.reducer'
import systemReducer from './systemSlice'


export const store = configureStore({
    // Automatically calls `combineReducers`
    reducer: {
        stayModule: stayReducer,
        userModule: userReducer,
        orderModule: orderReducer,
        systemModule: systemReducer,
    }
})





// store.subscribe(() => {
// console.log('**** Store state changed: ****')
// console.log('storeState:\n', store.getState())
// console.log('*******************************')
// })
