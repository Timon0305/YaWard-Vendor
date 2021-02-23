import React, { Component } from "react";

import { Row, Col, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import axios from 'axios';

import avatar1 from "../../assets/images/users/avatar-1.jpg";
import profileImg from "../../assets/images/profile-img.png";
import {webUrl} from "../../config";

const token = localStorage.getItem('authVendor');
const url = webUrl +  '/v2/api/vendor/dashboard/';

class WelcomeComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem('authVendor'),
            productNum: 0,
            revenue: 0
        };
    }

    componentDidMount() {
        axios.get(url + 'getAllProduct', {
            headers: {
                'Authorization' : token
            }
        }).then(res => {
            this.setState({
                productNum: res['data']['data']
            })
        })
    }

    render() {
        const token = this.state.token;
        const name = jwtDecode(token)['result']['username'];
        const {productNum, revenue} = this.state;

        return (
            <React.Fragment>
                <Card className="overflow-hidden">
                    <div className="bg-soft-primary">
                        <Row>
                            <Col xs="7">
                                <div className="text-primary p-3">
                                    <h5 className="text-primary">Welcome Back !</h5>
                                    <p>Your Online Shop</p>
                                </div>
                            </Col>
                            <Col xs="5" className="align-self-end">
                                <img src={profileImg} alt="" className="img-fluid" />
                            </Col>
                        </Row>
                    </div>
                    <CardBody className="pt-0">
                        <Row>
                            <Col sm="4">
                                <div className="avatar-md profile-user-wid mb-4">
                                    <img src={avatar1} alt="" className="img-thumbnail rounded-circle" />
                                </div>
                                <h5 className="font-size-15 text-truncate">{name}</h5>
                            </Col>

                            <Col sm="8">
                                <div className="pt-4">
                                    <Row>
                                        <Col xs="6">
                                            <h5 className="font-size-15">{productNum}</h5>
                                            <p className="text-muted mb-0">Products</p>
                                        </Col>
                                        <Col xs="6">
                                            <h5 className="font-size-15">$ {revenue}</h5>
                                            <p className="text-muted mb-0">Revenue</p>
                                        </Col>
                                    </Row>
                                    <div className="mt-4">
                                        <Link to="" className="btn btn-primary waves-effect waves-light btn-sm">View Profile <i className="mdi mdi-arrow-right ml-1"/></Link>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
}

export default WelcomeComp;
