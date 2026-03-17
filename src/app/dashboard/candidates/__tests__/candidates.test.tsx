import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// Mock Next.js
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/dashboard/candidates"),
  redirect: vi.fn(),
}));

// Mock supabase
vi.mock("@/lib/supabase/client", () => ({
  createClient: vi.fn(() => ({
    auth: { getSession: vi.fn(async () => ({ data: { session: null } })) },
  })),
}));

// Mock server actions
vi.mock("@/app/actions/candidates", () => ({
  createCandidate: vi.fn(),
  updateCandidateStage: vi.fn(async () => ({ success: true })),
  deleteCandidate: vi.fn(),
}));

import PipelineBoard from "@/components/dashboard/PipelineBoard";

const STAGES = ["new", "screening", "interview", "offer", "hired", "rejected"];

describe("PipelineBoard", () => {
  it("renders all pipeline stages", () => {
    render(
      <PipelineBoard
        initialGrouped={{}}
        stages={STAGES}
      />
    );
    expect(screen.getByText("New")).toBeInTheDocument();
    expect(screen.getByText("Screening")).toBeInTheDocument();
    expect(screen.getByText("Interview")).toBeInTheDocument();
    expect(screen.getByText("Hired")).toBeInTheDocument();
  });

  it("shows candidate cards in correct stage column", () => {
    render(
      <PipelineBoard
        initialGrouped={{
          new: [{ id: "1", name: "Alice Smith", email: "a@b.com", stage: "new" }],
          screening: [],
          interview: [],
          offer: [],
          hired: [],
          rejected: [],
        }}
        stages={STAGES}
      />
    );
    expect(screen.getByText("Alice Smith")).toBeInTheDocument();
  });

  it("shows empty state when no candidates in a column", () => {
    render(<PipelineBoard initialGrouped={{}} stages={STAGES} />);
    // Should have multiple "No candidates" texts
    const empties = screen.getAllByText("No candidates");
    expect(empties.length).toBeGreaterThan(0);
  });
});
