import Chat from "../components/Chat";
import ChatObject from "../components/ChatObject";

export default function DashboardPage() {
    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold">Dashboard</h1>
            </div>
            <ChatObject />
        </div>
    );
}
