import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    image: [],
}

export const imageSlice = createSlice({
    name: 'image',
    initialState,
    reducers: {
        addImage: (state, action) => {
            console.log(state, action)
            const img = {
                id: action.payload.id,
                src: action.payload.src,
                counter: action.payload.counter,
            }
            state.image.push(img)
        },
        clearImages: (state, action) => {
            state.image = []
        }
    }
})

export const { addImage, clearImages } = imageSlice.actions

export default imageSlice.reducer