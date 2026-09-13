import { createSlice, PayloadAction } from "@reduxjs/toolkit"


interface SearchState {
    isOpen : boolean
}

const initialState : SearchState = {
    isOpen : false
} 

const searchSlice = createSlice({
    name : "search",
    initialState,
    reducers : {
        setSearchOpen : (state, action : PayloadAction<boolean>) => {
            state.isOpen = action.payload;
        }
    }
})

export const { setSearchOpen } = searchSlice.actions;
export default searchSlice.reducer;