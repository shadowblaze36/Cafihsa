// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import clients from 'src/store/client'
import credits from 'src/store/credit'

export const store = configureStore({
  reducer: {
    clients,
    credits
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
