import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { UserAccountNav } from "@/components/UserAccountNav";
import { getCurrentUser } from "@/lib/session";
import MainNav from "@/components/shared/MainNav";
import { dashboardConfig } from "@/config/dashboard";
import { DashboardNav } from "@/components/DashboardNav";
import { SocketProvider } from "@/context/SocketContext";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import React from "react";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getCurrentUser();

  const sessionToken = cookies().get("next-auth.session-token");

  if (!sessionToken) {
    return NextResponse.redirect(authOptions.pages?.signIn || "/login");
  }

  if (!user) {
    return notFound();
  }

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav items={dashboardConfig.mainNav} />
          <UserAccountNav
            user={{
              name: user.name,
              image: user.image,
              email: user.email,
            }}
          />
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          <SocketProvider jwt={sessionToken.value}>{children}</SocketProvider>
        </main>
      </div>
      <SiteFooter className="border-t" />
    </div>
  );
}
