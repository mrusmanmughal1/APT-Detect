import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Home, Monitor, Search, FileText, Settings, Brain } from "lucide-react";

export default function Sidebar() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  const menuItems = [
    // { icon: Home, text: 'Dashboard', path: '/dashboard' },
    {
      icon: Monitor,
      text: "Traffic Monitoring",
      path: "/dashboard/monitoring",
    },
    { icon: Search, text: "Forensic Analysis", path: "/dashboard/analysis" },
    { icon: FileText, text: "Report", path: "/dashboard/report" },
    // { icon: Settings, text: "Settings", path: "/dashboard/settings" },
  ];

  return (
    <div
      className={`${
        isNavExpanded ? "w-64" : "w-16"
      } transition-all duration-300 bg-[#001529] relative group`}
      onMouseEnter={() => setIsNavExpanded(true)}
      onMouseLeave={() => setIsNavExpanded(false)}
    >
      <div className="h-full w-16 bg-[#001529] fixed left-0 flex flex-col gap-8 py-6">
        <div className="px-4">
          <Brain className="text-white w-6 h-6" />
        </div>
        {menuItems.map(({ icon: Icon }, index) => (
          <div key={index} className="px-4">
            <Icon className="text-white w-6 h-6" />
          </div>
        ))}
      </div>

      <div
        className={`${
          isNavExpanded
            ? "opacity-100 translate-x-16"
            : "opacity-0 translate-x-0"
        } transition-all duration-300 fixed left-0 h-full w-[13%] flex flex-col gap-8 py-6 pl-4 bg-[#001529] text-white z-10`}
      >
        <div className="h-6"></div>
        {menuItems.map(({ text, path }, index) => (
          <NavLink  to={path} key={index} className="h-6 flex items-center cursor-pointer">
            {text}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
