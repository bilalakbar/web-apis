import React from "react";
import { HashRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders homepage", () => {
  render(<App />, { wrapper: HashRouter });
  expect(screen.getByText("Barcode Detection")).toBeInTheDocument();
  expect(screen.getByText("Battery")).toBeInTheDocument();
  expect(screen.getByText("Background Tasks")).toBeInTheDocument();
});
