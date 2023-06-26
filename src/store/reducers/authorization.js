import { createSlice, createDraftSafeSelector } from '@reduxjs/toolkit';
import { authorizate, checkAuth, fetchUserData, postUserData, registrate } from '../api-actions';

const initialAuthorizationStateState = {
  authorized: undefined,
  userData: undefined,
  message: undefined,
  waiting: false,
};

export const authorizationSlice = createSlice({
  name: 'authorization',
  initialState: initialAuthorizationStateState,
  reducers: {
    clearAuthorizationState: (state) => {
      state.authorized = false;
      state.userData = undefined;
    },
    clearMessageState: (state) => {
      state.message = undefined;
    },
    clearWaitingState: (state) => {
      state.waiting = false;
    },
    setMessageState: (state, action) => {
      state.message = action.payload;
    },
    setWaitingState: (state) => {
      state.waiting = true;
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
      .addCase(checkAuth.rejected, (state) => {
        state.authorized = false;
      })
      .addCase(postUserData.fulfilled, (state, action) => {
        state.message = 'Your data succsesfully updated!';
        state.userData = action.payload;
      })
      .addCase(postUserData.rejected, (state, action) => {
        state.message = action.error.message;
      })
      .addCase(registrate.fulfilled, (state, action) => {
        state.waiting = false;
        state.userData = action.payload;
      })
      .addCase(registrate.rejected, (state, action) => {
        state.waiting = false;
        state.message = action.error.message;
      })
      .addCase(authorizate.fulfilled, (state) => {
        state.waiting = false;
        state.authorized = true;
      })
      .addCase(authorizate.rejected, (state, action) => {
        state.waiting = false;
        state.message = action.error.message;
      });
  },
});

const selectAuthorization = (state) => state.authorization.authorized;
const selectUserData = (state) => state.authorization.userData;
const selectMessage = (state) => state.authorization.message;
const selectWaiting = (state) => state.authorization.waiting;

const authorizationSelector = createDraftSafeSelector(
  selectAuthorization,
  (authorized) => authorized,
);

const userDataSelector = createDraftSafeSelector(selectUserData, (userData) => userData);

const authorizationMessageSelector = createDraftSafeSelector(selectMessage, (message) => message);

const waitingSeletor = createDraftSafeSelector(selectWaiting, (waiting) => waiting);

export { authorizationSelector, userDataSelector, authorizationMessageSelector, waitingSeletor };
export const { clearAuthorizationState, clearMessageState, setMessageState, setWaitingState } =
  authorizationSlice.actions;
