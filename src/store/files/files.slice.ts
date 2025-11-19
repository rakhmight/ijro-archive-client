import { createSlice } from "@reduxjs/toolkit";

const initialState:Files = {
    files: [],
}

export const filesSlice = createSlice({
    name: 'files',
    initialState,
    reducers: {
        setFiles: (state, data:reducerBase<Array<File>>) => {
            state.files = data.payload.reverse()
        },
        addFile: (state, data:reducerBase<File>) => {
            state.files.unshift(data.payload)
        },
    }
})

export const { actions, reducer } = filesSlice