import React from "react";
import { useRouter } from "next/navigation";

interface UnderlineButtonProps {
  children: React.ReactNode;
  path?: string;
  clickMethod?: () => void;
  view?: string;
  currentView?: string;
}

function UnderlineButton({
  children,
  path,
  clickMethod,
  view,
  currentView,
}: UnderlineButtonProps) {
  const router = useRouter();
  return (
    <a
      className={`relative group flex items-center gap-1 cursor-pointer hover:text-blue-500 ${
        view && currentView && view === currentView
          ? "text-blue-500"
          : "text-black"
      }`}
      onClick={() => {
        if (path) router.push(path);
        if (clickMethod) clickMethod();
      }}
    >
      {children}
      <span
        className={`absolute -bottom-1 left-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full ${
          view && currentView && view === currentView ? "w-full" : "w-0"
        }`}
      />
    </a>
    //w-full bg-blue-600
  );
}

export default UnderlineButton;
