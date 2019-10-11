import './index.scss';
import React from 'react';
import Chip from '@Components/Chip';
import Table from '@Components/Table';

import {describeTable, getAllTables} from './DescribeTablesSQL';

const data = [
    {
      "id": "5d9d6b7ed26984f1f067dfff",
      "title": "Zillatide",
      "year": 1950
    },
    {
      "id": "5d9d6b7e22f888416d7b5d83",
      "title": "Locazone",
      "year": 1957
    },
    {
      "id": "5d9d6b7e84c211e7e449d4a0",
      "title": "Applidec",
      "year": 2010
    },
    {
      "id": "5d9d6b7e57fa884c9ee0d3c1",
      "title": "Plasmosis",
      "year": 1945
    },
    {
      "id": "5d9d6b7e2aa376ede7ce71a3",
      "title": "Manglo",
      "year": 2006
    },
    {
      "id": "5d9d6b7ea3642e6acb0f138f",
      "title": "Xelegyl",
      "year": 1959
    },
    {
      "id": "5d9d6b7e5c57be473b191d13",
      "title": "Marqet",
      "year": 2007
    },
    {
      "id": "5d9d6b7e0943582ccaf3b2aa",
      "title": "Atomica",
      "year": 1938
    },
  ]
const columns = [
  {
    name: 'Title',
    selector: 'title',
    sortable: true,
  },
  {
    name: 'Title',
    selector: 'title',
    sortable: true,
  },
  {
    name: 'Title',
    selector: 'title',
    sortable: true,
  },
  {
    name: 'Title',
    selector: 'title',
    sortable: true,
  },
  {
    name: 'Title',
    selector: 'title',
    sortable: true,
  },
  {
    name: 'Year',
    selector: 'year',
    sortable: true,
  },
];

export default class DatabaseTables extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        tables: [],
        activeChip: -1,
        tableResult: undefined
      }
    }

    handleTableSelected = (index) => {
      this.setState({activeChip: index});
      describeTable(this.state.tables[index])
        .then(result => {
          let columns = result.colNames.map(colName => ({
            name: colName,
            selector: colName,
            sortable:true
          }))
          this.setState({tableResult: {columns: columns, data: result.rows}});
        })
    }

    componentDidMount(){
      getAllTables().then(result => this.setState({tables: result}));
    }

    render(){
        let reactTableChips = [];
        for(let i = 0; i < this.state.tables.length; i++){
          reactTableChips.push(
            <Chip className={`database-tables-chip ${this.state.activeChip == i ? 'active':''}`} 
              label={this.state.tables[i]} 
              onClick={() => this.handleTableSelected(i)}
            />
          )
        }

        return (
            <div id="database-tables-page">
                <h2>Selecciona una de las tablas</h2>
                <div className="database-tables-container">
                    {reactTableChips}
                </div>
                {this.state.tableResult != undefined &&
                  <div>
                    <h2 className="tables-bottom-header">Resultados</h2>
                    <Table
                      data={this.state.tableResult.data}
                      columns={this.state.tableResult.columns}
                    />
                  </div>
                }
            </div>
        );

    }

}