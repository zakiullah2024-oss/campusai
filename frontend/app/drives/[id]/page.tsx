import { getDrive, getEligibility, getCompany, getMyResumes } from "../../lib/api";
import ApplyButton from "./ApplyButton";

export default async function DriveDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const drive = await getDrive(id);
  const eligibility = await getEligibility(id);
  const company = await getCompany(drive.company_id);
  const resumes = await getMyResumes();

  return (
    <main className="p-8 max-w-3xl mx-auto text-gray-900 bg-white rounded-lg my-8">
      <h1 className="text-2xl font-bold">{drive.role}</h1>
      <p className="text-gray-600 mb-4">
        {company?.name} · {drive.location} · {drive.job_type}
      </p>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Job Description</h2>
        <p className="text-gray-800">{drive.job_description}</p>
        {drive.required_skills && (
          <p className="mt-2 text-sm text-gray-600">
            Required skills: {drive.required_skills.join(", ")}
          </p>
        )}
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Eligibility</h2>
        <div
          className={`p-3 rounded mb-3 font-medium ${
            eligibility.eligible ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {eligibility.eligible ? "You are eligible" : "You are not eligible"}
        </div>
        <ul className="space-y-1">
          {eligibility.checks.map((check: any, i: number) => (
            <li key={i} className="text-sm">
              {check.passed ? "✓" : "✗"} {check.criterion} — required: {check.required}, yours:{" "}
              {check.actual}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Apply</h2>
        <ApplyButton
          driveId={id}
          eligible={eligibility.eligible}
          resumeId={resumes[0]?.id ?? null}
        />
      </section>
    </main>
  );
}