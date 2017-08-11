import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import * as authActions from "./auth";
import * as actionTypes from "../constants/action-types";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
import * as tokenService from "../services/token";

describe("auth actions", () => {
  const access_token = "__access_token__";
  const refresh_token = "__refresh_token__";
  const error = "__error__";
  const code = "__code__";

  describe("accessTokenRequested", () => {
    it("returns ACCESS_TOKEN_REQUEST as the action type", () => {
      expect(authActions.accessTokenRequested()).toEqual({
        type: actionTypes.ACCESS_TOKEN_REQUEST
      });
    });
  });

  describe("accessTokenRefreshed", () => {
    it("returns ACCESS_TOKEN_REFRESHED as the action type", () => {
      expect(authActions.accessTokenRefreshed({ access_token })).toMatchObject({
        type: actionTypes.ACCESS_TOKEN_REFRESHED
      });
    });

    it("returns the provided access token in the payload", () => {
      expect(authActions.accessTokenRefreshed({ access_token })).toMatchObject({
        payload: {
          accessToken: access_token
        }
      });
    });
  });

  describe("accessTokenSuccess", () => {
    it("returns ACCESS_TOKEN_SUCCESS as the action type", () => {
      expect(
        authActions.accessTokenSuccess({ access_token, refresh_token })
      ).toMatchObject({
        type: actionTypes.ACCESS_TOKEN_SUCCESS
      });
    });

    it("returns the provided access token and refresh token in the payload", () => {
      expect(
        authActions.accessTokenSuccess({ access_token, refresh_token })
      ).toMatchObject({
        payload: {
          accessToken: access_token,
          refreshToken: refresh_token
        }
      });
    });
  });

  describe("accessTokenFailure", () => {
    it("returns ACCESS_TOKEN_FAILURE as the action type", () => {
      expect(authActions.accessTokenFailure(error)).toMatchObject({
        type: actionTypes.ACCESS_TOKEN_FAILURE
      });
    });

    it("returns the error in the payload", () => {
      expect(authActions.accessTokenFailure(error)).toMatchObject({
        payload: {
          error
        }
      });
    });
  });

  describe("getAccessTokenFromRefresh", () => {
    let store;
    let tokenMock;

    beforeEach(() => {
      store = mockStore({});
      tokenMock = jest.spyOn(tokenService, "getAccessTokenFromRefreshToken");
    });

    afterEach(() => {
      store.clearActions();
      tokenMock.mockRestore();
    });

    it("dispatches an 'accessTokenRequested' action", () => {
      tokenMock.mockImplementation(() => Promise.resolve({ access_token }));

      return store
        .dispatch(authActions.getAccessTokenFromRefresh())
        .then(() => {
          const actions = store.getActions();
          expect(actions[0]).toEqual({
            type: actionTypes.ACCESS_TOKEN_REQUEST
          });
        });
    });

    it("dispatches an 'accessTokenRefreshed' action if the fetch returns data", () => {
      tokenMock.mockImplementation(() => Promise.resolve({ access_token }));

      return store
        .dispatch(authActions.getAccessTokenFromRefresh())
        .then(() => {
          const actions = store.getActions();
          expect(actions[1]).toEqual({
            type: actionTypes.ACCESS_TOKEN_REFRESHED,
            payload: {
              accessToken: access_token
            }
          });
        });
    });

    it("dispatches an 'accessTokenFailure' action if the fetch return an error", () => {
      tokenMock.mockImplementation(() => Promise.resolve({ error }));

      return store
        .dispatch(authActions.getAccessTokenFromRefresh())
        .then(() => {
          const actions = store.getActions();
          expect(actions[1]).toEqual({
            type: actionTypes.ACCESS_TOKEN_FAILURE,
            payload: {
              error
            }
          });
        });
    });
  });

  describe("getAccessTokenFromCode", () => {
    let store;
    let tokenMock;

    beforeEach(() => {
      store = mockStore({});
      tokenMock = jest.spyOn(tokenService, "getAccessTokenFromCode");
    });

    afterEach(() => {
      store.clearActions();
      tokenMock.mockRestore();
    });

    it("dispatches an 'accessTokenRequested' action", () => {
      tokenMock.mockImplementation(() =>
        Promise.resolve({ access_token, refresh_token }));

      return store
        .dispatch(authActions.getAccessTokenFromCode(code))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0]).toEqual({
            type: actionTypes.ACCESS_TOKEN_REQUEST
          });
        });
    });

    it("dispatches an 'accessTokenSucess' action if the fetch returns data", () => {
      tokenMock.mockImplementation(() =>
        Promise.resolve({ access_token, refresh_token }));

      return store
        .dispatch(authActions.getAccessTokenFromCode(code))
        .then(() => {
          const actions = store.getActions();
          expect(actions[1]).toEqual({
            type: actionTypes.ACCESS_TOKEN_SUCCESS,
            payload: {
              accessToken: access_token,
              refreshToken: refresh_token
            }
          });
        });
    });

    it("replaces the window location with '/' if successful", () => {
      tokenMock.mockImplementation(() =>
        Promise.resolve({ access_token, refresh_token }));

      const replaceMock = jest.spyOn(window.location, "replace");

      return store
        .dispatch(authActions.getAccessTokenFromCode(code))
        .then(() => {
          const actions = store.getActions();
          expect(actions[1]).toEqual({
            type: actionTypes.ACCESS_TOKEN_SUCCESS,
            payload: {
              accessToken: access_token,
              refreshToken: refresh_token
            }
          });
          expect(replaceMock.mock.calls[0]).toEqual(["/"]);
        });
    });

    it("dispatches an 'accessTokenFailure' action if the fetch retuens an error", () => {
      tokenMock.mockImplementation(() => Promise.resolve({ error }));

      return store
        .dispatch(authActions.getAccessTokenFromCode(code))
        .then(() => {
          const actions = store.getActions();
          expect(actions[1]).toEqual({
            type: actionTypes.ACCESS_TOKEN_FAILURE,
            payload: {
              error
            }
          });
        });
    });
  });
});
