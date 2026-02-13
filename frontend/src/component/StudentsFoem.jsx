import React, { useState, useEffect } from 'react';

const StudentForm = ({ onSubmit, editingStudent }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    status: 'Pending',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingStudent) {
      setFormData(editingStudent);
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Optional: clear error on change
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!/^\d{10,15}$/.test(formData.phone)) newErrors.phone = 'Phone must be 10-15 digits';
    if (!formData.course.trim()) newErrors.course = 'Course is required';
    if (!formData.status) newErrors.status = 'Status is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit(formData);
    // Reset only on successful add (not edit)
    if (!editingStudent) {
      setFormData({ name: '', email: '', phone: '', course: '', status: 'Pending' });
    }
    setErrors({});
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 md:p-8 mb-10 border border-gray-100">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
        {editingStudent ? 'Edit Student' : 'Add New Student'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className={`block w-full px-4 py-3 border ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150`}
              placeholder="Your name"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`block w-full px-4 py-3 border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150`}
              placeholder="student@example.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className={`block w-full px-4 py-3 border ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150`}
              placeholder="0712345678"
            />
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
          </div>

          {/* Course */}
          <div>
            <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">
              Course <span className="text-red-500">*</span>
            </label>
            <input
              id="course"
              name="course"
              type="text"
              value={formData.course}
              onChange={handleChange}
              className={`block w-full px-4 py-3 border ${
                errors.course ? 'border-red-500' : 'border-gray-300'
              } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150`}
              placeholder="BSc Computer Science"
            />
            {errors.course && <p className="mt-1 text-sm text-red-600">{errors.course}</p>}
          </div>

          {/* Status */}
          <div className="md:col-span-2">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Enrollment Status <span className="text-red-500">*</span>
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="block w-full px-4 py-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            >
              <option value="Pending">Pending</option>
              <option value="Enrolled">Enrolled</option>
              <option value="Dropped">Dropped</option>
            </select>
            {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 transform hover:scale-105"
          >
            {editingStudent ? 'Update Student' : 'Add Student'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;