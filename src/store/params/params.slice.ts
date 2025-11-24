import { createSlice } from "@reduxjs/toolkit";

const initialState:Params = {
    serverAddress: 'http://ijroarchive.uz/api/v1',
    serverBase: 'http://ijroarchive.uz'
}

export const paramsSlice = createSlice({
    name: 'params',
    initialState,
    reducers: {
        // addBall: (state, data:reducerBase<number>) => {
        //     state.ball += data.payload
        // },
    }
})

export const { actions, reducer } = paramsSlice