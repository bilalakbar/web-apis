import React from "react";
import { render, screen } from "@testing-library/react";
import Barcode from "./Battery";

test("renders base component", () => {
  render(<Barcode />);
  expect(screen.getByText("Battery Status API")).toBeInTheDocument();
});
