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
  const [duration, setDuration] = useState("");
  const [mode, setMode] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [courseIntro, setCourseIntro] = useState("");
  const [image, setImage] = useState(null);
  const [trainingDescription, setTrainingDescription] = useState("");
  const [enrolled, setEnrolled] = useState("");
  const [rating, setRating] = useState("");
  const [quizzes, setQuizzes] = useState("");
  const [language, setLanguage] = useState("");
  const [modules, setModules] = useState("");
  const [projects, setProjects] = useState("");
  const [certifications, setCertifications] = useState([]);
  const [eligibility, setEligibility] = useState([]);
  const [achievements, setAchivements] = useState([]);
  const [courseOverview, setCourseOverview] = useState([]);
  const [keyHighlights, setKeyHighlights] = useState([]);
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10; // Number of students to display per page
  const navigate = useNavigate();

  const [showMessageModal, setShowMessageModal] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");

  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const username = sessionStorage.getItem("username");
    if (!username) {
      navigate("/");
    }

    // Fetching data with loading state

    const fetchData = async () => {
      setLoading(true); // Start loading
      try {
        const studentResponse = await fetch(`${backendURL}/api/enrollment`);
        if (!studentResponse.ok) throw new Error("Network response was not ok");
        const studentData = await studentResponse.json();
        setStudents(studentData);
        setFilteredStudents(studentData);

        const courseResponse = await fetch(`${backendURL}/api/courses`);
        if (!courseResponse.ok) throw new Error("Network response was not ok");
        const courseData = await courseResponse.json();
        setCourses(courseData);

        const contactResponse = await fetch(`${backendURL}/api/contactform`);
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

  //   const studentInterval = setInterval(() => {
  //     fetch(`${backendURL}/api/enrollment`)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setStudents(data);
  //         setFilteredStudents(data);
  //       })
  //       .catch((error) => console.error("Error fetching students:", error));
  //   }, 5000); // Fetch every 5 seconds

  //     // Fetch contact forms
  // const contactFormInterval = setInterval(() => {
  //   fetch(`${backendURL}/api/contactform`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setContactForm(data);
  //     })
  //     .catch((error) => console.error("Error fetching contact forms:", error));
  // }, 5000); // Fetch every 5 seconds

  //     return () => {
  //   clearInterval(studentInterval); // Cleanup student interval on component unmount
  //   clearInterval(contactFormInterval); // Cleanup contact form interval on component unmount
  // };

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

  // Change student payment status.

  const handlePaymentStatusChange = async (studentId, newStatus) => {
    try {
      const response = await fetch(
        `${backendURL}/api/enrollment/${studentId}/payment-status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ paymentStatus: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update payment status");
      }

      // Update local state for students and filteredStudents
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === studentId
            ? { ...student, paymentStatus: newStatus }
            : student
        )
      );
      setFilteredStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === studentId
            ? { ...student, paymentStatus: newStatus }
            : student
        )
      );

      Swal.fire({
        title: "Success!",
        text: "Payment status updated successfully",
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `,
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `,
        },
      });
    } catch (error) {
      console.error("Error updating payment status:", error);
      Swal.fire("Error", "Could not update payment status", "error");
    }
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
        const response = await fetch(`${backendURL}/api/enrollment/${id}`, {
          method: "DELETE",
        });

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

  // Add Course And Edit Course
  const handleAddCourse = async (e) => {
    e.preventDefault();

    const courseData = {
      courseName,
      description,
      duration,
      mode,
      shortDescription,
      courseIntro,
      trainingDescription,
      enrolled,
      rating,
      language,
      modules,
      quizzes,
      projects,
      certifications,
      eligibility,
      achievements,
      courseOverview,
      keyHighlights,
    };

    try {
      if (editingCourseId) {
        // Updating an existing course
        const response = await fetch(
          `${backendURL}/api/courses/${editingCourseId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(courseData),
          }
        );

        if (!response.ok) {
          Swal.fire(
            "Error",
            "Failed to update course details. Please try again.",
            "error"
          );
          return;
        }

        if (!image) {
          Swal.fire(
            "Warning",
            "Course details updated. If you wish to update the image, please select a file.",
            "warning"
          );
        } else {
          // Proceed with image update
          const imageFormData = new FormData();
          imageFormData.append("image", image);

          const imageResponse = await fetch(
            `${backendURL}/api/courses/${editingCourseId}/image`,
            {
              method: "PUT",
              body: imageFormData,
            }
          );

          if (!imageResponse.ok) {
            Swal.fire(
              "Error",
              "Failed to update course image. Please try again.",
              "error"
            );
            return;
          }

          Swal.fire("Success", "Course updated successfully!", "success");
        }
      } else {
        // Adding a new course
        const courseFormData = new FormData();
        courseFormData.append(
          "courses",
          new Blob([JSON.stringify(courseData)], { type: "application/json" })
        );

        if (image) {
          courseFormData.append("image", image);
        }

        const response = await fetch(`${backendURL}/api/courses`, {
          method: "POST",
          body: courseFormData,
        });

        if (!response.ok) {
          Swal.fire(
            "Error",
            "Failed to add course. Please try again.",
            "error"
          );
          return;
        }

        Swal.fire("Success", "Course added successfully!", "success");
      }

      // Reset form and reload courses
      resetForm();
      setEditingCourseId(null);
      fetchCourses();
    } catch (error) {
      console.error("Error:", error);
      Swal.fire("Error", "Something went wrong. Please try again.", "error");
    }
  };

  const resetForm = () => {
    setCourseName("");
    setDescription("");
    setDuration("");
    setMode("Online");
    setShortDescription("");
    setCourseIntro("");
    setTrainingDescription("");
    setImage(null);
    setEnrolled("");
    setRating("");
    setLanguage("");
    setModules("");
    setQuizzes("");
    setProjects("");
    setCertifications([]);
    setEligibility([]);
    setAchivements([]);
    setCourseOverview([]);
    setKeyHighlights([]);
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
        const response = await fetch(`${backendURL}/api/courses/${id}`, {
          method: "DELETE",
        });

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
        const response = await fetch(`${backendURL}/api/contactform/${id}`, {
          method: "DELETE",
        });

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
    setShortDescription(course.shortDescription);
    setCourseIntro(course.courseIntro);
    setTrainingDescription(course.trainingDescription);
    setImage(course.image);
    setEnrolled(course.enrolled);
    setRating(course.rating);
    setLanguage(course.language);
    setModules(course.modules);
    setQuizzes(course.quizzes);
    setProjects(course.projects);
    setCertifications(course.certifications);
    setEligibility(course.eligibility);
    setAchivements(course.achievements);
    setCourseOverview(course.courseOverview);
    setKeyHighlights(course.keyHighlights);
    setDuration(course.duration);
    setMode(course.mode);

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
      "Name",
      "Course",
      "Email",
      "Phone",
      "Payment-Status",
      "Registration Date",
    ];
    const tableRows = [];

    filteredStudents.forEach((student, index) => {
      const studentData = [
        index + 1,
        student.name,
        student.courseName,
        student.email,
        student.phone,
        student.paymentStatus,
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
      {/* Mobile Menu Button */}
      <button
        className="sm:hidden fixed top-4 right-4 z-50 p-2 text-white bg-gray-800 rounded-lg"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      {/* Sidebar */}
      <div
        className={`w-full sm:w-64 bg-gray-800 text-white p-4 sm:p-6
          fixed sm:sticky top-0 left-0 h-screen z-40 transform transition-transform
          ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
          }`}
      >
        <h2 className="text-xl font-bold mb-6 border-b border-gray-700 pb-4">
          Admin Panel
        </h2>
        <nav>
  <ul className="space-y-2">
    {[
      { id: "students", icon: faUser, label: "Student List" },
      { id: "addCourse", icon: faPlus, label: "Add Course" },
      { id: "allCourses", icon: faBook, label: "All Courses" },
      { id: "contactform", icon: faAddressBook, label: "Contact Forms" },
    ].map((item) => (
      <li
        key={item.id}
        className={`p-3 cursor-pointer flex items-center gap-3 rounded-lg transition-colors
          ${
            activeTab === item.id
              ? "bg-blue-600 text-white"
              : "hover:bg-gray-700"
          }`}
        onClick={() => {
          setActiveTab(item.id);
          // Add this line to close the mobile menu
          setIsMenuOpen(false);
        }}
      >
        <FontAwesomeIcon icon={item.icon} className="w-5 h-5" />
        <span className="text-sm font-medium">{item.label}</span>
      </li>
    ))}
    <li
      className="p-3 cursor-pointer flex items-center gap-3 rounded-lg hover:bg-gray-700 transition-colors"
      onClick={() => {
        handleLogout();
        // Add this line to close the mobile menu
        setIsMenuOpen(false);
      }}
    >
      <FontAwesomeIcon icon={faSignOutAlt} className="w-5 h-5" />
      <span className="text-sm font-medium">Logout</span>
    </li>
  </ul>
</nav>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 bg-gradient-to-br from-sky-100 via-white to-indigo-100 p-6
          ${isMenuOpen ? "ml-64" : ""} sm:ml-0 h-screen overflow-y-auto`}
        onClick={() => setIsMenuOpen(false)}
      >
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
              <div className="container mx-auto p-6">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                  {/* Header */}
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

                  {/* Table */}
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Sr No
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Course Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Phone
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            City
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Payment Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Registration Date
                          </th>
                          <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                              {index + 1 + (currentPage - 1) * studentsPerPage}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                              {student.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                              {student.courseName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                              {student.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                              {student.phone}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                              {student.city}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                              <select
                                value={student.paymentStatus || "pending"}
                                onChange={(e) =>
                                  handlePaymentStatusChange(
                                    student.id,
                                    e.target.value
                                  )
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
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                              {formatIndianDateTime(student.enrollmentDate)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">
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
            )}

            {/* Add Course Form */}
            {activeTab === "addCourse" && (
              <div className="container mx-auto px-4 py-8">
                <div className="bg-white p-8 rounded-lg shadow-xl max-w-4xl mx-auto">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    {editingCourseId ? "Edit Course" : "Add New Course"}
                  </h2>
                  <form onSubmit={handleAddCourse}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">
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
                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">
                          Short Description
                        </label>
                        <input
                          type="text"
                          value={shortDescription}
                          onChange={(e) => setShortDescription(e.target.value)}
                          placeholder="Short Description"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-lg font-medium text-gray-700 mb-2">
                          Course Image
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setImage(e.target.files[0])}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-lg font-medium text-gray-700 mb-2">
                          Course Introduction
                        </label>
                        <textarea
                          value={courseIntro}
                          onChange={(e) => setCourseIntro(e.target.value)}
                          placeholder="Course Introduction"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                          rows="4"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-lg font-medium text-gray-700 mb-2">
                          Course Long Description
                        </label>
                        <textarea
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Course Long Description"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                          rows="4"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-lg font-medium text-gray-700 mb-2">
                          Training Description
                        </label>
                        <textarea
                          value={trainingDescription}
                          onChange={(e) =>
                            setTrainingDescription(e.target.value)
                          }
                          placeholder="Training Description"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                          rows="4"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">
                          Course Duration
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
                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">
                          Enrolled Students
                        </label>
                        <input
                          type="number"
                          value={enrolled}
                          onChange={(e) => setEnrolled(e.target.value)}
                          placeholder="Number of Enrolled Students"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">
                          Projects
                        </label>
                        <input
                          type="number"
                          value={projects}
                          onChange={(e) => setProjects(e.target.value)}
                          placeholder="Enter the projects"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">
                          Modules
                        </label>
                        <input
                          type="number"
                          value={modules}
                          onChange={(e) => setModules(e.target.value)}
                          placeholder="Number of Modules"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">
                          Language
                        </label>
                        <select
                          value={language}
                          onChange={(e) => setLanguage(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                          required
                        >
                          <option value="">Select Language</option>
                          <option value="English">English</option>
                          <option value="Hindi">Hindi</option>
                          <option value="Marathi">Marathi</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">
                          Mode
                        </label>
                        <select
                          value={mode}
                          onChange={(e) => setMode(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                          required
                        >
                          <option value="">Select Mode</option>
                          <option value="Online">Online</option>
                          <option value="Offline">Offline</option>
                          <option value="Hybrid">Hybrid</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">
                          Rating
                        </label>
                        <input
                          type="number"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                          placeholder="Rating"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">
                          Quizzes
                        </label>
                        <input
                          type="number"
                          value={quizzes}
                          onChange={(e) => setQuizzes(e.target.value)}
                          placeholder="Number of Quizzes"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-lg font-medium text-gray-700 mb-2">
                          Certifications
                        </label>
                        <textarea
                          value={certifications.join(", ")}
                          onChange={(e) =>
                            setCertifications(
                              e.target.value
                                .split(",")
                                .map((item) => item.trim())
                            )
                          }
                          placeholder="Certifications Description"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                          rows="3"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-lg font-medium text-gray-700 mb-2">
                          Eligibility
                        </label>
                        <textarea
                          value={eligibility.join(", ")}
                          onChange={(e) =>
                            setEligibility(
                              e.target.value
                                .split(",")
                                .map((item) => item.trim())
                            )
                          }
                          placeholder="Course Eligibility"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                          rows="3"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-lg font-medium text-gray-700 mb-2">
                          Achievements
                        </label>
                        <textarea
                          value={achievements.join(", ")}
                          onChange={(e) =>
                            setAchivements(
                              e.target.value
                                .split(",")
                                .map((item) => item.trim())
                            )
                          }
                          placeholder="Course Achievements"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                          rows="3"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-lg font-medium text-gray-700 mb-2">
                          Course Overview
                        </label>
                        <textarea
                          value={courseOverview.join(", ")}
                          onChange={(e) =>
                            setCourseOverview(
                              e.target.value
                                .split(",")
                                .map((item) => item.trim())
                            )
                          }
                          placeholder="Course Overview"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                          rows="3"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-lg font-medium text-gray-700 mb-2">
                          Key Highlights
                        </label>
                        <textarea
                          value={keyHighlights.join(", ")}
                          onChange={(e) =>
                            setKeyHighlights(
                              e.target.value
                                .split(",")
                                .map((item) => item.trim())
                            )
                          }
                          placeholder="Course Key Highlights"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                          rows="3"
                          required
                        />
                      </div>
                    </div>
                    <div className="mt-8 text-center">
                      <button
                        type="submit"
                        className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400"
                      >
                        {editingCourseId ? "Update Course" : "Add Course"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {activeTab === "allCourses" && (
              <div className="container mx-auto px-4 py-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  All Courses
                </h2>
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Sr No
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Course Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Duration
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Mode
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {courses.map((course, index) => (
                        <tr key={course.id} className="hover:bg-gray-100">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {course.courseName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {course.description.length > 100
                              ? course.description.slice(0, 100) + "..."
                              : course.description}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {course.price}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {course.duration}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {course.mode}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                            <button
                              className="text-blue-500 hover:text-blue-700 mx-1"
                              onClick={() => handleEditCourse(course)}
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button
                              className="text-red-500 hover:text-red-700 mx-1"
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
              <div className="container mx-auto px-4 py-8">
                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">
                    Contact Forms
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Sr No
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Email
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Message
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {contactform.map((contact, index) => (
                          <tr key={contact.id} className="hover:bg-gray-100">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {index + 1}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {contact.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {contact.email}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                              <div className="relative">
                                <div className="max-w-xs truncate">
                                  {contact.message}
                                </div>
                                <button
                                  className="absolute top-0 right-0 text-blue-500 text-xs"
                                  onClick={() =>
                                    openMessageCarousel(contact.message)
                                  }
                                >
                                  View Full
                                </button>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                              <button
                                className="text-red-600 hover:text-red-800"
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
                </div>

                {/* Modal for Full Message */}
                {showMessageModal && (
                  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
                      <h3 className="text-xl font-semibold mb-4">
                        Full Message
                      </h3>
                      <p className="text-gray-700 mb-6">{currentMessage}</p>
                      <button
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
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
