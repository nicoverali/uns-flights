import './index.scss';
import React from 'react';
import Chip from '@Components/Chip';
import Table from '@Components/Table';

import { describeTable, getAllTables } from './DescribeTablesSQL';

export default class DatabaseTables extends React.Component {

  constructor(props) {

    super(props);
    this.state = {
      tables: [],
      activeChip: -1,
      tableResult: undefined,
    };

  }

  componentDidMount() {

    getAllTables().then((result) => this.setState({ tables: result }));

  }

    handleTableSelected = (index) => {

      this.setState({ activeChip: index });
      describeTable(this.state.tables[index]).then((result) => {

        const columns = result.colNames.map((colName) => ({
          name: colName,
          selector: colName,
          sortable: true,
        }));
        this.setState({ tableResult: { columns, data: result.rows } });

      });

    };

    render() {

      const reactTableChips = [];
      for (let i = 0; i < this.state.tables.length; i++) {

        reactTableChips.push(
          <Chip
            className={`database-tables-chip ${
              this.state.activeChip === i ? 'active' : ''
            }`}
            label={this.state.tables[i]}
            onClick={() => this.handleTableSelected(i)}
          />,
        );

      }

      return (
        <div id="database-tables-page">
          <h2>Selecciona una de las tablas</h2>
          <div className="database-tables-container">{reactTableChips}</div>
          {this.state.tableResult !== undefined && (
            <div>
              <h2 className="tables-bottom-header">Resultados</h2>
              <Table
                data={this.state.tableResult.data}
                columns={this.state.tableResult.columns}
              />
            </div>
          )}
        </div>
      );

    }

}
