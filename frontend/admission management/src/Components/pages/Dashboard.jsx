import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const applications = [
    {
      id: 1,
      institution: "University of Technology",
      program: "Computer Science",
      status: "Under Review",
      submittedDate: "2024-01-15",
      deadline: "2024-02-15",
    },
    {
      id: 2,
      institution: "State University",
      program: "Business Administration",
      status: "Accepted",
      submittedDate: "2024-01-10",
      deadline: "2024-02-01",
    },
    {
      id: 3,
      institution: "City College",
      program: "Engineering",
      status: "Pending Documents",
      submittedDate: "2024-01-20",
      deadline: "2024-02-28",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200";
      case "Under Review":
        return "bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 border border-yellow-200";
      case "Pending Documents":
        return "bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 border border-orange-200";
      case "Rejected":
        return "bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border border-red-200";
      default:
        return "bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border border-gray-200";
    }
  };

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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard
          label="Total Applications"
          value={applications.length}
          color="blue"
          gradient="from-blue-500 to-cyan-500"
          iconPath="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          trend="+2 this month"
        />
        <StatCard
          label="Accepted"
          value={applications.filter((a) => a.status === "Accepted").length}
          color="green"
          gradient="from-green-500 to-emerald-500"
          iconPath="M5 13l4 4L19 7"
          trend="+1 this week"
        />
        <StatCard
          label="Under Review"
          value={applications.filter((a) => a.status === "Under Review").length}
          color="yellow"
          gradient="from-yellow-500 to-orange-500"
          iconPath="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          trend="Processing"
        />
        <StatCard
          label="Pending"
          value={applications.filter((a) => a.status === "Pending Documents").length}
          color="orange"
          gradient="from-orange-500 to-red-500"
          iconPath="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          trend="Action needed"
        />
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12 border border-gray-200">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Your Applications</h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Updated</span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Institution", "Program", "Status", "Submitted", "Deadline", "Actions"].map((head) => (
                  <th key={head} className="px-8 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {applications.map((application, index) => (
                <tr key={application.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-8 py-6 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-4">
                        <span className="text-white text-sm font-bold">
                          {application.institution.split(' ').map(word => word[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900">{application.institution}</div>
                        <div className="text-sm text-gray-500">University</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{application.program}</div>
                    <div className="text-sm text-gray-500">Bachelor's Program</div>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(application.status)}`}>
                      {application.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap text-sm text-gray-600">
                    {new Date(application.submittedDate).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap text-sm text-gray-600">
                    {new Date(application.deadline).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <button className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors">
                        View
                      </button>
                      <button className="text-orange-600 hover:text-orange-800 font-medium hover:underline transition-colors">
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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
  <Link to={to} className="group p-6 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-2xl hover:border-gray-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <div className="flex items-center">
      <div className={`p-4 bg-gradient-to-r ${gradient} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
        </svg>
      </div>
      <div className="ml-4">
        <h3 className="font-bold text-gray-900 text-lg group-hover:text-gray-700 transition-colors">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{desc}</p>
      </div>
    </div>
  </Link>
);

export default Dashboard;