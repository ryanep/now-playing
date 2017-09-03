import { getAccessToken } from "./auth";
import { call, put, takeLatest } from "redux-saga/effects";
import * as tokenService from "../services/token";
import * as authActions from "../actions/auth";

xdescribe("auth saga", () => {
  describe("getAccessToken", () => {
    const code = "123456789";
    const access_token = "__access_token__";
    const refresh_token = "__refresh_token__";
    const gen = getAccessToken({ payload: { code } });
    const spy = jest.spyOn(window.history, "pushState");
    it("should call the token service to get access token from supplied code", () => {
      expect(gen.next().value).toEqual(
        call(tokenService.getAccessTokenFromCode, code)
      );
    });

    it("should call pushState with root path", () => {
      // placeholder failings to remind us to implement
      expect(false).toBeTruthy();
    });

    it("should put accessTokenSuccess with the access_token and refresh_token if successful", () => {
      expect(false).toBeTruthy();
    });

    it("should call accessTokenFailure with the error payload if an error is returned", () => {
      expect(false).toBeTruthy();
    });
  });
});
