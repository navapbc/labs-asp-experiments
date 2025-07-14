import Navigation from "../components/Navigation";
import { Suspense } from "react";

export default function DashboardLayout({ children } :{ children: React.ReactNode }) {
    return (
        <div className="flex flex-col h-screen">
            <Suspense fallback={<div>Loading...</div>}>
                {/* This is where the navigation component will be rendered */}
                <Navigation />
            </Suspense>
            <main className="pl-16 md:pl-64 pt-0 min-h-screen">
                <div className="max-w-6xl mx-auto p-4 md:p-8">
                    <div>{children}</div>
                </div>
            </main>
        </div>
    );
}
