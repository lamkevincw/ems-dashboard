import { useState } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap"
import RecentChanges from "./RecentChanges";
import SidebarItem from "./SidebarItem";
import Timeseries from "./Timeseries";
import Sidebar from "./Sidebar";

const sidebarItems = [
    "timeseries",
    "recentChanges"
];
const sidebarNames = {
    "timeseries": "Timeseries",
    "recentChanges": "Recent Changes"
};

function Main(props) {
    const [activeTab, setActiveTab] = useState("Timeseries");
    const tabs = sidebarItems.map(item => (
        <SidebarItem
            name={sidebarNames[item]}
            key={item}
            id={item}
            activeTab={activeTab}
        />
    ))

    return (
        <Container fluid>
            <Row>
                {/* Sidebar menu and items */}
                {/* <Nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                    <div className="position-sticky pt-5">
                        <ul className="nav flex-column">
                            {tabs}
                        </ul>
                    </div>
                </Nav> */}
                {/* Main content panes */}
                <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <div class="tab-content" id="myTabContent">
                        <Timeseries
                            activeTab={activeTab}
                        />
                        <RecentChanges
                            activeTab={activeTab}
                        />
                    </div>
                </main>

            </Row>
        </Container>
    );
}

export default Main;