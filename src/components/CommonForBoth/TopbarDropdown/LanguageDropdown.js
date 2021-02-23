import React, { Component } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import i18n from '../../../i18n';
import { withNamespaces } from 'react-i18next';

import usFlag from "../../../assets/images/flags/us.jpg";
import ksa from '../../../assets/images/flags/sau.jpg';
class LanguageDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: false,
            lng : "عربي",
            flag : ksa
        };
        this.toggle = this.toggle.bind(this);
        this.changeLanguageAction = this.changeLanguageAction.bind(this);
    }

    changeLanguageAction = (lng) => {

        //set language as i18n
        i18n.changeLanguage(lng);

        if(lng === "arb")
            this.setState({lng : "عربي", flag : ksa });
        else if(lng === "eng")
            this.setState({lng : "English", flag : usFlag });
    };

    toggle() {
        this.setState(prevState => ({
            menu: !prevState.menu
        }));
    }

    render() {

        return (
            <React.Fragment>
                <Dropdown
                    isOpen={this.state.menu}
                    toggle={this.toggle}
                    className="d-inline-block"
                >
                    <DropdownToggle
                        className="btn header-item waves-effect"
                        tag="button"
                    >
                        <img
                            src={this.state.flag}
                            alt="Skote"
                            height="16"
                            className="mr-1"
                        />
                        <span className="align-middle text-primary">{this.state.lng}</span>
                    </DropdownToggle>
                    <DropdownMenu className="language-switch" right>
                        <DropdownItem tag="a" href="#" onClick={() => this.changeLanguageAction('arb')} className={`notify-item ${this.state.lng === 'Russian' ? 'active' : 'none'}`}>
                            <img src={ksa} alt="Skote" className="mr-1" height="12" />
                            <span className="align-middle text-primary">عربي</span>
                        </DropdownItem>
                        <DropdownItem tag="a" href="#" onClick={() => this.changeLanguageAction('eng')} className={`notify-item ${this.state.lng === 'English' ? 'active' : 'none'}`}>
                            <img src={usFlag} alt="Skote" className="mr-1" height="12" />
                            <span className="align-middle text-primary">English</span>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </React.Fragment>
        );
    }
}

export default withNamespaces()(LanguageDropdown);
