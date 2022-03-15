function SidebarItem(props) {
    const isActive = props.activeTab === props.name;
    var className = isActive ? " active" : "";
    return (
        <li className="nav-item">
            <a className={"nav-link" + className} id={props.id + "-tab"} data-bs-toggle="tab" data-bs-target={props.id}
                href="#">
                <span data-feather="bar-chart"></span>
                {props.name}
            </a>
        </li>
    );
}

export default SidebarItem;