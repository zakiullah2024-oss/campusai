"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
  Building2,
  CheckCircle2,
  Filter,
} from "lucide-react";

type Drive = {
  id: string | number;
  role: string;
  location: string;
  job_type: string;
  status: string;
  company_name?: string;
  package?: string;
  min_cgpa?: number;
  max_backlogs?: number;
};

export default function DriveListClient({ drives }: { drives: Drive[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredDrives = drives.filter((drive) => {
    const matchesSearch =
      drive.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drive.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (drive.company_name &&
        drive.company_name.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus =
      statusFilter === "all" ||
      drive.status.toLowerCase() === statusFilter.toLowerCase();

    const matchesType =
      typeFilter === "all" ||
      drive.job_type.toLowerCase() === typeFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Search & Filter Controls */}
      <div className="glass-card rounded-2xl p-4 flex flex-col sm:flex-row gap-3 items-center justify-between border-[#065f46]/15">
        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#647b72] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by role, location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl bg-white/80 border border-[#065f46]/20 focus:outline-none focus:ring-2 focus:ring-[#059669]/30 focus:border-[#059669] text-[#091e17] placeholder:text-[#647b72]/60"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <div className="flex items-center gap-1 bg-white/60 p-1 rounded-xl border border-[#065f46]/10 text-xs">
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                statusFilter === "all"
                  ? "bg-[#065f46] text-white shadow-sm"
                  : "text-[#42584f] hover:text-[#091e17]"
              }`}
            >
              All Status
            </button>
            <button
              onClick={() => setStatusFilter("active")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                statusFilter === "active"
                  ? "bg-[#065f46] text-white shadow-sm"
                  : "text-[#42584f] hover:text-[#091e17]"
              }`}
            >
              🟢 Active
            </button>
            <button
              onClick={() => setStatusFilter("closed")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                statusFilter === "closed"
                  ? "bg-[#065f46] text-white shadow-sm"
                  : "text-[#42584f] hover:text-[#091e17]"
              }`}
            >
              Closed
            </button>
          </div>
        </div>
      </div>

      {/* Drives Counter */}
      <div className="flex items-center justify-between text-xs font-semibold text-[#647b72] px-1">
        <span>Showing {filteredDrives.length} opportunities</span>
        {(searchTerm || statusFilter !== "all") && (
          <button
            onClick={() => {
              setSearchTerm("");
              setStatusFilter("all");
              setTypeFilter("all");
            }}
            className="text-[#065f46] hover:underline font-bold"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Drives Grid */}
      {filteredDrives.length === 0 ? (
        <div className="glass-card rounded-3xl p-12 text-center border-dashed border-2 border-[#065f46]/20">
          <Briefcase className="w-12 h-12 text-[#647b72]/40 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-[#091e17]">No drives found</h3>
          <p className="text-sm text-[#42584f] mt-1 max-w-sm mx-auto">
            Try adjusting your search query or filter settings to see available placement drives.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredDrives.map((drive, index) => {
            const isActive = drive.status.toLowerCase() === "active";
            return (
              <Link
                key={drive.id}
                href={`/drives/${drive.id}`}
                className="glass-card glass-card-hover group block rounded-3xl p-6 border-[#065f46]/15 hover:border-[#065f46]/40 transition-all card-enter"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Drive Info Left */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl brand-gradient flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-105 transition-transform flex-shrink-0">
                      {drive.role.charAt(0)}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h2 className="text-lg font-bold text-[#091e17] group-hover:text-[#065f46] transition-colors">
                          {drive.role}
                        </h2>
                        {isActive ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#a6f2d1]/50 text-[#065f46] border border-[#065f46]/20">
                            <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse" />
                            Active Now
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-200">
                            {drive.status}
                          </span>
                        )}
                      </div>

                      {/* Metadata Chips */}
                      <div className="flex flex-wrap items-center gap-3 text-xs text-[#42584f]">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#059669]" />
                          {drive.location}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-[#065f46]/20" />
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#059669]" />
                          {drive.job_type}
                        </span>
                        {drive.min_cgpa && (
                          <>
                            <span className="w-1 h-1 rounded-full bg-[#065f46]/20" />
                            <span className="font-medium text-[#065f46]">
                              Min CGPA: {drive.min_cgpa}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Apply Trigger Button */}
                  <div className="flex items-center justify-end sm:flex-shrink-0 pt-2 sm:pt-0">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#065f46] bg-[#a6f2d1]/30 group-hover:bg-[#065f46] group-hover:text-white px-4 py-2 rounded-xl border border-[#065f46]/20 transition-all">
                      <span>Check & Apply</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

