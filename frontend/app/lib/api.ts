const API_BASE = "http://127.0.0.1:8000";

export async function getDrives(status?: string) {
  const url = status
    ? `${API_BASE}/placements/drives?status=${status}`
    : `${API_BASE}/placements/drives`;
  const res = await fetch(url, { cache: "no-store" });
  return res.json();
}

export async function getDrive(id: string) {
  const res = await fetch(`${API_BASE}/placements/drives/${id}`, { cache: "no-store" });
  return res.json();
}

export async function getEligibility(driveId: string) {
  try {
    const res = await fetch(`${API_BASE}/placements/drives/${driveId}/eligibility`, {
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("Eligibility fetch failed with status:", res.status);
      return { eligible: false, checks: [] };
    }
    return res.json();
  } catch (err) {
    console.error("Eligibility fetch threw an error:", err);
    return { eligible: false, checks: [] };
  }
}

export async function getCompany(companyId: string) {
  const res = await fetch(`${API_BASE}/placements/companies`, { cache: "no-store" });
  const companies = await res.json();
  return companies.find((c: any) => c.id === companyId);
}

export async function applyToDrive(driveId: string, resumeId: string) {
  const res = await fetch(`${API_BASE}/placements/applications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ drive_id: driveId, resume_id: resumeId }),
  });
  const data = await res.json();
  return { ok: res.ok, data };
}

export async function getMyResumes() {
  const res = await fetch(`${API_BASE}/placements/resumes`, { cache: "no-store" });
  return res.json();
}