import { createSlice, createDraftSafeSelector } from '@reduxjs/toolkit';
import { checkAuth, fetchUserData } from '../api-actions';

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
    builder.addCase(fetchUserData.fulfilled || checkAuth.fulfilled, (state, action) => {
      state.authorized = true;
      state.userData = action.payload;
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
