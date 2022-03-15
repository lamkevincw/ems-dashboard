import React from 'react';
import styles from './sideBarMenu.css';
import {Nav, NavItem, Navbar, NavDropdown} from 'react-bootstrap';

export default React.createClass( {

    render: function() {
        return <div id="sidebar-menu" className={styles.sideBarMenuContainer}>
            <Navbar fluid className={styles.sidebar} inverse >

                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">User Name</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>

                <Navbar.Collapse>
                    <Navbar.Text className={styles.userMenu}>
                    </Navbar.Text>
                    <Nav>
                        <NavDropdown eventKey={1} title="Item 1">
                            
                        </NavDropdown>
                        <NavItem eventKey={2}>Item 2</NavItem>
                        <NavItem eventKey={3}>Item 3</NavItem>
                    </Nav>
                </Navbar.Collapse>

            </Navbar>
        </div>;
    }
});