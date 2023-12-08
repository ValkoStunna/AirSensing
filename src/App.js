import './App.css';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Import Bootstrap JS	
import { Accordion, Card, ListGroup, Form, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'; // Import Bootstrap components
import axios from 'axios';

function App() {
  const Link = ({ id, children, title, onClick, value }) => (
    /* eslint-disable */
    <OverlayTrigger overlay={<Tooltip id={id}>{title}</Tooltip>}>
        <a onClick={() => onClick(value)} href="#">{children}</a>
    </OverlayTrigger>
    /* eslint-enable */
  );

  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const backendPort = process.env.REACT_APP_BACKEND_PORT;

  const [inputValue, setInputValue] = useState(''); //form input value
  const [data, setData] = useState(null); //JSON response data
  const fetchData = async () => {
    try {
      // Modify the URL or API endpoint based on the parameters
      const url = `${backendUrl}:${backendPort}/api/${inputValue}`;
      const response = await axios.get(url);
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      setData(null);
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const inputExample = async (value) => {
    // Your function logic here
    console.log('Link clicked!');
    setInputValue(value);
    fetchData();
  };

  return (
    <div className="App">
      <header>
        <h1>Api documentation</h1>
      </header>
      <body>
        <div className="row p-5 gx-4">
          <div className="col-md-8">
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>{"GET /api/{resource_type}"}</Accordion.Header>
                <Accordion.Body>
                  <p>Get all latest records. No filtering.</p>
                  <p><Link title="Try it out" id="t-1" onClick={inputExample} value="all">{"/api/all"}</Link></p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>{"GET /api/{resource_type}/limit={int}"}</Accordion.Header>
                <Accordion.Body>
                  <p>Get latest 200 records. By default this limit is 100</p>
                  <p><Link title="Try it out" id="t-2" onClick={inputExample} value="all?limit=2">{"/api/all?limit=2"}</Link></p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>{"GET /api/{r_type}?offset={int}}"}</Accordion.Header>
                <Accordion.Body>
                  <p>Get latest records 100 through 600 </p>
                  <p><Link title="Try it out" id="t-3" onClick={inputExample} value="all?offset=100&limit=500">{"/api/all?offset=100&limit=500"}</Link></p>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
          <div className="col-md-4">
            <Card>
              <Card.Body>
                <Card.Title>Try it out</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item className="col align-items-center">
                  <Form>
                    <Form.Group className="d-flex align-items-center">
                      <Form.Label>/api/</Form.Label>
                      <Form.Control type="text" placeholder="Enter your text" className="ml-2" value={inputValue} onChange={handleInputChange} />
                      <Button variant="primary" onClick={() => fetchData()}>Submit</Button>
                    </Form.Group>
                  </Form>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Card>
                    <Card.Body>
                      {/* <p>{'[{"metadata":{"timestamp":"2023-10-10T10:00:00.000Z","bridge_id":"123abc","sensor_id":"abc123","floor":"1","position":{"x":20,"y":24}},"sensor":{"type":"temperature","value":30,"unit":"degrees"},"_id":"654e1a5a9efbcd5c6975067e","__v":0}]'}</p> */}
                      <div>
                        {data ? (
                          <p>{JSON.stringify(data)}</p>
                        ) : (
                          <p>No data available.</p>
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </div>
        </div>
      </body>
    </div>
  );
}

export default App;