import React from 'react';
import coffeeTrack from '../utils/coffeeTrack';

class Employee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employee: null,
            timesheets: []
        };

        this.updateEmployeeName = this.updateEmployeeName.bind(this);
        this.updateEmployeePosition = this.updateEmployeePosition.bind(this);
        this.updateEmployeeWage = this.updateEmployeeWage.bind(this);
        this.saveEmployee = this.saveEmployee.bind(this);
        this.cancelEmployeeEdit = this.cancelEmployeeEdit.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
        this.restoreEmployee = this.restoreEmployee.bind(this);

    }

    componentDidMount() {
        if (this.props.match.params.id === 'new') {
            const newEmployee = {
                name: '',
                position: '',
                wage: 0,
                isCurrentEmployee: 1
            };
            this.setState({
                employee: newEmployee,
                savedEmployee: JSON.parse(JSON.stringify(newEmployee))
            });
            return;
        }

        coffeeTrack.getEmployee(this.props.match.params.id).then(employee => {
            if (employee) {
                this.setState({
                    employee: employee,
                    savedEmployee: JSON.parse(JSON.stringify(employee))
                });
            }
        });
    }

    employeeHasChanges() {
        const employee = this.state.employee;
        const savedEmployee = this.state.savedEmployee;
        if (!savedEmployee) {
            return false;
        }

        if (employee.name === savedEmployee.name &&
            employee.position === savedEmployee.position &&
            employee.wage === savedEmployee.wage) {
            return false;
        }

        return true;
    }

    employeeHasAllRequiredFields() {
        return !!this.state.employee.name && !!this.state.employee.position &&
            !!this.state.employee.wage;
    }

    updateEmployeeName(event) {
        const employee = JSON.parse(JSON.stringify(this.state.employee));
        employee.name = event.target.value;
        this.setState({ employee: employee });
    }

    updateEmployeePosition(event) {
        const employee = JSON.parse(JSON.stringify(this.state.employee));
        employee.position = event.target.value;
        this.setState({ employee: employee });
    }

    updateEmployeeWage(event) {
        const employee = JSON.parse(JSON.stringify(this.state.employee));
        employee.wage = event.target.value;
        this.setState({ employee: employee });
    }


    saveEmployee() {
        if (this.state.employee.id) {
            coffeeTrack.updateEmployee(this.state.employee).then(employee => {
                this.setState({
                    employee: employee,
                    savedEmployee: JSON.parse(JSON.stringify(employee))
                });
            });
        } else {
            coffeeTrack.createEmployee(this.state.employee).then(employee => {
                this.props.history.push(`/employees/${employee.id}`);
                this.setState({
                    employee: employee,
                    savedEmployee: JSON.parse(JSON.stringify(employee))
                });
            });
        }
    }

    cancelEmployeeEdit() {
        this.setState({
            employee: JSON.parse(JSON.stringify(this.state.savedEmployee))
        });
    }

    deleteEmployee() {
        coffeeTrack.deleteEmployee(this.state.employee.id).then(() => {
            this.props.history.push('/');
        });
    }

    restoreEmployee() {
        coffeeTrack.restoreEmployee(this.state.savedEmployee).then(employee => {
            const stateEmployee = JSON.parse(JSON.stringify(this.state.employee));
            stateEmployee.isCurrentEmployee = employee.isCurrentEmployee;
            this.setState({
                employee: stateEmployee,
                savedEmployee: employee
            });
        });
    }

    renderEmployment() {
        if (!this.state.employee.isCurrentEmployee) {
            return <h3 className="strong">Retired</h3>;
        }
        return '';
    }

    renderEmployeeButtons() {
        const employee = this.state.employee;
        let saveButton, cancelButton, deleteButton;

        if (this.employeeHasChanges() && this.employeeHasAllRequiredFields()) {
            saveButton = <a className={'button'} onClick={this.saveEmployee}>Save</a>;
        } else {
            saveButton = <a className='button inactive'>Save</a>;
        }

        if (this.employeeHasChanges()) {
            cancelButton = <a className={'button'} onClick={this.cancelEmployeeEdit}>Cancel</a>
        } else {
            cancelButton = <a className='button inactive'>Cancel</a>;
        }

        if (employee.isCurrentEmployee && employee.id) {
            deleteButton = <a className='button delete' onClick={this.deleteEmployee}>Delete</a>;
        } else if (employee.id) {
            deleteButton = <a className='button' onClick={this.restoreEmployee}>Restore</a>
        } else {
            deleteButton = '';
        }

        return (
            <div className="buttons">
                {saveButton}
                {cancelButton}
                {deleteButton}
            </div>
        )
    }




    render() {
        if (!this.state.employee) {
            return <div className="Employee"></div>
        }
        const employee = this.state.employee;
        return (
            <div className="Employee">
                <h2>Employee</h2>
                <div className="employee box">
                    {this.renderEmployment()}
                    <p className="strong">Name: <input onChange={this.updateEmployeeName} value={employee.name} /></p>
                    <p>Position: <input onChange={this.updateEmployeePosition} value={employee.position} /></p>
                    <p>Wage: $ <input onChange={this.updateEmployeeWage} value={employee.wage} type="number" /> / hour</p>
                    {this.renderEmployeeButtons()}
                </div>
            </div>
        );
    }
}

export default Employee;