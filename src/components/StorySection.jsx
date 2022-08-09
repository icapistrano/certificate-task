import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Dropdown from 'react-bootstrap/Dropdown';

import { ImageGallery } from './ImageGallery';

import squareIcon from "../assets/square.png";
import gridIcon from "../assets/grid.png";

import "../styles/StorySection.css";

export const StorySection = ({certificates, deleteCertificateCb}) => {

  // max columns for xs, sm, md, lg
  const minSize = [1,2,3,4];
  const maxSize = [2,3,4,6];

  const filters = {
    0: "date",
    1: "first name"
  }

  const [imageFilter, setImageFilter] = useState(0);
  const [maxGallery, setMaxGallery] = useState(minSize);

  return (
    <Container className="story-page section">
      <Row className="mb-3">
        <h1 className='h1'>Certificates</h1>
      </Row>
      
      <Row className="mb-2">
        <div className="d-flex justify-content-end align-items-center">
          <Dropdown className='me-auto'>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              Sort by {filters[imageFilter]}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setImageFilter(0)}>{filters[0]}</Dropdown.Item>
              <Dropdown.Item onClick={() => setImageFilter(1)}>{filters[1]}</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Button variant="light" className="mx-2" onClick={() => setMaxGallery(minSize)}>
            <img src={squareIcon} alt="" id="square-icon"/>
          </Button>

          <Button variant="light" onClick={() => setMaxGallery(maxSize)}>
            <img src={gridIcon} alt="" />
          </Button>
        </div>
      </Row>

      <ImageGallery 
        data={certificates}
        maxContent={maxGallery}
        sortFilter={imageFilter}
        deleteCertificateCb={deleteCertificateCb}>
      </ImageGallery>
    </Container>
  )
}
