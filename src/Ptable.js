import React from "react";
import ReactTable from "react-table";

const columns = [
    {
        Header: 'Id',
        accessor: 'id',
    },
    {
        Header: 'Medicament',
        accessor: 'numeM',
    },
    {
        Header: 'Dozaj',
        accessor: 'dozaj',
    },
    {
        Header: 'Efect',
        accessor: 'effect',
    },
    {
        Header: 'PerioadaTratament',
        accessor: 'perioadaTratament',
    },
    {
        Header: 'Stare',
        accessor: 'stare',
    },
    {
        Interval: 'Interval',
        accessor: 'interval',
    }
];

const filters = [
    {
        accessor: 'name',
    }
];

class PTable extends React.Component {

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

export default PTable;