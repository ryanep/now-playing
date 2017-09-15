import * as trackActions from "./tracks";
import * as actionTypes from "../constants/action-types";

describe("actions/tracks", () => {
  const track = "__track__";
  const error = "__error__";

  describe("trackRequested", () => {
    it("returns TRACK_REQUEST as the action type", () => {
      expect(trackActions.trackRequested()).toEqual({
        type: actionTypes.TRACK_REQUEST
      });
    });
  });

  describe("trackUpdated", () => {
    it("returns TRACK_UPDATED as the action type", () => {
      expect(trackActions.trackUpdated(track)).toMatchObject({
        type: actionTypes.TRACK_UPDATED
      });
    });

    it("returns the track in the payload", () => {
      expect(trackActions.trackUpdated(track)).toMatchObject({
        payload: {
          track
        }
      });
    });
  });

  describe("trackNotPlaying", () => {
    it("returns TRACK_NOT_PLAYING as the action type", () => {
      expect(trackActions.trackNotPlaying()).toEqual({
        type: actionTypes.TRACK_NOT_PLAYING
      });
    });
  });

  describe("trackChanged", () => {
    it("returns TRACK_CHANGED as the action type", () => {
      expect(trackActions.trackChanged(track)).toMatchObject({
        type: actionTypes.TRACK_CHANGED
      });
    });

    it("returns the track in the payload", () => {
      expect(trackActions.trackChanged(track)).toMatchObject({
        payload: {
          track
        }
      });
    });
  });

  describe("trackFailure", () => {
    it("returns TRACK_FAILURE as the action type", () => {
      expect(trackActions.trackFailure(error)).toMatchObject({
        type: actionTypes.TRACK_FAILURE
      });
    });

    it("returns the error key as true, and an error in the payload", () => {
      expect(trackActions.trackFailure(error)).toMatchObject({
        payload: new Error(error),
        error: true
      });
    });
  });
});
