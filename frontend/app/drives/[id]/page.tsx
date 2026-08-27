import { getDrive, getEligibility, getCompany, getMyResumes } from "../../lib/api";
import ApplyButton from "./ApplyButton";

export default async function DriveDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const drive = await getDrive(id);
  const eligibility = await getEligibility(id);
  const company = await getCompany(drive.company_id);
  const resumes = await getMyResumes();

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <h1 className="text-2xl font-bold text-gray-900">{drive.role}</h1>
        <p className="text-gray-500 mb-6">
          {company?.name} - {drive.location} - {drive.job_type}
        </p>

        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2">
            Job Description
          </h2>
          <p className="text-gray-700">{drive.job_description}</p>
          {drive.required_skills && (
            <p className="mt-2 text-sm text-gray-500">
              Required skills: {drive.required_skills.join(", ")}
            </p>
          )}
        </section>

        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2">
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
              <li key={i} className="text-sm text-gray-600">
                {check.passed ? "Yes" : "No"} - {check.criterion}: required {check.required}, yours {check.actual}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
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