import React, { useEffect, useState, useRef } from "react";
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import Select from 'react-select';
import Table from 'react-bootstrap/Table';



function App() {
  const [selectedOption, setselectedOption] = useState('');
  const [apiData, setApiData] = useState([]);
  const [options, setoptions] = useState([{}]);

  useEffect(() => {
    fetch(
      `http://localhost:5000/dummy`
    )
      .then(res => res.json())
      .then(data => {
        // let result = data.results.slice(0, 10);
        // setApiData(result)
        data.map(dummy => {
          // console.log(dummy.location)
          setoptions( prevState => [...prevState, {value: dummy.location, label: dummy.location}])
        })
      });
  },[]);


console.log(options)

  useEffect(() => {
    fetch(
      `http://localhost:5000/BattleApi/${selectedOption}`
    )
      .then(res => res.json())
      .then(data => {
        // let result = data.results.slice(0, 10);
        setApiData(data);
        console.log('Mydata =',data);
      });
  },[selectedOption]);

  const handleChange = selectedOption => {
    setselectedOption( selectedOption.value );
    console.log(`Option selected:`, selectedOption);
  };
  
  return (
    <div className="App">
      <Container >
        <Row style={{marginTop:'15px'}}>
          <Col></Col>
          <Col>
            <h2 style={{fontsize:'10vw'}}>Games Of Thrones Battles</h2>
            <hr/>
          </Col>
          <Col></Col>
        </Row>
        <Row style={{marginTop:'40px'}}>
          <Col></Col>
          <Col>
          <Select
              value={selectedOption}
              onChange={handleChange}
              options={options}
              placeholder= 'Search battle location '
            />
          </Col>
          <Col></Col>
        </Row>
        <Row style={{marginTop:'30px'}}>
          <Col></Col>
          <Col xs={10}>
          {
            apiData.map(result => {
            return(
              <Card className="text-center" style={{marginTop:'40px'}}>
              <Card.Header>{result.name}</Card.Header>
                <Card.Body>
                  <Card.Title>{result.attacker_king} -Vs- {result.defender_king}</Card.Title>
                  <hr/>
                  <Card.Text>
                  <Table responsive striped bordered hover variant="dark">
                      <tbody>
                        <tr>
                          <td>Attacker King</td>
                          <td >{result.attacker_king}</td>
                        </tr>
                        <tr>
                          <td>Defender King</td>
                          <td>{result.defender_king}</td>
                        </tr>
                        <tr>
                          <td>Attacker-outcome</td>
                          <td>{result.attacker_outcome}</td>
                        </tr>
                        <tr>
                          <td>Battle Type</td>
                          <td>{result.battle_type}</td>
                        </tr>
                        <tr>
                          <td>Major_Deaths</td>
                          <td>{result.major_death}</td>
                        </tr>
                        <tr>
                          <td>Major_Capture</td>
                          <td>{result.major_capture}</td>
                        </tr>
                        <tr>
                          <td>Attacker-size</td>
                          <td>{result.attacker_size}</td>
                        </tr>
                        <tr>
                          <td>Defender-size</td>
                          <td>{result.defender_size}</td>
                        </tr>
                        <tr>
                          <td>Attacker-Commonder</td>
                          <td>{result.attacker_commander}</td>
                        </tr>
                        <tr>
                          <td>Defender-Commonder</td>
                          <td>{result.defender_commander}</td>
                        </tr>
                        <tr>
                          <td>Region</td>
                          <td>{result.region}</td>
                        </tr>
                       
                      </tbody>
                    </Table>
                  </Card.Text>
                  {/* <Button variant="primary">Go somewhere</Button> */}
                </Card.Body>
              {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
          </Card>    
              )
            })
          }
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
