import { getDrive, getEligibility, getCompany, getMyResumes } from "../../lib/api";
import ApplyButton from "./ApplyButton";

export default async function DriveDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const drive = await getDrive(id);
  const eligibility = await getEligibility(id);
  const company = await getCompany(drive.company_id);
  const resumes = await getMyResumes();

  return (
    <main className="relative min-h-screen overflow-hidden py-10">
      <div className="absolute w-96 h-96 rounded-full bg-orb-mint -top-20 -right-20" />
      <div className="absolute w-96 h-96 rounded-full bg-orb-green -bottom-20 -left-20" />

      <div className="relative z-10 max-w-2xl mx-auto glass-card p-8">
        <h1 className="text-2xl font-bold text-[#0D1C17]">{drive.role}</h1>
        <p className="text-[#4B5C55] mb-6">
          {company?.name} - {drive.location} - {drive.job_type}
        </p>

        <section className="mb-6">
          <h2 className="text-sm font-semibold text-[#0D1C17] uppercase tracking-wide mb-2">
            Job Description
          </h2>
          <p className="text-[#0D1C17]">{drive.job_description}</p>
          {drive.required_skills && (
            <p className="mt-2 text-sm text-[#4B5C55]">
              Required skills: {drive.required_skills.join(", ")}
            </p>
          )}
        </section>

        <section className="mb-6">
          <h2 className="text-sm font-semibold text-[#0D1C17] uppercase tracking-wide mb-2">
            Eligibility
          </h2>
          <div
            className={`p-3 rounded-lg mb-3 font-medium ${
              eligibility.eligible
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {eligibility.eligible ? "You are eligible" : "You are not eligible"}
          </div>
          <ul className="space-y-1">
            {eligibility.checks.map((check: any, i: number) => (
              <li key={i} className="text-sm text-[#4B5C55]">
                {check.passed ? "Yes" : "No"} - {check.criterion}: required {check.required}, yours {check.actual}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-[#0D1C17] uppercase tracking-wide mb-3">
            Apply
          </h2>
          <ApplyButton
            driveId={id}
            eligible={eligibility.eligible}
            resumeId={resumes[0]?.id ?? null}
          />
        </section>
      </div>
    </main>
  );
}