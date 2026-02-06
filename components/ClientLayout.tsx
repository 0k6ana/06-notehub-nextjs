"use client";

import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TanStackProvider>{children}</TanStackProvider>;
}
