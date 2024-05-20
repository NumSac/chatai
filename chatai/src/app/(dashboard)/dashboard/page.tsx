"use client";

import { authOptions } from "@/lib/auth";
import CodePrompt from "@/components/CodePrompt";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { DashboardShell } from "@/components/DashboardShell";

export default function DashboardPage() {
  return (
    <>
      <DashboardShell>
        <h2>Dashboard - Prompt</h2>

        <CodePrompt />
      </DashboardShell>
    </>
  );
}
