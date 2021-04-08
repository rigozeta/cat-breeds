import { Link } from 'react-router-dom';

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Row, Col} from 'react-bootstrap';

function CatList() {
  return (
	<div class="cat-list">
		<Row>
			<Col>
				<Link to="/details">List of cats here.</Link>
			</Col>
		</Row>
	</div>
  );
}

export default CatList;
