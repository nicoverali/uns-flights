import './index.scss';
import React from 'react';
import DataTable from 'react-data-table-component';


const Table = (props) => {

    return (
        <div className={`table-component ${props.className || ''}`}>
            <DataTable className="queries-table"
                columns={props.columns}
                data={props.data}
                pagination
                paginationComponentOptions={{ 
                    rowsPerPageText: 'Filas por página:', 
                    rangeSeparatorText: 'de' 
                }}
            />
        </div>
    )

}

export default Table;