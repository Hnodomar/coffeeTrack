import React from 'react';
import { Link } from 'react-router-dom';
import coffeeTrack from '../utils/coffeeTrack';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            menus: []
        };
    }

    componentDidMount() {
        coffeeTrack.getEmployees().then(employees => {
            if (employees.length) {
                const sortedEmployees = this.sortItemNames(employees, 'name');
                this.setState({employees: sortedEmployees});
            }
        });
    }

    sortItemNames(items, field) {
        return items.sort((item1, item2) => {
          if (item2[field].toLowerCase() < item1[field].toLowerCase()) {
            return 1;
          } else {
            return -1;
          }
        });
    }
    
    renderEmployees() {
        return this.state.employees.map(employee => {
          return (
            <Link to={`/employees/${employee.id}`}
               className="item"
               key={employee.id}>
               <h3>{employee.name}</h3>
            </Link>
          );
        });
    }

    render() {
        return (
            <div className="Home">
                <h2>MANAGE EMPLOYEES</h2>
                <div className="employee item-list">
                    {this.renderEmployees()}
                </div>
            </div>
        );
    }
}

export default Home;