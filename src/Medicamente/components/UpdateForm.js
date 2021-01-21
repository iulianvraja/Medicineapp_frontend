import React from 'react';
import Button from "react-bootstrap/Button";

import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';
import { Form } from "react-bootstrap";
import {HOST} from "../../commons/hosts";




class UpdateForm extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;

        this.state = {

            errorStatus: 0,
            error: null,

            formIsValid: false,

            formControls: {
                numest: {
                    value: 'nothing',
                    placeholder: 'name to delete',
                    touched: false,

                },

                nume: {
                    value: '',
                    placeholder: 'What is your name?...',
                    touched: false,

                },
                effect: {
                    value: '',
                    placeholder: 'Choose your pass',

                    touched: false,

                },
                dozaj: {
                    value: '',
                    placeholder: 'data nasterii',

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

        const updatedControls = this.state.formControls;

        const updatedFormElement = updatedControls[name];

        updatedFormElement.value = value;

        updatedControls[name] = updatedFormElement;


        this.setState({
            formControls: updatedControls,
            formIsValid: true,
        });

    };


    handleSubmit() {

            let ing = {
                nume: this.state.formControls.nume.value,
                effect: this.state.formControls.effect.value,
                dozaj: this.state.formControls.dozaj.value,
                numeup:this.state.formControls.numest.value,
            };



        this.update(ing);
    }

    async update(ing) {
        let request = new Request(HOST.backend_api + '/medicamente' , {
            method: 'PUT',
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ing)
        });
        await fetch(request);
        this.reloadHandler();
    }


    render() {
        return (
            <div name="ingf">

                <FormGroup id='numest'>
                    <Label for='nameField'> Numele Medicamentului pe care dorim sa-l stergem: </Label>
                    <Input name='numest' id='nameField' placeholder={this.state.formControls.nume.placeholder}
                           onChange={this.handleChange}
                           required
                    />

                </FormGroup>


                <FormGroup id='name'>
                    <Label for='nameField'> NumeMediament </Label>
                    <Input name='nume' id='nameField'
                           onChange={this.handleChange}
                           required
                    />
                </FormGroup>

                <FormGroup id='effect'>
                    <Label for='parolaField'> Effect Medicament </Label>
                    <Input name='effect' id='effectField'
                           onChange={this.handleChange}
                           required
                    />
                </FormGroup>

                <FormGroup id='dozaj'>
                    <Label for='dozajField'> Address: </Label>
                    <Input name='dozaj' id='dozajField'
                           onChange={this.handleChange}
                           required
                    />
                </FormGroup>


                <Row>
                    <Col sm={{size: '4', offset: 8}}>
                        <Button type={"submit"} onClick={this.handleSubmit}> Submit </Button>
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

export default UpdateForm;
