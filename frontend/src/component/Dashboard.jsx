import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentForm from './StudentsFoem';
import StudentList from './StudentList';

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [filterCourse, setFilterCourse] = useState('');
  const [editingStudent, setEditingStudent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/students');
      setStudents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddOrUpdate = async (student) => {
    try {
      if (editingStudent) {
        await axios.put(`http://localhost:5001/api/students/${editingStudent._id}`, student);
      } else {
        await axios.post('http://localhost:5001/api/students', student);
      }
      fetchStudents();
      setEditingStudent(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/students/${id}`);
      fetchStudents();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
  };

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(search.toLowerCase()) &&
    (filterCourse ? student.course === filterCourse : true)
  );

  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <div className="mb-6 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
        <input 
          type="text" 
          placeholder="Search by name" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow shadow-sm hover:shadow-md"
        />
        <input 
          type="text" 
          placeholder="Filter by course" 
          value={filterCourse} 
          onChange={(e) => setFilterCourse(e.target.value)} 
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow shadow-sm hover:shadow-md"
        />
      </div>
      <StudentForm onSubmit={handleAddOrUpdate} editingStudent={editingStudent} />
      <StudentList 
        students={paginatedStudents} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />
      <div className="mt-6 flex justify-center space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button 
            key={i} 
            onClick={() => setCurrentPage(i + 1)} 
            className={`px-4 py-2 border border-gray-300 rounded-lg transition-colors duration-200 ${
              currentPage === i + 1 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-white text-gray-700 hover:bg-blue-100 hover:shadow-sm'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

