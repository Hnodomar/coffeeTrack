import 'whatwg-fetch';

const coffeeTrack = {};
const baseUrl = 'http://localhost:4000/api';

coffeeTrack.getEmployees = () => {
    const url = `${baseUrl}/employees`;
    return fetch(url).then(response => {
        if (!response.ok)
            return new Promise(resolve => resolve([]));
        return response.json().then(jsonResponse => {
            return jsonResponse.employees;
        });
    });
};

coffeeTrack.getEmployee = id => {
    const url = `${baseUrl}/employees/${id}`;
    return fetch(url).then(response => {
      if (!response.ok) {
        return new Promise(resolve => resolve(null));
      }
      return response.json().then(jsonResponse => {
        return jsonResponse.employee;
      });
    });
};
  
coffeeTrack.createEmployee = employee => {
    const url = `${baseUrl}/employees`;
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({employee: employee})
    };
    return fetch(url, fetchOptions).then(response => {
      if (!response.ok) {
        return new Promise(resolve => resolve(null));
      }
      return response.json().then(jsonResponse => {
        return jsonResponse.employee;
      });
    });
};
  
coffeeTrack.updateEmployee = employee => {
    const url = `${baseUrl}/employees/${employee.id}`;
    const fetchOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({employee: employee})
    };
    return fetch(url, fetchOptions).then(response => {
      if (!response.ok) {
        return new Promise(resolve => resolve(null));
      }
      return response.json().then(jsonResponse => {
        return jsonResponse.employee;
      });
    });
};
  
coffeeTrack.restoreEmployee = employee => {
    employee.isCurrentEmployee = 1;
    const url = `${baseUrl}/employees/${employee.id}`;
    const fetchOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({employee: employee})
    };
    return fetch(url, fetchOptions).then(response => {
      if (!response.ok) {
        return new Promise(resolve => resolve(null));
      }
      return response.json().then(jsonResponse => {
        return jsonResponse.employee;
      });
    });
};
  
coffeeTrack.deleteEmployee = id => {
    const url = `${baseUrl}/employees/${id}`;
    const fetchOptions = {
      method: 'DELETE'
    };
    return fetch(url, fetchOptions);
};
  
coffeeTrack.getMenus = () => {
    const url = `${baseUrl}/menus`;
  
    return fetch(url).then(response => {
      if (!response.ok) {
        return new Promise(resolve => resolve([]));
      }
      return response.json().then(jsonResponse => {
        return jsonResponse.menus;
      });
    });
};

export default coffeeTrack;