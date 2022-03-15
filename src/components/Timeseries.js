import { useEffect } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

var quantifiers = [];
const sensorCount = 3;

var data = [];

const yVariables = {
  "temp": "Temperature",
  "pres": "Pressure",
  "ch4": "CH4",
  "co2": "CO2",
  "o2": "O2",
  "pid": "PID"
};
const yIDs = Object.keys(yVariables);

const axisRanges = {
  "xMin": "X-Min",
  "xMax": "X-Max",
  "yMin": "Y-Min",
  "yMax": "Y-Max"
}
const axisKeys = Object.keys(axisRanges);

// Variables that should not be plotted on the y-axis
const noPlotVariables = [
  "index",
  "devEUI",
  "site",
  "timestamp",
  "local_datetime",
  "background",
  "latitude",
  "longitude",
  "datetime",
  "timeElapsed",
  "name",
  "sensor"
];
// Variables relating to the entire quantifier system (sensor 0)
var sensor0Variables = noPlotVariables;
sensor0Variables.splice(noPlotVariables.length - 2, 2,
  "tcm_temp",
  "battery_voltage"
);

function setupData(raw) {
  const startTime = parseInt(raw[0].timestamp);

  // Determine quantifiers and convert timestamp to time elapsed in seconds
  for (var i = 0; i < raw.length; i++) {
    // Find unique quantifier names
    if (quantifiers.indexOf(raw[i].name) === -1) {
      quantifiers.push(raw[i].name);
    }

    // Calculate time from start in seconds and minutes
    raw[i].timeElapsed = (parseInt(raw[i].timestamp) - startTime) / 1000;
    // raw[i].timeElapsedMin = raw[i].timeElapsed / 60;
    // raw[i].timeElapsed30 = Math.round(raw[i].timeElapsedMin / 30);
  }
  quantifiers = quantifiers.filter(function (element) {
    return element !== undefined;
  }).sort();
  console.log(quantifiers);

  // Fix headers, and separate sensor number from header, if necessary
  const rawHeaders = Object.keys(raw[0]);
  var headers = rawHeaders;
  if (headers[0] === "") {
    headers[0] = "index";
  }
  for (var i = 0; i < headers.length; i++) {
    for (var count = 0; count < sensorCount; count++) {
      headers[i] = headers[i].replace("sensor" + (count + 1) + "_", "");
    }
  }
  headers = [...new Set(headers)];
  headers.push("sensor");
  console.log(headers);

  // Sort data into long format
  for (var q = 0; q < quantifiers.length; q++) {
    data.push({
      "name": quantifiers[q],
      "data": []
    });
    for (var count = 0; count < sensorCount + 1; count++) {
      data[q].data.push({ "sensor": count });
    }
    // Setup for sensor 0
    for (var j = 0; j < sensor0Variables.length - 1; j++) {
      data[q].data[0][sensor0Variables[j]] = [];
    }
  }

  // Sensor 0 data
  for (var q = 0; q < quantifiers.length; q++) {
    for (var i = 0; i < raw.length; i++) {
      if (raw[i].name === data[q].name) {
        for (var j = 0; j < sensor0Variables.length - 1; j++) {
          data[q].data[0][sensor0Variables[j]].push(raw[i][sensor0Variables[j]]);
        }
      }
    }
  }

  // for (var q = 0; q < quantifiers.length; q++) {
  //   for (var count = 0; count < sensorCount + 1; count++) {
  //     for (var j = 0; j < noPlotVariables.length - 1; j++) {
  //       // Sensor 0 for entire quantifier values
  //       var sensor0Array = [];
  //       for (var i = 0; i < raw.length; i++) {
  //         if (raw[i].name === data[q].name) {
  //           sensor0Array.push("" + raw[i][noPlotVariables[j]]);
  //         }
  //       }
  //       data[q].data[count][noPlotVariables[j]] = sensor0Array;
  //     }
  //   }
  // }
  console.log(data);
  console.log(data[0].data[0])
}

function Timeseries(props) {
  const raw = props.raw;
  const checkboxes = yIDs.map(id => (
    <Form.Check
      inline
      type="switch"
      id={id}
      key={id + "CheckBox"}
      label={yVariables[id]}
      defaultChecked
    />
  ));
  const rangeBoxes = axisKeys.map(key => (
    <Col key={key + "RangeTextBox"}>
      <InputGroup className="mb-2 mr-sm-2">
        <InputGroup.Text id={key + "Label"}>{axisRanges[key]}</InputGroup.Text>
        <Form.Control type="text" placeholder="0" />
      </InputGroup>
    </Col>
  ));

  // Runs the setup function once on load
  useEffect(() => { setupData(props.rawData); }, []);

  return (
    <Container>
      <Container>
        <Form className="g-2 pt-2 pb-2 fs-6">
          {checkboxes}
          <Button variant="primary">Reset</Button>
        </Form>

        <Form id="xyRangeForm" className="g-2 pt-2">
          <Row>
            {rangeBoxes}
            <Col key="rangeUpdateButton">
              <Button variant="primary">Update</Button>
            </Col>
          </Row>
        </Form>
      </Container>

      <Container>
        <LineChart width={600} height={300} data={props.rawData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line type="monotone" dataKey="tcm_temp" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </Container>
      {/* <div class="row flex-nowrap g-2 pb-2 pt-2 text-center" id="rowHeader">
        <div class="col-1"><b>Quantifiers</b></div>
      </div>
      <div class="row flex-nowrap g-2 pb-3 text-center align-items-center" id="row0">
        <div class="col-1"><b>Top</b></div>
      </div>
      <div class="row flex-nowrap g-2 pb-3 text-center align-items-center" id="row1">
        <div class="col-1"><b>Middle</b></div>
      </div>
      <div class="row flex-nowrap g-2 pb-3 text-center align-items-center" id="row2">
        <div class="col-1"><b>Bottom</b></div>
      </div>
      <div class="row flex-nowrap g-2 pb-3 text-center align-items-center" id="row3">
        <div class="col-1"><b>Overall /<br /> Average</b></div>
      </div> */}
    </Container>
  );
}

export default Timeseries;