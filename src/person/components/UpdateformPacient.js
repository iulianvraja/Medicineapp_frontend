import React from 'react';
import Button from "react-bootstrap/Button";

import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';
import { Form } from "react-bootstrap";
import {HOST} from "../../commons/hosts";



class UpdateformPacient extends React.Component {

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
            nume: this.state.formControls.nume.value,
            parola: this.state.formControls.parola.value,
            data_N: this.state.formControls.data_N.value,
            adr: this.state.formControls.adr.value,
            sex: this.state.formControls.sex.value,
            perioadaTratament:this.state.formControls.perioadaTratament.value,
            stare:this.state.formControls.stare.value,
            numeup:this.state.formControls.numest.value,
        };



        this.update(p);
    }

    async update(p ){
        console.log("Object="+p.nume+p.parola+p.data_N+p.adr+p.sex+p.perioadaTratament+p.stare+p.numeup);
        let request = new Request(HOST.backend_api + '/pacient', {
            method: 'PUT',
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(p)
        });
        await fetch(request);
        this.reloadHandler();
    }

    render() {
        return (
            <div>
                <FormGroup id='numest'>
                    <Label for='nameField'> Numele Pacientului pe care dorim sa-l stergem: </Label>
                    <Input name='numest' id='nameField' placeholder={this.state.formControls.nume.placeholder}
                           onChange={this.handleChange}
                           required
                    />
                </FormGroup>
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

export default UpdateformPacient;
