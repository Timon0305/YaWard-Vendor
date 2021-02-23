import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody, FormGroup, Label, Button } from "reactstrap";
import {AvForm, AvField} from "availity-reactstrap-validation";
import Clock from './Clock'

import axios from 'axios';
import {webUrl} from "../../config";
const url = webUrl + '/v2/api/vendor/settings/';

const token = localStorage.getItem('authVendor');

class Working extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startTime: '',
            endTime: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios.get(url + '/getShopTime', {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            this.setState({
                startTime: res['data']['shop']['startTime'],
                endTime: res['data']['shop']['endTime']
            })
        })
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event, values) {
        this.setState({
            startTime:values.startTime,
            endTime: values.endTime
        });
        axios.post(url + '/setShopTime', this.state, {
            headers: {
                'Authorization': token
            }
        }).then(res => {

        })
    }

    render() {
        const {startTime, endTime} = this.state;

        return (
            <React.Fragment>

                <div className="my-5 mt-5 pt-sm-5">
                    <Container>
                        <Row>
                            <Col lg="12">
                                <div className="text-center pt-5">
                                    <Row className="justify-content-center mt-5">
                                        <Col md="8">
                                            <Clock title='Saudi Arabia' datediff={-5}/>
                                        </Col>
                                    </Row>
                                    <Row className='mt-5'>
                                        <Col lg="12">
                                            <Card>
                                                <CardBody>
                                                    <AvForm onValidSubmit={this.handleSubmit}>
                                                        <FormGroup className="mb-4" row>
                                                            <Col sm="6">
                                                                <Label className='text-left text-primary font-size-22'>Start Time <span className='ml-3 text-right font-size-14'>{startTime}</span></Label>
                                                                <AvField
                                                                    name="startTime"
                                                                    type="time"
                                                                    className="form-control"
                                                                    placeholder="Enter Start Time..."
                                                                    errorMessage='Enter Start Time'
                                                                    validate={{required: {value: true}}} />
                                                            </Col>
                                                            <Col sm="6">
                                                                <Label className='text-left text-primary font-size-22'>End Time<span className='ml-3 text-right font-size-14'>{endTime}</span></Label>
                                                                <AvField
                                                                    name="endTime"
                                                                    type="time"
                                                                    className="form-control"
                                                                    placeholder="Enter End Time..."
                                                                    errorMessage='Enter End Time'
                                                                    validate={{required: {value: true}}} />
                                                            </Col>
                                                        </FormGroup>
                                                        <Row className="justify-content-center">
                                                            <Button type="submit" color="primary">Time Set</Button>
                                                        </Row>
                                                    </AvForm>


                                                </CardBody>
                                            </Card>
                                        </Col>

                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

export default Working;