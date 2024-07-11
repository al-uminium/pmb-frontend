// src/app/store/user.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

// export const selectUserState = (state: { user: UserState }) => state.user;

// export const selectUser = createSelector(selectUserState, (state) => state.user);

// export const selectSelectedUser = createSelector()

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectSelectedUser = createSelector(
  selectUserState,
  (state: UserState) => state.user
)