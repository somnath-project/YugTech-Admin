import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import jsPDF from "jspdf";
import "jspdf-autotable";

const StudentList = ({
  filteredStudents,
  searchTerm,
  handleSearchChange,
  handleDeleteStudent,
  handlePaymentStatusChange,
  currentPage,
  totalPages,
  handlePreviousPage,
  handleNextPage,
  formatIndianDateTime,
  studentsPerPage,
}) => {
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Students Data", 14, 20);
    const currentDate = new Date().toLocaleDateString("en-IN");
    doc.setFontSize(12);
    doc.text(`Date: ${currentDate}`, 14, 30);

    const tableColumn = [
      "Sr No",
      "Name",
      "Course",
      "Email",
      "Phone",
      "Payment-Status",
      "Registration Date",
    ];
    const tableRows = currentStudents.map((student, index) => [
      index + 1,
      student.name,
      student.courseName,
      student.email,
      student.phone,
      student.paymentStatus,
      formatIndianDateTime(student.enrollmentDate),
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 40,
    });
    doc.save(`students_data_${currentDate}.pdf`);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-center p-4 md:px-6 lg:px-8 bg-white border-b border-gray-100 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-0">
            Students
          </h2>
          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search students..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border-0 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:shadow-lg transition-all duration-200 placeholder-gray-400 text-gray-800"
              />
              <svg
                className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <button
              onClick={exportToPDF}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-md hover:shadow-lg"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Export PDF
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sr No
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  City
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Registration Date
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentStudents.map((student, index) => (
                <tr
                  key={student.id}
                  className="hover:bg-gray-100 transition duration-200"
                >
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                    {index + 1 + (currentPage - 1) * studentsPerPage}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                    {student.name}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                    {student.courseName}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                    {student.email}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                    {student.phone}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                    {student.city}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                    <select
                      value={student.paymentStatus || "pending"}
                      onChange={(e) =>
                        handlePaymentStatusChange(student.id, e.target.value)
                      }
                      className={`border border-gray-300 rounded-lg px-2 py-1 ${
                        student.paymentStatus === "complete"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="complete">Complete</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                    {formatIndianDateTime(student.enrollmentDate)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-800">
                    <button
                      onClick={() => handleDeleteStudent(student.id)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center px-4 py-3 bg-white border-t border-gray-200 rounded-bl-lg rounded-br-lg shadow-sm">
          <div className="flex-1 flex justify-between items-center gap-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:shadow-md"
              } transition-all duration-200`}
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Previous
            </button>

            <div className="hidden md:flex items-center gap-1 text-sm text-gray-700">
              <span className="font-medium">Page</span>
              <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-md">
                {currentPage}
              </span>
              <span className="font-medium">of</span>
              <span className="px-2 py-1 bg-gray-50 text-gray-600 rounded-md">
                {totalPages}
              </span>
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:shadow-md"
              } transition-all duration-200`}
            >
              Next
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentList;
