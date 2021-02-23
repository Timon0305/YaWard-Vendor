import React, { Component } from 'react';
import { Col, Card, CardBody, Media } from "reactstrap";
import axios from 'axios';
import {webUrl} from "../../config";
const url = webUrl + '/v2/api/vendor/settings/';

const token = localStorage.getItem('authVendor');

class Cards extends Component {

    setStatus = (status) => {
       axios.post(url + 'shopStatus', {'status': status}, {
           headers: {
               'Authorization': token
           }
       }).then(res => {
            if (res.statusText === 'OK') {
                window.location.reload()
            }
       })
    };

    render() {
        return (
            <React.Fragment>
                <Col xl="3" md="6">
                    <Card className="plan-box">
                        <CardBody className="p-4">
                            <Media>
                                <Media body>
                                    <h5>{this.props.status.title}</h5>
                                    <p className="text-muted">{this.props.status.description}</p>
                                </Media>
                                <div className="ml-3">
                                    <i className={"mdi " + this.props.status.icon + " h1 text-primary"}/>
                                </div>
                            </Media>
                            <div className="text-center plan-btn">
                                <div className="btn btn-primary btn-sm waves-effect waves-light" onClick={(e) => this.setStatus(this.props.status.title)}>{this.props.status.title}</div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </React.Fragment>
        );
    }
}

export default Cards;
