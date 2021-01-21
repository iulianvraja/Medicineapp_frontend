import * as React from "react";
import * as API_USERS from "./person/api/person-api";
import {Col, Row} from "reactstrap";
import PersonTable from "./person/components/person-table";
import APIResponseErrorMessage from "./commons/errorhandling/api-response-error-message";
import PTable from "./Ptable";


class PacientView extends React.Component{

    constructor(props) {
        super(props);

        this.reload = this.reload.bind(this);
        this.state = {
            nume: 'nothing',
            selected: false,
            selected2: false,
            selected3: false,
            collapseForm: false,
            tableData: [],
            isLoaded: false,
            errorStatus: 0,
            error: null
        };

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

    reload() {
        this.setState({
            isLoaded: false
        });
        this.fetchPersons();
    }

    render(){
        return(
            <div>
                <Row>
                    <Col sm={{size: '8', offset: 1}}>
                        {this.state.isLoaded && <PTable tableData = {this.state.tableData}/>}
                        {this.state.errorStatus > 0 && <APIResponseErrorMessage
                            errorStatus={this.state.errorStatus}
                            error={this.state.error}
                        />   }
                    </Col>
                </Row>


            </div>
        )
    }


}

export default PacientView;