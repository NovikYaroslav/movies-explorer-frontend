import { createSlice, createDraftSafeSelector } from '@reduxjs/toolkit';
import { authorizate, checkAuth, fetchUserData, postUserData, registrate } from '../api-actions';

const initialAuthorizationStateState = {
  authorized: false,
  userData: undefined,
};

export const authorizationSlice = createSlice({
  name: 'authorization',
  initialState: initialAuthorizationStateState,
  reducers: {
    clearAuthorizationState: (state) => {
      state.authorized = false;
      state.userData = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.userData = action.payload;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.authorized = true;
        state.userData = action.payload;
      })
      .addCase(postUserData.fulfilled, (state, action) => {
        state.userData = action.payload;
      })
      .addCase(registrate.fulfilled, (state, action) => {
        state.userData = action.payload;
      })
      .addCase(authorizate.fulfilled, (state) => {
        state.authorized = true;
      });
  },
});

const selectAuthorization = (state) => state.authorization.authorized;
const selectUserData = (state) => state.authorization.userData;

const authorizationSelector = createDraftSafeSelector(
  selectAuthorization,
  (authorized) => authorized,
);

const userDataSelector = createDraftSafeSelector(selectUserData, (userData) => userData);

export { authorizationSelector, userDataSelector };
export const { clearAuthorizationState } = authorizationSlice.actions;
