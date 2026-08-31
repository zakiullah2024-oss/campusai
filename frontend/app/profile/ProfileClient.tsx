"use client";

import { useState } from "react";
import {
  updateMyProfile,
  uploadResumeFile,
  getResumeDownloadUrl,
} from "../lib/api";
import {
  User,
  Mail,
  GraduationCap,
  Building2,
  MapPin,
  FileText,
  Upload,
  Download,
  Edit3,
  Check,
  X,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Globe,
  Link2,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

type Profile = {
  id?: string;
  department?: string | null;
  graduation_year?: number | null;
  linkedin_url?: string | null;
  github_url?: string | null;
  portfolio_url?: string | null;
  preferred_role?: string | null;
  preferred_location?: string | null;
  preferred_industry?: string | null;
  work_preference?: string | null;
  cgpa?: string | number | null;
  has_active_backlog?: boolean | null;
};

type Resume = {
  id: string;
  title: string;
  template: string;
  is_default: boolean;
  career_summary?: string | null;
  file_path?: string | null;
  original_filename?: string | null;
};

export default function ProfileClient({
  initialProfile,
  initialResumes,
}: {
  initialProfile: Profile | null;
  initialResumes: Resume[];
}) {
  const [profile, setProfile] = useState<Profile>(
    initialProfile || {
      department: "",
      graduation_year: 2026,
      linkedin_url: "",
      github_url: "",
      portfolio_url: "",
      preferred_role: "",
      preferred_location: "",
      preferred_industry: "",
      work_preference: "full_time",
      cgpa: "",
      has_active_backlog: false,
    }
  );

  const [resumes, setResumes] = useState<Resume[]>(initialResumes);
  const [isEditing, setIsEditing] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMessage, setProfileMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [uploadingResumeId, setUploadingResumeId] = useState<string | null>(
    null
  );
  const [uploadMessage, setUploadMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Form State
  const [formData, setFormData] = useState<Profile>(profile);

  function handleInputChange(
    field: keyof Profile,
    value: string | number | boolean | null
  ) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    setSavingProfile(true);
    setProfileMessage(null);

    const payload = {
      ...formData,
      graduation_year: formData.graduation_year
        ? Number(formData.graduation_year)
        : null,
      cgpa: formData.cgpa ? Number(formData.cgpa) : null,
    };

    const res = await updateMyProfile(payload);
    setSavingProfile(false);

    if (res.ok) {
      setProfile(res.data);
      setIsEditing(false);
      setProfileMessage({
        type: "success",
        text: "Placement profile updated successfully!",
      });
    } else {
      setProfileMessage({
        type: "error",
        text: res.data?.detail || "Failed to update profile. Please try again.",
      });
    }
  }

  async function handleFileUpload(
    resumeId: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".pdf") && file.type !== "application/pdf") {
      setUploadMessage({
        type: "error",
        text: "Only PDF files are allowed.",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadMessage({
        type: "error",
        text: "File size exceeds the 5MB limit.",
      });
      return;
    }

    setUploadingResumeId(resumeId);
    setUploadMessage(null);

    const res = await uploadResumeFile(resumeId, file);
    setUploadingResumeId(null);

    if (res.ok) {
      setResumes((prev) =>
        prev.map((r) => (r.id === resumeId ? res.data : r))
      );
      setUploadMessage({
        type: "success",
        text: `Resume "${file.name}" uploaded successfully!`,
      });
    } else {
      setUploadMessage({
        type: "error",
        text: res.data?.detail || "Upload failed. Please try again.",
      });
    }

    // Reset input
    e.target.value = "";
  }

  return (
    <div className="space-y-8">
      {/* SECTION 1: Profile Information & Edit Form */}
      <section className="glass-card rounded-3xl p-6 sm:p-8 border-[#065f46]/15 card-enter">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#065f46]/10 pb-6 mb-6">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl brand-gradient flex items-center justify-center text-white text-xl font-black shadow-md">
              <User className="w-7 h-7 text-[#a6f2d1]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-[#091e17]">
                  Academic & Placement Profile
                </h2>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#065f46] bg-[#a6f2d1]/40 px-2.5 py-0.5 rounded-full border border-[#065f46]/15">
                  <ShieldCheck className="w-3 h-3 text-[#059669]" /> Verified
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#42584f]">
                Manage your academic credentials, target roles, and recruiter contact links.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              if (isEditing) {
                setFormData(profile);
              }
              setIsEditing(!isEditing);
              setProfileMessage(null);
            }}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all self-start sm:self-auto ${
              isEditing
                ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                : "brand-gradient text-white hover:scale-[1.02] shadow-sm"
            }`}
          >
            {isEditing ? (
              <>
                <X className="w-4 h-4" /> Cancel Edit
              </>
            ) : (
              <>
                <Edit3 className="w-4 h-4 text-[#a6f2d1]" /> Edit Profile
              </>
            )}
          </button>
        </div>

        {/* Feedback Alert */}
        {profileMessage && (
          <div
            className={`mb-6 p-4 rounded-2xl flex items-start gap-2.5 text-xs sm:text-sm font-semibold card-enter ${
              profileMessage.type === "success"
                ? "bg-emerald-50 text-emerald-900 border border-emerald-200"
                : "bg-rose-50 text-rose-900 border border-rose-200"
            }`}
          >
            {profileMessage.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
            )}
            <span>{profileMessage.text}</span>
          </div>
        )}

        {/* DISPLAY MODE OR EDIT FORM */}
        {!isEditing ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Card: Academic Stats */}
            <div className="bg-white/70 rounded-2xl p-5 border border-[#065f46]/10 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#065f46] uppercase tracking-wider">
                <GraduationCap className="w-4 h-4 text-[#059669]" />
                Academic Details
              </div>
              <div className="space-y-2 text-xs sm:text-sm">
                <div>
                  <span className="text-[#647b72] block text-[11px] font-semibold">Department</span>
                  <span className="font-bold text-[#091e17]">
                    {profile.department || "Not specified"}
                  </span>
                </div>
                <div>
                  <span className="text-[#647b72] block text-[11px] font-semibold">Graduation Year</span>
                  <span className="font-bold text-[#091e17]">
                    {profile.graduation_year || "Not specified"}
                  </span>
                </div>
                <div>
                  <span className="text-[#647b72] block text-[11px] font-semibold">Cumulative CGPA</span>
                  <span className="font-extrabold text-[#065f46] text-base">
                    {profile.cgpa ? `${profile.cgpa} / 10.0` : "Not provided"}
                  </span>
                </div>
              </div>
            </div>

            {/* Card: Career Preferences */}
            <div className="bg-white/70 rounded-2xl p-5 border border-[#065f46]/10 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#065f46] uppercase tracking-wider">
                <Building2 className="w-4 h-4 text-[#059669]" />
                Job Preferences
              </div>
              <div className="space-y-2 text-xs sm:text-sm">
                <div>
                  <span className="text-[#647b72] block text-[11px] font-semibold">Preferred Role</span>
                  <span className="font-bold text-[#091e17]">
                    {profile.preferred_role || "Open to opportunities"}
                  </span>
                </div>
                <div>
                  <span className="text-[#647b72] block text-[11px] font-semibold">Preferred Location</span>
                  <span className="font-bold text-[#091e17]">
                    {profile.preferred_location || "Flexible"}
                  </span>
                </div>
                <div>
                  <span className="text-[#647b72] block text-[11px] font-semibold">Backlog Status</span>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold ${
                      profile.has_active_backlog
                        ? "bg-rose-100 text-rose-800"
                        : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    {profile.has_active_backlog
                      ? "Active Backlog Reported"
                      : "Zero Standing Backlogs"}
                  </span>
                </div>
              </div>
            </div>

            {/* Card: Portfolio & Links */}
            <div className="bg-white/70 rounded-2xl p-5 border border-[#065f46]/10 space-y-3 md:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 text-xs font-bold text-[#065f46] uppercase tracking-wider">
                <Globe className="w-4 h-4 text-[#059669]" />
                Professional Links
              </div>
              <div className="space-y-2 text-xs sm:text-sm">
                <div>
                  <span className="text-[#647b72] block text-[11px] font-semibold">LinkedIn</span>
                  {profile.linkedin_url ? (
                    <a
                      href={profile.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#065f46] hover:underline font-bold flex items-center gap-1.5 truncate"
                    >
                      <Link2 className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">{profile.linkedin_url}</span>
                    </a>
                  ) : (
                    <span className="text-[#647b72] italic">Not added</span>
                  )}
                </div>
                <div>
                  <span className="text-[#647b72] block text-[11px] font-semibold">GitHub</span>
                  {profile.github_url ? (
                    <a
                      href={profile.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#065f46] hover:underline font-bold flex items-center gap-1.5 truncate"
                    >
                      <Globe className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">{profile.github_url}</span>
                    </a>
                  ) : (
                    <span className="text-[#647b72] italic">Not added</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* EDIT FORM */
          <form onSubmit={handleSaveProfile} className="space-y-6 card-enter">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Preferred Role */}
              <div>
                <label className="block text-xs font-bold text-[#091e17] uppercase tracking-wider mb-1.5">
                  Preferred Role
                </label>
                <input
                  type="text"
                  value={formData.preferred_role || ""}
                  onChange={(e) =>
                    handleInputChange("preferred_role", e.target.value)
                  }
                  placeholder="e.g. Software Engineer, Data Scientist"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#065f46]/20 focus:outline-none focus:ring-2 focus:ring-[#059669]/30 focus:border-[#059669] text-sm text-[#091e17]"
                />
              </div>

              {/* Preferred Location */}
              <div>
                <label className="block text-xs font-bold text-[#091e17] uppercase tracking-wider mb-1.5">
                  Preferred Location
                </label>
                <input
                  type="text"
                  value={formData.preferred_location || ""}
                  onChange={(e) =>
                    handleInputChange("preferred_location", e.target.value)
                  }
                  placeholder="e.g. Bangalore, Hyderabad, Remote"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#065f46]/20 focus:outline-none focus:ring-2 focus:ring-[#059669]/30 focus:border-[#059669] text-sm text-[#091e17]"
                />
              </div>

              {/* CGPA */}
              <div>
                <label className="block text-xs font-bold text-[#091e17] uppercase tracking-wider mb-1.5">
                  CGPA (Out of 10.0)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="10"
                  value={formData.cgpa ?? ""}
                  onChange={(e) => handleInputChange("cgpa", e.target.value)}
                  placeholder="e.g. 8.75"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#065f46]/20 focus:outline-none focus:ring-2 focus:ring-[#059669]/30 focus:border-[#059669] text-sm text-[#091e17]"
                />
              </div>

              {/* Department */}
              <div>
                <label className="block text-xs font-bold text-[#091e17] uppercase tracking-wider mb-1.5">
                  Department / Branch
                </label>
                <input
                  type="text"
                  value={formData.department || ""}
                  onChange={(e) =>
                    handleInputChange("department", e.target.value)
                  }
                  placeholder="e.g. Computer Science and Engineering"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#065f46]/20 focus:outline-none focus:ring-2 focus:ring-[#059669]/30 focus:border-[#059669] text-sm text-[#091e17]"
                />
              </div>

              {/* Graduation Year */}
              <div>
                <label className="block text-xs font-bold text-[#091e17] uppercase tracking-wider mb-1.5">
                  Graduation Year
                </label>
                <input
                  type="number"
                  min="2020"
                  max="2035"
                  value={formData.graduation_year ?? ""}
                  onChange={(e) =>
                    handleInputChange("graduation_year", e.target.value)
                  }
                  placeholder="e.g. 2026"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#065f46]/20 focus:outline-none focus:ring-2 focus:ring-[#059669]/30 focus:border-[#059669] text-sm text-[#091e17]"
                />
              </div>

              {/* Backlog Checkbox */}
              <div className="flex items-center gap-3 pt-6">
                <input
                  type="checkbox"
                  id="has_active_backlog"
                  checked={formData.has_active_backlog || false}
                  onChange={(e) =>
                    handleInputChange("has_active_backlog", e.target.checked)
                  }
                  className="w-4 h-4 text-[#065f46] rounded focus:ring-[#059669]"
                />
                <label
                  htmlFor="has_active_backlog"
                  className="text-xs font-bold text-[#091e17]"
                >
                  Has Active / Standing Backlogs
                </label>
              </div>

              {/* LinkedIn URL */}
              <div>
                <label className="block text-xs font-bold text-[#091e17] uppercase tracking-wider mb-1.5">
                  LinkedIn Profile URL
                </label>
                <input
                  type="url"
                  value={formData.linkedin_url || ""}
                  onChange={(e) =>
                    handleInputChange("linkedin_url", e.target.value)
                  }
                  placeholder="https://linkedin.com/in/username"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#065f46]/20 focus:outline-none focus:ring-2 focus:ring-[#059669]/30 focus:border-[#059669] text-sm text-[#091e17]"
                />
              </div>

              {/* GitHub URL */}
              <div>
                <label className="block text-xs font-bold text-[#091e17] uppercase tracking-wider mb-1.5">
                  GitHub Profile URL
                </label>
                <input
                  type="url"
                  value={formData.github_url || ""}
                  onChange={(e) =>
                    handleInputChange("github_url", e.target.value)
                  }
                  placeholder="https://github.com/username"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#065f46]/20 focus:outline-none focus:ring-2 focus:ring-[#059669]/30 focus:border-[#059669] text-sm text-[#091e17]"
                />
              </div>
            </div>

            {/* Form Action Buttons */}
            <div className="flex items-center gap-3 pt-4 border-t border-[#065f46]/10">
              <button
                type="submit"
                disabled={savingProfile}
                className="brand-gradient-glow text-white font-bold text-sm px-6 py-2.5 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 btn-shimmer"
              >
                {savingProfile ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#a6f2d1]" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 text-[#a6f2d1]" />
                    <span>Save Profile Changes</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setFormData(profile);
                  setIsEditing(false);
                }}
                className="bg-white text-gray-700 border border-gray-300 font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </section>

      {/* SECTION 2: Resumes & PDF File Management */}
      <section className="glass-card rounded-3xl p-6 sm:p-8 border-[#065f46]/15 card-enter">
        <div className="border-b border-[#065f46]/10 pb-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl brand-gradient flex items-center justify-center text-white shadow-md">
              <FileText className="w-6 h-6 text-[#a6f2d1]" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#091e17]">
                Placement Resumes & PDF Documents
              </h2>
              <p className="text-xs sm:text-sm text-[#42584f]">
                Upload official PDF resumes to attach when applying for placement drives.
              </p>
            </div>
          </div>
        </div>

        {/* Upload Feedback Alert */}
        {uploadMessage && (
          <div
            className={`mb-6 p-4 rounded-2xl flex items-start gap-2.5 text-xs sm:text-sm font-semibold card-enter ${
              uploadMessage.type === "success"
                ? "bg-emerald-50 text-emerald-900 border border-emerald-200"
                : "bg-rose-50 text-rose-900 border border-rose-200"
            }`}
          >
            {uploadMessage.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
            )}
            <span>{uploadMessage.text}</span>
          </div>
        )}

        {/* Resumes List */}
        {resumes.length === 0 ? (
          <div className="bg-white/60 rounded-2xl p-8 text-center border-dashed border-2 border-[#065f46]/20">
            <FileText className="w-10 h-10 text-[#647b72]/40 mx-auto mb-2" />
            <p className="text-sm font-bold text-[#091e17]">No resumes created yet</p>
            <p className="text-xs text-[#42584f] mt-1">
              Create a resume entry in the portal to attach your PDF documents.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {resumes.map((resume) => {
              const hasPdf = Boolean(resume.file_path);
              const isUploading = uploadingResumeId === resume.id;

              return (
                <div
                  key={resume.id}
                  className="bg-white/80 rounded-2xl p-5 sm:p-6 border border-[#065f46]/15 hover:border-[#065f46]/35 transition-all space-y-4 shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* Resume Info */}
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-extrabold text-base text-[#091e17]">
                          {resume.title}
                        </h3>
                        {resume.is_default && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#a6f2d1]/50 text-[#065f46] border border-[#065f46]/20">
                            DEFAULT RESUME
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-gray-100 text-gray-600 uppercase">
                          {resume.template}
                        </span>
                      </div>

                      {resume.career_summary && (
                        <p className="text-xs text-[#42584f] line-clamp-2">
                          {resume.career_summary}
                        </p>
                      )}

                      {/* PDF File Info */}
                      <div className="pt-1 flex items-center gap-2 text-xs">
                        {hasPdf ? (
                          <span className="inline-flex items-center gap-1.5 font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            PDF Stored: {resume.original_filename || `${resume.title}.pdf`}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                            No PDF attached
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions: Download / Upload */}
                    <div className="flex flex-wrap items-center gap-2.5 sm:flex-shrink-0">
                      {hasPdf && (
                        <a
                          href={getResumeDownloadUrl(resume.id)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 bg-white border border-[#065f46]/25 text-[#065f46] hover:bg-[#e6faf1] px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm"
                        >
                          <Download className="w-3.5 h-3.5 text-[#059669]" />
                          Download PDF
                        </a>
                      )}

                      {/* File Upload Input */}
                      <label className="inline-flex items-center gap-1.5 brand-gradient text-white px-4 py-2 rounded-xl text-xs font-bold cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all shadow-sm">
                        {isUploading ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin text-[#a6f2d1]" />
                            <span>Uploading...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-3.5 h-3.5 text-[#a6f2d1]" />
                            <span>{hasPdf ? "Replace PDF" : "Upload PDF"}</span>
                          </>
                        )}
                        <input
                          type="file"
                          accept=".pdf,application/pdf"
                          disabled={isUploading}
                          onChange={(e) => handleFileUpload(resume.id, e)}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
