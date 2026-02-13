import React from 'react';

const StudentList = ({ students, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200 bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th scope="col" className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
              Email
            </th>
            <th scope="col" className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
              Course
            </th>
            <th scope="col" className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {students.map((student, index) => (
            <tr
              key={student._id}
              className={`
                ${student.status === 'Pending' ? 'bg-yellow-50' : index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                hover:bg-gray-100 transition-colors duration-150
              `}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {student.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {student.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {student.course}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {student.status === 'Pending' ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                    Pending
                  </span>
                ) : student.status === 'Enrolled' ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                    Enrolled
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                    Dropped
                  </span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => onEdit(student)}
                  className="text-blue-600 hover:text-blue-800 mr-4 transition-colors duration-150"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(student._id)}
                  className="text-red-600 hover:text-red-800 transition-colors duration-150"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;