import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faUser,
  faPlus,
  faSignOutAlt,
  faBook,
  faEdit,
  faAddressBook,
} from "@fortawesome/free-solid-svg-icons";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { ClipLoader } from "react-spinners";

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("students");
  const [courses, setCourses] = useState([]);
  const [contactform, setContactForm] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [mode, setMode] = useState("Online");
  const [icon, setIcon] = useState("fas fa-book");
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10; // Number of students to display per page
  const navigate = useNavigate();

  const [showMessageModal, setShowMessageModal] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");

  // Loader state
  const [loading, setLoading] = useState(true);

  const openMessageCarousel = (message) => {
    setCurrentMessage(message);
    setShowMessageModal(true);
  };

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Api URL
  const backendURL= import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const username = sessionStorage.getItem("username");
    if (!username) {
      navigate("/");
    }

    // Fetching data with loading state

    const fetchData = async () => {
      setLoading(true); // Start loading
      try {
        const studentResponse = await fetch(
          `${backendURL}/api/enrollment`
        );
        if (!studentResponse.ok) throw new Error("Network response was not ok");
        const studentData = await studentResponse.json();
        setStudents(studentData);
        setFilteredStudents(studentData);

        const courseResponse = await fetch(`${backendURL}/api/courses`);
        if (!courseResponse.ok) throw new Error("Network response was not ok");
        const courseData = await courseResponse.json();
        setCourses(courseData);

        const contactResponse = await fetch(
          `${backendURL}/api/contactform`
        );
        if (!contactResponse.ok) throw new Error("Network response was not ok");
        const contactData = await contactResponse.json();
        setContactForm(contactData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchData();
  }, [navigate]);

  const formatIndianDateTime = (dateString) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    };
    return new Date(dateString).toLocaleString("en-IN", options);
  };

  const handleDeleteStudent = async (id) => {

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `${backendURL}/api/enrollment/${id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete student");
        }

        setStudents(students.filter((student) => student.id !== id));
        setFilteredStudents(
          filteredStudents.filter((student) => student.id !== id)
        );

        Swal.fire("Deleted!", "The student has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting student:", error);
        Swal.fire(
          "Error",
          "There was a problem deleting the student.",
          "error"
        );
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    filterStudents(e.target.value);
  };

  const filterStudents = (searchTerm) => {
    if (!searchTerm) {
      setFilteredStudents(students);
    } else {
      setFilteredStudents(
        students.filter((student) =>
          student.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  };

  const handleAddCourse = (e) => {
    e.preventDefault();

    const newCourse = { courseName, description, price, duration, mode, icon };

    if (editingCourseId) {
      fetch(`${backendURL}/api/courses/${editingCourseId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCourse),
      })
        .then(async (response) => {
          if (!response.ok) {
            const errorDetails = await response.json();
            throw new Error(errorDetails.message || "Failed to update course");
          }
          return response.json();
        })
        .then(() => {
          Swal.fire("Success", "Course updated successfully!", "success");
          setEditingCourseId(null);
          setCourseName("");
          setDescription("");
          setPrice("");
          setDuration("");
          setMode("Online");
          setIcon("fas fa-book");
          fetchCourses();
        })
        .catch((error) => {
          console.error("Error updating course:", error);
          Swal.fire("Error", error.message, "error");
        });
    } else {
      fetch(`${backendURL}/api/courses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCourse),
      })
        .then(async (response) => {
          if (!response.ok) {
            const errorDetails = await response.json();
            throw new Error(errorDetails.message || "Failed to add course");
          }
          return response.json();
        })
        .then(() => {
          Swal.fire("Success", "Course added successfully!", "success");
          setCourseName("");
          setDescription("");
          setPrice("");
          setDuration("");
          setMode("Online");
          setIcon("fas fa-book");
          fetchCourses();
        })
        .catch((error) => {
          console.error("Error adding course:", error);
          Swal.fire("Error", error.message, "error");
        });
    }
  };

  const fetchCourses = () => {

    fetch(`${backendURL}/api/courses`)
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error("Error fetching courses:", error));
  };

  const handleDeleteCourse = async (id) => {


    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `${backendURL}/api/courses/${id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete course");
        }

        setCourses(courses.filter((course) => course.id !== id));

        Swal.fire("Deleted!", "The course has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting course:", error);
        Swal.fire("Error", "There was a problem deleting the course.", "error");
      }
    }
  };

  const handleDeleteContact = async (id) => {
      

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `${backendURL}/api/contactform/${id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Faild to delete contact form!!");
        }

        setContactForm(contactform.filter((contact) => contact.id !== id));
        Swal.fire("Deleted!", "The Contact-Form has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting contact Form:", error);
        Swal.fire(
          "Error",
          "There was a problem deleting the contact form.",
          "error"
        );
      }
    }
  };

  const handleEditCourse = (course) => {
    setEditingCourseId(course.id);
    setCourseName(course.courseName);
    setDescription(course.description);
    setPrice(course.price);
    setDuration(course.duration);
    setMode(course.mode);
    setIcon(course.icon);
    setActiveTab("addCourse");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("username");
    navigate("/");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Students Data", 14, 20);

    const currentDate = new Date().toLocaleDateString("en-IN");
    doc.setFontSize(12);
    doc.text(`Date: ${currentDate}`, 14, 30);

    const tableColumn = [
      "Sr No",
      "ID",
      "Name",
      "Course",
      "Email",
      "Phone",
      "Registration Date",
    ];
    const tableRows = [];

    filteredStudents.forEach((student, index) => {
      const studentData = [
        index + 1,
        student.id,
        student.name,
        student.courseName,
        student.email,
        student.phone,
        formatIndianDateTime(student.enrollmentDate),
      ];
      tableRows.push(studentData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 40,
    });

    doc.save(`students_data_${currentDate}.pdf`);
  };

  return (
    <div className="min-h-screen flex flex-col sm:flex-row">
      {/* Sidebar */}
      <div className="w-full sm:w-64 bg-blue-400 text-white p-6">
        <h2 className="text-xl font-semibold mb-6">Admin Panel</h2>
        <nav>
          <ul>
            <li
              className={`p-3 cursor-pointer flex items-center gap-2 ${
                activeTab === "students" ? "bg-blue-600" : ""
              }`}
              onClick={() => setActiveTab("students")}
            >
              <FontAwesomeIcon icon={faUser} /> Student List
            </li>
            <li
              className={`p-3 cursor-pointer flex items-center gap-2 ${
                activeTab === "addCourse" ? "bg-blue-600" : ""
              }`}
              onClick={() => setActiveTab("addCourse")}
            >
              <FontAwesomeIcon icon={faPlus} /> Add Course
            </li>
            <li
              className={`p-3 cursor-pointer flex items-center gap-2 ${
                activeTab === "allCourses" ? "bg-blue-600" : ""
              }`}
              onClick={() => setActiveTab("allCourses")}
            >
              <FontAwesomeIcon icon={faBook} /> All Courses
            </li>

            <li
              className={`p-3 cursor-pointer flex items-center gap-2 ${
                activeTab === "contactform" ? "bg-blue-600" : ""
              }`}
              onClick={() => setActiveTab("contactform")}
            >
              <FontAwesomeIcon icon={faAddressBook} /> Contact-Form
            </li>
            <li
              className="p-3 cursor-pointer flex items-center gap-2 hover:bg-blue-600"
              onClick={handleLogout}
            >
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">
            Admin Dashboard
          </h1>
        </div>

        {loading ? ( // Show loader while loading
          <div className="flex justify-center items-center h-full">
            <ClipLoader color="#0000FF" loading={loading} size={50} />
          </div>
        ) : (
          <>
            {activeTab === "students" && (
              <div className="mb-8 bg-white p-6 rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-semibold text-gray-700">
                    Students
                  </h2>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search by name"
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-48 text-sm"
                  />
                </div>
                <button
                  onClick={exportToPDF}
                  className="mb-4 bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 transition"
                >
                  Export to PDF
                </button>

                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 border-b">
                          Sr No
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 border-b">
                          Name
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 border-b">
                          Course Name
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 border-b">
                          Email
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 border-b">
                          Phone
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 border-b">
                          Registration Date
                        </th>
                        <th className="py-3 px-4 text-center text-sm font-semibold text-gray-600 border-b">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentStudents.map((student, index) => (
                        <tr
                          key={student.id}
                          className="border-t hover:bg-gray-50"
                        >
                          <td className="py-3 px-4 text-sm text-gray-800 border-b">
                            {index + 1 + (currentPage - 1) * studentsPerPage}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-800 border-b">
                            {student.name}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-800 border-b">
                            {student.courseName}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-800 border-b">
                            {student.email}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-800 border-b">
                            {student.phone}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-800 border-b">
                            {formatIndianDateTime(student.enrollmentDate)}
                          </td>
                          <td className="py-3 px-4 text-center text-sm text-gray-800 border-b">
                            <button
                              className="text-red-500 hover:text-red-700 mx-1"
                              onClick={() => handleDeleteStudent(student.id)}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span>
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Add Course Form */}
            {activeTab === "addCourse" && (
              <div className="mb-8 bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                  {editingCourseId ? "Edit Course" : "Add New Course"}
                </h2>
                <form onSubmit={handleAddCourse}>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-600 mb-2">
                      Course Name
                    </label>
                    <input
                      type="text"
                      value={courseName}
                      onChange={(e) => setCourseName(e.target.value)}
                      placeholder="Course Name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-600 mb-2">
                      Description
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Course Description"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      rows="4"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-600 mb-2">
                      Price
                    </label>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="Course Price"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-600 mb-2">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      placeholder="Course Duration"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-600 mb-2">
                      Mode
                    </label>
                    <select
                      value={mode}
                      onChange={(e) => setMode(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      required
                    >
                      <option value="Online">Online</option>
                      <option value="Offline">Offline</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-600 mb-2">
                      Icon
                    </label>
                    <input
                      type="text"
                      value={icon}
                      onChange={(e) => setIcon(e.target.value)}
                      placeholder="Course Icon (FontAwesome class)"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    {editingCourseId ? "Update Course" : "Add Course"}
                  </button>
                </form>
              </div>
            )}

            {/* All Courses List */}
            {activeTab === "allCourses" && (
              <div className="mb-8 bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                  All Courses
                </h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 border-b">
                          Sr No
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 border-b">
                          Course Name
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 border-b">
                          Description
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 border-b">
                          Price
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 border-b">
                          Duration
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 border-b">
                          Mode
                        </th>
                        <th className="py-3 px-4 text-center text-sm font-semibold text-gray-600 border-b">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {courses.map((course, index) => (
                        <tr
                          key={course.id}
                          className="border-t hover:bg-gray-50"
                        >
                          <td className="py-3 px-4 text-sm text-gray-800 border-b">
                            {index + 1}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-800 border-b">
                            {course.courseName}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-800 border-b">
                            {course.description}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-800 border-b">
                            {course.price}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-800 border-b">
                            {course.duration}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-800 border-b">
                            {course.mode}
                          </td>
                          <td className="py-3 px-4 text-center text-sm text-gray-800 border-b">
                            <button
                              className="text-yellow-500 hover:text-yellow-700 mx-2"
                              onClick={() => handleEditCourse(course)}
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button
                              className="text-red-500 hover:text-red-700 mx-2"
                              onClick={() => handleDeleteCourse(course.id)}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* All Contact form List */}
            {activeTab === "contactform" && (
              <div className="mb-8 bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                  Contact Forms
                </h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 border-b">
                          Sr No
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 border-b">
                          Name
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 border-b">
                          Email
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 border-b">
                          Message
                        </th>
                        <th className="py-3 px-4 text-center text-sm font-semibold text-gray-600 border-b">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {contactform.map((contact, index) => (
                        <tr
                          key={contact.id}
                          className="border-t hover:bg-gray-50"
                        >
                          <td className="py-3 px-4 text-sm text-gray-800 border-b">
                            {index + 1}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-800 border-b">
                            {contact.name}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-800 border-b">
                            {contact.email}
                          </td>
                          <td className="py-3 px-4  text-sm text-gray-800 border-b">
                            <div className="relative">
                              <div className="w-64 h-12 overflow-hidden overflow-x-scroll whitespace-nowrap rounded border border-gray-300">
                                {contact.message}
                              </div>
                              <button
                                className="absolute top-0 right-0 text-blue-500 text-sm"
                                onClick={() =>
                                  openMessageCarousel(contact.message)
                                }
                              >
                                View Full
                              </button>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-center text-sm text-gray-800 border-b">
                            <button
                              className="text-red-500 hover:text-red-700 mx-1"
                              onClick={() => handleDeleteContact(contact.id)}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Modal for Message Carousel */}
                {showMessageModal && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[90vh] overflow-y-auto">
                      <h3 className="text-lg font-semibold mb-4">
                        Full Message
                      </h3>
                      <p className="text-gray-700 mb-6">{currentMessage}</p>
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={() => setShowMessageModal(false)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
        {/* Last 2 div */}
      </div>
    </div>
  );
};

export default Dashboard;
