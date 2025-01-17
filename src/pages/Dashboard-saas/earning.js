import React, { Component } from 'react';
import { Row, Col, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

import ReactApexChart from 'react-apexcharts';

class Earning extends Component {
    constructor(props) {
        super(props);
        this.state = {
            series: [
                {name:"series1",data:[31,40,36,51,49,72,69,56,68,82,68,76]}
            ],
            options : {
                chart: { 
                    toolbar:"false",
                    dropShadow: { 
                        enabled:!0,
                        color:"#000",
                        top:18,
                        left:7,
                        blur:8,
                        opacity:.2
                    }
            },
            dataLabels: {
                enabled:!1
            },
            colors:["#BA1F6A"],
            stroke: {
                curve:"smooth",
                width:3
            }
        }
        };
    }
    
    render() {
        return (
            <React.Fragment>
                            <Col xl="8">
                                <Card>
                                    <CardBody>
                                        <div className="clearfix">
                                            <div className="float-right">
                                                <div className="input-group input-group-sm">
                                                    <select className="custom-select custom-select-sm">
                                                        <option defaultValue>Jan</option>
                                                        <option value="1">Dec</option>
                                                        <option value="2">Nov</option>
                                                        <option value="3">Oct</option>
                                                    </select>
                                                    <div className="input-group-append">
                                                        <label className="input-group-text">Month</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <h4 className="card-title mb-4">Earning</h4>
                                        </div>

                                        <Row>
                                            <Col lg="4">
                                                <div className="text-muted">
                                                    <div className="mb-4">
                                                        <p>This month</p>
                                                        <h4>$2453.35</h4>
                                                        <div><span className="badge badge-soft-success font-size-12 mr-1"> + 0.2% </span> From previous period</div>
                                                    </div>

                                                    <div>
                                                        <Link to="#" className="btn btn-primary waves-effect waves-light btn-sm">View Details <i className="mdi mdi-chevron-right ml-1"></i></Link>
                                                    </div>
                                                    
                                                    <div className="mt-4">
                                                        <p className="mb-2">Last month</p>
                                                        <h5>$2281.04</h5>
                                                    </div>
                                                    
                                                </div>
                                            </Col>

                                            <Col lg="8">
                                                <div id="line-chart" className="apex-charts" dir="ltr">
                                                <ReactApexChart series={this.state.series} options={this.state.options} type="line" height={320} />
                                                </div>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
            </React.Fragment>
        );
    }
}

export default Earning;