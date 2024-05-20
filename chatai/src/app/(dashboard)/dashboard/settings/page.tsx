import { DashboardShell } from "@/components/DashboardShell";
import { UserSettingsForm } from "@/components/UserSettingsForm";
import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Settings",
  description: "Manage your profile and adjustments.",
};

export default async function BillingPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  return (
    <DashboardShell>
      <h2>Settings</h2>
      <UserSettingsForm user={{ id: user.id, name: user.name || "" }} />
    </DashboardShell>
  );
}
