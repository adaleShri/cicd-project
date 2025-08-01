import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name:"user",
    initialState:{
        isLoggedIn:false,
        email:null,
        token:null,
        id:null,
        phoneNumber:null,
        firstName:null,
        lastName:null,
        role:null,
        gender:null,
    },
    reducers:{
        setUser: (state, action)=>{
            let {email, token, id, firstName,lastName, phoneNumber, role, gender} = action.payload;
            state.email= email;
            state.token= token;
            state.isLoggedIn = true;
            state.firstName= firstName;
            state.lastName = lastName;
            state.id= id;
            state.phoneNumber=phoneNumber;
            state.role=role;
            state.gender=gender;
        },
        signOut:(state, action)=>{
            state.email=null;
            state.token=null;
            state.isLoggedIn=false;
            state.firstName=null;
            state.lastName = null;
            state.id=null;
            state.phoneNumber=null;
            state.role=null;
            state.gender=null
        }
    }
});

export const {setUser, signOut}= slice.actions;
export default slice.reducer;