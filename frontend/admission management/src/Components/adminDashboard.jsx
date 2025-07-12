// Components/adminDashboard.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtered, setFiltered] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const validate = await axios.get("http://localhost:3000/api/validate-token", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      if (!validate.data.valid) throw new Error("Token invalid");

      const basicAuth = btoa("admin:admin123");

      const res = await axios.get("http://localhost:3000/api/admin/all-submissions", {
        headers: {
          Authorization: `Basic ${basicAuth}`,
        },
      });

      setStudents(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error("Auth or data fetch failed:", err);
      navigate("/signin");
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
