import React, {Component} from 'react';
import {Button, Card, CardBody, Col, Container, Row} from "reactstrap";
import {MDBDataTable} from 'mdbreact';
import axios from 'axios';
import ReactFileReader from 'react-file-reader';

import Breadcrumbs from '../../components/Common/Breadcrumb';
import './products.scss'
import {webUrl} from "../../config";

const url = webUrl + '/v2/api/vendor/products/';
const token = localStorage.getItem('authVendor');

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                columns: [
                    // {
                    //     label:  <MDBInput label=' ' type='checkbox' id='checkbox1' className='Checkbox' onClick={this.toggleCheck} checked={this.isChecked('checkbox1')}/>,
                    //     field: 'check',
                    //     sort: 'disabled',
                    //     width: 20
                    // },
                    {
                        label: 'Image',
                        field: 'image',
                        sort: 'asc',
                        width: 100
                    },
                    {
                        label: 'Name',
                        field: 'title',
                        sort: 'asc',
                        width: 100
                    },
                    {
                        label: 'Slug',
                        field: 'slug',
                        sort: 'asc',
                        width: 100
                    },
                    {
                        label: 'Sku',
                        field: 'sku',
                        sort: 'asc',
                        width: 100
                    },
                    {
                        label: 'Category',
                        field: 'categoryName',
                        sort: 'asc',
                        width: 100
                    },
                    {
                        label: 'Occasion',
                        field: 'occasionName',
                        sort: 'asc',
                        width: 100
                    },
                    {
                        label: 'Regular Price',
                        field: 'regular_price',
                        sort: 'asc',
                        width: 100
                    },
                    {
                        label: 'Discount Price',
                        field: 'discount_price',
                        sort: 'asc',
                        width: 100,
                    },
                    {
                        label: 'Quantity',
                        field: 'quantity',
                        sort: 'asc',
                        width: 100
                    },
                    {
                        label: 'Status',
                        field: 'status',
                        sort: 'asc',
                        width: 5
                    },
                    {
                        label: 'Action',
                        field: 'action',
                        sort: 'asc',
                        width: 20
                    },
                ],
                rows: []
            },
            redirect: false,
            redirectToEdit: false,
            // checked: [''],
            // checked1: [''],
            // redirect: false
        };
        this.editProduct = this.editProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.csvExportClick = this.csvExportClick.bind(this);
        this.xlsExportClick = this.xlsExportClick.bind(this);
    }

    // toggleCheck = e => {
    //     let checkedArr = this.state.checked;
    //     checkedArr.filter(name => name === e.target.id)[0]
    //         ? checkedArr = checkedArr.filter(name => name !== e.target.id)
    //         : checkedArr.push(e.target.id);
    //     this.setState({checked: checkedArr})
    // };
    // isChecked = id => !!this.state.checked.filter(name => name === id)[0];

    componentDidMount() {
        axios.get(url + 'getProductList', {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            const rows = res['data']['product'];
            this.setState({data: {...this.state.data, rows}});
        }).catch(err => {
            console.log(err)
        })
    }

    editProduct = (id) => {
        for (let row of this.state['data']['rows']) {
            if (id === row._id) {
                this.props.history.push({
                    pathname: '/vendor/product-edit',
                    editData: row
                })
            }
        }
    };

    deleteProduct = (id) => {
        axios.post(url + 'deleteProduct', {id: id}, {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            this.setState({redirect: true})
        }).catch(err => console.log(err))
    };

    csvExportClick = () => {
        let csvRow = [];
        let csvHeader = [[" ", "image", "title", 'slug', 'sku', 'description', 'category', 'occasion', 'regular_price', 'discount_price', 'quantity']];
        let csvBody = this.state.data['rows'];

        for (let item = 0; item < csvBody.length; item++) {
            csvHeader.push([csvBody[item].image.props['src'].slice(38), csvBody[item].title, csvBody[item].slug, csvBody[item].sku, csvBody[item].description,
                csvBody[item].categoryName, csvBody[item].occasionName, csvBody[item].regular_price, csvBody[item].discount_price, csvBody[item].quantity
            ])
        }
        for (let i = 0; i < csvHeader.length; i++) {
            csvRow.push(csvHeader[i].join(","));
        }
        let csvString = csvRow.join("%0A");

        let a = document.createElement('a');
        a.href = 'data:attachment/csv' + csvString;
        a.target = '_Blank';
        a.download = 'product.csv';
        document.body.appendChild(a);
        a.click();
    };

    xlsExportClick = () => {

    };

    handleFiles = files => {
        let reader = new FileReader();
        reader.onload = function (e) {
            let csv = reader.result;
            let lines = csv.split("\n");
            let result = [];
            let headers = lines[0].split(",");
            for (let i = 1; i < lines.length; i++) {
                let obj = {};
                let currentLine = lines[i].split(",");
                for (let j = 0; j < headers.length; j++) {
                    obj[headers[j]] = currentLine[j];
                }
                result.push(obj);
            }
            result = JSON.stringify(result);
            axios.post(url + 'fileUpload', {'file': result}, {
                headers: {
                    'Authorization': token
                }
            }).then(res => {
                window.location.reload()
            })
        };
        reader.readAsText(files[0]);
    };

    render() {

        let {data} = this.state;
        let rows = [];

        data.rows.sort(function (a, b) {
            return b['created_at'] > a['created_at'] ? 1 : -1
        });

        for (let row of data.rows) {
            const productImage = webUrl +  "/public/products/" + row.image;

            if (row.status === 'active') {
                rows.push({
                    ...row,
                    image: <img src={productImage} alt={productImage}
                                width={60} height={60}/>,
                    status: <span className="badge badge-success">{row.status}</span>,
                    action: <i className='bx bx-edit-alt font-size-18 text-info mr-3'
                               onClick={() => this.editProduct(row._id)}/>,
                })
            } else if (row.status === 'pending') {
                rows.push({
                    ...row,
                    image: <img src={productImage} alt={productImage}
                                width={60} height={60}/>,
                    status: <span className="badge badge-warning">{row.status}</span>,
                    action: <i className='bx bx-edit-alt font-size-18 text-info mr-3'
                               onClick={() => this.editProduct(row._id)}/>,
                })
            } else {
                rows.push({
                    ...row,
                    image: <img src={productImage} alt={productImage}
                                width={60} height={60}/>,
                    status: <span className="badge badge-dark">{row.status}</span>,
                    action: <i className='bx bx-edit-alt font-size-18 text-info mr-3'
                               onClick={() => this.editProduct(row._id)}/>,
                })
            }
        }
        data.rows = rows;
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <Breadcrumbs title="Products" breadcrumbItem="Products List"/>

                        <Row>
                            <Col lx="12">
                                <Card>
                                    <CardBody>
                                        <Row className="mt-4">
                                            <Col sm="6">
                                                <ReactFileReader fileTypes={'.csv'}  handleFiles={this.handleFiles}>
                                                    <button className='btn btn-primary btn-sm'>Upload with File</button>
                                                </ReactFileReader>
                                            </Col>
                                            <Col sm="6">
                                                <div className="text-sm-right mt-2 mt-sm-0">
                                                    <Button color="primary" className="btn btn-primary btn-sm"
                                                            onClick={this.csvExportClick}>
                                                        <i className='bx bx-download'/>csv
                                                    </Button>
                                                    {/*<Button color="primary" className="btn btn-primary btn-sm">*/}
                                                    {/*<i className='bx bx-arrow-to-bottom'*/}
                                                    {/*onClick={this.xlsExportClick}/>xlsx*/}
                                                    {/*</Button>*/}
                                                </div>
                                            </Col>
                                        </Row>
                                        <div className="table-responsive">

                                            <MDBDataTable
                                                responsive
                                                bordered
                                                hover
                                                data={data}/>
                                        </div>

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

export default ProductList;