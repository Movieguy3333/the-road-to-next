import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Road Next",
  description: "My Road to Next application",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      /* Note
       Need to add suppressHydrationWarning to avoid hydration issues with chrome extension Dark Reader.
       Because you have the Dark Reader extension enabled, it aggressively injects these attributes into the <html> tag of your document before React has a chance to finish hydrating. React sees the mismatch between what the server sent and what is now in the browser, panics, and throws this error.
       */
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          {/* Note: 
          Because you are passing <Header/> and {children} into <ThemeProvider> as props (specifically the children prop) from a Server Component, they remain Server Components.

Here is a breakdown of exactly how and why this works:

1. The "Import" Boundary
When you put "use client" at the top of a file (like ThemeProvider), it creates a boundary. Any file that ThemeProvider directly imports will automatically be converted into a Client Component.

However, ThemeProvider is not importing <Header/> or {children}. The parent layout (which is a Server Component) is importing them, evaluating them, and just handing the results to ThemeProvider.

2. How the Server processes this
When Next.js renders this layout on the server, here is what it does step-by-step:

The server sees the Layout (Server Component).

It sees <Header/> and {children}. Because it's on the server, it executes their code, fetches any database data, and generates the resulting HTML/React nodes.

It sees <ThemeProvider>, recognizes the "use client" directive, and stops. It doesn't run the provider's logic.

Instead, the server says to the client: "Here is the Client Component <ThemeProvider>. Inside its children prop, please slot in this pre-rendered HTML I already generated for <Header/> and the main content."

3. The Anti-Pattern (What would break it)
To see why the composition pattern is so powerful, look at what happens if you do it wrong. If you were to import <Header/> directly inside the ThemeProvider.tsx file, it would force the header to become a Client Component:

❌ Bad (Header becomes a Client Component):

TypeScript
// theme-provider.tsx
"use client"
import Header from "./Header"; // <-- This forces Header to be a Client Component

export default function ThemeProvider({ children }) {
  return (
    <Context.Provider value={theme}>
      <Header /> 
      {children}
    </Context.Provider>
  );
}
✅ Good (Your pattern - Header stays a Server Component):

TypeScript
// layout.tsx
import ThemeProvider from "./theme-provider";
import Header from "./Header"; 

export default function Layout({ children }) {
  return (
    // The server handles Header and children, then passes them down as a prop
    <ThemeProvider>
      <Header />
      {children}
    </ThemeProvider>
  );
}
By keeping the imports in the Server Component and passing them down as children, you create a "hole" in your Client Component where the server can safely inject server-rendered HTML.
          */}
          <Header />
          <main className="min-h-screen flex-1 overflow-y-auto overflow-x-hidden  py-24 px-8 bg-secondary/20 flex flex-col">
            {children}
          </main>
          {/* Note: <Toaster expand /> is the ui component. it is used alongside toast.success and toast.error */}
          <Toaster expand />
          {/* Note: Very interessting interaction here. Redirect toast uses an empty dependency array on the useEffect hook. Because layout pages stick around and don't re-render, layout just re-renders it's content.
            We could add pathname to the dependency array to make sure the toast is only shown on the layout page, but we are going to use template.tsx instead
          */}
        </ThemeProvider>
      </body>
    </html>
  );
}
