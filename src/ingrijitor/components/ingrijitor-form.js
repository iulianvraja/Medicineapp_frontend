import React from 'react';
import Button from "react-bootstrap/Button";
import * as API_USERS from "../api/ingrijitor-api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';
import { Form } from "react-bootstrap";



class IngrijitorForm extends React.Component {

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
                    touched: false,

                },
                parola: {
                    value: '',
                    placeholder: 'Choose your pass',

                    touched: false,

                },
                data_N: {
                    value: '',
                    placeholder: 'Age...',

                    touched: false,
                },
                sex: {
                    value: 'Feminin',
                    placeholder: 'Feminin',

                    touched: false,
                },
                adr: {
                    value: '',
                    placeholder: 'ex:Cluj, Zorilor, Str. Lalelelor 21...',

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

        const updatedControls = this.state.formControls;

        const updatedFormElement = updatedControls[name];

        updatedFormElement.value = value;

        updatedControls[name] = updatedFormElement;


        this.setState({
            formControls: updatedControls,
            formIsValid: true,
        });

    };

    registerIngrijitor(ing) {
        return API_USERS.postIngrijitor(ing, (result, status, error) => {
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
        let ing = {
            nume: this.state.formControls.nume.value,
            parola: this.state.formControls.parola.value,
            data_N: this.state.formControls.data_N.value,
            adr: this.state.formControls.adr.value,
            sex: this.state.formControls.sex.value
        };

        console.log(ing);
        this.registerIngrijitor(ing);
    }

    render() {
        return (
            <div name="ingf">

                <FormGroup id='name'>
                    <Label for='nameField'> Name: </Label>
                    <Input name='nume' id='nameField' placeholder={this.state.formControls.nume.placeholder}
                           onChange={this.handleChange}
                           required
                    />
                </FormGroup>

                <FormGroup id='parola'>
                    <Label for='parolaField'> Parola: </Label>
                    <Input name='parola' id='parolaField' placeholder={this.state.formControls.parola.placeholder}
                           onChange={this.handleChange}
                           required
                    />
                </FormGroup>

                <FormGroup id='adresa'>
                    <Label for='addressField'> Address: </Label>
                    <Input name='adr' id='addressField' placeholder={this.state.formControls.adr.placeholder}
                           onChange={this.handleChange}
                           required
                    />
                </FormGroup>

                <FormGroup id='data_N'>
                    <Label for='dataField'> Data Nasterii: </Label>
                    <Input name='data_N' id='dataField' placeholder={this.state.formControls.data_N.placeholder}
                           onChange={this.handleChange}
                           required
                    />
                </FormGroup>

                <Label>Sex: </Label>
                <Form.Control name='sex' as="select" onChange={this.handleChange}>
                    <option value="Masculin">Masculin</option>
                    <option value="Feminin">Feminin</option>
                </Form.Control>



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

export default IngrijitorForm;
