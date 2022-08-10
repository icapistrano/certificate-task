import { useState } from "react";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { Popup } from "./Popup";
import { FormCanvas } from "./FormCanvas";

import "../styles/Form.css";

export const CertificateForm = ({showFormPopup, setShowFormPopup, submitCertificateCb}) => {
  const [validated, setValidated] = useState(false);

  const [imageUrl, setImageUrl] = useState('');
  const [resizedImgUrl, setResizedImgUrl] = useState('');

  const [artworkName, setArtworkName] = useState('');
  const [artistName, setArtistName] = useState('');
  const [productionYear, setProductionYear] = useState('');
  
  const validImgTypes = ["image/png", "image/jpg", "image/jpeg"];

  // check for valid img type
  const setImageUrlWrapper = (e) => {
    const target = e.target.files[0];

    let matchFound = false;
    const regexFileType = new RegExp(target.type, 'g');
    for (let type of validImgTypes) {
      if (type.match(regexFileType) !== null) {
        matchFound = true;
      }
    }

    if (!matchFound) return;

    const reader = new FileReader();
    reader.readAsDataURL(target);
    reader.onload = () => setImageUrl(reader.result);
  }

  // check max 4 chars, input number takes only numeric chars
  const setProductionYearWrapper = (e) => {
    if (e.target.value.length > 4) {
      e.target.value = productionYear;
      return;
    }

    setProductionYear(e.target.value);
  }

  // check valid text for artwork and artist's name
  const setTextInputWrapper = (e, state, stateCb) => {
    const input = e.target.value;

    // no space at start
    if (input === " " && state.length === 0) {
      e.target.value = "";
      return;
    }

    // no more than single space at once
    if (input.length >= 2) {
      if (input[input.length-1] === " " && input[input.length-2] === " ") {
        e.target.value = state;
        return;
      }
    }

    // no numbers
    const validInput = new RegExp(/^[a-zA-Z ]+$/)
    if (!validInput.test(input) && input !== "") {
      e.target.value = state;
      return;
    }

    stateCb(input);
  }

  // for form validation
  const validTextInput = (input) => { return input.length > 0 };
  const validDateYearInput = (input) => { return input.length === 4 };

  const resetForm = () => {
    setValidated(false);
    for (let cb of [setImageUrl, setArtworkName, setArtistName, setProductionYear]) {
      cb("");
    }
  }

  const handleSubmit = () => {
    setValidated(true);

    for (let state of [resizedImgUrl, artworkName, artistName]) {
      if (!validTextInput(state)) return;
    }

    if (!validDateYearInput(productionYear)) return;

    submitCertificateCb({
      "image":resizedImgUrl,
      "artwork":artworkName,
      "artist":artistName,
      "year":productionYear
    });
    
    resetForm();
    setShowFormPopup(false);
  }

  const closeForm = () => {
    setShowFormPopup(false);
    resetForm();
  }

  return (
    <Popup
      showPopup={showFormPopup}
      setShowPopup={closeForm}
      title={"File Upload"}
      content={
        <Form>
          <FormCanvas imageSrc={imageUrl} setResizeImgCb={setResizedImgUrl}></FormCanvas>

          <FormInput
            type="file"
            label={"Select Image"}
            formValidated={validated}
            setState={setImageUrlWrapper}
            validInputCheckCb={() => validTextInput(resizedImgUrl)}>
          </FormInput>

          <FormInput
            label={"Enter name of artwork"}
            placeholder={"e.g. Mona Lisa"}
            formValidated={validated}
            setState={(e) => setTextInputWrapper(e, artworkName, setArtworkName)}
            validInputCheckCb={() => validTextInput(artworkName)}>
          </FormInput>

          <FormInput
            label={"Enter name of artist"}
            placeholder={"e.g. Leonardo di Vinci"}
            formValidated={validated}
            setState={(e) => setTextInputWrapper(e, artistName, setArtistName)}
            validInputCheckCb={() => validTextInput(artistName)}>
          </FormInput>

          <FormInput
            label={"Enter production year"}
            type="number"
            placeholder={"e.g. 1503"}
            formValidated={validated}
            setState={setProductionYearWrapper}
            validInputCheckCb={() => validDateYearInput(productionYear)}>
          </FormInput>
        </Form>
      }

      footer={<Button typeforvariant="success" onClick={handleSubmit}>Submit</Button>}>
    </Popup>
  )
}

function FormInput({label, type="text", maxLength="20", placeholder="", formValidated, validInputCheckCb, setState}) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control 
        required 
        type={type} 
        maxLength={maxLength} 
        placeholder={placeholder} 
        isValid={formValidated && validInputCheckCb()} 
        isInvalid={(formValidated && !validInputCheckCb())}
        onChange={setState}/>
    </Form.Group>
  )
}