// Components/adminDashboard.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { API_ENDPOINTS } from "../config/api.js";

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      // Check if user is admin
      if (role !== "admin") {
        throw new Error("Unauthorized access");
      }

      // Validate token
      const validate = await axios.get(API_ENDPOINTS.VALIDATE_TOKEN, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!validate.data.valid) throw new Error("Token invalid");

      // Use the correct admin credentials
      const basicAuth = btoa("ZTGXTFWD:{=6I_bq4l')B");

      const res = await axios.get(API_ENDPOINTS.ALL_SUBMISSIONS, {
        headers: {
          Authorization: `Basic ${basicAuth}`,
        },
        withCredentials: true // Add this for CORS with credentials
      });

      setStudents(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error("Auth or data fetch failed:", err);
      setError(err.response?.data?.message || "Failed to fetch data");
      if (err.response?.status === 401 || err.response?.status === 403) {
        navigate("/signin");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const lower = searchTerm.toLowerCase();
    const results = students.filter((s) =>
      s.name?.toLowerCase().includes(lower) ||
      s.emailId?.toLowerCase().includes(lower) ||
      s.phone?.includes(lower)
    );
    setFiltered(results);
  }, [searchTerm, students]);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filtered);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Submissions");
    XLSX.writeFile(workbook, "student-submissions.xlsx");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading submissions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>{error}</p>
          <button 
            onClick={fetchData}
            className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded shadow">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl font-bold mb-4 md:mb-0">Admin Dashboard</h2>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search by name, email, phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border rounded w-72"
            />
            <button
              onClick={exportToExcel}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Export Excel
            </button>
          </div>
        </div>

        <div className="overflow-auto">
          <table className="min-w-full table-auto border text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">#</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Phone</th>
                <th className="p-2 border">JEE Rank</th>
                <th className="p-2 border">Branch</th>
                <th className="p-2 border">DOB</th>
                <th className="p-2 border">Category</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((student, index) => (
                <tr key={student._id} className="even:bg-gray-50">
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">{student.name}</td>
                  <td className="p-2 border">{student.emailId}</td>
                  <td className="p-2 border">{student.phone}</td>
                  <td className="p-2 border">{student.jeeRank}</td>
                  <td className="p-2 border">{student.branch}</td>
                  <td className="p-2 border">{student.dateOfBirth?.slice(0, 10)}</td>
                  <td className="p-2 border">{student.category}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center p-4">
                    No data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
