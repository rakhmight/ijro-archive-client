import { createSlice } from "@reduxjs/toolkit";
import { FileStatus } from "./enums";

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

        deleteFile: (state, data:reducerBase<string>) => {
            const target = state.files.find(f => f.id == data.payload)
            
            if(target){
                const index = state.files.indexOf(target)
                state.files.splice(index, 1)
            }
        },

        changeStatus: (state, data:reducerBase<{ status: FileStatus, id: string }>) => {
            const target = state.files.find(f => f.id == data.payload.id)
            if(target){
                const index = state.files.indexOf(target)
                state.files[index].status = data.payload.status
            }
        },

        updateFile: (state, data:reducerBase<{ tempID: String, id: string, createdAt: Date }>) => {
            const target = state.files.find(f => f.id == data.payload.tempID)
            if(target){
                const index = state.files.indexOf(target)
                state.files[index].id = data.payload.id
                state.files[index].createdAt = data.payload.createdAt
                state.files[index].status = FileStatus.Done
            }
        }
    }
})

export const { actions, reducer } = filesSlice