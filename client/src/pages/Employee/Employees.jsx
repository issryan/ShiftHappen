//Employee.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeModal from './EmployeeModal';
import './Employee.css';
import { FaTrash, FaEdit } from 'react-icons/fa';

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editEmployeeId, setEditEmployeeId] = useState(null); // Define the state for editEmployeeId

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error("Failed to fetch employees", error);
    }
  };

  const handleEmployeeSubmit = async (employeeData) => {
    if (editEmployeeId) {
      try {
        const response = await axios.put(`http://localhost:5001/api/employees/${editEmployeeId}`, employeeData);
        const updatedEmployees = employees.map(emp => emp._id === editEmployeeId ? {...emp, ...response.data} : emp);
        setEmployees(updatedEmployees);
      } catch (error) {
        console.error("Failed to update employee", error);
      }
    } else {
      try {
        const response = await axios.post('http://localhost:5001/api/employees', employeeData);
        setEmployees([...employees, response.data]);
      } catch (error) {
        console.error("Failed to add employee", error);
      }
    }
    setIsModalOpen(false); 
    setEditEmployeeId(null); // Reset editEmployeeId after submission
  };
  

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/employees/${id}`);
      const updatedEmployees = employees.filter(employee => employee._id !== id); // Use _id for MongoDB documents
      setEmployees(updatedEmployees);
    } catch (error) {
      console.error("Failed to delete employee", error);
    }
  };

  const startEdit = (id) => {
    setEditEmployeeId(id); // Set the ID of the employee to be edited
    setIsModalOpen(true); // Open the modal for editing
  };

  return (
    <div className='body-container'>
      <div className="App">
        <div className="button-container">
          <button className="button" onClick={() => setIsModalOpen(true)}>Add Employee</button>
        </div>
        <EmployeeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleEmployeeSubmit}
          editingEmployee={editEmployeeId ? employees.find(emp => emp._id === editEmployeeId) : null} // Use _id for MongoDB documents
        />
        <article className='table-widget'>
          <div className='caption'>
            <h2>Employees</h2>
            <button className='export-btn' type='button'>Export</button>
          </div>
          <table>
            <thead>
              <tr>
                <th style={{ minWidth: '120px' }}>Name</th>
                <th style={{ minWidth: '500px' }}>Availability</th>
                <th style={{ minWidth: '120px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(employee => (
                <tr key={employee._id}> {/* Use _id for MongoDB documents */}
                  <td className='team-member-profile' style={{ minWidth: '120px' }}>
                    <div className='profile-info'>
                      <div className='profile-info__name'>{`${employee.firstName} ${employee.lastName}`}</div>
                    </div>
                  </td>
                  <td className='availability-cell' style={{ minWidth: '500px' }}>
                    <div className='status'>
                      <span>
                        {Object.entries(employee.availability).filter(([day, available]) => available).map(([day]) => day).join(', ')}
                      </span>
                    </div>
                  </td>
                  <td style={{ minWidth: '120px' }}>
                    <div className='action-container'>
                      <button className='edit-btn' onClick={() => startEdit(employee._id)}><FaEdit />Edit</button> {/* Wrap icons correctly */}
                      <button className='delete-btn' onClick={() => deleteEmployee(employee._id)}><FaTrash />Delete</button> {/* Wrap icons correctly */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
        <div className="button-container">
          <a href="/schedule">
            <button className='button-create'>Create Schedule</button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Employees;
