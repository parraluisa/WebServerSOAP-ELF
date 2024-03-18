// pages/index.tsx
'use client'
import React, { useEffect, useState } from 'react';
import createSoapClient from '../app/utils/soapClient';

interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  role: string;
}

const Home = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showUpdateForm, setShowUpdateForm] = useState<boolean>(false);
  const [updateEmployee, setUpdateEmployee] = useState<Employee>(
    {
      id: 0,
      name: '',
      email: '',
      department: '',
      role: ''
    }
  );
  const [newEmployee, setNewEmployee] = useState<Employee>({
    id: 0,
    name: '',
    email: '',
    department: '',
    role: ''
  });

  const fetchData = async () => {
    try {
      const soapClient = await createSoapClient();
      const response = await soapClient.getAllEmployees();
      setEmployees(response);
    } catch (error) {
      console.error('Error calling SOAP service:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array to ensure it runs only once on component mount

  const handleDelete = async (id: number) => {
    try {
      console.log('Eliminar empleado con ID:', id);
      // Llama a la función para eliminar el empleado en el backend
      // Después de eliminar, actualiza los empleados
      const soapClient = await createSoapClient();
      await soapClient.deleteEmployee(id);
      await fetchData();
    } catch (error) {
      console.error('Error al eliminar empleado:', error);
    }
  };

  const handleNewEmployeeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Nuevo empleado:', newEmployee);

      const soapClient = await createSoapClient();
      await soapClient.addEmployee(newEmployee);

      await fetchData();
      setNewEmployee({
        id: 0,
        name: '',
        email: '',
        department: '',
        role: ''
      });
      await fetchData();
    } catch (error) {
      console.error('Error al agregar nuevo empleado:', error);
    }
  };

  const handleUpdate = async (employee: Employee) => {
    try {
      console.log('Actualizar empleado:', employee);

      const soapClient = await createSoapClient();
      await soapClient.updateEmployee(employee);

      await fetchData();
      handleCancel();
      setShowUpdateForm(false);
    } catch (error) {
      console.error('Error al actualizar empleado:', error);
    }
  }

  const handleCancel = () => {
    setUpdateEmployee({
      id: 0,
      name: '',
      email: '',
      department: '',
      role: ''
    });
    setShowUpdateForm(false);
  }

  return (
    <div id="container">
      <h1>CRUD Operations</h1>
      <div id="input-container">
        <input id="id-input" type="id" value={newEmployee.id} placeholder="Enter id" onChange={(e) => setNewEmployee({...newEmployee, id: Number(e.target.value)})} />
        {' '} 
        <input id="name-input" type="name" value={newEmployee.name} placeholder="Enter name" onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})} />
        {' '} 
        <input id="email-input" type="email" value={newEmployee.email} placeholder="Enter email" onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})} />
        {' '} 
        <input id="department-input" type="department" value={newEmployee.department} placeholder="Enter department" onChange={(e) => setNewEmployee({...newEmployee, department: e.target.value})} />
        {' '} 
        <input id="role-input" type="role" value={newEmployee.role} placeholder="Enter role" onChange={(e) => setNewEmployee({...newEmployee, role: e.target.value})} />
        {' '} 
        <button onClick={handleNewEmployeeSubmit}>Add</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.department}</td>
              <td>{employee.role}</td>
              <td>
                <button onClick={() => {
                  setShowUpdateForm(true);
                  setUpdateEmployee(employee);
                  console.log('Update employee:', updateEmployee);
                }}>Update</button>
                {' '}
                <button id="delete-btn" onClick={() => handleDelete(employee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div id="container" className={showUpdateForm ? 'show-update-form' : ''}>
            <input type="text" placeholder='Name' id="update-name-input" value={updateEmployee?.name} onChange={(e) => setUpdateEmployee({ ...updateEmployee, name: e.target.value })}/>
            <input type="text" placeholder='Email' id="update-email-input" value={updateEmployee?.email} onChange={(e) => setUpdateEmployee({ ...updateEmployee, email: e.target.value })}/>
            <input type="text" placeholder='Deparment' id="update-department-input"value={updateEmployee?.department} onChange={(e) => setUpdateEmployee({ ...updateEmployee, department: e.target.value })}/>
            <input type="text" placeholder='Role' id="update-role-input" value={updateEmployee?.role} onChange={(e) => setUpdateEmployee({ ...updateEmployee, role: e.target.value })}/>
            <div>
            <button id="update-btn" onClick={() => handleUpdate(updateEmployee)}>Update</button>
            {' '}
            <button id="cancel-btn" onClick={() => handleCancel()}>Cancel</button>
            </div>
            
      </div>
      
    </div>
  );
};

export default Home;
