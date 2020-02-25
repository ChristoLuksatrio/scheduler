import React from "react";
import { render, cleanup, waitForElement, fireEvent, getByText, queryByAltText, getAllByTestId, queryByText, prettyDOM, getByAltText, getByPlaceholderText } from "@testing-library/react";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";

describe("Application Reducer", () => {
  it("throws an error with an unsupported type", () => {
    expect(() => reducer({}, { type: null })).toThrowError(
      /tried to reduce with unsupported action type/i
    );
  })
})
