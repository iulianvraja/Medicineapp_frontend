import React from "react";
import Table from "../../commons/tables/table";


const columns = [
    {
        Header: 'id',
        accessor: 'id',
    },
    {
        Header: 'Nume',
        accessor: 'nume',
    },
    {
        Header: 'Parola',
        accessor: 'parola',
    },
    {
        Header: 'DataNasterii',
        accessor: 'data_N',
    },
    {
        Header: 'Sex',
        accessor: 'sex',
    },
    {
        Header: 'Adresa',
        accessor: 'adr',
    }
];

const filters = [
    {
        accessor: 'name',
    }
];

class IngrijitorTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData: this.props.tableData
        };
    }

    render() {
        return (
            <Table
                data={this.state.tableData}
                columns={columns}
                search={filters}
                pageSize={5}
            />
        )
    }
}

export default IngrijitorTable;