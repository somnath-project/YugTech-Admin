import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

const AllCourses = ({ courses, handleEditCourse, handleDeleteCourse }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">All Courses</h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sr No
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Course Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mode
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {courses.map((course, index) => (
              <tr key={course.id} className="hover:bg-gray-100">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  {index + 1}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  {course.courseName}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  {course.description.length > 100
                    ? course.description.slice(0, 100) + "..."
                    : course.description}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  {course.price}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  {course.duration}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  {course.mode}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-center text-sm">
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
  );
};

export default AllCourses;
