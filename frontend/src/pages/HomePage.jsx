import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <section className="grid gap-6 lg:grid-cols-[1.25fr_0.85fr]">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
          Backend Developer Assignment
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-slate-900 sm:text-5xl">
          Secure Auth, Role-Based Access, and Task CRUD Demo
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
          A production-style full-stack starter with JWT authentication, protected APIs,
          role-aware access control, validation, and a clean dashboard to demonstrate
          end-to-end functionality.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/register"
            className="rounded-2xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            Create Account
          </Link>
          <Link
            to="/login"
            className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            Login
          </Link>
        </div>
      </div>

      <div className="rounded-3xl bg-slate-900 p-8 text-white shadow-sm">
        <h2 className="text-xl font-bold">What this project demonstrates</h2>
        <ul className="mt-5 space-y-4 text-sm leading-7 text-slate-200">
          <li>JWT-based registration and login</li>
          <li>Protected dashboard with authenticated state</li>
          <li>Task CRUD operations using backend APIs</li>
          <li>User and admin role-based access foundation</li>
          <li>Scalable project structure for future modules</li>
        </ul>
      </div>
    </section>
  );
}