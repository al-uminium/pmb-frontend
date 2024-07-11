import { createAction, props } from "@ngrx/store";
import { User } from "../classes/user";

export const selectUser = createAction('[User] Select User', props<{ user: User }>());
export const changeUser = createAction('[User] Change User', props<{ user: User }>());