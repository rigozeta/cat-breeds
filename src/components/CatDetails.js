import {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';


import {Container, Row, Col, Card, Button} from 'react-bootstrap';

function CatDetails() {


	const [cat, setCat] = useState([]);
	const location = useParams();
	useEffect(()=>{

		const getCat = () => {
			axios({
				method: 'get',
				url: "https://api.thecatapi.com/v1/images/" + location.breed_id,
				headers: {
					'x-api-key': '5de2bb0e-5138-4371-ad0d-4431aba43c4d'
				},
			}).then((response)=>{
				console.log("get cat", response);
				setCat(response.data);
			},(error)=>{
				console.log("error getting cat", error);
			})
		}

		getCat();

	}, [location.breed_id])



  return (
    <div>
		<Container>
			<Row>
				<Col>
					<Card>
						<Card.Header>
							<Button variant="primary"><Link to='/'>Back</Link></Button>
						</Card.Header>
						<Card.Img src={cat.url} />
						<Card.Body>
							<Card.Title>
								<h2>{cat.breeds && cat.breeds[0].name}</h2>
								<h4>Origin: {cat.breeds && cat.breeds[0].origin}</h4>
								<strong>{cat.breeds && cat.breeds[0].temperament}</strong>
							</Card.Title>
							<Card.Text>

								{cat.breeds && cat.breeds[0].description}
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	</div>
  );
}

export default CatDetails;
