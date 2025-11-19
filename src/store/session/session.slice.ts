import { createSlice } from "@reduxjs/toolkit";

const initialState:Session = {
    id: '',
    token: ''
}

export const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        // addBall: (state, data:reducerBase<number>) => {
        //     state.ball += data.payload
        // },
        setSessionID: (state, data:reducerBase<string>) => {
            state.id = data.payload
        },
        setSessionToken: (state, data:reducerBase<string>) => {
            state.token = data.payload
        }
    }
})

export const { actions, reducer } = sessionSlice