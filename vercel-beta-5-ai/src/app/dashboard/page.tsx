import Chat from "../components/Chat";
import DashboardMain from "../components/DashboardMain";

export default function DashboardPage() {
  return (
    <div className="flex h-[calc(100vh-4rem)] pt-16 bg-gray-50 dark:bg-zinc-900">
      <Chat />
      <div className="flex-1 h-full">
        <DashboardMain />
      </div>
    </div>
  );
}
