import React from "react";
import { render, screen } from "@testing-library/react";
import Barcode from "./Barcode";

test("renders base component", () => {
  render(<Barcode />);
  expect(screen.getByText("Barcode Detection")).toBeInTheDocument();
});
