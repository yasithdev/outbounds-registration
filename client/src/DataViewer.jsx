import React, { Component } from 'react';
import './DataViewer.css';

import Request from 'request';

class DataViewer extends Component {


    constructor(props){
        super(props);

        this.serverAddress = "http://localhost:5000";

        this.state = {
            students: null,
            Romulus: [],
            Remus: [],
            Tiberius: [],
            Gaius: [],
            Marcus: [],
            Pompey: [],
            Augustus: [],
            Spartacus: [],
            Cornelia: [],
            Scipio: [],
            groups: ["Romulus", "Remus", "Tiberius", "Gaius", "Marcus",
                "Pompey", "Augustus", "Spartacus", "Cornelia", "Scipio"],
			group_colors: {
            	"Romulus": "red",
            	"Remus": "blue",
            	"Tiberius": "silver",
            	"Gaius": "yellow",
            	"Marcus": "green",
            	"Pompey": "purple",
            	"Augustus": "orange",
            	"Spartacus": "brown",
            	"Cornelia": "black",
            	"Scipio": "pink",
			}
        };


        this.renderDataTable = this.renderDataTable.bind(this);


    }


    componentDidMount(){
        Request(`${this.serverAddress}/api/groups/all`, (error, response, body) => {
            if (response) {
                // Check status code and take action
                if (response.statusCode === 200){
                    let result = JSON.parse(body);
                    console.log(result);

                    result.map((student) => {
                        this.state[student.group_id].push(student);
                    });

                    this.setState({
                        students: result
                    }, () => {
                        console.log(this.state);
                    })
                } else {
                    console.log(`Error: ${body.error}`);
                }
            }
            else if (error) console.log(`Error: ${error}`);
        });
    }


    renderDataTable(group_id){
        console.log(group_id);
        return(<div className="row" style={{marginTop: '25px'}}>
			<div className="col-12">
				<div className="card">
					<div className="card-header">
						<span className={"badge badge-pill " + (this.state.group_colors[group_id])}>&nbsp;</span>
						<h5 style={{display: "inline-block", marginLeft: '10px'}}><strong>{group_id}</strong></h5>
					</div>
					<div className="card-body">
                        {this.state[group_id].length ?
							<div>
								<div>
									Member count: {this.state[group_id].length}<br/>
									Veg: {this.state[group_id].filter((student)=> {
                                    return student.food === "VEG";}).length}<br/>
									Non-veg: {this.state[group_id].filter((student)=> {
                                    return student.food === "NON_VEG";}).length}
								</div>
								<br/>
								<table className="table">
									<thead>
									<tr>
										<th style={{width: '10%'}}>#</th>
										<th style={{width: '30%'}}>Index No.</th>
										<th style={{width: '35%'}}>Name</th>
										<th style={{width: '15%'}}>Food Preference</th>
									</tr>
									</thead>
									<tbody>
                                    {this.state[group_id].map((student, index) => {
                                        return (<tr>
											<td>{index+1}</td>
											<td>{student._id}</td>
											<td>{student.name}</td>
                                            {student.hasOwnProperty("food") ? <td>{student.food}</td> : null}
										</tr>)
                                    })}

									</tbody>
								</table>
							</div>
							: <div>No members yet!</div>}
					</div>
				</div>
			</div>
		</div>);
    }




    render() {
        return (
			<div className="container">
				<div className="jumbotron text-center">
					<h1>Valianz 2018</h1>
					<h2>Data Viewer</h2>
				</div>

                {this.state.groups.map((group) => {
                    return this.renderDataTable(group);
                })}


			</div>
        );
    }
}

export default DataViewer;