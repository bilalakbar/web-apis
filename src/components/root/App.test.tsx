import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders homepage", () => {
  render(<App />, { wrapper: BrowserRouter });
  expect(screen.getByText("Barcode Detection")).toBeInTheDocument();
  expect(screen.getByText("Battery")).toBeInTheDocument();
  expect(screen.getByText("Background Tasks")).toBeInTheDocument();
});
