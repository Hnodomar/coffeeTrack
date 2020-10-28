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

export default coffeeTrack;