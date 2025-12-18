import { Button } from "@/components/ui/button";
import { initialSidebarState } from "@/lib/constants";
import { BarChart3, Calendar, MapPin, Palette, Users } from "lucide-react";

interface SidebarProps {
  getButtonClass: (key: keyof typeof initialSidebarState) => string;
  updateSidebar: (key: keyof typeof initialSidebarState) => void;
}

const categories = [
  { key: "Arrest Logs" as const, label: "Arrest Logs", icon: Calendar },
  {
    key: "Police Complaints" as const,
    label: "Police Complaints",
    icon: Users,
  },
  { key: "Police Pursuits" as const, label: "Police Pursuits", icon: MapPin },
  { key: "Use of Force" as const, label: "Use of Force", icon: Palette },
];

export function Sidebar({ getButtonClass, updateSidebar }: SidebarProps) {
  return (
    <aside className="bg-white shadow-sm border border-gray-200 rounded-xl p-4 h-fit sticky top-24">
      {/* Header */}
      <div className="flex items-center gap-2 pb-4 mb-4 border-b border-gray-200">
        <div className="p-2 bg-gray-100 rounded-lg">
          <BarChart3 className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h2 className="font-semibold text-gray-900">Data Insights</h2>
          <p className="text-xs text-gray-500">Select a category</p>
        </div>
      </div>

      {/* Category Buttons */}
      <nav className="flex flex-col gap-1.5">
        {categories.map(({ key, label, icon: Icon }) => (
          <Button
            key={key}
            variant="ghost"
            className={`
              justify-start gap-3 h-auto py-3 px-3
              hover:bg-gray-100 hover:text-blue-700
              transition-all duration-200
              ${getButtonClass(key)}
            `}
            onClick={() => {
              updateSidebar(key);
            }}
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            <span className="font-medium">{label}</span>
          </Button>
        ))}
      </nav>

      {/* Optional: Stats Summary Footer */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          View analytics by category
        </p>
      </div>
    </aside>
  );
}
