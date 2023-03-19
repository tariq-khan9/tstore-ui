import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { userAuthApi } from '../services/userAuthApi'
import { productsApi } from '../services/productsApi'
import { adminAuthApi } from '../services/adminAuthApi'
import loggedReducer from '../features/loggedSlice'


export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [userAuthApi.reducerPath]: userAuthApi.reducer,
    [adminAuthApi.reducerPath]: adminAuthApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    logged: loggedReducer,
  
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAuthApi.middleware, adminAuthApi.middleware, productsApi.middleware),


})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)