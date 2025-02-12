import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPlus,
  faSignOutAlt,
  faBook,
  faAddressBook,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ activeTab, setActiveTab, isMenuOpen, setIsMenuOpen, handleLogout }) => {
  return (
    <div
      className={`w-full sm:w-64 bg-gray-800 text-white p-4 sm:p-6
        fixed sm:sticky top-0 left-0 h-screen z-40 transform transition-transform
        ${isMenuOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}`}
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
                setIsMenuOpen(false);
              }}
            >
              <FontAwesomeIcon icon={item.icon} className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </li>
          ))}
          <li
            className="p-3 cursor-pointer flex items-center gap-3 rounded-lg hover:bg-gray-700 transition-colors"
            onClick={handleLogout}
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="w-5 h-5" />
            <span className="text-sm font-medium">Logout</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;