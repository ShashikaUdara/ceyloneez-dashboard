import React, { useState } from 'react';
import PopularChoices from './PopularChoices';
import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import SectionThree from './SectionThree';
import LoadingData from './LoadingData';

const Show = () => {
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [apiResponseExport, setApiResponseExport] = useState(null);
  const [apiResponsePack, setApiResponsePack] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChoiceSelect = (choice) => {
    setSelectedChoice(choice);
    setLoading(true);

    // Request body for the API call
    const requestBodyExport = {
      query: `${choice} exporters in sri lanka`
    };

    const requestBodyPackage = {
      query: `${choice} export packaging sri lanka`
    };

    // Make the POST API call with selectedChoice as a query parameter and request body
    fetch(`http://127.0.0.1:5000/api/info_handlar?choice=${choice}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBodyExport)
    })
      .then(response => response.json())
      .then(data => {
        // Store the API response in state
        setApiResponseExport(data);
      })
      .catch(error => {
        // Handle errors here
        console.error('Error:', error);
      });

    fetch(`http://127.0.0.1:5000/api/info_handlar?choice=${choice}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add additional headers if needed
      },
      body: JSON.stringify(requestBodyPackage) // Include the request body as JSON
    })
      .then(response => response.json())
      .then(data => {
        // Store the API response in state
        setApiResponsePack(data);
        setLoading(false);
      })
      .catch(error => {
        // Handle errors here
        console.error('Error:', error);
        setLoading(false);
      });
  };

  return (
    <div className="show-container packaging-container">
      <PopularChoices onChoiceSelect={handleChoiceSelect} />
      {loading && <LoadingData />} {/* Show loading spinner while waiting for API response */}
      {apiResponseExport && <SectionOne apiResponse={apiResponseExport} choice={selectedChoice}/>}
      {apiResponseExport &&<SectionTwo payload={selectedChoice}/>}
      {apiResponsePack && <SectionThree apiResponse={apiResponsePack} choice={selectedChoice}/>}
    </div>
  );
};

export default Show;
