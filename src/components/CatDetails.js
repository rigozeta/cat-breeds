import { Link } from 'react-router-dom';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Container, Row, Col, Card, Button} from 'react-bootstrap';

function CatDetails() {
  return (
    <div>
		<Container>
			<Row>
				<Col>
					<Card>
						<Card.Header>
							<Button variant="default"><Link to='/'>Back</Link></Button>
						</Card.Header>
						<Card.Body>
							<Card.Title>Cat Name</Card.Title>
							<Card.Text>Detail of Cat</Card.Text>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	</div>
  );
}

export default CatDetails;
