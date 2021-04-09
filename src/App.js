import {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import axios from 'axios';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Container, Row, Col, Card, Button, Form} from 'react-bootstrap';

import CatDetails from './components/CatDetails';

function App() {
	const [breedsLoaded, setBreedsLoaded] = useState(0);
	const [breeds, setBreeds] = useState([]);
	const [selectedBreed, setSelectedBreed] = useState([]);

	const [page, setPage] = useState(1);

	useEffect(()=>{
		const getBreeds = () => {

			axios({
				method: 'get',
				url: "https://api.thecatapi.com/v1/breeds/",
				headers: {
					'x-api-key': '5de2bb0e-5138-4371-ad0d-4431aba43c4d'
				},
			}).then((response)=>{
				console.log("get cat breeds", response);
				setBreeds(response.data);
				setBreedsLoaded(1);
			},(error)=>{
				console.log("error getting cat breeds", error);
			})
		}

		getBreeds();

	}, [])

	const changeSelectedBreed = (newBreed) =>{
		console.log("New selected", newBreed.target.value);
		if(newBreed.target.value !== 0){
			axios({
				method: 'get',
				url: "https://api.thecatapi.com/v1/images/search",
				headers: {
					'x-api-key': '5de2bb0e-5138-4371-ad0d-4431aba43c4d'
				},
				params: {
				    'breed_id': newBreed.target.value,
					'page': page,
					'limit': 10
				}
			}).then((response)=>{
				console.log("get cat breed img", response);
				setSelectedBreed(response.data);
			},(error)=>{
				console.log("error getting cat breed imgs", error);
			})
		}

	}

	const loadMore = () =>{
		setPage(page + 1);
		axios({
			method: 'get',
			url: "https://api.thecatapi.com/v1/images/search",
			headers: {
				'x-api-key': '5de2bb0e-5138-4371-ad0d-4431aba43c4d'
			},
			params: {
			    'breed_id': selectedBreed[0].breeds[0].id,
				'page': page,
				'limit': 10
			}
		}).then((response)=>{
			console.log("loading more cat breed img", response);
			console.log(selectedBreed, response.data)
			setSelectedBreed([...selectedBreed, ...response.data]);
		},(error)=>{
			console.log("error loading more cat breed imgs", error);
		})
	}

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
								<Form.Control as="select" onChange={changeSelectedBreed} disabled={!breedsLoaded}>
								<option value="0">Select Cat Breed</option>
								{breeds.map((breed)=>{
									return <option value={breed.id} key={breed.id}>{breed.name}</option>
								})}
								</Form.Control>
							</Form>
						  </section>
						</Col>
					</Row>

					<div className="cat-list">
						<Row>
								{selectedBreed.map((breed, id)=>{
									return <Col md="3"><Card key={breed.id}>
										<Card.Img variant="top" src={breed.url} />
										<Card.Text>{breed.name}</Card.Text>
										<Button variant="primary" color="white"><Link to={breed.id}>View Details</Link></Button>
										</Card></Col>
								})}
						</Row>
					</div>

					<Row>
			  			<Col>
							<Button variant="success" size="sm" onClick={loadMore} disabled={!breedsLoaded || selectedBreed.length === 0}>Load More</Button>
						</Col>
					</Row>
				</Container>
		    </div>
		)} />

		<Route path='/:breed_id' component={CatDetails} />

	</Router>
  );
}

export default App;
