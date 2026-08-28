"use client";

import { useState } from "react";
import { applyToDrive } from "../../lib/api";
import {
  Send,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Sparkles,
} from "lucide-react";

export default function ApplyButton({
  driveId,
  eligible,
  resumeId,
}: {
  driveId: string;
  eligible: boolean;
  resumeId: string | null;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  async function handleApply() {
    if (!resumeId) {
      setMessage("Please upload or select an active resume first.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    try {
      const result = await applyToDrive(driveId, resumeId);

      if (result.ok) {
        setStatus("done");
        setMessage("Your application has been submitted successfully!");
      } else {
        setStatus("error");
        setMessage(result.data?.detail || "Unable to submit application. Please try again.");
      }
    } catch (err: any) {
      setStatus("error");
      setMessage("An unexpected error occurred. Please try again.");
    }
  }

  if (status === "done") {
    return (
      <div className="bg-emerald-50 border border-emerald-300/80 rounded-2xl p-5 text-center card-enter shadow-sm">
        <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-[#065f46] mx-auto mb-2.5">
          <CheckCircle2 className="w-6 h-6 text-[#059669]" />
        </div>
        <h4 className="font-extrabold text-base text-[#065f46]">
          Application Submitted!
        </h4>
        <p className="text-xs text-[#42584f] mt-1 max-w-sm mx-auto">
          {message} The placement cell and recruiter have received your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Resume Attachment Pill */}
      {resumeId ? (
        <div className="flex items-center gap-2 text-xs font-semibold text-[#065f46] bg-[#a6f2d1]/30 px-3.5 py-2 rounded-xl border border-[#065f46]/15">
          <FileText className="w-4 h-4 text-[#059669]" />
          <span>Active Resume Attached (ID: #{resumeId})</span>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 bg-amber-50 px-3.5 py-2 rounded-xl border border-amber-200">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          <span>No resume detected on your profile</span>
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={handleApply}
        disabled={!eligible || status === "loading"}
        className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 shadow-md ${
          eligible
            ? "brand-gradient-glow text-white hover:scale-[1.02] active:scale-[0.98] btn-shimmer cursor-pointer"
            : "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed shadow-none"
        }`}
      >
        {status === "loading" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-[#a6f2d1]" />
            <span>Processing Application...</span>
          </>
        ) : eligible ? (
          <>
            <Send className="w-4 h-4 text-[#a6f2d1]" />
            <span>Submit Application</span>
          </>
        ) : (
          <>
            <span>Criteria Not Met</span>
          </>
        )}
      </button>

      {/* Error Feedback */}
      {status === "error" && message && (
        <div className="flex items-start gap-2 text-xs text-rose-700 bg-rose-50 p-3 rounded-xl border border-rose-200 card-enter">
          <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
          <span>{message}</span>
        </div>
      )}
    </div>
  );
}