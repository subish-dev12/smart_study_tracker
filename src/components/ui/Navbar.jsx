import { NavLink } from "react-router";
import { Button } from "./button";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-linear-to-r from-slate-900 to-slate-800 shadow-lg border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo/Branding */}
        <NavLink to="/">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">CS</span>
            </div>
            <span className="text-white font-bold text-xl hidden sm:inline">
              CineStack
            </span>
          </div>
        </NavLink>

        {/* Navigation Links */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            asChild
            className="text-slate-200 hover:text-white hover:bg-slate-700 transition-all duration-200 rounded-md px-4 py-2"
          >
            <NavLink to="/">Home</NavLink>
          </Button>
          <Button
            variant="ghost"
            asChild
            className="text-slate-200 hover:text-white hover:bg-slate-700 transition-all duration-200 rounded-md px-4 py-2"
          >
            <NavLink to="/dashboard">Dashboard</NavLink>
          </Button>
          <Button
            variant="ghost"
            asChild
            className="text-slate-200 hover:text-white hover:bg-slate-700 transition-all duration-200 rounded-md px-4 py-2"
          >
            <NavLink to="/profile">Profile</NavLink>
          </Button>
        </div>
      </div>
    </nav>
  );
}
