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
    return <p className="text-green-700 font-medium">{message}</p>;
  }

  return (
    <div>
      <button
        onClick={handleApply}
        disabled={!eligible || status === "loading"}
        className={`px-4 py-2 rounded font-medium ${
          eligible
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        {status === "loading" ? "Applying..." : "Apply Now"}
      </button>
      {message && <p className="text-red-600 text-sm mt-2">{message}</p>}
    </div>
  );
}