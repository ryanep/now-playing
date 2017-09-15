import * as authActions from "./auth";
import * as actionTypes from "../constants/action-types";

describe("actions/auth", () => {
  const access_token = "__access_token__";
  const refresh_token = "__refresh_token__";
  const error = "__error__";
  const code = "__code__";

  describe("accessTokenRequested", () => {
    it("returns ACCESS_TOKEN_REQUEST as the action type", () => {
      expect(authActions.accessTokenRequested(code)).toMatchObject({
        type: actionTypes.ACCESS_TOKEN_REQUEST
      });
    });

    it('returns the code in the payload', () => {
      expect(authActions.accessTokenRequested(code)).toMatchObject({
        payload:  {
          code
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
        payload: new Error(error)
      });
    });

    it("sets the error key to true", () => {
      expect(authActions.accessTokenFailure(error)).toMatchObject({
        error: true
      });
    });
  });

  describe("refreshTokenRequested", () => {
    it("returns REFRESH_TOKEN_REQUEST as the action type", () => {
      expect(authActions.refreshTokenRequested()).toEqual({
        type: actionTypes.REFRESH_TOKEN_REQUEST
      });
    });
  });

  describe("refreshTokenSuccess", () => {
    it("returns REFRESH_TOKEN_SUCCESS as the action type", () => {
      expect(authActions.refreshTokenSuccess({ access_token })).toMatchObject({
        type: actionTypes.REFRESH_TOKEN_SUCCESS
      });
    });

    it("returns the access token in the payload", () => {
      expect(authActions.refreshTokenSuccess({ access_token })).toMatchObject({
        payload: {
          accessToken: access_token
        }
      });
    });
  });

  describe("refreshTokenFailure", () => {
    it("returns REFRESH_TOKEN_FAILURE as the action type", () => {
      expect(authActions.refreshTokenFailure(error)).toMatchObject({
        type: actionTypes.REFRESH_TOKEN_FAILURE
      });
    });

    it("returns the error in the payload", () => {
      expect(authActions.refreshTokenFailure(error)).toMatchObject({
        payload: new Error(error)
      });
    });

    it("sets the error key to true", () => {
      expect(authActions.refreshTokenFailure(error)).toMatchObject({
        error: true
      });
    });
  });
});
