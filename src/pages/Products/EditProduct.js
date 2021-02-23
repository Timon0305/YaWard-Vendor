import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, FormGroup, Label, Button } from "reactstrap";
import {AvForm, AvField} from "availity-reactstrap-validation";
import {Redirect, Link} from 'react-router-dom';
import axios from 'axios';

import "react-datepicker/dist/react-datepicker.css";

import Breadcrumbs from '../../components/Common/Breadcrumb';
import {webUrl} from "../../config";

const url = webUrl + '/v2/api/vendor/products/';
const token = localStorage.getItem('authVendor');

class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            title: '',
            description: '',
            slug: '',
            sku: '',
            regular_price: '',
            discount_price: '',
            quantity: '',
            image: '',
            categoryName: 'unCategorized',
            occasionName: 'unCategorized',
            category: [],
            occasion: [],
            redirect: false,
            product_file: null,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    onChangeHandler = event => {
        this.setState({product_file: event.target.files[0]});
    };

    componentDidMount() {
        const {editData} = this.props.location;
        if (editData === undefined) {
            this.setState({redirect: true})
        } else {
            axios.get(url + 'getCategory', {
                headers: {
                    'Authorization': token
                }
            }).then(res => {
                this.setState({category: res['data']['categories']})
            }).catch(err => console.error(err));

            axios.get(url + 'getOccasion', {
                headers: {
                    'Authorization': token
                }
            }).then(res => {
                this.setState({occasion: res['data']['occasions']})
            });
            this.setState({
                'categoryName': editData['categoryName'],
                'occasionName': editData['occasionName']
            })
        }
    }



    handleSubmit(event, values) {
        this.setState({
            id: this.productId,
            title: values.title,
            description: values.description,
            slug: values.slug,
            sku: values.sku,
            regular_price: values.regular_price,
            discount_price: values.discount_price,
            quantity: values.quantity,
            status: 'pending',
            image: values.image,
            categoryName: values.categoryName,
            occasionName: values.occasionName
        });

        axios.post(url + 'editProduct', this.state, {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            if (res['data']['success'] === true) {
                let productFile = new FormData();
                productFile.append('product_file', this.state.product_file);
                axios.post(url + 'addProductFile', productFile, {
                    headers: {
                        'Authorization': token
                    }
                }).then(res => {

                });
                this.setState({redirect: true})
            }
        }).catch(err => {
            console.error(err);
            localStorage.clear();
        });
    }

    render() {
        const {redirect} = this.state;
        if (redirect) {
            return <Redirect to='/vendor/product-list' />
        }
        const {editData} = this.props.location;
        if (!editData) {
            return <Redirect to='/vendor/product-list' />
        }
        this.productId = editData['_id'];


        if(typeof this.state.category === "undefined"){
            return false;
        }
        const categories = this.state.category;
        const itemCategory = [];

        for (let i = 0; i < categories.length; i++) {
            itemCategory.push(<option key={i} value={categories[i]}>{categories[i]}</option>);
        }

        const occasions = this.state.occasion;
        const itemOccasion = [];
        for (let i = 0; i < occasions.length; i++) {
            itemOccasion.push(<option key={i} value={occasions[i]}>{occasions[i]}</option>);
        }

        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                        <Breadcrumbs title="Products" breadcrumbItem="Add Products" />

                        <Row>
                            <Col lg="12">
                                <Card>
                                    <CardBody>
                                        <CardTitle className="mb-4">Edit Products</CardTitle>
                                        <AvForm onValidSubmit={this.handleSubmit}>
                                            <FormGroup className="mb-4" row>
                                                <Label htmlFor="productName" className="col-form-label col-lg-2">Product Name</Label>
                                                <Col lg="10">
                                                    <AvField
                                                        name="title"
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Enter Product Name..."
                                                        value={editData['title']}
                                                        errorMessage='Enter Product Name'
                                                        validate={{required: {value: true}}} />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup className="mb-4" row>
                                                <Label htmlFor="description" className="col-form-label col-lg-2">Product Description</Label>
                                                <Col lg="10">
                                                    <AvField
                                                        name="description"
                                                        type="textarea"
                                                        rows='5'
                                                        className="form-control"
                                                        placeholder="Enter Product Description..."
                                                        value={editData['description']}
                                                        errorMessage='Enter Product Description'
                                                        validate={{required: {value: true}}} />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup className="mb-4" row>
                                                <Label htmlFor="slug" className="col-form-label col-lg-2">Product Slug</Label>
                                                <Col lg="10">
                                                    <AvField
                                                        name="slug"
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Enter Product Slug..."
                                                        value={editData['slug']}
                                                        errorMessage='Enter Product Slug'
                                                        validate={{required: {value: true}}} />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup className="mb-4" row>
                                                <Label htmlFor="sku" className="col-form-label col-lg-2">Product Sku</Label>
                                                <Col lg="10">
                                                    <AvField
                                                        name="sku"
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Enter Product Sku..."
                                                        value={editData['sku']}
                                                        errorMessage='Enter Product Sku'
                                                        validate={{required: {value: true}}} />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup className="mb-4" row>
                                                <Label htmlFor="regular_price" className="col-form-label col-lg-2">Product Regular Price</Label>
                                                <Col lg="10">
                                                    <AvField
                                                        name="regular_price"
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="Enter Product Regular Price..."
                                                        value={editData['regular_price']}
                                                        errorMessage='Enter Product Regular Price'
                                                        validate={{required: {value: true}}} />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup className="mb-4" row>
                                                <Label htmlFor="discount_price" className="col-form-label col-lg-2">Product Discount Price</Label>
                                                <Col lg="10">
                                                    <AvField
                                                        name="discount_price"
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="Enter Product Discount Price..."
                                                        value={editData['discount_price']}
                                                        errorMessage='Enter Product Discount Price'
                                                        validate={{required: {value: true}}} />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup className="mb-4" row>
                                                <label htmlFor="quantity" className="col-form-label col-lg-2">Quantity</label>
                                                <Col lg="10">
                                                    <AvField
                                                        name="quantity"
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="Enter Product Quantity..."
                                                        value={editData['quantity']}
                                                        errorMessage='Enter Product Quantity'
                                                        validate={{required: {value: true}}} />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup className="mb-4" row>
                                                <label htmlFor="image" className="col-form-label col-lg-2">Attachment File</label>
                                                <Col lg="10">
                                                    <AvField
                                                        name="image"
                                                        type="file"
                                                        className="form-control"
                                                        errorMessage='Enter Product Image'
                                                        onChange={this.onChangeHandler}
                                                    />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup className="mb-4" row>
                                                <label htmlFor="image" className="col-form-label col-lg-2">Select Category</label>
                                                <Col lg="10">
                                                    <AvField type="select" name='categoryName' value={this.state.categoryName}
                                                             onChange={this.handleInputChange}>
                                                        <option value='unCategorized'>unCategorized</option>
                                                        {itemCategory}
                                                    </AvField>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup className="mb-4" row>
                                                <label htmlFor="image" className="col-form-label col-lg-2">Select Occasion</label>
                                                <Col lg="10">
                                                    <AvField type="select" name='occasionName' value={this.state.occasionName}
                                                             onChange={this.handleInputChange}>
                                                        <option value='unCategorized'>unCategorized</option>
                                                        {itemOccasion}
                                                    </AvField>
                                                </Col>
                                            </FormGroup>
                                            <Row className="justify-content-end">
                                                <Col lg="10">
                                                    <Button type="submit" className='mr-2' color="primary">Upload Product</Button>
                                                    <Link to='/vendor/product-list'>
                                                        <Button type="button" className='ml-2' color="secondary">Cancel</Button>
                                                    </Link>
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

export default EditProduct;