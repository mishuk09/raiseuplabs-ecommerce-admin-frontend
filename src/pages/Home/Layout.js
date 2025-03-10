import { Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, CirclePlus, ChartColumnStacked, PackageCheck, LogOut, House } from "lucide-react";
import Dashboard from "../../components/Auth/Dashboard";

const sections = [
    { id: 1, name: "Product's", icon: <LayoutDashboard />, path: "/dashboard", component: <Dashboard /> },
    { id: 2, name: "Home-Offer", icon: <House />, path: "/offer" },
    { id: 3, name: "Newarrival", icon: <CirclePlus />, path: "/new" },
    { id: 4, name: "Category", icon: <ChartColumnStacked />, path: "/cate" },
    { id: 5, name: "Order's", icon: <PackageCheck />, path: "/orders" },
    { id: 6, name: "Logout", icon: <LogOut />, path: "/logout" },
];

export default function Layout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/signin");
    };

    return (
        <div className="flex h-auto min-h-screen bg-blue-50">
            {/* Fixed Sidebar */}
            <aside className="w-[250px] bg-gray-800 text-white p-4 fixed top-0 h-full">
                <h1 className="text-xl font-bold mb-6">Admin Dashboard</h1>
                <nav className="space-y-1">
                    {sections.map((section) => (
                        <button
                            key={section._id}
                            className={`flex items-center gap-3 p-3 rounded-lg w-full text-left hover:bg-gray-700 transition 
                          ${section.name === "Logout" ? "absolute bottom-0 text-center items-center justify-center flex rounded-none bg-red-500   text-white  left-0 w-full" : ""}`}
                            onClick={() =>
                                section.name === "Logout" ? handleLogout() : navigate(section.path)
                            }
                        >
                            {section.icon}
                            {section.name}
                        </button>

                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 ml-[250px]">
                <Outlet />
            </main>
        </div>
    );
}
