import React from 'react';
import Button from "react-bootstrap/Button";

import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';
import {HOST} from "../../commons/hosts";



class MedicationFormm extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;

        this.state = {

            errorStatus: 0,
            error: null,

            formIsValid: false,

            formControls: {
                numem: {
                    value: 'nothing',
                    touched: false,

                },

                numep: {
                    value: '',
                    valid: true,
                    touched: false,

                },
                interval: {
                    value: '',
                    valid: true,
                    touched: false,

                }
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleForm() {
        this.setState({collapseForm: !this.state.collapseForm});
    }


    handleChange = event => {

        const name = event.target.name;
        const value = event.target.value;
        console.log(name+"value="+value);
        const updatedControls = this.state.formControls;

        const updatedFormElement = updatedControls[name];

        updatedFormElement.value = value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = true;
        updatedControls[name] = updatedFormElement;

        let formIsValid = true;


        this.setState({
            formControls: updatedControls,
            formIsValid: formIsValid
        });

    };

    handleSubmit() {

        let p = {
            numem: this.state.formControls.numem.value,
            numep: this.state.formControls.numep.value,
            interval: this.state.formControls.interval.value

        };



        this.insert(p);
    }

    async insert(p ){
        console.log("Object="+ p.numem+p.numep+p.interval);
        let request = new Request(HOST.backend_api + '/pacient/createmed', {
            method: 'POST',
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(p)
        });
        await fetch(request);
        this.toggleForm();
        this.reloadHandler();
    }

    render() {
        return (
            <div>
                <FormGroup id='numem'>
                    <Label for='nameField'> Nume Medicament: </Label>
                    <Input name='numem' id='nameField'
                           onChange={this.handleChange}
                           required
                    />
                </FormGroup>
                <FormGroup id='nump'>
                    <Label for='nameField'> NumePacient: </Label>
                    <Input name='numep' id='numeField'
                           onChange={this.handleChange}
                           required
                    />

                </FormGroup>

                <FormGroup id='interval'>
                    <Label for='parolaField'> Intervalul in care il poate lua: </Label>
                    <Input name='interval' id='parolaField'
                           onChange={this.handleChange}

                           required
                    />

                </FormGroup>


                <Row>
                    <Col sm={{size: '4', offset: 8}}>
                        <Button type={"submit"} onClick={this.handleSubmit}>  Submit </Button>
                    </Col>
                </Row>

                {
                    this.state.errorStatus > 0 &&
                    <APIResponseErrorMessage errorStatus={this.state.errorStatus} error={this.state.error}/>
                }
            </div>
        ) ;
    }
}

export default MedicationFormm;
