import React from "react";
import { useRouter } from "next/navigation";

interface UnderlineButtonProps {
  children: React.ReactNode;
  path: string;
}

function UnderlineButton({ children, path }: UnderlineButtonProps) {
  const router = useRouter();
  return (
    <a
      className="relative group flex items-center gap-2 cursor-pointer"
      onClick={() => router.push(path)}
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full" />
    </a>
  );
}

export default UnderlineButton;
