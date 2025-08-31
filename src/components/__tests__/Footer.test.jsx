import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import Footer from "../Footer";

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("Footer Component", () => {
  it("renders footer content correctly", () => {
    renderWithRouter(<Footer />);

    expect(screen.getByText("Little Lemon")).toBeInTheDocument();
  });

  it("displays restaurant description", () => {
    renderWithRouter(<Footer />);

    expect(
      screen.getByText(/family owned mediterranean restaurant/i)
    ).toBeInTheDocument();
    expect(screen.getByText("Amman, Jordan")).toBeInTheDocument();
  });

  it("shows social media icons", () => {
    renderWithRouter(<Footer />);

    // Check for social media SVG icons (they don't have text content)
    const socialLinks = screen.getAllByRole("link");
    expect(socialLinks.length).toBeGreaterThan(0);
  });

  it("has proper footer structure", () => {
    renderWithRouter(<Footer />);

    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
  });

  it("displays quick links section", () => {
    renderWithRouter(<Footer />);

    expect(screen.getByText(/quick links/i)).toBeInTheDocument();
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/menu/i)).toBeInTheDocument();
  });
});
