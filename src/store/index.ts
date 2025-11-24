import { configureStore, combineReducers } from '@reduxjs/toolkit'

import { reducer as paramsReducer } from './params/params.slice'
import { reducer as filesReducer } from './files/files.slice'

const reducers = combineReducers({
    params: paramsReducer,
    files: filesReducer
})

export const store = configureStore({
    reducer: reducers
})

export type RootState = ReturnType<typeof store.getState>