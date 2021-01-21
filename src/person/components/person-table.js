import React from "react";
import Table from "../../commons/tables/table";
import ReactTable from "react-table";
const columns = [
    {
        Header: 'Id',
        accessor: 'id',
    },
    {
        Header: 'Name',
        accessor: 'nume',
    },
    {
        Header: 'Parola',
        accessor: 'parola',
    },
    {
        Header: 'Data Nasterii',
        accessor: 'data_n',
    },
    {
        Header: 'Adresa',
        accessor: 'adr',
    },
    {
        Header: 'Sex',
        accessor: 'sex',
    },
    {
        Header: 'Stare',
        accessor: 'stare',
    },
    {
        Header: 'PerioadaTratament',
        accessor: 'perioadaTratament',
    }
];

const filters = [
    {
        accessor: 'name',
    }
];

class PersonTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData: this.props.tableData
        };
    }

    render() {
        return (
            <ReactTable
                data={this.state.tableData}
                columns={columns}
                pageSize={5}
            />
        )
    }
}

export default PersonTable;