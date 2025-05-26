import type { Metadata } from "next";
import { ReactNode } from "react";
import Providers from "./providers";

import { fonts } from "@components/styles/fonts";
import "@styles/global.css";
import { SidebarMenu } from "@components/core/sidebar/sidebar-menu";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Defense IA | Middlewares e Centrais",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br" className={fonts.nunito}>
      <body>
        <Toaster position="top-right" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
