import React, { Component } from "react";
import {Row, Col, Card, CardBody, CardTitle, Container, FormGroup, Label, Button} from "reactstrap";

import Breadcrumbs from '../../components/Common/Breadcrumb';

import axios from 'axios';
import {AvField, AvForm} from "availity-reactstrap-validation";
import jwt_decode from 'jwt-decode';
import {webUrl} from "../../config";

const token = localStorage.getItem('authVendor');

const url = webUrl + '/v2/api/vendor/settings/';

class Shops extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            avatar: '',
            address: '',
            avatar_file: null,
            shopAvatar: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const id = jwt_decode(token)['result']['_id'];
        const name = jwt_decode(token)['result']['store'];
        const address = jwt_decode(token)['result']['address'];
        axios.get(url + 'getAvatarFile', {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            if (res['data']['shop']) {
                this.setState({
                    avatar: res['data']['shop']['avatar'],
                    shopAvatar: true
                })
            }
        });
        this.setState({
            id: id,
            name: name,
            address: address
        })
    }

    onChangeHandler = event => {
        this.setState({
            avatar_file: event.target.files[0]
        })
    };

    handleSubmit(event, values) {
        this.setState({
            id: values.id,
            avatar: values.avatar,
            address: values.address
        });
        axios.post(url + 'shopProfile', this.state, {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            let avatarFile = new FormData();
            avatarFile.append('avatar_file', this.state.avatar_file);
            axios.post(url + 'addAvatarFile', avatarFile, {
                headers: {
                    'Authorization': token
                }
            }).then(response => {
                if (response['statusText'] === 'OK') {
                    window.location.reload()
                }
            })
        }).catch(e => console.error(e))
    }

    render() {

        const shopAvatar = webUrl + '/public/shopAvatar/' + this.state.avatar;

        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid={true}>

                        <Breadcrumbs title="Settings" breadcrumbItem="Shop Profile" />

                        <Row>
                            <Col lg="12">
                                {this.state.shopAvatar ? (
                                    <Row className='mb-4'>
                                        <Col md='5'/>
                                        <Col md='2'>
                                            <div className='text-lg-right'>
                                                <img src={shopAvatar} alt={shopAvatar} width='100%'/>
                                            </div>
                                        </Col>
                                        <Col md='5'/>
                                    </Row>
                                ) : (
                                    <Card>
                                        <CardBody>
                                            <h1 className='text-center text-primary'>
                                                You have to fill your shop avatar in.
                                            </h1>
                                        </CardBody>
                                    </Card>
                                )}
                                <Card>
                                    <CardBody>
                                        <CardTitle className="mb-4">Add Shop Profile</CardTitle>
                                        <AvForm onValidSubmit={this.handleSubmit}>
                                            <FormGroup className="mb-4" row>
                                                <Label htmlFor="productName" className="col-form-label col-lg-2">Shop Name</Label>
                                                <Col lg="10">
                                                    <AvField
                                                        name="id"
                                                        type="hidden"
                                                        className="form-control"
                                                        placeholder="Enter Shop Name..."
                                                        value={this.state.id}/>
                                                    <AvField
                                                        name="name"
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Enter Shop Name..."
                                                        value={this.state.name}
                                                        readOnly
                                                        errorMessage='Enter Shop Name'
                                                        validate={{required: {value: true}}} />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup className="mb-4" row>
                                                <Label htmlFor="description" className="col-form-label col-lg-2">Shop Avatar</Label>
                                                <Col lg="10">
                                                    <AvField
                                                        name="avatar"
                                                        type="file"
                                                        className="form-control"
                                                        placeholder="Enter Shop Avatar..."
                                                        errorMessage='Enter Shop Avatar'
                                                        onChange = {this.onChangeHandler}
                                                        validate={{required: {value: true}}} />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup className="mb-4" row>
                                                <Label htmlFor="slug" className="col-form-label col-lg-2">Shop Address</Label>
                                                <Col lg="10">
                                                    <AvField
                                                        name="address"
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Enter Shop Address..."
                                                        readOnly
                                                        value={this.state.address}
                                                        errorMessage='Enter Shop Address'
                                                        validate={{required: {value: true}}} />
                                                </Col>
                                            </FormGroup>
                                            <Row className="justify-content-end">
                                                <Col lg="10">
                                                    <Button type="submit" className='mr-2' color="primary">Set Shop Address</Button>
                                                </Col>
                                            </Row>
                                        </AvForm>


                                    </CardBody>
                                </Card>
                            </Col>

                        </Row>

                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

export default Shops;
