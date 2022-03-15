import { Container, Nav, Navbar, Tab, NavDropdown, Form, FormControl, Button } from "react-bootstrap"

function Navibar(props) {
    function handleSelect(e) {
        props.setActiveTab(e);
        console.log(props.activeTab);
    }

    return (
        <Navbar fixed="top" bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand href="#">EMS Dashboard</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Tab.Container id="nav-tabs" defaultActiveKey="timeseries">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                            onSelect={handleSelect}
                        >
                            <Nav.Link eventKey="timeseries">Timeseries</Nav.Link>
                            <Nav.Link eventKey="map">Map</Nav.Link>
                            <Nav.Link eventKey="reporting">Reporting</Nav.Link>
                            <Nav.Link eventKey="recentChanges">Recent Changes</Nav.Link>
                            {/* <NavDropdown bg="dark" title="Link" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action5">
                                Something else here
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#" disabled>
                            Link
                        </Nav.Link> */}
                        </Nav>
                    </Tab.Container>
                    {/* <Form className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form> */}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navibar;