import React, { useState } from 'react';
import Nav from '/Users/ryanarafeh/Desktop/Projects/Shift/client/src/components/Nav/Nav.jsx';
import EmployeeModal from './EmployeeModal';
import './Employee.css'

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

  // Placeholder for edit functionality
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
        {employees.map((employee, index) => (
          <div key={index}>
            {employee.firstName} {employee.lastName} - {Object.entries(employee.availability).filter(([, value]) => value).map(([key]) => key).join(', ')}
            <button onClick={() => editEmployee(index)}>Edit</button>
            <button onClick={() => deleteEmployee(index)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
