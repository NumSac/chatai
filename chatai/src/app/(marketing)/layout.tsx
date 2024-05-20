import MainNav from "@/components/shared/MainNav"
import { SiteFooter } from "@/components/shared/SiteFooter"
import { buttonVariants } from "@/components/ui/button"
import { mainRoutes } from "@/config/marketing"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function MarketingLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen flex-col">
            <header className="container z-40 bg-background">
                <div className="flex h-20 items-center justify-between py-6">
                    <MainNav items={mainRoutes.mainNav} />
                    <nav>
                        <Link
                            href="/login"
                            className={cn(
                                buttonVariants({ variant: "secondary", size: "sm" }),
                                "px-4"
                            )}
                        >
                            Login
                        </Link>
                    </nav>
                </div>
            </header>
            <main className="flex-1">{children}</main>
            <SiteFooter />
        </div>
    )
}