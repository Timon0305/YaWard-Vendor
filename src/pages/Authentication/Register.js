import React, {Component} from "react";
import ReactDOM from 'react-dom';
import {Row, Col, CardBody, Card, Container} from "reactstrap";

import {AvForm, AvField} from "availity-reactstrap-validation";
import axios from 'axios';
import {registerUser, apiError, registerUserFailed} from "../../store/actions";

import {connect} from "react-redux";
import {Link} from "react-router-dom";

import profileImg from "../../assets/images/profile-img.png";
import logoImg from "../../assets/images/YaWard-Favicon.png";
import {webUrl} from "../../config";

import {GoogleApiWrapper} from 'google-maps-react';

import StandaloneSearchBox from "react-google-maps/lib/components/places/StandaloneSearchBox";

const url = webUrl + '/v2/api/vendor/users/';


const LoadingContainer = props => <div>Loading...</div>;

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            currentLatLng: {
                lat: 0,
                lng: 0
            },
            phone: '',
            address: '',
            loading: true
        };

        this.handleValidSubmit = this.handleValidSubmit.bind(this);
        this.onChangeHandler1 = this.onChangeHandler1.bind(this);
        this.onChangeHandler2 = this.onChangeHandler2.bind(this);
        this.onMarkerClick = this.onMarkerClick.bind(this);
    }

    componentDidUpdate(prevProps, prevState){
        if (prevState.currentLatLng !== this.state.currentLatLng) {
            this.recenterMap();
        }
    }

    componentDidMount() {
        const refs = {};

        this.setState({
            places: [],
            onSearchBoxMounted: ref => {

                refs.searchBox = ref;
            },
            onPlacesChanged: () => {
                const places = refs.searchBox.getPlaces();

                for (let i= 0 ; i < places.length; i++){
                    console.log(places[i]);
                    this.setState({
                        currentLatLng : {
                            lat: places[i].geometry.location.lat(),
                            lng: places[i].geometry.location.lng()
                        },
                        phone: places[i]['formatted_phone_number'],
                        address: places[i]['formatted_address']
                    });
                }
                this.setState({
                    places
                });
                this.recenterMap();
            }
        });

        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                const coords = pos.coords;
                this.setState({
                    currentLatLng: {
                        lat: coords.latitude,
                        lng: coords.longitude
                    }
                })
            })
        }
        this.loadMap();
    }

    loadMap = () => {
        if (this.props && this.props.google) {
            const {google} = this.props;
            const maps = google.maps;
            const mapRef = this.refs.map;
            const node = ReactDOM.findDOMNode(mapRef);

            const {lat, lng} = this.state.currentLatLng;
            const center = new maps.LatLng(lat, lng);
            const mapConfig = Object.assign({}, {
                center: center,
                zoom: 16
            });
            this.map = new maps.Map(node, mapConfig);
        }
    };

    recenterMap  = () => {
        const map = this.map;
        const curr = this.state.currentLatLng;

        const google = this.props.google;
        const maps = google.maps;

        if (map) {
            let center = new maps.LatLng(curr.lat, curr.lng);

            let marker = new maps.Marker({
                position: center,
            });
            map.panTo(center);
            marker.setMap(map);
        }
    };


    onChangeHandler1 = event => {
        const cr_file = event.target.files[0];
        let crFile = new FormData();
        crFile.append('cr_file', cr_file);
        axios.post(url + 'addVendorCRFile', crFile)
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err))
    };

    onChangeHandler2 = event => {
        const vat_file = event.target.files[0];
        let vatFile = new FormData();
        vatFile.append('vat_file', vat_file);
        axios.post(url + 'addVendorVATFile', vatFile)
            .then(res => {
                console.log(res)
            })
    };

    handleValidSubmit(event, values) {
        this.props.registerUser(values);
    }

    onMarkerClick(props, marker) {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }

    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    render() {

        const location = this.state.currentLatLng.lat.toString() + ' , ' + this.state.currentLatLng.lng.toString();
        const {phone} = this.state;
        const phoneNumber = phone === undefined ? '' : phone;
        return (
            <React.Fragment>
                <div className="home-btn d-none d-sm-block">
                    <Link to="/" className="text-dark">
                        <i className="bx bx-home h2"/>
                    </Link>
                </div>
                <div className=" my-5 pt-sm-5">
                    <Container>
                        <Row className="">
                            <Col lg='6' md='12'>
                                <Card className="overflow-hidden">
                                    <div className="bg-soft-primary">
                                        <Row>
                                            <Col className="col-7">
                                                <div className="text-primary p-4">
                                                    <h5 className="text-primary">Free Register</h5>
                                                    <p>Get your free Vendor account now.</p>
                                                </div>
                                            </Col>
                                            <Col className="col-5 align-self-end">
                                                <img src={profileImg} alt="" className="img-fluid"/>
                                            </Col>
                                        </Row>
                                    </div>
                                    <CardBody className="pt-0">
                                        <div>
                                            <Link to="/">
                                                <div className="avatar-md profile-user-wid mb-4">
                                                  <span className="avatar-title rounded-circle bg-light">
                                                    <img
                                                        src={logoImg}
                                                        alt=""
                                                        className="rounded-circle"
                                                        height="34"
                                                    />
                                                  </span>
                                                </div>
                                            </Link>
                                        </div>
                                        <div className="p-2">
                                            <AvForm
                                                className="form-horizontal"
                                                onValidSubmit={this.handleValidSubmit}
                                            >
                                                <div className="form-group">
                                                    <AvField
                                                        name="email"
                                                        label="Email"
                                                        className="form-control"
                                                        placeholder="Enter email"
                                                        type="email"
                                                        required
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <AvField
                                                        name="username"
                                                        label="Username"
                                                        type="text"
                                                        required
                                                        placeholder="Enter username"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <AvField
                                                        name="password"
                                                        label="Password"
                                                        type="password"
                                                        required
                                                        placeholder="Enter Password"
                                                    />
                                                </div>
                                                <StandaloneSearchBox
                                                    ref={this.state.onSearchBoxMounted}
                                                    bounds={this.state.bounds}
                                                    onPlacesChanged={this.state.onPlacesChanged}
                                                >
                                                    <AvField
                                                        name="store"
                                                        label="Store Name"
                                                        placeholder="Type your store name"
                                                        type="text"
                                                        errorMessage="Enter Store Name"
                                                        validate={{required: {value: true}}}
                                                    />
                                                </StandaloneSearchBox>
                                                <AvField
                                                    name="legal"
                                                    label="Legal Name"
                                                    placeholder="Enter legal name"
                                                    type="text"
                                                    errorMessage="Enter Legal Name"
                                                    validate={{required: {value: true}}}
                                                />
                                                <AvField
                                                    name="phone"
                                                    label="Contact Number"
                                                    placeholder="Type your contact number"
                                                    type="text"
                                                    value={phoneNumber}
                                                    errorMessage="Enter Contact Number"
                                                    validate={{required: {value: true}}}
                                                />
                                                <AvField
                                                    name="address"
                                                    placeholder="Type your contact address"
                                                    type="hidden"
                                                    value={this.state.address}
                                                    errorMessage="Enter Contact Number"
                                                    validate={{required: {value: true}}}
                                                />
                                                <AvField
                                                    name="cr"
                                                    label="Commercial Registration"
                                                    placeholder="Enter commercial registration"
                                                    type="text"
                                                    errorMessage="Enter Commercial Registration"
                                                    validate={{required: {value: true}}}
                                                />
                                                <AvField
                                                    name="cr_image"
                                                    label="Commercial Registration Image"
                                                    type="file"
                                                    errorMessage="Upload your CR Image"
                                                    validate={{required: {value: true}}}
                                                    onChange={this.onChangeHandler1}
                                                />
                                                <AvField
                                                    name="vat"
                                                    label="VAT No"
                                                    placeholder="Type your vat no"
                                                    type="text"
                                                    errorMessage="Enter VAT No"
                                                    validate={{required: {value: true}}}
                                                />
                                                <AvField
                                                    name="vat_image"
                                                    label="VAT Registration Image"
                                                    type="file"
                                                    errorMessage="Upload your VAT Image"
                                                    validate={{required: {value: true}}}
                                                    onChange={this.onChangeHandler2}
                                                />
                                                <AvField
                                                    name="map"
                                                    label="Location"
                                                    placeholder="Set the store location on the map"
                                                    type="text"
                                                    readOnly
                                                    value={location}
                                                    errorMessage="Enter Location"
                                                    validate={{required: {value: true}}}
                                                />
                                                <AvField
                                                    name="bank"
                                                    label="Bank Name"
                                                    placeholder="Enter your Bank Name"
                                                    type="text"
                                                    errorMessage="Enter Bank Name"
                                                    validate={{required: {value: true}}}
                                                />
                                                <AvField
                                                    name="ban"
                                                    label="Bank Account Number"
                                                    placeholder="Enter your Bank Number"
                                                    type="number"
                                                    errorMessage="Enter Bank Number"
                                                    validate={{required: {value: true}}}
                                                />
                                                <div className="mt-4">
                                                    <button
                                                        className="btn btn-primary btn-block waves-effect waves-light"
                                                        type="submit"
                                                    >
                                                        Register
                                                    </button>
                                                </div>

                                                <div className="mt-4 text-center">
                                                    <p className="mb-0">
                                                        By registering you agree to the YaWard{" "}
                                                        <Link to="#" className="text-primary">
                                                            Terms of Use
                                                        </Link>
                                                    </p>
                                                </div>
                                            </AvForm>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>

                            <Col lg='6' md='12' style={{marginBottom: '24px'}}>
                                <div ref='map' style={{minHeight: '500px', height: '100%'}} />
                            </Col>
                            <Col xl={12}>
                                <div className="mt-5 text-center">
                                    <p>
                                        Already have an account ?{" "}
                                        <Link
                                            to="/login"
                                            className="font-weight-medium text-primary"
                                        >
                                            {" "}
                                            Login
                                        </Link>{" "}
                                    </p>
                                    <p>
                                        © {new Date().getFullYear()} YaWard. Crafted with{" "}
                                        <i className="mdi mdi-heart text-danger"/> by Samer
                                    </p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

const mapStatetoProps = state => {
    const {user, registrationError, loading} = state.Account;
    return {user, registrationError, loading};
};

export default connect(mapStatetoProps, {registerUser, apiError, registerUserFailed}, null, {})(
    GoogleApiWrapper({
        apiKey: 'AIzaSyD8LVZs12SZOf5za-1Z5x3CqKrQ3oVCesY',
        LoadingContainer: LoadingContainer,
        v: '3'
    })(Register)
);
