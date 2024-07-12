// src/app/store/user.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

export const selectUserState = createFeatureSelector<UserState>('user');
export const selectLoginUserState = createFeatureSelector<UserState>('user');

export const selectSelectedUser = createSelector(
  selectUserState,
  (state: UserState) => state.user
)

export const selectLoginUser = createSelector(
  selectLoginUserState,
  (state: UserState) => state.user
)