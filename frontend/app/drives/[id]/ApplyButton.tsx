"use client";

import { useState } from "react";
import { applyToDrive } from "../../lib/api";

export default function ApplyButton({
  driveId,
  eligible,
  resumeId,
}: {
  driveId: string;
  eligible: boolean;
  resumeId: string | null;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleApply() {
    if (!resumeId) {
      setMessage("You need a resume before applying.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    const result = await applyToDrive(driveId, resumeId);

    if (result.ok) {
      setStatus("done");
      setMessage("Application submitted successfully!");
    } else {
      setStatus("error");
      setMessage(result.data.detail || "Something went wrong.");
    }
  }

  if (status === "done") {
    return <p className="text-[#065F46] font-medium">{message}</p>;
  }

  return (
    <div>
      <button
        onClick={handleApply}
        disabled={!eligible || status === "loading"}
        className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition ${
          eligible
            ? "bg-[#065F46] text-white hover:bg-[#054a37]"
            : "bg-gray-200 text-gray-500 cursor-not-allowed"
        }`}
      >
        {status === "loading" ? "Applying..." : "Apply Now"}
      </button>
      {message && <p className="text-[#B24A3B] text-sm mt-2">{message}</p>}
    </div>
  );
}