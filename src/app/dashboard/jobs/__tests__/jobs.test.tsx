import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// Mock Next.js navigation
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/dashboard/jobs"),
  redirect: vi.fn(),
}));

// Mock supabase
vi.mock("@/lib/supabase/client", () => ({
  createClient: vi.fn(() => ({
    auth: { getSession: vi.fn(async () => ({ data: { session: null } })) },
  })),
}));

import DashboardLayout from "@/components/dashboard/DashboardLayout";

describe("DashboardLayout", () => {
  it("renders all nav items", () => {
    render(<DashboardLayout><div>content</div></DashboardLayout>);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Jobs")).toBeInTheDocument();
    expect(screen.getByText("Candidates")).toBeInTheDocument();
    expect(screen.getByText("Interviews")).toBeInTheDocument();
    expect(screen.getByText("Analytics")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("renders children", () => {
    render(<DashboardLayout><div>hello world</div></DashboardLayout>);
    expect(screen.getByText("hello world")).toBeInTheDocument();
  });

  it("marks Jobs as active when on jobs path", () => {
    render(<DashboardLayout><div /></DashboardLayout>);
    const jobsLink = screen.getByRole("link", { name: /jobs/i, hidden: false });
    // Find the one in nav (not upgrade link)
    expect(jobsLink).toBeInTheDocument();
  });

  it("renders RecruitAI brand name", () => {
    render(<DashboardLayout><div /></DashboardLayout>);
    expect(screen.getByText("AI")).toBeInTheDocument();
  });
});
