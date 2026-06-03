import { Outlet } from "react-router";
import { Navbar } from "./Navbar";

function Layout() {
  return (
    <>
      <Navbar />
      <main className="bg-transparent">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default Layout;
