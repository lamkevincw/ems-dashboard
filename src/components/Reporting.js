import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";

const site_metadata = {
    "Kerrobert": {
        "quantifiers": ["Q01", "Q02", "Q03", "Q04", "Q05", "Q06", "Q07", "Q08", "Q09", "Q10",
            "Q11", "Q12", "Q13", "Q14", "Q15", "Q16", "Q17"],
        "voltage_threshold": 10,
        // "raw_data_path": os.path.join("..", "Kerrobert", "data",
        //     "Kerrobert_raw_{}_{}.csv".format(current_time.year,
        //         months[current_time.month - 1]))
    }
};
const siteName = "Kerrobert";

var quantifiers = [];
var quantifierReport = {};

var lastReportedDate = {};
const currentDate = (new Date()).toLocaleDateString("en-US");

function setupData(raw) {


    for (var i = 0; i < raw.length; i++) {
        // Find unique quantifier names
        if (quantifiers.indexOf(raw[i].name) === -1) {
            quantifiers.push(raw[i].name);
        }
    }
    quantifiers = quantifiers.filter(function (element) {
        return element !== undefined;
    }).sort();

    var lastQRow = {};
    for (var q = 0; q < quantifiers.length; q++) {
        quantifierReport[quantifiers[q]] = {
            "q_reporting": "N/A",
            "q_last_reported": "N/A",
            "q_voltage": "N/A",
            "q_voltage_low": "N/A",
            "q_sensor1": "N/A",
            "q_sensor2": "N/A",
            "q_sensor3": "N/A",
            "q_sensor1_0s": "N/A",
            "q_sensor2_0s": "N/A",
            "q_sensor3_0s": "N/A",
            "q_sensor1_too_small": "N/A",
            "q_sensor2_too_small": "N/A",
            "q_sensor3_too_small": "N/A",
        };

        // Determine the last reported row for each quantifier
        lastQRow[quantifiers[q]] = "N/A";
        for (var i = raw.length - 2; i > 0; i--) {
            if (raw[i].name === quantifiers[q] && lastQRow[quantifiers[q]] === "N/A") {
                lastQRow[quantifiers[q]] = i;
            }
        }

        var reportedDate = new Date(parseInt(raw[lastQRow[quantifiers[q]]].timestamp));
        var lastVoltage = parseFloat(raw[lastQRow[quantifiers[q]]].battery_voltage);

        quantifierReport[quantifiers[q]].q_reporting = (reportedDate.toLocaleDateString === currentDate);
        quantifierReport[quantifiers[q]].q_last_reported = reportedDate.toLocaleDateString("en-US") + ", " + reportedDate.toLocaleTimeString("en-US");
        quantifierReport[quantifiers[q]].q_voltage = lastVoltage;
        quantifierReport[quantifiers[q]].q_voltage_low = (lastVoltage < site_metadata[siteName].voltage_threshold);
        quantifierReport[quantifiers[q]].q_sensor1 = (raw[lastQRow[quantifiers[q]]].sensor1_data_received === "true");
        quantifierReport[quantifiers[q]].q_sensor2 = (raw[lastQRow[quantifiers[q]]].sensor2_data_received === "true");
        quantifierReport[quantifiers[q]].q_sensor3 = (raw[lastQRow[quantifiers[q]]].sensor3_data_received === "true");
        quantifierReport[quantifiers[q]].q_sensor1_0s = (parseFloat(raw[lastQRow[quantifiers[q]]].sensor1_raw_ref) == 0 &&
            parseFloat(raw[lastQRow[quantifiers[q]]].sensor1_raw_ch4) == 0 &&
            parseFloat(raw[lastQRow[quantifiers[q]]].sensor1_raw_phc) == 0 &&
            parseFloat(raw[lastQRow[quantifiers[q]]].sensor1_raw_co2) == 0);
        quantifierReport[quantifiers[q]].q_sensor2_0s = (parseFloat(raw[lastQRow[quantifiers[q]]].sensor2_raw_ref) == 0 &&
            parseFloat(raw[lastQRow[quantifiers[q]]].sensor2_raw_ch4) == 0 &&
            parseFloat(raw[lastQRow[quantifiers[q]]].sensor2_raw_phc) == 0 &&
            parseFloat(raw[lastQRow[quantifiers[q]]].sensor2_raw_co2) == 0);
        quantifierReport[quantifiers[q]].q_sensor3_0s = (parseFloat(raw[lastQRow[quantifiers[q]]].sensor3_raw_ref) == 0 &&
            parseFloat(raw[lastQRow[quantifiers[q]]].sensor3_raw_ch4) == 0 &&
            parseFloat(raw[lastQRow[quantifiers[q]]].sensor3_raw_phc) == 0 &&
            parseFloat(raw[lastQRow[quantifiers[q]]].sensor3_raw_co2) == 0);
        quantifierReport[quantifiers[q]].q_sensor1_too_small = (parseFloat(raw[lastQRow[quantifiers[q]]].sensor1_raw_ref) < 10000 &&
            parseFloat(raw[lastQRow[quantifiers[q]]].sensor1_raw_ch4) < 10000 &&
            parseFloat(raw[lastQRow[quantifiers[q]]].sensor1_raw_phc) < 10000 &&
            parseFloat(raw[lastQRow[quantifiers[q]]].sensor1_raw_co2) < 10000);
        quantifierReport[quantifiers[q]].q_sensor2_too_small = (parseFloat(raw[lastQRow[quantifiers[q]]].sensor2_raw_ref) < 10000 &&
            parseFloat(raw[lastQRow[quantifiers[q]]].sensor2_raw_ch4) < 10000 &&
            parseFloat(raw[lastQRow[quantifiers[q]]].sensor2_raw_phc) < 10000 &&
            parseFloat(raw[lastQRow[quantifiers[q]]].sensor2_raw_co2) < 10000);
        quantifierReport[quantifiers[q]].q_sensor3_too_small = (parseFloat(raw[lastQRow[quantifiers[q]]].sensor3_raw_ref) < 10000 &&
            parseFloat(raw[lastQRow[quantifiers[q]]].sensor3_raw_ch4) < 10000 &&
            parseFloat(raw[lastQRow[quantifiers[q]]].sensor3_raw_phc) < 10000 &&
            parseFloat(raw[lastQRow[quantifiers[q]]].sensor3_raw_co2) < 10000);
    }
    console.log(quantifierReport);


}

