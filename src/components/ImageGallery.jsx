import { useEffect, useState } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import { Popup } from './Popup';

import "../styles/ImageGallery.css";

export const ImageGallery = ({data, maxContent=[1,2,3,4], sortFilter, deleteCertificateCb}) => {
  const BOOTSTRAPDEFAULTCOLS = 12;
  const [xs, sm, md, lg] = maxContent.map(size => BOOTSTRAPDEFAULTCOLS/size);
  
  const [sortedData, setSortedData] = useState(sortDataWrapper(sortFilter));
  
  const [popupImgData, setPopupData] = useState(null);
  const [showImagePopup, setShowImagePopup] = useState(false);

  function sortDataWrapper(filter) {
    if (filter === 0) return sortByDate();
    if (filter === 1) return sortByName();
  }

  function sortByDate() {
    return data.sort((a, b) => {
      return parseInt(a.year) - parseInt(b.year);
    });
  }

  function sortByName() {
    return data.sort((a, b) => {
      if (a.artist.toUpperCase() < b.artist.toUpperCase()) return -1; 
      if (a.artist.toUpperCase() > b.artist.toUpperCase()) return 1; 
      return 0;
    });
  }

  const setPopupDataWrapper = (imgData) => {
    setPopupData(imgData);
    setShowImagePopup(true);
  } 

  const deleteCertificateWrapper = (certificate) => {
    deleteCertificateCb(certificate.artwork);
    setShowImagePopup(false);
  }

  useEffect(() => {
    setSortedData(sortDataWrapper(sortFilter));
  }, [data, sortFilter]);

  return (
    <Container className="px-2">
      <Row className='justify-content-start' >
        {
          sortedData.map(certificate => 
            <Col key={certificate.artwork} xs={xs} sm={sm} md={md} lg={lg} className="p-1">
              <Image
                imgSrc={certificate.image} 
                showPopupCb={setShowImagePopup} 
                styling="ratio ratio-1x1"
                clickedCb={() => setPopupDataWrapper(certificate)}>
              </Image>
            </Col>
        )}
      </Row>

      <Popup
        showPopup={showImagePopup}
        setShowPopup={setShowImagePopup}
        title="Image Viewer"
        content={
          popupImgData !== null &&
            <div>
              <Image imgSrc={popupImgData.image} styling="mb-2"></Image>
              <ul className='img-text-container px-2'>
                <li className="mb-1">{popupImgData.artwork}</li>
                <li className="mb-1">{popupImgData.artist}</li>
                <li className="mb-1">{popupImgData.year}</li>
              </ul>
            </div>
        }
        footer={
          <Button variant="danger" onClick={() => {deleteCertificateWrapper(popupImgData)}}>Delete</Button>
        }>
      </Popup>
    </Container>
  )
}

const Image = ({imgSrc, styling="", clickedCb}) => {
  return (
    <div className={"img-container hover-pointer " + styling}>
      <img src={imgSrc} onClick={clickedCb} className="fit-img" alt="artwork"/>
    </div>
  )
}