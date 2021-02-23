import React, { Component } from "react";
import {Collapse } from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import classname from "classnames";

import { withNamespaces } from 'react-i18next';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        var matchingMenuItem = null;
        var ul = document.getElementById("navigation");
        var items = ul.getElementsByTagName("a");
        for (var i = 0; i < items.length; ++i) {
            if (this.props.location.pathname === items[i].pathname) {
                matchingMenuItem = items[i];
                break;
            }
        }
        if (matchingMenuItem) {
            this.activateParentDropdown(matchingMenuItem);
        }
    }

    activateParentDropdown = item => {
        item.classList.add("active");
        const parent = item.parentElement;
        if (parent) {
            parent.classList.add("active"); // li
            const parent2 = parent.parentElement;
            if (parent2) {
                parent2.classList.add("active"); // li
                const parent3 = parent2.parentElement;
                if (parent3) {
                    parent3.classList.add("active"); // li
                    const parent4 = parent3.parentElement;
                    if (parent4) {
                        parent4.classList.add("active"); // li
                        const parent5 = parent4.parentElement;
                        if (parent5) {
                            parent5.classList.add("active"); // li
                            const parent6 = parent5.parentElement;
                            if (parent6) {
                                parent6.classList.add("active"); // li
                            }
                        }
                    }
                }
            }
        }
        return false;
    };

    render() {
        return (
            <React.Fragment>
                <div className="topnav">
                    <div className="container-fluid">
                        <nav className="navbar navbar-light navbar-expand-lg topnav-menu" id="navigation">
                            <Collapse isOpen={this.props.menuOpen} className="navbar-collapse" id="topnav-menu-content">
                                <ul className="navbar-nav">
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle arrow-none" onClick={e => { e.preventDefault(); this.setState({ isDashboard: !this.state.isDashboard }); }} to="dashboard">
                                            <i className="bx bx-home-circle mr-2"/>{this.props.t('Dashboard')} {this.props.menuOpen}<div className="arrow-down"/>
                                        </Link>
                                        <div className={classname("dropdown-menu", { show: this.state.isDashboard })}>
                                            <Link to="/vendor/statistics" className="dropdown-item">{this.props.t('Statistics')}</Link>
                                        </div>
                                    </li>

                                    <li className="nav-item dropdown">
                                        <Link to="/#" onClick={e => { e.preventDefault(); this.setState({ uiState: !this.state.uiState }); }} className="nav-link dropdown-toggle arrow-none">
                                            <i className="bx bx-line-chart-down mr-2"/>{this.props.t('Orders')} <div className="arrow-down"/>
                                        </Link>
                                        <div
                                            className={classname(
                                                "dropdown-menu",
                                                { show: this.state.uiState })}>
                                            <Link to="/vendor/product-lisst" className="dropdown-item">{this.props.t('Accept')}</Link>
                                            <Link to="/vendor/add-produsct" className="dropdown-item">{this.props.t('Reject')}</Link>
                                        </div>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link to="/#" onClick={e => { e.preventDefault(); this.setState({ cuState: !this.state.cuState }); }} className="nav-link dropdown-toggle arrow-none">
                                            <i className="bx bxl-product-hunt mr-2"/>{this.props.t('Products')} <div className="arrow-down"/>
                                        </Link>
                                        <div
                                            className={classname(
                                                "dropdown-menu",
                                                { show: this.state.cuState })}>
                                            <Link to="/vendor/product-list" className="dropdown-item">{this.props.t('Product List')}</Link>
                                            <Link to="/vendor/product-add" className="dropdown-item">{this.props.t('Product Add')}</Link>
                                            <Link to="/vendor/check-out" className="dropdown-item">{this.props.t('Product Delete')}</Link>
                                        </div>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link to="/#" onClick={e => { e.preventDefault(); this.setState({ cuState1: !this.state.cuState1 }); }} className="nav-link dropdown-toggle arrow-none">
                                            <i className="bx bxl-airbnb mr-2"/>{this.props.t('Settings')} <div className="arrow-down"/>
                                        </Link>
                                        <div
                                            className={classname(
                                                "dropdown-menu",
                                                { show: this.state.cuState1 })}>
                                            <Link to="/vendor/shops" className="dropdown-item">{this.props.t('Shop Profile')}</Link>
                                            <Link to="/vendor/status" className="dropdown-item">{this.props.t('Shop Status')}</Link>
                                            <Link to="/vendor/time-slot" className="dropdown-item">{this.props.t('Time Slot')}</Link>
                                            <Link to="/vendor/working" className="dropdown-item">{this.props.t('Working Time')}</Link>
                                            <Link to="/vendor/drivers" className="dropdown-item">{this.props.t('Drivers')}</Link>
                                        </div>
                                    </li>
                                </ul>
                            </Collapse>
                        </nav>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(withNamespaces()(Navbar));
