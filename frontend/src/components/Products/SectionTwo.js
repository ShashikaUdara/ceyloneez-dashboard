import React from 'react';
import Certificate from '../Images/Certificate.png';
import CloudIcon from '../Images/CloudIcon.png';
import { useState } from 'react';
import DOMPurify from 'dompurify';

function SectionTwo({ payload }) {

  const [req_data, setReqData] = useState([]);

  const requestBody = {
    query: `${payload}`
  };

  fetch(`http://localhost:5000/api/certificate_process`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody) // Include the request body as JSON
    })
      .then(response => response.json())
      .then(data => {
        // Store the API response in state
        setReqData(data);
      })
      .catch(error => {
        // Handle errors here
        console.error('Error:', error);
      });

  

  const sanitizedHTML = DOMPurify.sanitize(req_data);
  const modifiedHTML = sanitizedHTML.replace(/href="/g, 'target="_blank" href="https://stepbysteptrade.lk').replace(/View\n/g, '\n');
  
    return (
      <div style={{ borderRadius: '37px', boxShadow: '0px 0px 32px 0px rgba(0, 0, 0, 0.1)', width: '1000px',marginTop:'50px', marginLeft:'auto', marginRight:'auto', paddingLeft:'40px', paddingRight:'40px'}}>
        <br/>
        <div style={{display:'flex', flexWrap:'wrap', justifyContent:'space-between'}}>

            <div style={{width:'50%'}}>
                <h1 style={{color:'#42C686', fontFamily:'Inter', fontWeight:'700'}}>2. The Stage of Your Certificate process</h1>

                <h3 style={{color:'#000000', fontFamily:'Inter', fontWeight:'700'}}>1. Business Registration</h3>

                <div dangerouslySetInnerHTML={{ __html: modifiedHTML }} />
                <br/>

                <div>
                  <label for="file-input" style={{marginLeft:'35px'}}>
                    <img src={CloudIcon} alt='CloudIcon'/>
                  </label>
                  <input id="file-input" type="file" style={{display:'none'}}/>
                  <br/>
                  <p style={{width:'150px', textAlign:'center', color:'#127B48', fontWeight:'600'}}>Upload Your business registration here</p>
                </div>

                
            </div>
            <div style={{width:'50%'}}>
              <div style={{margin:'auto'}}>
                <img src={Certificate} alt="Certificate"/>
              </div>
            </div>
        </div>

        <div style={{display:'flex', flexWrap:'wrap', justifyContent:'flex-end'}}>
            <a href="/" style={{width:'130px',color:'#33E68F', textAlign:'center', fontWeight:'600', borderRadius:'25px', border:'2px solid #33E68F',paddingLeft:'38px',paddingRight:'38px',paddingTop:'10px',paddingBottom:'10px', marginLeft:'10px', marginRight:'10px' ,background:'transparent', textDecoration:'none'}}>Update</a>
            <a href="/" style={{width:'130px', color:'#FFFFFF', textAlign:'center', fontWeight:'600', borderRadius:'25px', border:'2px solid #33E68F',paddingLeft:'38px',paddingRight:'38px',paddingTop:'10px',paddingBottom:'10px', marginLeft:'10px', marginRight:'10px' ,background:'#33E68F', textDecoration:'none'}}>Next</a>
        </div>

        <br/>
      </div>
    );
  }
  
  export default SectionTwo;
  