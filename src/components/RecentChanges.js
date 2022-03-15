import { Table } from "react-bootstrap"
import updates from "../files/recentChanges.json"

function RecentChanges(props) {
    const cells = updates.slice(0).reverse().map(cell => (
        <tr key={cell.date + "ChangeDate"}>
            <td>{cell.date}</td>
            <td><ul>
                {cell.changes.map((change, index) => (
                    <li key={cell.date + "Change #" + index}>{change}</li>
                ))}
            </ul></td>
        </tr>
    ));

    return (
        <Table responsive striped bordered hover size="sm"  key="changesTable">
            <thead key="cHeader">
                <tr key="changeTableHeader">
                    <th>Date</th>
                    <th>Change Summary</th>
                </tr>
            </thead>
            <tbody>
                {cells}
            </tbody>
        </Table>
    );
}

export default RecentChanges;