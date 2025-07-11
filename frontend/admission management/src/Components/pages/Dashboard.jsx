import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  // Removed hardcoded applications array and all preset data usage

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
              Dashboard
            </h1>
            <p className="text-gray-600 text-lg">
              Welcome back! Here's an overview of your applications.
            </p>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-500">Last updated</p>
              <p className="text-sm font-medium text-gray-900">2 minutes ago</p>
            </div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* No preset stats or applications table shown */}

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Quick Actions</h2>
          <div className="text-sm text-gray-500">Choose an action to get started</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ActionLink
            to="/admission"
            color="orange"
            gradient="from-orange-500 to-red-500"
            title="New Application"
            desc="Start a new admission application"
            iconPath="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </div>
      </div>
    </div>
  );
}

const StatCard = ({ label, value, color, gradient, iconPath, trend }) => (
  <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200">
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className={`p-3 bg-gradient-to-r ${gradient} rounded-xl shadow-lg`}>
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
          </svg>
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
    <div className="mt-4 pt-4 border-t border-gray-100">
      <p className="text-sm text-gray-500">{trend}</p>
    </div>
  </div>
);

const ActionLink = ({ to, title, desc, iconPath, color, gradient }) => (
  <Link to={to} className="group p-10 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-2xl hover:border-gray-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <div className="flex items-center">
      <div className={`p-6 bg-gradient-to-r ${gradient} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
        </svg>
      </div>
      <div className="ml-6">
        <h3 className="font-bold text-gray-900 text-xl group-hover:text-gray-700 transition-colors">{title}</h3>
        <p className="text-base text-gray-600 mt-2">{desc}</p>
      </div>
    </div>
  </Link>
);

export default Dashboard;