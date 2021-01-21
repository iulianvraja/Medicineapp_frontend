import React from 'react'
import logo from './commons/images/icon.png';

import {
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    NavLink,
    UncontrolledDropdown
} from 'reactstrap';

const textStyle = {
    color: 'white',
    textDecoration: 'none'
};

const NavigationBarLogin = () => (
    <div>
        <Navbar color="dark" light expand="md">
            <NavbarBrand href="/">
                <img src={logo} width={"50"}
                     height={"35"} />
            </NavbarBrand>
            <Nav className="mr-auto" navbar>


                            <NavLink href="/logasdoc">Doctor Login</NavLink>


                            <NavLink href="/logasingrijitor">Ingrijitor Login</NavLink>



                            <NavLink href="/logaspacient">Pacient Login</NavLink>




            </Nav>
        </Navbar>
    </div>
);

export default NavigationBarLogin
