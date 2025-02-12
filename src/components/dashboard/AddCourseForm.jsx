import React from "react";

const AddCourseForm = ({
  editingCourseId,
  courseName,
  setCourseName,
  shortDescription,
  setShortDescription,
  image,
  setImage,
  courseIntro,
  setCourseIntro,
  description,
  setDescription,
  trainingDescription,
  setTrainingDescription,
  duration,
  setDuration,
  enrolled,
  setEnrolled,
  projects,
  setProjects,
  modules,
  setModules,
  language,
  setLanguage,
  mode,
  setMode,
  rating,
  setRating,
  quizzes,
  setQuizzes,
  certifications,
  setCertifications,
  eligibility,
  setEligibility,
  achievements,
  setAchivements,
  courseOverview,
  setCourseOverview,
  keyHighlights,
  setKeyHighlights,
  handleAddCourse,
}) => {
  return (
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
                onChange={(e) => setTrainingDescription(e.target.value)}
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
                    e.target.value.split(",").map((item) => item.trim())
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
                    e.target.value.split(",").map((item) => item.trim())
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
                    e.target.value.split(",").map((item) => item.trim())
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
                    e.target.value.split(",").map((item) => item.trim())
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
                    e.target.value.split(",").map((item) => item.trim())
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
  );
};

export default AddCourseForm;
