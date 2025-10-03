import { render, screen } from "@testing-library/react";
import App from "../frontend/src/App";
import { MemoryRouter } from "react-router-dom";

test("renders header and dashboard route", () => {
  render(
    <MemoryRouter initialEntries={["/dashboard"]}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByRole("banner")).toBeInTheDocument();
});