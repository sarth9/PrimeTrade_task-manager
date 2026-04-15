import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-xl font-extrabold tracking-tight text-slate-900">
          Prime<span className="text-blue-600">Trade</span> Assignment
        </Link>

        <nav className="flex items-center gap-3 sm:gap-5">
          <Link className="text-sm font-semibold text-slate-600 hover:text-blue-600" to="/">
            Home
          </Link>

          {user ? (
            <>
              <Link
                className="text-sm font-semibold text-slate-600 hover:text-blue-600"
                to="/dashboard"
              >
                Dashboard
              </Link>
              <span className="hidden rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700 sm:inline-flex">
                {user.name} · {user.role}
              </span>
              <button
                onClick={handleLogout}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                className="text-sm font-semibold text-slate-600 hover:text-blue-600"
                to="/register"
              >
                Register
              </Link>
              <Link
                className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                to="/login"
              >
                Login
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}