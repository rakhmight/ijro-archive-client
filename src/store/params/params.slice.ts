import { createSlice } from "@reduxjs/toolkit";

const initialState:Params = {
    serverAddress: 'http://ijroarchive.uz/api/v1',
    serverBase: 'http://ijroarchive.uz',

    switcher: true
}

export const paramsSlice = createSlice({
    name: 'params',
    initialState,
    reducers: {
        switchSwitcher: (state) => {
            state.switcher = !state.switcher
        }
    }
})

export const { actions, reducer } = paramsSlice