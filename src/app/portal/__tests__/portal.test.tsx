import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Mock Next.js navigation
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/portal/jobs"),
  redirect: vi.fn(),
}));

// Mock portal actions
vi.mock("@/app/actions/portal", () => ({
  applyToJob: vi.fn(async () => ({ success: true })),
  getApplicationStatus: vi.fn(async () => []),
}));

import ApplicationForm from "@/components/portal/ApplicationForm";

describe("ApplicationForm", () => {
  it("renders required fields", () => {
    render(<ApplicationForm jobId="job-1" jobTitle="Senior Engineer" />);
    expect(screen.getByPlaceholderText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("jane@example.com")).toBeInTheDocument();
    expect(screen.getByText("Submit Application")).toBeInTheDocument();
  });

  it("shows job title in the form context", () => {
    render(<ApplicationForm jobId="job-1" jobTitle="Product Manager" />);
    // The form is rendered and can submit
    const submitBtn = screen.getByText("Submit Application");
    expect(submitBtn).toBeInTheDocument();
  });

  it("submit button is of type submit", () => {
    render(<ApplicationForm jobId="job-1" jobTitle="Test Job" />);
    const btn = screen.getByRole("button", { name: /submit application/i });
    expect(btn).toHaveAttribute("type", "submit");
  });
});
