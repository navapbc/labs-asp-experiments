"use client";

import { useState } from "react";

export default function DashboardMain() {
  const [activeTab, setActiveTab] = useState<"iframe" | "form">("iframe");

  return (
    <div className="w-full h-full flex flex-col">
      {/* Tabs */}
      <div className="flex border-b border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800">
        <button
          className={`px-6 py-3 text-sm font-medium focus:outline-none transition-colors border-b-2 ${
            activeTab === "iframe"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-zinc-600 dark:text-zinc-300 hover:text-indigo-500"
          }`}
          onClick={() => setActiveTab("iframe")}
        >
          BenefitsCal Login
        </button>
        <button
          className={`px-6 py-3 text-sm font-medium focus:outline-none transition-colors border-b-2 ${
            activeTab === "form"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-zinc-600 dark:text-zinc-300 hover:text-indigo-500"
          }`}
          onClick={() => setActiveTab("form")}
        >
          Form Fill Out
        </button>
      </div>
      {/* Tab Content */}
      <div className="flex-1 w-full h-full bg-gray-100 dark:bg-zinc-900 p-6">
        {activeTab === "iframe" ? (
          <iframe
            src="https://benefitscal.com/Public/login?lang=en"
            title="BenefitsCal Login"
            className="w-full h-full min-h-[600px] border-0 rounded-lg shadow-lg bg-white"
            style={{ minHeight: '600px' }}
            allowFullScreen
          />
        ) : (
          <div className="max-w-xl mx-auto bg-white dark:bg-zinc-800 rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Form Fill Out</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="exampleInput" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Example Input
                </label>
                <input
                  id="exampleInput"
                  name="exampleInput"
                  type="text"
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-zinc-900 dark:text-white"
                  placeholder="Type something..."
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
