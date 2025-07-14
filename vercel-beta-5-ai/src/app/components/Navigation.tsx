"use client";

import {
ArrowLeftOnRectangleIcon,
Bars3Icon,
Cog6ToothIcon,
HomeIcon,
UserIcon,
XMarkIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";

const navItems = [
{ name: "Home", icon: HomeIcon },
{ name: "Profile", icon: UserIcon },
{ name: "Settings", icon: Cog6ToothIcon },
{ name: "Logout", icon: ArrowLeftOnRectangleIcon },
];

export default function Navigation() {
const [collapsed, setCollapsed] = useState(false);

return (
    <nav
        className={`fixed top-0 left-0 h-screen bg-gray-900 text-white transition-all duration-300 z-40 ${
            collapsed ? "w-20" : "w-64"
        } flex flex-col`}
    >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-800">
            {!collapsed && <span className="text-xl font-bold">Dashboard</span>}
            <button
                onClick={() => setCollapsed((c) => !c)}
                className="p-2 rounded hover:bg-gray-800 focus:outline-none"
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
                {collapsed ? (
                    <Bars3Icon className="h-6 w-6" />
                ) : (
                    <XMarkIcon className="h-6 w-6" />
                )}
            </button>
        </div>
        <ul className="flex-1 mt-4 space-y-2">
            {navItems.map((item) => (
                <li key={item.name}>
                    <a
                        href="#"
                        className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        <item.icon className="h-6 w-6" />
                        {!collapsed && (
                            <span className="ml-4 text-base font-medium">{item.name}</span>
                        )}
                    </a>
                </li>
            ))}
        </ul>
    </nav>
);
}