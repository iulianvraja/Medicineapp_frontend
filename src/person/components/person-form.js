import React from 'react';
import validate from "./validators/person-validators";
import Button from "react-bootstrap/Button";
import * as API_USERS from "../api/person-api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';
import {Form} from "react-bootstrap";



class PersonForm extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;

        this.state = {

            errorStatus: 0,
            error: null,

            formIsValid: false,

            formControls: {

        nume: {
                    value: '',
                    placeholder: 'What is your name?...',
                    valid: true,
                    touched: false,

                },
                parola: {
                    value: '',
                    placeholder: 'Email...',
                    valid: true,
                    touched: false,

                },
                data_N: {
                    value: '',
                    placeholder: 'Age...',
                    valid: true,
                    touched: false,
                },
        sex: {
                value: '',
                valid: true,
                touched: false,
             },
                adr: {
                    value: '',
                    placeholder: 'Cluj, Zorilor, Str. Lalelelor 21...',
                    valid: true,
                    touched: false,
                },

                stare: {
                    value: '',
                    placeholder: 'Cluj, Zorilor, Str. Lalelelor 21...',
                    valid: true,
                    touched: false,
                },

                perioadaTratament: {
                    value: '',
                    placeholder: 'Cluj, Zorilor, Str. Lalelelor 21...',
                    valid: false,
                    touched: false,
                },
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
        updatedFormElement.valid = validate(value, updatedFormElement.validationRules);
        updatedControls[name] = updatedFormElement;

        let formIsValid = true;


        this.setState({
            formControls: updatedControls,
            formIsValid: formIsValid
        });

    };

    registerPerson(pacientForm) {
        return API_USERS.postPerson(pacientForm, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully inserted person with id: " + result);
                this.reloadHandler();
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        });
    }

    handleSubmit() {
        let pacientForm = {
            nume: this.state.formControls.nume.value,
            parola: this.state.formControls.parola.value,
            data_n: this.state.formControls.data_N.value,
            adr: this.state.formControls.adr.value,
            sex:this.state.formControls.sex.value,
            stare:this.state.formControls.stare.value,
            perioadaTratament:this.state.formControls.perioadaTratament.value
        };

        console.log(pacientForm);
        this.registerPerson(pacientForm);
    }

    render() {
        return (
            <div>

                <FormGroup id='nume'>
                    <Label for='nameField'> Name: </Label>
                    <Input name='nume' id='numeField'
                           onChange={this.handleChange}
                           required
                    />

                </FormGroup>

                <FormGroup id='parola'>
                    <Label for='parolaField'> Parola: </Label>
                    <Input name='parola' id='parolaField'
                           onChange={this.handleChange}

                           required
                    />

                </FormGroup>

                <FormGroup id='adr'>
                    <Label for='adrField'> Address: </Label>
                    <Input name='adr' id='adrField'
                           onChange={this.handleChange}
                           required
                    />
                </FormGroup>

                <FormGroup id='data_N'>
                    <Label for='data_nField'>DataNasterii: </Label>
                    <Input name='data_N' id='data_NField'
                           onChange={this.handleChange}
                           required
                    />
                </FormGroup>
                <Label>sex: </Label>
                <Form.Control name='sex' as="select" onChange={this.handleChange}>
                    <option value="Masculin">Masculin</option>
                    <option value="Feminin">Feminin</option>
                </Form.Control>
                <Row><label>Completati Fisa medicala</label></Row>
                <FormGroup id='stare'>
                    <Label for='stareField'> StareMedicala: </Label>
                    <Input name='stare' id='stareField'
                           onChange={this.handleChange}
                           required
                    />
                </FormGroup>

                <FormGroup id='perioadaTratament'>
                    <Label for='stareField'>PerioadaTratament: </Label>
                    <Input name='perioadaTratament' id='perioadaTratamentField'
                           onChange={this.handleChange}
                           required
                    />
                </FormGroup>
                    <Row>
                        <Col sm={{size: '4', offset: 8}}>
                            <Button type={"submit"} disabled={!this.state.formIsValid} onClick={this.handleSubmit}>  Submit </Button>
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

export default PersonForm;
