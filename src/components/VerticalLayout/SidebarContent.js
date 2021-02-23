import React, { Component } from "react";

// MetisMenu
import MetisMenu from "metismenujs";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

//i18n
import { withNamespaces } from 'react-i18next';

class SidebarContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        this.initMenu();
    }

    componentDidUpdate(prevProps) {
        if (this.props.type !== prevProps.type) {
            this.initMenu();
        }
    }

    initMenu() {
            new MetisMenu("#side-menu");

            var matchingMenuItem = null;
            var ul = document.getElementById("side-menu");
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
            parent.classList.add("mm-active");
            const parent2 = parent.parentElement;

            if (parent2) {
                parent2.classList.add("mm-show");

                const parent3 = parent2.parentElement;

                if (parent3) {
                    parent3.classList.add("mm-active"); // li
                    parent3.childNodes[0].classList.add("mm-active"); //a
                    const parent4 = parent3.parentElement;
                    if (parent4) {
                        parent4.classList.add("mm-active");
                    }
                }
            }
            return false;
        }
        return false;
    };

    render() {
        return (
            <React.Fragment>
                 <div id="sidebar-menu">
                <ul className="metismenu list-unstyled" id="side-menu">
                    <li className="menu-title">{this.props.t('Menu') }</li>

                    <li>
                        <Link to="/vendor/dashboard" className=" waves-effect">
                            <i className="bx bx-calendar"/>
                            <span>{this.props.t('Statistics') }</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/#" className="has-arrow waves-effect">
                            <i className="bx bx-store"/>
                            <span>{this.props.t('Products') }</span>
                        </Link>
                        <ul className="sub-menu" aria-expanded="false">
                            <li><Link to="/vendor/product-list">{this.props.t('Product List') }</Link></li>
                            <li><Link to="/vendor/add-product">{this.props.t('Add Product') }</Link></li>
                            <li><Link to="/vendor/product-check">{this.props.t('Product Check') }</Link></li>
                        </ul>
                    </li>

                    <li>
                        <Link to="/#" className="has-arrow waves-effect">
                            <i className="bx bx-bitcoin"/>
                            <span>{this.props.t('Orders')}</span>
                        </Link>
                            <ul className="sub-menu" aria-expanded="false">
                                <li><Link to="/vendor/product-order">{this.props.t('Product Order')}</Link></li>
                                <li><Link to="/vendor/check-out">{this.props.t('Check Out')}</Link></li>
                            </ul>
                        </li>

                    <li>
                        <Link to="/#" className="has-arrow waves-effect">
                            <i className="bx bx-envelope"/>
                            <span>{this.props.t('Settings')}</span>
                        </Link>
                        <ul className="sub-menu" aria-expanded="false">
                            <li><Link to="/vendor/profile">{this.props.t('Profile')}</Link></li>
                            <li><Link to="/vendor/shop-status">{this.props.t('Shop Status')} </Link></li>
                            <li><Link to="/vendor/time-slot">{this.props.t('Time Slot')} </Link></li>
                            <li><Link to="/vendor/working-time">{this.props.t('Working Time')} </Link></li>
                            <li><Link to="/vendor/drivers">{this.props.t('Drivers')} </Link></li>
                        </ul>
                    </li>

                </ul>
            </div>
            </React.Fragment>
        );
    }
}

export default withRouter(withNamespaces()(SidebarContent));
