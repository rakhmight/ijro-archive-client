import { createSlice } from "@reduxjs/toolkit";

const initialState:Params = {
    serverAddress: 'http://ijroarchive.uz/api/v1',
    serverBase: 'http://ijroarchive.uz',

    switcher: true,
    actionSwitcher: true,
    isMobile: false
}

export const paramsSlice = createSlice({
    name: 'params',
    initialState,
    reducers: {
        switchSwitcher: (state) => {
            state.switcher = !state.switcher
        },
        switchActionSwitcher: (state) => {
            state.actionSwitcher = !state.actionSwitcher
        },

        changeIsMobile: (state, data:reducerBase<boolean>) => {
            state.isMobile = data.payload
        }

    }
})

export const { actions, reducer } = paramsSlice