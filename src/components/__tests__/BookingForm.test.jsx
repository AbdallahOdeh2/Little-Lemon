import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import BookingForm from "../BookingForm";

// Mock functions
const mockDispatch = vi.fn();
const mockSubmitForm = vi.fn();

const defaultProps = {
  availableTimes: ["17:00", "18:00", "19:00"],
  dispatch: mockDispatch,
  submitForm: mockSubmitForm,
};

describe("BookingForm Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("renders all form fields correctly", () => {
      render(<BookingForm {...defaultProps} />);

      expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/time/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/guests/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /reserve your table/i })
      ).toBeInTheDocument();
    });

    it("renders with default times when availableTimes is not provided", () => {
      render(
        <BookingForm dispatch={mockDispatch} submitForm={mockSubmitForm} />
      );

      const timeSelect = screen.getByLabelText(/time/i);
      expect(timeSelect).toBeInTheDocument();

      // Check for default times
      expect(screen.getByText("17:00")).toBeInTheDocument();
      expect(screen.getByText("21:30")).toBeInTheDocument();
    });

    it("renders with provided availableTimes", () => {
      render(<BookingForm {...defaultProps} />);

      const timeSelect = screen.getByLabelText(/time/i);
      expect(timeSelect).toBeInTheDocument();

      // Check for provided times
      expect(screen.getByText("17:00")).toBeInTheDocument();
      expect(screen.getByText("18:00")).toBeInTheDocument();
      expect(screen.getByText("19:00")).toBeInTheDocument();
    });
  });

  describe("Form Validation", () => {
    it("shows validation error when date is not selected", async () => {
      const user = userEvent.setup();
      render(<BookingForm {...defaultProps} />);

      // Fill other fields but leave date empty
      await user.selectOptions(screen.getByLabelText(/time/i), "17:00");
      await user.type(screen.getByLabelText(/guests/i), "2");
      await user.selectOptions(screen.getByLabelText(/occasion/i), "birthday");

      await user.click(
        screen.getByRole("button", { name: /reserve your table/i })
      );

      expect(screen.getByText(/please select a date/i)).toBeInTheDocument();
    });

    it("shows validation error when time is not selected", async () => {
      const user = userEvent.setup();
      render(<BookingForm {...defaultProps} />);

      // Fill other fields but leave time empty
      await user.type(screen.getByLabelText(/date/i), "2024-12-25");
      await user.type(screen.getByLabelText(/guests/i), "2");
      await user.selectOptions(screen.getByLabelText(/occasion/i), "birthday");

      await user.click(
        screen.getByRole("button", { name: /reserve your table/i })
      );

      expect(screen.getByText(/please select a time/i)).toBeInTheDocument();
    });

    it("shows validation error when guests is not entered", async () => {
      const user = userEvent.setup();
      render(<BookingForm {...defaultProps} />);

      // Fill other fields but leave guests empty
      await user.type(screen.getByLabelText(/date/i), "2024-12-25");
      await user.selectOptions(screen.getByLabelText(/time/i), "17:00");
      await user.selectOptions(screen.getByLabelText(/occasion/i), "birthday");

      await user.click(
        screen.getByRole("button", { name: /reserve your table/i })
      );

      expect(
        screen.getByText(/please enter a valid number of guests/i)
      ).toBeInTheDocument();
    });

    it("shows validation error when guests is less than 1", async () => {
      const user = userEvent.setup();
      render(<BookingForm {...defaultProps} />);

      // Fill all fields with invalid guests number
      await user.type(screen.getByLabelText(/date/i), "2024-12-25");
      await user.selectOptions(screen.getByLabelText(/time/i), "17:00");
      await user.type(screen.getByLabelText(/guests/i), "0");
      await user.selectOptions(screen.getByLabelText(/occasion/i), "birthday");

      await user.click(
        screen.getByRole("button", { name: /reserve your table/i })
      );

      expect(
        screen.getByText(/please enter a valid number of guests/i)
      ).toBeInTheDocument();
    });

    it("shows validation error when guests is more than 10", async () => {
      const user = userEvent.setup();
      render(<BookingForm {...defaultProps} />);

      // Fill all fields with invalid guests number
      await user.type(screen.getByLabelText(/date/i), "2024-12-25");
      await user.selectOptions(screen.getByLabelText(/time/i), "17:00");
      await user.type(screen.getByLabelText(/guests/i), "11");
      await user.selectOptions(screen.getByLabelText(/occasion/i), "birthday");

      await user.click(
        screen.getByRole("button", { name: /reserve your table/i })
      );

      expect(
        screen.getByText(/please enter a valid number of guests/i)
      ).toBeInTheDocument();
    });

    it("shows validation error when occasion is not selected", async () => {
      const user = userEvent.setup();
      render(<BookingForm {...defaultProps} />);

      // Fill other fields but leave occasion empty
      await user.type(screen.getByLabelText(/date/i), "2024-12-25");
      await user.selectOptions(screen.getByLabelText(/time/i), "17:00");
      await user.type(screen.getByLabelText(/guests/i), "2");

      await user.click(
        screen.getByRole("button", { name: /reserve your table/i })
      );

      expect(
        screen.getByText(/please select an occasion/i)
      ).toBeInTheDocument();
    });
  });

  describe("Form Submission", () => {
    it("submits form successfully with valid data", async () => {
      const user = userEvent.setup();
      render(<BookingForm {...defaultProps} />);

      // Fill all fields with valid data
      await user.type(screen.getByLabelText(/date/i), "2024-12-25");
      await user.selectOptions(screen.getByLabelText(/time/i), "17:00");
      await user.type(screen.getByLabelText(/guests/i), "2");
      await user.selectOptions(screen.getByLabelText(/occasion/i), "birthday");

      await user.click(
        screen.getByRole("button", { name: /reserve your table/i })
      );

      expect(mockSubmitForm).toHaveBeenCalledWith({
        date: "2024-12-25",
        time: "17:00",
        guests: "2",
        occasion: "birthday",
      });
    });

    it("resets form after successful submission", async () => {
      const user = userEvent.setup();
      mockSubmitForm.mockResolvedValueOnce();
      render(<BookingForm {...defaultProps} />);

      // Fill all fields with valid data
      await user.type(screen.getByLabelText(/date/i), "2024-12-25");
      await user.selectOptions(screen.getByLabelText(/time/i), "17:00");
      await user.type(screen.getByLabelText(/guests/i), "2");
      await user.selectOptions(screen.getByLabelText(/occasion/i), "birthday");

      await user.click(
        screen.getByRole("button", { name: /reserve your table/i })
      );

      await waitFor(() => {
        expect(screen.getByLabelText(/date/i)).toHaveValue("");
        expect(screen.getByLabelText(/time/i)).toHaveValue("");
        expect(screen.getByLabelText(/guests/i)).toHaveValue("");
        expect(screen.getByLabelText(/occasion/i)).toHaveValue("");
      });
    });

    it("handles submission errors gracefully", async () => {
      const user = userEvent.setup();
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});
      mockSubmitForm.mockRejectedValueOnce(new Error("Submission failed"));

      render(<BookingForm {...defaultProps} />);

      // Fill all fields with valid data
      await user.type(screen.getByLabelText(/date/i), "2024-12-25");
      await user.selectOptions(screen.getByLabelText(/time/i), "17:00");
      await user.type(screen.getByLabelText(/guests/i), "2");
      await user.selectOptions(screen.getByLabelText(/occasion/i), "birthday");

      await user.click(
        screen.getByRole("button", { name: /reserve your table/i })
      );

      // Wait for the async operation to complete
      await waitFor(() => {
        expect(mockSubmitForm).toHaveBeenCalled();
      });

      // Check that console.error was called
      expect(consoleSpy).toHaveBeenCalledWith(
        "Booking submission failed:",
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });
  });

  describe("User Interactions", () => {
    it("updates form data when user types in input fields", async () => {
      const user = userEvent.setup();
      render(<BookingForm {...defaultProps} />);

      const dateInput = screen.getByLabelText(/date/i);
      const guestsInput = screen.getByLabelText(/guests/i);

      await user.type(dateInput, "2024-12-25");
      await user.type(guestsInput, "5");

      expect(dateInput).toHaveValue("2024-12-25");
      expect(guestsInput).toHaveValue(5); // Number input returns number
    });

    it("updates form data when user selects options", async () => {
      const user = userEvent.setup();
      render(<BookingForm {...defaultProps} />);

      const timeSelect = screen.getByLabelText(/time/i);
      const occasionSelect = screen.getByLabelText(/occasion/i);

      await user.selectOptions(timeSelect, "18:00");
      await user.selectOptions(occasionSelect, "anniversary");

      expect(timeSelect).toHaveValue("18:00");
      expect(occasionSelect).toHaveValue("anniversary");
    });

    it("dispatches date change when date is selected", async () => {
      const user = userEvent.setup();
      render(<BookingForm {...defaultProps} />);

      const dateInput = screen.getByLabelText(/date/i);
      await user.type(dateInput, "2024-12-25");

      expect(mockDispatch).toHaveBeenCalledWith({
        type: "UPDATE_TIMES",
        payload: "2024-12-25",
      });
    });

    it("does not dispatch when dispatch function is not provided", async () => {
      const user = userEvent.setup();
      render(<BookingForm submitForm={mockSubmitForm} />);

      const dateInput = screen.getByLabelText(/date/i);
      await user.type(dateInput, "2024-12-25");

      expect(mockDispatch).not.toHaveBeenCalled();
    });
  });

  describe("Date Validation", () => {
    it("sets minimum date to today", () => {
      render(<BookingForm {...defaultProps} />);

      const dateInput = screen.getByLabelText(/date/i);
      const today = new Date().toISOString().split("T")[0];

      expect(dateInput).toHaveAttribute("min", today);
    });
  });

  describe("Accessibility", () => {
    it("has proper labels for all form fields", () => {
      render(<BookingForm {...defaultProps} />);

      expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/time/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/guests/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument();
    });

    it("has proper form structure", () => {
      render(<BookingForm {...defaultProps} />);

      // Look for the form element by its class or other attributes since role="form" might not be set
      const form = screen
        .getByRole("button", { name: /reserve your table/i })
        .closest("form");
      expect(form).toBeInTheDocument();
    });
  });
});
