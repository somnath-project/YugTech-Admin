import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const ContactForms = ({ contactform, handleDeleteContact }) => {
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");

  const openMessageCarousel = (message) => {
    setCurrentMessage(message);
    setShowMessageModal(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Contact Forms</h2>
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
                  Phone 
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {contact.phone}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="relative">
                      <div className="max-w-xs truncate">{contact.message}</div>
                      <button
                        className="absolute top-0 right-0 text-blue-500 text-xs"
                        onClick={() => openMessageCarousel(contact.message)}
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

        {showMessageModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
              <h3 className="text-xl font-semibold mb-4">Full Message</h3>
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
    </div>
  );
};

export default ContactForms;
