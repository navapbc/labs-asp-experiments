import Navigation from "../components/Navigation";
import { Suspense } from "react";

export default function DashboardLayout({ children } :{ children: React.ReactNode }) {
    return (
        <div className="flex flex-col h-screen">
            <Suspense fallback={<div>Loading...</div>}>
                {/* This is where the navigation component will be rendered */}
                <Navigation />
            </Suspense>
            <main >
                <div>
                    <div>{children}</div>
                </div>
            </main>
        </div>
    );
}
