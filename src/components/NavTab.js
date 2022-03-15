import { Tab } from "react-bootstrap"

function NavTab(props) {
    const isActive = props.name === props.activeTab;
    var cName = isActive ? " show active" : "";

    // Resizes the window to current size to trigger resizing events
    // Fixes map not using correct dimensions when loading as a hidden tab
    window.dispatchEvent(new Event('resize'));

    return (
        <Tab.Pane
            className={"tab-pane fade" + cName}
            id={props.id}
            key={props.id}
            role="tabpanel">
            {props.component}
        </Tab.Pane>
    );
}

export default NavTab;