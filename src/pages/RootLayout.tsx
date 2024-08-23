import { Outlet } from "react-router-dom";
import ThemeProvider from "../store/useTheme";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const RootLayout = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen w-full bg-white text-black antialiased dark:bg-gray-950 dark:text-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
          <div className="flex flex-col min-h-screen justify-between font-sans">
            <Header />
            <main className="mb-auto">
              <Outlet />
            </main>
            <Footer />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default RootLayout;
