// App.jsx
import React from "react";
import Signup from "./Components/Signup.jsx";
import Login from "./Components/Login.jsx";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import MultiStepForm from "./Components/MultiStepForm.jsx";
import Hero from "./Components/Hero.jsx";
import Navbar from "./Components/Navbar.jsx";
import Footer from "./Components/Footer.jsx";
import About from "./Components/pages/About.jsx";
import Plan from "./Components/pages/Plan.jsx";
import Dashboard from "./Components/pages/Dashboard.jsx";
import ToastProvider from "./Components/ToastProvider.jsx";
import { ErrorBoundary } from "react-error-boundary";

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
      { path: "/signin", element: <Login /> }, // ✅ changed to /signin for consistency
      { path: "/admission", element: <MultiStepForm /> },
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
