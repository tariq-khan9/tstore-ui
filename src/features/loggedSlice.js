import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    email: "",
    name: ""
    
}

export const loggedSlice = createSlice({
  name: 'logged',
  initialState,
  reducers: {
    setLoggedInfo: (state, action)=>{
      state.email = action.payload.email
      state.name = action.payload.name
    },
    unsetLoggedInfo: (state, action)=>{
      state.email = action.payload.email
      state.name = action.payload.name
    }
  },
})


export const {setLoggedInfo, unsetLoggedInfo } = loggedSlice.actions

export default loggedSlice.reducer