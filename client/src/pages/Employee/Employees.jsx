import React, { useState } from 'react';
import Nav from '/Users/ryanarafeh/Desktop/Projects/Shift/client/src/components/Nav/Nav.jsx';
import EmployeeModal from './EmployeeModal';
import './Employee.css'
import { FaTrash, FaEdit } from 'react-icons/fa'; // Importing icons

function App() {
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addEmployee = (employee) => {
    setEmployees([...employees, employee]);
  };

  const deleteEmployee = (index) => {
    const newEmployees = [...employees];
    newEmployees.splice(index, 1);
    setEmployees(newEmployees);
  };

  const editEmployee = (index) => {
    console.log('Edit functionality to be implemented', index);
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
          onSubmit={addEmployee}
        />
        <div className='table-container'>
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Availability</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{`${employee.firstName} ${employee.lastName}`}</td>
                <td>{Object.entries(employee.availability).filter(([day, available]) => available).map(([day]) => day).join(', ')}</td>
                <td>
                  <div className='action-container'>
                    <button className='edit-btn' onClick={() => {/* Call edit function here */ }}>
                      <FaEdit /> Edit
                    </button>
                    <button className='delete-btn' onClick={() => deleteEmployee(employee.id)}>
                      <FaTrash /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </>
  );
}

export default App;
