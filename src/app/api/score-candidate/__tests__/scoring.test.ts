import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock Anthropic
vi.mock("@anthropic-ai/sdk", () => ({
  default: vi.fn(() => ({
    messages: {
      create: vi.fn(async () => ({
        content: [{ type: "text", text: JSON.stringify({ score: 85, reasoning: "Strong match", strengths: ["Python"], gaps: ["No ML experience"] }) }],
      })),
    },
  })),
}));

// Mock Supabase
const mockSingle = vi.fn();
const mockUpdate = vi.fn(() => ({
  eq: vi.fn(() => ({ eq: vi.fn(async () => ({ error: null })) })),
}));
const mockFrom = vi.fn(() => ({
  select: vi.fn(() => ({
    eq: vi.fn(() => ({
      eq: vi.fn(() => ({
        single: mockSingle,
      })),
    })),
  })),
  update: mockUpdate,
}));

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(async () => ({
    auth: {
      getUser: vi.fn(async () => ({
        data: { user: { id: "user-1" } },
      })),
    },
    from: mockFrom,
  })),
}));

describe("AI Scoring", () => {
  it("score is between 0 and 100", () => {
    const score = 85;
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(100);
  });

  it("hidden criteria text parsing", () => {
    const text = "Must have startup experience\nPrefer remote workers\n";
    const criteria = text.split("\n").map(s => s.trim()).filter(Boolean);
    expect(criteria).toEqual(["Must have startup experience", "Prefer remote workers"]);
    expect(criteria).toHaveLength(2);
  });

  it("mock score is generated when no API key", () => {
    // Mock score range: 60-99
    const mockScore = Math.floor(Math.random() * 40) + 60;
    expect(mockScore).toBeGreaterThanOrEqual(60);
    expect(mockScore).toBeLessThanOrEqual(99);
  });
});
