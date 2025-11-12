import React from "react";
import { initialSidebarState } from "@/lib/constants";
import {
  BarChart3,
  Users,
  MapPin,
  Palette,
  Award,
  FileText,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  getButtonClass: (key: keyof typeof initialSidebarState) => string;
  updateSidebar: (key: keyof typeof initialSidebarState) => void;
}

const categories = [
  { key: "Age" as const, label: "Age", icon: Calendar },
  { key: "Gender" as const, label: "Gender", icon: Users },
  { key: "Location" as const, label: "Location", icon: MapPin },
  { key: "Ethnicity" as const, label: "Ethnicity", icon: Palette },
  { key: "Degree" as const, label: "Degree", icon: Award },
  { key: "Charge" as const, label: "Charge", icon: FileText },
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
