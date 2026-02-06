import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import type {TanStackProviderProps} from "@/components/TanStackProvider/TanStackProvider"

export default function RootLayout({ children }:TanStackProviderProps) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>{children}</TanStackProvider>
      </body>
    </html>
  );
}
