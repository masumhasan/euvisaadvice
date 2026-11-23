"use client";

import { useState } from "react";
import { STUDENT_TABS, STUDENTS } from "@/constants/mock/studioStudents";
import type { PathwayFilter, StatusFilter, Student, StudentsTab } from "@/types/students";
import { DossierDetail } from "./DossierDetail";
import { DossierTable } from "./DossierTable";
import { PipelineBanner } from "./PipelineBanner";
import { StudentFilters } from "./StudentFilters";
import { StudentKpiCards } from "./StudentKpiCards";
import { StudentsHeader } from "./StudentsHeader";

function matchesQuery(student: Student, query: string): boolean {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return [student.name, student.email, student.detail.reference].some((value) => value.toLowerCase().includes(needle));
}

export function StudentsView({ initialTab = "students" }: { initialTab?: StudentsTab } = {}) {
  const tab = initialTab;
  const [query, setQuery] = useState("");
  const [pathway, setPathway] = useState<PathwayFilter>("all");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [selectedId, setSelectedId] = useState(STUDENTS[0].id);

  const rows = STUDENTS.filter(
    (student) =>
      matchesQuery(student, query) &&
      (pathway === "all" || student.pathwayKey === pathway) &&
      (status === "all" || student.progress.status === status),
  );
  const selected = STUDENTS.find((student) => student.id === selectedId) ?? STUDENTS[0];
  const registryTitle = STUDENT_TABS.find((item) => item.id === tab)?.registryTitle ?? "Master Dossier Registry";

  function reset() {
    setQuery("");
    setPathway("all");
    setStatus("all");
  }

  return (
    <div className="relative w-full px-4 sm:px-space-lg py-space-md">
      <div className="absolute -top-12 left-1/4 w-96 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -top-6 right-1/4 w-80 h-40 bg-tertiary/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <StudentsHeader />
      <StudentKpiCards />
      <StudentFilters
        onPathwayChange={setPathway}
        onQueryChange={setQuery}
        onReset={reset}
        onStatusChange={setStatus}
        pathway={pathway}
        query={query}
        status={status}
      />
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-md">
        <div className="xl:col-span-8 flex flex-col gap-space-sm">
          <DossierTable onSelect={setSelectedId} selectedId={selected.id} students={rows} title={registryTitle} />
          <PipelineBanner />
        </div>
        <div className="xl:col-span-4 flex flex-col gap-space-md">
          <DossierDetail student={selected} />
        </div>
      </div>
    </div>
  );
}
