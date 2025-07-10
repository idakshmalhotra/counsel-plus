import React from "react";
import { createBrowserRouter, Outlet, RouterProvider, Navigate } from "react-router-dom";

import Signup from "./Components/Signup.jsx";
import Login from "./Components/Login.jsx";
import MultiStepForm from "./Components/MultiStepForm.jsx";
import Hero from "./Components/Hero.jsx";
import Navbar from "./Components/Navbar.jsx";
import Footer from "./Components/Footer.jsx";
import About from "./Components/pages/About.jsx";
import Plan from "./Components/pages/Plan.jsx";
import Dashboard from "./Components/pages/Dashboard.jsx";
import AdminDashboard from "./Components/adminDashboard.jsx";
import ForgotPassword from "./ForgetPassword.jsx";
import { ToastProvider } from "./Components/ToastProvider.jsx";
import { ErrorBoundary } from "react-error-boundary";

// Fallback UI for errors
const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div className="min-h-screen flex flex-col">
    <div className="p-6 shadow bg-white border-b border-gray-200">
      <Navbar />
    </div>
    <div className="flex-grow flex items-center justify-center px-4">
      <div className="text-center p-8 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong:</h1>
        <pre className="text-gray-700 mb-4 whitespace-pre-wrap">{error.message}</pre>
        <button
          onClick={resetErrorBoundary}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Try again
        </button>
      </div>
    </div>
    <Footer />
  </div>
);

// Shared layout with navbar + footer
function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
          <Outlet />
        </ErrorBoundary>
      </div>
      <Footer />
    </div>
  );
}

// Route protection logic
function ProtectedRoute({ children, adminOnly = false }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/signin" />;

  if (adminOnly && role !== "admin") return <Navigate to="/dashboard" />;

  return children;
}

// Router config
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Hero /> },
      { path: "/about", element: <About /> },
      { path: "/plan", element: <Plan /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/signup", element: <Signup /> },
      { path: "/signin", element: <Login /> },
      { path: "/admission", element: <MultiStepForm /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      {
        path: "/admin",
        element: (
          <ProtectedRoute adminOnly={true}>
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  );
}

export default App;
