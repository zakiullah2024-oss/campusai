import Link from "next/link";
import {
  getDrive,
  getEligibility,
  getCompany,
  getMyResumes,
} from "../../lib/api";
import ApplyButton from "./ApplyButton";
import {
  ArrowLeft,
  Building2,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Briefcase,
  Sparkles,
  ShieldCheck,
  Code2,
  Calendar,
  ExternalLink,
} from "lucide-react";

type EligibilityCheck = {
  criterion: string;
  required: string | number;
  actual: string | number;
  passed: boolean;
};

export default async function DriveDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const drive = await getDrive(id);
  const eligibility = await getEligibility(id);
  const company = await getCompany(drive.company_id);
  const resumes = await getMyResumes();

  const isEligible = eligibility?.eligible ?? false;
  const checks: EligibilityCheck[] = eligibility?.checks ?? [];

  return (
    <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-[#F4FAF7] text-[#091e17] py-8 sm:py-12">
      {/* Dynamic Ambient Glow Orbs */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-orb-mint -top-32 -right-32 pointer-events-none" />
      <div className="absolute w-[550px] h-[550px] rounded-full bg-orb-green -bottom-36 -left-36 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Breadcrumb Navigation */}
        <div>
          <Link
            href="/drives"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#065f46] hover:text-[#022c22] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Drives</span>
          </Link>
        </div>

        {/* Hero Header Card */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border-[#065f46]/15 card-enter">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl brand-gradient flex items-center justify-center text-white font-extrabold text-2xl shadow-lg flex-shrink-0">
                {company?.name ? company.name.charAt(0) : drive.role.charAt(0)}
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#091e17]">
                    {drive.role}
                  </h1>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#a6f2d1]/50 text-[#065f46] border border-[#065f46]/20">
                    <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse" />
                    {drive.status?.toUpperCase() || "ACTIVE"}
                  </span>
                </div>
                <p className="text-sm sm:text-base font-semibold text-[#42584f] flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-[#059669]" />
                  {company?.name || "Partner Company"}
                </p>
              </div>
            </div>

            {/* Quick Metadata Tags */}
            <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-2 text-xs font-medium text-[#647b72]">
              <span className="inline-flex items-center gap-1 bg-white/80 px-3 py-1.5 rounded-xl border border-[#065f46]/10">
                <MapPin className="w-3.5 h-3.5 text-[#059669]" />
                {drive.location}
              </span>
              <span className="inline-flex items-center gap-1 bg-white/80 px-3 py-1.5 rounded-xl border border-[#065f46]/10">
                <Clock className="w-3.5 h-3.5 text-[#059669]" />
                {drive.job_type}
              </span>
            </div>
          </div>
        </div>

        {/* Content Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info (Col 1 & 2) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Eligibility Matrix Card */}
            <section className="glass-card rounded-3xl p-6 sm:p-7 border-[#065f46]/15 space-y-5 card-enter">
              <div className="flex items-center justify-between border-b border-[#065f46]/10 pb-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#059669]" />
                  <h2 className="text-base font-extrabold text-[#091e17]">
                    Profile Eligibility Verification
                  </h2>
                </div>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${
                    isEligible
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                      : "bg-rose-100 text-rose-800 border border-rose-300"
                  }`}
                >
                  {isEligible ? "Status: Eligible" : "Status: Ineligible"}
                </span>
              </div>

              {/* Status Banner */}
              <div
                className={`p-4 rounded-2xl flex items-start gap-3 text-sm font-medium ${
                  isEligible
                    ? "bg-emerald-50 text-emerald-900 border border-emerald-200"
                    : "bg-rose-50 text-rose-900 border border-rose-200"
                }`}
              >
                {isEligible ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">You meet all recruitment criteria!</p>
                      <p className="text-xs text-emerald-700 mt-0.5">
                        Your CGPA and academic profile satisfy the recruiter's baseline requirements.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">Criteria Requirement Mismatch</p>
                      <p className="text-xs text-rose-700 mt-0.5">
                        One or more academic criteria do not meet the minimum requirements for this drive.
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Individual Checks Breakdown */}
              <div className="space-y-2.5">
                <p className="text-xs font-bold text-[#647b72] uppercase tracking-wider">
                  Criteria Evaluation Breakdown
                </p>
                <div className="grid gap-2">
                  {checks.map((check: EligibilityCheck, i: number) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/70 border border-[#065f46]/10 text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        {check.passed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                        )}
                        <span className="font-bold text-[#091e17]">
                          {check.criterion}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[#42584f]">
                        <span className="bg-[#f4faf7] px-2 py-0.5 rounded-md border border-[#065f46]/10">
                          Req: <strong className="text-[#091e17]">{check.required}</strong>
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-md font-semibold ${
                            check.passed
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-rose-100 text-rose-800"
                          }`}
                        >
                          You: {check.actual}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Job Description Card */}
            <section className="glass-card rounded-3xl p-6 sm:p-7 border-[#065f46]/15 space-y-4 card-enter">
              <div className="flex items-center gap-2 border-b border-[#065f46]/10 pb-3">
                <Briefcase className="w-5 h-5 text-[#059669]" />
                <h2 className="text-base font-extrabold text-[#091e17]">
                  Job Description & Overview
                </h2>
              </div>
              <p className="text-sm sm:text-[15px] leading-relaxed text-[#42584f] whitespace-pre-line">
                {drive.job_description}
              </p>

              {/* Skills Tags */}
              {drive.required_skills && drive.required_skills.length > 0 && (
                <div className="pt-4 border-t border-[#065f46]/10">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#065f46] uppercase tracking-wider mb-2.5">
                    <Code2 className="w-4 h-4 text-[#059669]" />
                    Required Tech Stack & Skills
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {drive.required_skills.map((skill: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-xl text-xs font-bold bg-[#a6f2d1]/30 text-[#065f46] border border-[#065f46]/15"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar Actions (Col 3) */}
          <div className="space-y-6">
            {/* Apply Action Card */}
            <section className="glass-card rounded-3xl p-6 border-[#065f46]/15 space-y-4 shadow-lg shadow-emerald-950/5 card-enter">
              <div className="flex items-center gap-2 border-b border-[#065f46]/10 pb-3">
                <Sparkles className="w-5 h-5 text-[#059669]" />
                <h2 className="text-base font-extrabold text-[#091e17]">
                  Application Action
                </h2>
              </div>

              <p className="text-xs text-[#647b72] leading-relaxed">
                Submit your profile and verified resume directly to {company?.name || "the recruiter"}.
              </p>

              <ApplyButton
                driveId={id}
                eligible={isEligible}
                resumeId={resumes[0]?.id ?? null}
              />
            </section>

            {/* Company Info Box */}
            <section className="glass-card rounded-3xl p-6 border-[#065f46]/15 space-y-3 card-enter">
              <div className="flex items-center gap-2 border-b border-[#065f46]/10 pb-2">
                <Building2 className="w-4 h-4 text-[#059669]" />
                <h3 className="text-xs font-bold text-[#091e17] uppercase tracking-wider">
                  About the Company
                </h3>
              </div>
              <p className="text-sm font-bold text-[#091e17]">
                {company?.name || "Verified Enterprise Partner"}
              </p>
              {company?.industry && (
                <p className="text-xs text-[#647b72]">Industry: {company.industry}</p>
              )}
              {company?.website && (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#065f46] hover:underline pt-1"
                >
                  Visit Website <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}