function Reporting(props) {
    const headerNames = ["Name", "Last Reported", "Battery Voltage", "Sensor1 Reporting", "Sensor2 Reporting", "Sensor3 Reporting",
        "Sensor1 All Zeroes", "Sensor2 All Zeroes", "Sensor3 All Zeroes", "Sensor1 Too Small", "Sensor2 Too Small", "Sensor3 Too Small"];
    const headers = headerNames.map(name => (
        <th key={name}>{name}</th>
    ));
    const trueIsGreen = (bool) => {
        return bool ? "green" : "red";
    };
    const [cells, setCells] = useState();

    // Runs the setup function once on load
    useEffect(() => {
        setupData(props.rawData);
        populateCells();
    }, []);

    function populateCells() {
        var cell = quantifiers.map(quantifier => (
            <tr key={quantifier + "reportRow"}>
                <td>{quantifier}</td>
                <td style={{ color: trueIsGreen(quantifierReport[quantifier].q_reporting) }}>
                    {quantifierReport[quantifier].q_last_reported}</td>
                <td style={{ color: trueIsGreen(!quantifierReport[quantifier].q_voltage_low) }}>
                    {quantifierReport[quantifier].q_voltage}</td>
                <td style={{ color: trueIsGreen(quantifierReport[quantifier].q_sensor1) }}>
                    {String(quantifierReport[quantifier].q_sensor1)}</td>
                <td style={{ color: trueIsGreen(quantifierReport[quantifier].q_sensor2) }}>
                    {String(quantifierReport[quantifier].q_sensor2)}</td>
                <td style={{ color: trueIsGreen(quantifierReport[quantifier].q_sensor3) }}>
                    {String(quantifierReport[quantifier].q_sensor3)}</td>
                <td style={{ color: trueIsGreen(!quantifierReport[quantifier].q_sensor1_0s) }}>
                    {String(quantifierReport[quantifier].q_sensor1_0s)}</td>
                <td style={{ color: trueIsGreen(!quantifierReport[quantifier].q_sensor2_0s) }}>
                    {String(quantifierReport[quantifier].q_sensor2_0s)}</td>
                <td style={{ color: trueIsGreen(!quantifierReport[quantifier].q_sensor3_0s) }}>
                    {String(quantifierReport[quantifier].q_sensor3_0s)}</td>
                <td style={{ color: trueIsGreen(!quantifierReport[quantifier].q_sensor1_too_small) }}>
                    {String(quantifierReport[quantifier].q_sensor1_too_small)}</td>
                <td style={{ color: trueIsGreen(!quantifierReport[quantifier].q_sensor2_too_small) }}>
                    {String(quantifierReport[quantifier].q_sensor2_too_small)}</td>
                <td style={{ color: trueIsGreen(!quantifierReport[quantifier].q_sensor3_too_small) }}>
                    {String(quantifierReport[quantifier].q_sensor3_too_small)}</td>
            </tr>
        ));
        setCells(cell);
    }

    return (
        <Container>
            <h3>{siteName}</h3>
            <Table responsive bordered hover size="sm" key="reportingTable">
                <thead style={{ "fontSize": "12px" }} key="rHeader">
                    <tr key="reportingHeader">
                        {headers}
                    </tr>
                </thead>
                <tbody style={{ "fontSize": "12px" }}>
                    {cells}
                </tbody>
            </Table>
        </Container>
    );
}

export default Reporting;