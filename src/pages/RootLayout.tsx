import { Outlet } from "react-router-dom";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const RootLayout = () => {
  return (
    <div className=" mx-auto max-w-3xl max-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0 bg-white text-black antialiased">
      <div className="flex flex-col h-screen justify-between font-sans">
        <Header />
        <main className="mb-auto">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default RootLayout;
