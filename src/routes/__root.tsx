import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { PropsWithChildren, useEffect } from "react";

import Header from "../components/Header";
import { initializeCartDB } from "../db/cart.db";

import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "TanStack Start Shop" }
    ],
    links: [{ rel: "stylesheet", href: appCss }]
  }),

  shellComponent: RootDocument
});

function RootDocument({ children }: PropsWithChildren) {
  // Initialize cart database on app start
  useEffect(() => {
    initializeCartDB();
  }, []);

  return (
    <html lang='en'>
      <head>
        <HeadContent />
      </head>
      <body>
        <Header />
        {children}
        <TanStackDevtools
          config={{ position: "bottom-right" }}
          plugins={[{ name: "Tanstack Router", render: <TanStackRouterDevtoolsPanel /> }]}
        />
        <Scripts />
      </body>
    </html>
  );
}
