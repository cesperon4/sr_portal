"use client";

import { useId } from "react";

export interface LogoMarkProps {
  /** Size of the logo (square). Default 40. */
  size?: number;
  /** Optional CSS class for the wrapper (e.g. for layout). */
  className?: string;
  /** Show "SR Portal" text next to the mark. */
  showLabel?: boolean;
  /** Label text when showLabel is true. Default "SR Portal". */
  label?: string;
  /** Use as link (e.g. to home or #hero). */
  href?: string;
}

/**
 * Reusable SR Portal logo mark. Use in header, footer, auth pages, etc.
 * Fits white/blue data theme — geometric "portal" + data grid in brand blue.
 */
export function LogoMark({
  size = 40,
  className = "",
  showLabel = false,
  label = "SR Portal",
  href,
}: LogoMarkProps) {
  const gradientId = useId().replace(/:/g, "");

  const mark = (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 rounded-xl"
      style={{ width: size, height: size }}
      aria-hidden
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgb(59, 130, 246)" />
          <stop offset="100%" stopColor="rgb(99, 102, 241)" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="36" height="36" rx="10" fill={`url(#${gradientId})`} />
      <path
        d="M12 14h16M12 20h16M12 26h10"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.95"
      />
      <path
        d="M28 24a4 4 0 1 1 0 8"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
        opacity="0.9"
      />
    </svg>
  );

  const content = (
    <>
      {mark}
      {showLabel && (
        <span className="text-inherit font-semibold tracking-tight">{label}</span>
      )}
    </>
  );

  const wrapperClassName = `inline-flex items-center gap-2 ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={wrapperClassName} aria-label={label}>
        {content}
      </a>
    );
  }

  return <span className={wrapperClassName}>{content}</span>;
}
