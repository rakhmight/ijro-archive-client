import { createSlice } from "@reduxjs/toolkit";

const initialState:Params = {
    serverAddress: 'http://95.182.119.105/api/v1',
    serverBase: 'http://95.182.119.105'
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