package com.example.demo.endpoint;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ws.server.endpoint.annotation.Endpoint;
import org.springframework.ws.server.endpoint.annotation.PayloadRoot;
import org.springframework.ws.server.endpoint.annotation.RequestPayload;
import org.springframework.ws.server.endpoint.annotation.ResponsePayload;

import com.example.demo.model.Employee;
import com.example.demo.service.EmployeeService;

import allapis.demo.example.com.*;



@Endpoint
public class EmployeeEndPoint {
    
    private static final String NAMESPACE_URI = "http://com.example.demo.allapis";

    @Autowired
    private EmployeeService employeeService;
    
    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "addEmployeeRequest")
    @ResponsePayload
    public AddEmployeeResponse addEmployee(@RequestPayload AddEmployeeRequest request) {

        AddEmployeeResponse response = new AddEmployeeResponse();
        ServiceStatus serviceStatus = new ServiceStatus();

        Employee employee = new Employee();
        EmployeeInfo employeeInfo = request.getEmployeeInfo();
        if (employeeInfo != null)
            BeanUtils.copyProperties(employeeInfo, employee);
        Employee employeeCreated = employeeService.createEmployee(employee);
        if (employeeCreated == null) {
            serviceStatus.setStatus("CONFLICT");
            serviceStatus.setMessage("Exception while adding Entity");
            response.setStatus(serviceStatus);
            return response;
        } else {
            EmployeeInfo employeeInfoCreated = new EmployeeInfo();
            BeanUtils.copyProperties(employeeCreated, employeeInfoCreated);
            response.setEmployeeInfo(employeeInfoCreated);
        }
        serviceStatus.setStatus("SUCCESS");
        serviceStatus.setMessage("Employee Added Successfully");
        response.setStatus(serviceStatus);
        return response;
    }

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "updateEmployeeRequest")
    @ResponsePayload
    public UpdateEmployeeResponse updateEmployee(@RequestPayload UpdateEmployeeRequest request) {

        UpdateEmployeeResponse response = new UpdateEmployeeResponse();
        ServiceStatus serviceStatus = new ServiceStatus();

        EmployeeInfo employeeInfoRequest = request.getEmployeeInfo();
        Employee employee = new Employee();
        if (employeeInfoRequest != null)
            BeanUtils.copyProperties(employeeInfoRequest, employee);
        Employee employeeUpdated = employeeService.updateEmployee(employee.getId(), employee);
        if (employeeUpdated == null){
            serviceStatus.setStatus("CONFLICT");
            serviceStatus.setMessage("Exception while adding Entity");
            response.setStatus(serviceStatus);
            return response;
        } else {
            EmployeeInfo employeeInfo = new EmployeeInfo();
            BeanUtils.copyProperties(employeeUpdated, employeeInfo);
            response.setEmployeeInfo(employeeInfo);
        
        }
        serviceStatus = new ServiceStatus();
        serviceStatus.setStatus("SUCCESS");
        serviceStatus.setMessage("Employee Updated Successfully");
        response = new UpdateEmployeeResponse();
        response.setStatus(serviceStatus);
        return response;
    }

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "deleteEmployeeRequest")
    @ResponsePayload
    public DeleteEmployeeResponse deleteEmployee(@RequestPayload DeleteEmployeeRequest request) {

        DeleteEmployeeResponse response = new DeleteEmployeeResponse();
        ServiceStatus serviceStatus = new ServiceStatus();
        Long id = request.getEmployeeId();
        if (id == null || id == 0) {
            serviceStatus.setStatus("BAD_REQUEST");
            serviceStatus.setMessage("Id can't be null or zero");
            response.setStatus(serviceStatus);
            return response;
        }
        employeeService.deleteEmployee(id);
        serviceStatus.setStatus("SUCCESS");
        serviceStatus.setMessage("Employee Deleted Successfully");
        response.setStatus(serviceStatus);
        return response;
    }


    //Get Employy by Id
    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "getEmployeeByIdRequest")
    @ResponsePayload
    public GetEmployeeByIdResponse getEmployee(@RequestPayload GetEmployeeByIdRequest request) {

        GetEmployeeByIdResponse response = new GetEmployeeByIdResponse();
        EmployeeInfo employeeInfo = new EmployeeInfo();
        ServiceStatus serviceStatus = new ServiceStatus();
        Long id = request.getEmployeeId();
        if (id == null || id == 0) {
            serviceStatus.setStatus("BAD_REQUEST");
            serviceStatus.setMessage("Id can't be null or zero");
            response.setStatus(serviceStatus);
            return response;
        }
        Employee employee = employeeService.getEmployeeById(id);
        if (employee == null) {
            serviceStatus.setStatus("NOT_FOUND");
            serviceStatus.setMessage("Employee " + id + " not found");
            response.setStatus(serviceStatus);
            return response;
        }
        BeanUtils.copyProperties(employee, employeeInfo);
        response.setEmployeeInfo(employeeInfo);
        serviceStatus.setStatus("SUCCESS");
        serviceStatus.setMessage("Employee Found");
        response.setStatus(serviceStatus);
        return response;
    }


    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "getAllEmployeesRequest")
    @ResponsePayload
    public GetAllEmployeesResponse getAllEmployees() {
        GetAllEmployeesResponse response = new GetAllEmployeesResponse();
        ServiceStatus serviceStatus = new ServiceStatus();
        List<Employee> employees = employeeService.getAllEmployees();
        
        if (employees.isEmpty()) {
            serviceStatus.setStatus("NOT_FOUND");
            serviceStatus.setMessage("No Employees found");
        } else {
            EmployeeList employeeList = new EmployeeList();
            List<EmployeeInfo> employeeInfoList = employeeList.getEmployeeInfo();
            
            for (Employee employee : employees) {
                EmployeeInfo employeeInfo = new EmployeeInfo();
                BeanUtils.copyProperties(employee, employeeInfo);
                employeeInfoList.add(employeeInfo);
            }
            
            response.setEmployeeList(employeeList);
            serviceStatus.setStatus("SUCCESS");
            serviceStatus.setMessage("Employees Found");
        }
        
        response.setStatus(serviceStatus);
        return response;
    }
    

    
}
