"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true); // Ensure the theme provider is only applied on the client
  }, []);

  // Return null until the component has mounted to avoid SSR mismatch
  if (!mounted) return null;

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
