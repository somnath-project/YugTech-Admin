import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ClipLoader } from "react-spinners";
import Sidebar from "../components/dashboard/Sidebar";
import StudentList from "../components/dashboard/StudentList";
import AddCourseForm from "../components/dashboard/AddCourseForm";
import AllCourses from "../components/dashboard/AllCourses";
import ContactForms from "../components/dashboard/ContactForms";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const studentsPerPage = 10;
  const navigate = useNavigate();
  const timeoutRef = useRef(null);
  
  // Api URL
  const backendURL = import.meta.env.VITE_BACKEND_URL;

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

  const handleLogout = useCallback(() => {
    sessionStorage.removeItem("username");
    navigate("/");
   }, [navigate]);

  useEffect(() => {
    const username = sessionStorage.getItem("username");
    if (!username) {
      navigate("/");
      return;
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

  const handleActivity = () => {
    // Reset timer on any activity
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(handleLogout, 5 * 60 * 1000); // 5 minutes
  };

  // Initial timer setup
  handleActivity();

  // Event listeners for user activity
  window.addEventListener('mousemove', handleActivity);
  window.addEventListener('keydown', handleActivity);
  window.addEventListener('click', handleActivity);

  // Cleanup
  return () => {
    window.removeEventListener('mousemove', handleActivity);
    window.removeEventListener('keydown', handleActivity);
    window.removeEventListener('click', handleActivity);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  }, [handleLogout, navigate]);

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



  return (
    <div className="min-h-screen flex flex-col sm:flex-row">
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

      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        handleLogout={handleLogout}
      />

      <div
        className={`flex-1 bg-gradient-to-br from-sky-100 via-white to-indigo-100 p-6 ${
          isMenuOpen ? "ml-64" : ""
        } sm:ml-0 h-screen overflow-y-auto`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">
            Admin Dashboard
          </h1>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-full">
            <ClipLoader color="#0000FF" loading={loading} size={50} />
          </div>
        ) : (
          <>
            {activeTab === "students" && (
              <StudentList
                filteredStudents={filteredStudents}
                searchTerm={searchTerm}
                handleSearchChange={handleSearchChange}
                handleDeleteStudent={handleDeleteStudent}
                handlePaymentStatusChange={handlePaymentStatusChange}
                currentPage={currentPage}
                totalPages={Math.ceil(
                  filteredStudents.length / studentsPerPage
                )}
                handlePreviousPage={handlePreviousPage}
                handleNextPage={handleNextPage}
                formatIndianDateTime={formatIndianDateTime}
                studentsPerPage={studentsPerPage}
                currentStudents={filteredStudents.slice(
                  (currentPage - 1) * studentsPerPage,
                  currentPage * studentsPerPage
                )}
              />
            )}

            {activeTab === "addCourse" && (
              <AddCourseForm
                editingCourseId={editingCourseId}
                courseName={courseName}
                setCourseName={setCourseName}
                shortDescription={shortDescription}
                setShortDescription={setShortDescription}
                image={image}
                setImage={setImage}
                courseIntro={courseIntro}
                setCourseIntro={setCourseIntro}
                description={description}
                setDescription={setDescription}
                trainingDescription={trainingDescription}
                setTrainingDescription={setTrainingDescription}
                duration={duration}
                setDuration={setDuration}
                enrolled={enrolled}
                setEnrolled={setEnrolled}
                projects={projects}
                setProjects={setProjects}
                modules={modules}
                setModules={setModules}
                language={language}
                setLanguage={setLanguage}
                mode={mode}
                setMode={setMode}
                rating={rating}
                setRating={setRating}
                quizzes={quizzes}
                setQuizzes={setQuizzes}
                certifications={certifications}
                setCertifications={setCertifications}
                eligibility={eligibility}
                setEligibility={setEligibility}
                achievements={achievements}
                setAchivements={setAchivements}
                courseOverview={courseOverview}
                setCourseOverview={setCourseOverview}
                keyHighlights={keyHighlights}
                setKeyHighlights={setKeyHighlights}
                handleAddCourse={handleAddCourse}
              />
            )}

            {activeTab === "allCourses" && (
              <AllCourses
                courses={courses}
                handleEditCourse={handleEditCourse}
                handleDeleteCourse={handleDeleteCourse}
              />
            )}

            {activeTab === "contactform" && (
              <ContactForms
                contactform={contactform}
                handleDeleteContact={handleDeleteContact}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;