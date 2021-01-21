import React from 'react';
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import {
    Button,
    Card,
    CardHeader,
    Col, FormGroup, Input, Label,
    Modal,
    ModalBody,
    ModalHeader,
    Row
} from 'reactstrap';
import PersonForm from "./components/person-form";

import * as API_USERS from "./api/person-api"
import PersonTable from "./components/person-table";
import UpdateForm from "../ingrijitor/components/UpdateForm";
import UpdateformPacient from "./components/UpdateformPacient";
import {HOST} from "../commons/hosts";
import MedicationFormm from "./components/MedicationForm";




class PersonContainer extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.toggleForm2 = this.toggleForm2.bind(this);
        this.toggleForm3 = this.toggleForm3.bind(this);
        this.reload = this.reload.bind(this);
        this.state = {
            nume:'nothing',
            selected: false,
            selected2: false,
            selected3: false,
            collapseForm: false,
            tableData: [],
            isLoaded: false,
            errorStatus: 0,
            error: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.remove=this.remove.bind(this);
    }

    componentDidMount() {
        this.fetchPersons();
    }

    fetchPersons() {
        return API_USERS.getPersons((result, status, err) => {

            if (result !== null && status === 200) {
                this.setState({
                    tableData: result,
                    isLoaded: true
                });
            } else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        });
    }
    handleChange=event=>{
        const names = event.target.value;
        this.state.nume=names;
        console.log("Handle change:"+this.state.nume)
    }
    toggleForm() {
        this.setState({selected: !this.state.selected});
    }
    toggleForm2() {
        this.setState({selected2: !this.state.selected2});
    }
    toggleForm3() {
        this.setState({selected3: !this.state.selected3});
    }

    reload() {
        this.setState({
            isLoaded: false
        });
        this.toggleForm();
        this.toggleForm2();
        this.toggleForm3();
        this.fetchPersons();
    }
    async remove() {
        await fetch(HOST.backend_api+`/pacient/${this.state.nume}`, {
            method: 'DELETE',
        });
        this.reload();
    }


    render() {
        return (
            <div>
                <CardHeader>
                    <strong> Pacient Management </strong>
                </CardHeader>
                <Card>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            <Button color="primary" onClick={this.toggleForm}>Adauga Pacient </Button>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            {this.state.isLoaded && <PersonTable tableData = {this.state.tableData}/>}
                            {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                errorStatus={this.state.errorStatus}
                                error={this.state.error}
                            />   }
                        </Col>
                    </Row>
                </Card>

                <Modal isOpen={this.state.selected} toggle={this.toggleForm}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleForm}> Add Pacient: </ModalHeader>
                    <ModalBody>
                        <PersonForm reloadHandler={this.reload}/>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.selected2} toggle={this.toggleForm2}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleForm2}> Update Pacient: </ModalHeader>
                    <ModalBody>
                        <UpdateformPacient reloadHandler={this.reload}/>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.selected3} toggle={this.toggleForm3}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleForm3}> Add Medication: </ModalHeader>
                    <ModalBody>
                        <MedicationFormm  reloadHandler={this.reload}/>
                    </ModalBody>
                </Modal>

                <div id="del">
                    <FormGroup id='nume'>
                        <Label for='dataField' > Sterge Pacientul cu numele: </Label>
                        <Input name='nume' id='numeField' onChange={this.handleChange}/>
                        <button type={"submit"} onClick={this.remove}> SubmitDelete</button>
                    </FormGroup>
                </div>

                <div id="up">
                    <FormGroup id='update'>
                        <button color="primary"  type={"submit"} onClick={this.toggleForm2}>UpdatePacient</button>
                    </FormGroup>
                </div>

                <div id="medication">
                    <FormGroup id='medication'>
                        <button color="primary"  type={"submit"} onClick={this.toggleForm3}>MedicationCreate</button>
                    </FormGroup>
                </div>

            </div>


        )

    }
}


export default PersonContainer;
