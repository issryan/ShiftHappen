import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '/Users/ryanarafeh/Desktop/Projects/Shift/client/src/components/Nav/Nav.jsx';
import EmployeeModal from './EmployeeModal';
import './Employee.css'
import { FaTrash, FaEdit } from 'react-icons/fa';

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editEmployeeId, setEditEmployeeId] = useState(null); // New state to track the ID of the employee being edited

  useEffect(() => {
    axios.get('http://localhost:5000/api/employees')
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the employees:', error);
      });
  }, []);

  const handleEmployeeSubmit = (employeeData) => {
    if (editEmployeeId) {
      // Edit operation
      setEmployees(employees.map(emp => emp.id === editEmployeeId ? { ...emp, ...employeeData } : emp));
    } else {
      // Add operation
      const newEmployee = { id: Date.now(), ...employeeData };
      setEmployees([...employees, newEmployee]);
    }
    setIsModalOpen(false);
    setEditEmployeeId(null); // Reset after operation
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter(employee => employee.id !== id));
  };

  const startEdit = (id) => {
    setEditEmployeeId(id);
    setIsModalOpen(true);
  };


  return (
    <>
      <Nav />
      <div className="App">
        <div className="button-container">
          <button className="button" onClick={() => setIsModalOpen(true)}>Add Employee</button>
        </div>
        <EmployeeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleEmployeeSubmit}
          editingEmployee={editEmployeeId ? employees.find(emp => emp.id === editEmployeeId) : null}
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
                <tr key={employee.id}>
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
                      <button className='edit-btn' onClick={() => startEdit(employee.id)}>{FaEdit}Edit</button>
                      <button className='delete-btn' onClick={() => deleteEmployee(employee.id)}>{FaTrash}Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
      </div>
    </>
  );
}

export default Employees;
