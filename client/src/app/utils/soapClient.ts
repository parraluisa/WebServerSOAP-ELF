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

interface SoapClient {
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
        const parsedResponse: GetAllEmployeesResponse = JSON.parse(jsonResult);

        // Get the employees from the response
        const employees: Employee[] = parsedResponse.getAllEmployeesResponse.employeeList.employeeInfo;

        console.log('Employees:', employees);

        return employees;
      } catch (error) {
        console.error('Error calling SOAP service:', error);
        throw error;
      }
    },
  };
};

export default createSoapClient;
