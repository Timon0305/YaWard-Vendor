import React, { Component } from 'react';
import {Container, Row, Col} from "reactstrap";
import {Redirect} from 'react-router-dom';
import Breadcrumbs from '../../components/Common/Breadcrumb';

import Cards from "./Cards";
import open from '../../assets/images/status/opened.jpg'
import close from '../../assets/images/status/closed.jpg'
import busy from '../../assets/images/status/busy.jpg'
import temporary from '../../assets/images/status/temporary.jpg'

import axios from 'axios';
import {webUrl} from "../../config";
const url = webUrl + '/v2/api/vendor/settings/';

const token = localStorage.getItem('authVendor');

class Status extends Component {
    state = {
        statusList: [
            {
                id: 1, title: "Open", description: "Your Shop was opened", icon: "mdi-lock-open", image: open
            },
            {
                id: 2, title: "Closed", description: "Your Shop was closed", icon: "mdi-lock-check", image: close
            },
            {
                id: 3, title: "Busy", description: "Your Shop is very busy now", icon: "mdi-alert-outline", image: busy,
            },
            {
                id: 4, title: "Temporary Closed", description: "Your Shop is temporary closed ", icon: "mdi-clock-alert-outline", image: temporary
            },
        ],
        status: '',
        redirect: false,
    };

    componentDidMount() {
        axios.get(url + 'getShopStatus', {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            const status = res['data']['shop'];
            if (status) {
                this.setState({
                    status: status
                })
            } else {
                window.alert('You have to insert shop info at first');
                this.setState({
                    redirect: true
                })
            }

        })
    }

    render() {

        const {redirect} = this.state;
        if (redirect) {
            return <Redirect to='/vendor/shops' />
        }

        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                        <Breadcrumbs title="Settings" breadcrumbItem="Shop Status" />

                        <Row className="justify-content-center">
                            <Col lg={3}>
                                {this.state.statusList.map((shop, key) =>
                                    shop['title'] === this.state.status['status'] ? (
                                        <div key={key}>
                                            <h1 className='text-primary text-center' style={{fontFamily: 'auto'}}><b>{shop['title']}</b></h1>
                                            <img src={shop['image']} alt={shop['image']} width='100%' />
                                        </div>
                                    ) : null
                                )}
                                <div className="text-center mb-5 mt-3">
                                    <h4>Choose your shop status</h4>
                                    <p className="text-muted">You can know shop status to the customers</p>
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            {
                                this.state.statusList.map((status, key) =>
                                    <Cards status={status} key={"_pricing_" + key} />
                                )
                            }
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

export default Status;
