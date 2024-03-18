import axios from 'axios';
import convert from 'xml-js';

const serviceUrl = 'http://localhost:8080/ws'; // Use serviceUrl for actual request

interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  role: string;
}

interface GetAllEmployeesResponse {
  getAllEmployeesResponse: {
    employeeList: {
      employeeInfo: Employee[];
    };
  };
}

interface DeleteEmployeeRequest {
  emplyeeId: number;
}

interface SoapClient {
  updateEmployee(employee: Employee): unknown;
  deleteEmployee(id: number): unknown;
  addEmployee(newEmployee: Employee): unknown;
  getAllEmployees: () => Promise<Employee[]>;
}

const createSoapClient = async (): Promise<SoapClient> => {
  return {
    getAllEmployees: async (): Promise<Employee[]> => {
      try {
        const response = await axios.post(
          serviceUrl, // Use serviceUrl here
          `
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:com="http://com.example.demo.allapis">
  <soapenv:Header/>
  <soapenv:Body>
    <com:getAllEmployeesRequest/>
  </soapenv:Body>
</soapenv:Envelope>
`,
          {
            headers: {
              'Content-Type': 'text/xml; charset=utf-8',
            },
          }
        );

        // Convert the response XML to JSON
        const jsonResult = convert.xml2json(response.data, { compact: true, spaces: 4 });

        // Parse the response JSON
        const parsedResponse: any = JSON.parse(jsonResult); // Cambiado a 'any' por simplicidad

        // Verificamos si la respuesta es válida y si contiene la lista de empleados
        if (parsedResponse && parsedResponse['SOAP-ENV:Envelope'] && parsedResponse['SOAP-ENV:Envelope']['SOAP-ENV:Body']) {
          const body = parsedResponse['SOAP-ENV:Envelope']['SOAP-ENV:Body'];

          // Verificamos si la respuesta contiene la etiqueta 'getAllEmployeesResponse'
          if (body['ns2:getAllEmployeesResponse']) {
            const response = body['ns2:getAllEmployeesResponse'];

            // Verificamos si la respuesta contiene la lista de empleados
            if (response['ns2:employeeList'] && response['ns2:employeeList']['ns2:employeeInfo']) {
              const employeeList = response['ns2:employeeList']['ns2:employeeInfo'];

              // Verificamos si la lista de empleados es un array
              if (Array.isArray(employeeList)) {
                // Convertimos cada objeto de empleado a la interfaz Employee y los almacenamos en un array
                const employees: Employee[] = employeeList.map((employee: any) => ({
                  id: parseInt(employee['ns2:id']._text),
                  name: employee['ns2:name']._text,
                  email: employee['ns2:email']._text,
                  department: employee['ns2:department']._text,
                  role: employee['ns2:role']._text
                }));

                console.log('Employees:', employees);
                return employees;
              } else {
                // Si la lista de empleados no es un array, podrías manejarlo según tu lógica de aplicación
                console.error('La lista de empleados no es un array.');
                throw new Error('La lista de empleados no es un array.');
              }
            } else {
              console.error('La respuesta no contiene la lista de empleados.');
              throw new Error('La respuesta no contiene la lista de empleados.');
            }
          } else {
            console.error('La respuesta no contiene la etiqueta getAllEmployeesResponse.');
            throw new Error('La respuesta no contiene la etiqueta getAllEmployeesResponse.');
          }
        } else {
          console.error('Respuesta SOAP no válida o incompleta.');
          throw new Error('Respuesta SOAP no válida o incompleta.');
        }
      } catch (error) {
        console.error('Error calling SOAP service:', error);
        throw error;
      }
    },
    addEmployee: async (employee: Employee): Promise<void> => {
      try {
        const response = await axios.post(
          serviceUrl, // Use serviceUrl here
          `
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:com="http://com.example.demo.allapis">
  <soapenv:Header/>
  <soapenv:Body>
    <com:addEmployeeRequest>
      <com:employeeInfo>
        <com:id>${employee.id}</com:id>
        <com:name>${employee.name}</com:name>
        <com:email>${employee.email}</com:email>
        <com:department>${employee.department}</com:department>
        <com:role>${employee.role}</com:role>
      </com:employeeInfo>
    </com:addEmployeeRequest>
  </soapenv:Body>
</soapenv:Envelope>
`,
          {
            headers: {
              'Content-Type': 'text/xml; charset=utf-8',
            },
          }
        );

        // Handle response if needed
      } catch (error) {
        console.error('Error adding employee:', error);
        throw error;
      }
    },
    deleteEmployee: async (employeeId: number): Promise<void> => {
      try {
        const response = await axios.post(
          serviceUrl, // Use serviceUrl here
          `
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:com="http://com.example.demo.allapis">
  <soapenv:Header/>
  <soapenv:Body>
    <com:deleteEmployeeRequest>
      <com:employeeId>${employeeId}</com:employeeId>
    </com:deleteEmployeeRequest>
  </soapenv:Body>
</soapenv:Envelope>
`,
          {
            headers: {
              'Content-Type': 'text/xml; charset=utf-8',
            },
          }
        );

        // Handle response if needed
      } catch (error) {
        console.error('Error deleting employee:', error);
        throw error;
      }
    },
    updateEmployee: async (employee: Employee): Promise<void> => {
      try {
        const response = await axios.post(
          serviceUrl, // Use serviceUrl here
          `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:com="http://com.example.demo.allapis">
          <soapenv:Header/>
          <soapenv:Body>
            <com:updateEmployeeRequest>
              <com:employeeInfo>
                <com:id>${employee.id}</com:id>
                <com:name>${employee.name}</com:name>
                <com:email>${employee.email}</com:email>
                <com:department>${employee.department}</com:department>
                <com:role>${employee.role}</com:role>
              </com:employeeInfo>
            </com:updateEmployeeRequest>
          </soapenv:Body>
        </soapenv:Envelope>
        `,  {
            headers: {
              'Content-Type': 'text/xml; charset=utf-8',
            },
          }
        );
        }
      catch (error) {
        console.error('Error updating employee:', error);
        throw error;
      }
    },
  };
};

export default createSoapClient;
