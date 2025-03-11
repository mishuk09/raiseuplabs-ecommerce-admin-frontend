import { Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, CirclePlus, ChartColumnStacked, PackageCheck, LogOut, House, Menu, X } from "lucide-react";
import Dashboard from "../../components/Auth/Dashboard";
import { useState } from "react";

const sections = [
    { id: 1, name: "Product's", icon: <LayoutDashboard />, path: "/dashboard", component: <Dashboard /> },
    { id: 2, name: "Home-Offer", icon: <House />, path: "/offer" },
    { id: 3, name: "New Arrival", icon: <CirclePlus />, path: "/new" },
    { id: 4, name: "Category", icon: <ChartColumnStacked />, path: "/cate" },
    { id: 5, name: "Orders", icon: <PackageCheck />, path: "/orders" },
    { id: 6, name: "Logout", icon: <LogOut />, path: "/logout" },
];

export default function Layout() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/signin");
    };

    return (
        <div className="flex h-auto min-h-screen bg-blue-50">
            {/* Sidebar Toggle Button (Mobile) */}
            <button
                className={`md:hidden p-2 ${isOpen ? "bg-gray-800 text-white fixed top-2 left-2 z-50 rounded-lg" : "bg-gray-100 text-black fixed top-2 left-2 z-50 rounded-lg"} `}
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? (<X size={24} />) : (<Menu size={24} />)}
            </button>

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full bg-gray-800 text-white p-4 w-[250px] z-40 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform md:translate-x-0`}
            >
                <h1 className="text-xl font-bold mt-14 md:mt-0 mb-6">Admin Dashboard</h1>
                <nav className="space-y-1">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            className={`flex items-center gap-3 p-3 rounded-lg w-full text-left hover:bg-gray-700 transition 
                            ${section.name === "Logout" ? "absolute bottom-0 text-center items-center justify-center flex rounded-none bg-red-500 text-white left-0 w-full" : ""}`}
                            onClick={() => {
                                if (section.name === "Logout") {
                                    handleLogout();
                                } else {
                                    navigate(section.path);
                                    setIsOpen(false); // Close sidebar after navigation
                                }
                            }}
                        >
                            {section.icon}
                            {section.name}
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 md:ml-[250px]">
                <Outlet />
            </main>
        </div>
    );
}
