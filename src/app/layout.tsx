import Nav from "_/components/Nav";
import Provider from "_/components/Provider";
import "_styles/globals.css";

import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import type { FC, ReactNode } from "react";

export const metadata: Metadata = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

type Props = {
  children: ReactNode;
};

const RootLayout: FC<Props> = ({ children }) => {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
