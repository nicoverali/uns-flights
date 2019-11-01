import './index.scss';
import React from 'react';
import PrimaryButton from '@Components/PrimaryButton';
import Table from '@Components/Table';

import { executeSelect, executeUpdate, execute } from './SQLQueriesExecutor';

export default class Queries extends React.Component {

	constructor(props) {

		super(props);
		this.state = {
			consoleMsg: '',
			tableResult: undefined,
			query: '',
			queryExecutor: execute,
		};

	}

	handleQueryChange = (event) => {

		let queryExecutor;
		const query = event.target.value;
		const queryType = query
			.split(' ')[0]
			.trim()
			.toUpperCase();

		if (queryType === 'SELECT') {

			queryExecutor = executeSelect;

		} else if (
			queryType === 'INSERT'
			|| queryType === 'UPDATE'
			|| queryType === 'DELETE'
			|| queryType === 'CREATE'
			|| queryType === 'ALTER'
		) {

			queryExecutor = executeUpdate;

		} else {

			queryExecutor = execute;

		}

		this.setState({ query, queryExecutor });

	};

	handleQuerySubmit = () => {

		this.state
			.queryExecutor(this.state.query)
			.then((result) => {

				if (result.data != null) {

					const columns = result.data.colNames.map((colName) => ({
						name: colName,
						selector: colName,
						sortable: true,
					}));
					this.setState({
						consoleMsg: result.msg,
						tableResult: { columns, data: result.data.rows },
					});

				} else {

					this.setState({ consoleMsg: result.msg, tableResult: undefined });

				}

			})

	};

	render() {

		return (
			<div id="queries-page">
				<h2>Haz tu consulta</h2>
				<div className="queries-container">
					<textarea
						className="queries-textarea"
						value={this.state.query}
						onChange={this.handleQueryChange}
					/>
					<PrimaryButton
						className="queries-submit-button"
						onClick={this.handleQuerySubmit}
					>
						Consultar
					</PrimaryButton>
					<p className="queries-result-box">{this.state.consoleMsg}</p>
				</div>
				{this.state.tableResult !== undefined && (
					<div>
						<h2 className="queries-bottom-header">Resultados</h2>
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
