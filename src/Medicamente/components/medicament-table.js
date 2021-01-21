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
        Header: 'Effect',
        accessor: 'effect',
    },
    {
        Header: 'dozaj',
        accessor: 'dozaj',
    }
];

const filters = [
    {
        accessor: 'name',
    }
];

class MedicamentTable extends React.Component {

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

export default MedicamentTable;