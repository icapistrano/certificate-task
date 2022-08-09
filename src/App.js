import { useState } from 'react';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CertificateForm } from './components/CertificateForm';
import { StorySection } from './components/StorySection';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
  const STORAGEKEY = "data";

  // hashkey sample
  const genHashKey = (data) => {
    return data.artwork + data.artist + data.year
  }
  
  // local storage get
  const getCertificates = (key) => {
    const data = localStorage.getItem(key);
    if (data === null) {
      localStorage.setItem(STORAGEKEY, JSON.stringify({}));
      return {};
    }
    return JSON.parse(data);
  }

  // local storage post
  const postCertificate = (certificate) => {
    const certificates = JSON.parse(localStorage.getItem(STORAGEKEY));
    const hashKey = genHashKey(certificate);
    certificates[hashKey] = certificate;

    localStorage.setItem(STORAGEKEY, JSON.stringify(certificates));
    setArtworkData(getCertificates(STORAGEKEY));
  }

  // local storage delete
  const deleteCertificate = (certificate) => {
    const certificates = getCertificates(STORAGEKEY);
    const hashKey = genHashKey(certificate);
    delete certificates[hashKey];

    localStorage.setItem(STORAGEKEY, JSON.stringify(certificates));
    setArtworkData(getCertificates(STORAGEKEY));
  }

  const [showFormPopup, setShowFormPopup] = useState(false);
  const [artworkData, setArtworkData] = useState(getCertificates(STORAGEKEY));

  return (
    <div className="App">
      <Header showFormCb={setShowFormPopup}></Header>
      <StorySection 
        certificates={artworkData}
        deleteCertificateCb={deleteCertificate}>
      </StorySection>
      <CertificateForm 
        showFormPopup={showFormPopup}
        setShowFormPopup={setShowFormPopup}
        submitCertificateCb={postCertificate}>
      </CertificateForm>
      <Footer></Footer>
    </div>
  );
}

export default App;
