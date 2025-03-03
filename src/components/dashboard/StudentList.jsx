import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Stat, Progress } from "rsuite";
import PeoplesIcon from "@rsuite/icons/Peoples";
import "rsuite/dist/rsuite.min.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { TableVirtuoso } from "react-virtuoso";

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

  // Payment statistics calculations
  const completedPayments = filteredStudents.filter(
    (student) => student.paymentStatus === "complete"
  ).length;
  const pendingPayments = filteredStudents.filter(
    (student) => student.paymentStatus === "pending"
  ).length;
  const totalStudents = filteredStudents.length;

  const completedPercentage =
    totalStudents > 0
      ? Math.round((completedPayments / totalStudents) * 100)
      : 0;
  const pendingPercentage =
    totalStudents > 0 ? Math.round((pendingPayments / totalStudents) * 100) : 0;

  // PDF Export
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

  // Table configuration
  const columns = [
    { width: 50, label: "Sr No", dataKey: "srNo" },
    { width: 150, label: "Name", dataKey: "name" },
    { width: 150, label: "Course", dataKey: "course" },
    { width: 250, label: "Email", dataKey: "email" },
    { width: 130, label: "Phone", dataKey: "phone" },
    { width: 120, label: "City", dataKey: "city" },
    { width: 150, label: "Payment Status", dataKey: "paymentStatus" },
    { width: 180, label: "Registration Date", dataKey: "registrationDate" },
    { width: 100, label: "Actions", dataKey: "actions" },
  ];

  const rows = currentStudents.map((student, index) => ({
    id: student.id,
    srNo: index + 1 + (currentPage - 1) * studentsPerPage,
    name: student.name,
    course: student.courseName,
    email: student.email,
    phone: student.phone,
    city: student.city,
    paymentStatus: student.paymentStatus,
    registrationDate: formatIndianDateTime(student.enrollmentDate),
  }));

  const VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table
        {...props}
        sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
      />
    ),
    TableHead: React.forwardRef((props, ref) => (
      <TableHead {...props} ref={ref} />
    )),
    TableRow,
    TableBody: React.forwardRef((props, ref) => (
      <TableBody {...props} ref={ref} />
    )),
  };

  const fixedHeaderContent = () => (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          style={{ width: column.width }}
          sx={{
            backgroundColor: "background.paper",
            fontWeight: "bold",
            fontSize: "0.875rem",
          }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );

  const rowContent = (_index, row) => (
    <React.Fragment>
      {columns.map((column) => {
        if (column.dataKey === "paymentStatus") {
          return (
            <TableCell key={column.dataKey}>
              <select
                value={row.paymentStatus || "pending"}
                onChange={(e) =>
                  handlePaymentStatusChange(row.id, e.target.value)
                }
                className={`border border-gray-300 rounded-lg px-2 py-1 ${
                  row.paymentStatus === "complete"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                <option value="pending">Pending</option>
                <option value="complete">Complete</option>
              </select>
            </TableCell>
          );
        }
        if (column.dataKey === "actions") {
          return (
            <TableCell key={column.dataKey}>
              <button
                onClick={() => handleDeleteStudent(row.id)}
                className="text-red-500 hover:text-red-700 transition"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </TableCell>
          );
        }
        return (
          <TableCell key={column.dataKey} style={{ width: column.width }}>
            {row[column.dataKey]}
          </TableCell>
        );
      })}
    </React.Fragment>
  );

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header Section with Stats and Search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 md:px-6 lg:px-8 bg-white border-b border-gray-100 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4 md:mb-0">
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
              <Stat bordered className="w-full p-3 flex items-center">
                <div className="flex items-center gap-3">
                  <PeoplesIcon color="blue" style={{ fontSize: 24 }} />
                  <div>
                    <Stat.Value className="text-lg block">
                      {totalStudents}
                    </Stat.Value>
                    <Stat.Label className="text-sm">Total Students</Stat.Label>
                  </div>
                </div>
              </Stat>

              <Stat bordered className="w-full p-3">
                <div className="flex items-center gap-3">
                  <Progress.Circle
                    percent={completedPercentage}
                    width={50}
                    strokeColor="#87d068"
                    strokeWidth={8}
                    trailWidth={8}
                  />
                  <div>
                    <Stat.Value className="block">
                      {completedPayments}
                    </Stat.Value>
                    <Stat.Label className="text-sm">Completed</Stat.Label>
                  </div>
                </div>
              </Stat>

              <Stat bordered className="w-full p-3">
                <div className="flex items-center gap-3">
                  <Progress.Circle
                    percent={pendingPercentage}
                    width={50}
                    strokeColor="#ffc107"
                    strokeWidth={8}
                    trailWidth={8}
                  />
                  <div>
                    <Stat.Value className="block">{pendingPayments}</Stat.Value>
                    <Stat.Label className="text-sm">Pending</Stat.Label>
                  </div>
                </div>
              </Stat>
            </div>
          </div>

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

        {/* Virtualized Table */}
        <Paper style={{ height: 600, width: "100%" }}>
          <TableVirtuoso
            data={rows}
            components={VirtuosoTableComponents}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={rowContent}
          />
        </Paper>

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