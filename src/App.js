import { useEffect, useState } from 'react';

import Container from 'react-bootstrap/Container';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { StorySection } from './components/StorySection';
import { CertificateForm } from './components/CertificateForm';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
  const URL = "https://okic3abao6.execute-api.eu-west-2.amazonaws.com/certificates";
  const HEADERS = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
  }

  const [artworkData, setArtworkData] = useState([]);
  const [showFormPopup, setShowFormPopup] = useState(false);

  //TODO: add http fallback

  // get all items
  async function getCertificates() {
    let response = await fetch(URL, {
      method: "GET",
      headers: HEADERS
    });

    response = await response.json();
    setArtworkData(response.Items);
  }

  // post item
  async function postCertificate(data) {
    const response = await fetch(URL, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(data)
    });

    setArtworkData([...artworkData, data]);
  }

  // delete item by artwork name
  async function deleteCertificate(id) {
    const response = await fetch(`${URL}/${id}`, {
      method: "DELETE",
      headers: HEADERS
    })

    const newArtworkData = artworkData.filter(certificate => certificate.artwork !== id);
    setArtworkData(newArtworkData);
  }

  useEffect(() => {
    getCertificates();
  }, [])

  return (
    <div className="App">
      <Header showFormCb={setShowFormPopup}></Header>

      <CertificateForm 
        showFormPopup={showFormPopup}
        setShowFormPopup={setShowFormPopup}
        submitCertificateCb={postCertificate}>
      </CertificateForm>

      {
        Object.keys(artworkData).length !== 0 ?
        <>
          <StorySection
            certificates={artworkData}
            deleteCertificateCb={deleteCertificate}>
          </StorySection>
        </>
        :
        <Container className='section'>
          <p className='p'>No images to show, please upload an image</p>
        </Container>
      }
      <Footer></Footer>
    </div>
  );
}

export default App;
