import { ChatSettingsForm } from "@/components/ChatSettingsForm";
import { DashboardShell } from "@/components/DashboardShell";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export const metadata = {
  title: "Settings",
  description: "Manage your profile and adjustments.",
};

export default async function ChatSettingsPage() {
  const userSession = await getCurrentUser();

  if (!userSession) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const settings: any = await db.settings.findUnique({
    where: { userId: userSession.id },
  });

  return (
    <DashboardShell>
      <h2>Settings</h2>
      <ChatSettingsForm userId={userSession.id} settings={settings} />
    </DashboardShell>
  );
}
