import { createReducer, on } from "@ngrx/store";
import { User } from "../classes/user";
import { changeUser, loginUser, selectUser } from "./user.actions";

export interface UserState {
  user: User | null
}

export const initialState: UserState = {
  user: null
}

export const userReducer = createReducer(
  initialState,
  on(selectUser, (state, { user }) => ({
    ...state,
    user
  })),
  on(changeUser, (state, { user }) => ({
    ...state, 
    user
  })),
  on(loginUser, (state, { user }) => ({
    ...state, 
    user
  }))
);