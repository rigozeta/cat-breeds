import {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Container, Row, Col, Button, Form} from 'react-bootstrap';
import CatList from './components/CatList';
import CatDetails from './components/CatDetails';

function App() {

  return (
	<Router>
		<Route path="/" exact render={()=>(
			<div className="App">
				<Container>
					<Row>
						<Col>
					      <header className="App-header">
					        <h1>Cat Browser</h1>
					      </header>
						</Col>
					</Row>

					<Row>
						<Col md="3">
						  <section>
						  	<Form>
								<Form.Label>Breed</Form.Label>
								<Form.Control as="select">
									<option>1</option>
									<option>2</option>
								</Form.Control>
							</Form>
						  </section>
						</Col>
					</Row>


					<CatList />

					<Row>
			  			<Col>
							<Button variant="success" size="sm">Load More</Button>
						</Col>
					</Row>
				</Container>
		    </div>
		)} />

		<Route path='/details' component={CatDetails} />

	</Router>
  );
}

export default App;
