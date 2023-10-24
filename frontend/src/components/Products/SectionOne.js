import React from "react";

import CloudIcon from '../Images/CloudIcon.png';
import Tic from '../Images/Tic.png';
// import InquiryImage from '../Images/InquiryImage.png';
// import { useState, useEffect } from 'react';
import ImageList from './ImageList';

function SectionOne({ apiResponse }) {

    return (
      <div style={{ borderRadius: '37px', boxShadow: '0px 0px 32px 0px rgba(0, 0, 0, 0.1)', width: '1000px',marginTop:'50px', marginLeft:'auto', marginRight:'auto', paddingLeft:'40px', paddingRight:'40px'}}>
        <br/>
        <div className="section-one" style={{color: '#000'}}>
          <h3>{apiResponse.data.major_topic}</h3>
          <p>{apiResponse.data.paragraphs[0]}</p>
          <p>{apiResponse.data.paragraphs[1]}</p>
          <p>{apiResponse.data.paragraphs[2]}</p>
        </div>

        <div style={{display:'flex', flexWrap:'wrap', justifyContent:'space-between'}}>

            <div style={{width:'50%'}}>
                <h1 style={{color:'#42C686', fontFamily:'Inter', fontWeight:'700'}}>1. The Stages of Your Product Selection</h1>

                <p style={{width:'300px', marginLeft:'30px'}}>These are the stages you should follow to ensure an effective exporting process based on the product you chose</p>

                <div style={{display:'flex', flexWrap:'wrap', justifyContent:'flex-start'}}>
                    <img src={CloudIcon} alt="Cloud"/>
                    <p style={{width:'150px', textAlign:'center', marginLeft:'15px', marginRight:'15px'}}>Find The Trending product you want to Export</p>
                    <img src={Tic} alt="Tic Icon" style={{height:'46px', marginTop:'15px'}}/>
                </div>
                <div style={{display:'flex', flexWrap:'wrap', justifyContent:'flex-start'}}>
                    <img src={CloudIcon} alt="Cloud"/>
                    <p style={{width:'150px', textAlign:'center', marginLeft:'15px', marginRight:'15px'}}>Find The Trending product you want to Export</p>
                    <img src={Tic} alt="Tic Icon" style={{height:'46px', marginTop:'15px'}}/>
                </div>
                <div style={{display:'flex', flexWrap:'wrap', justifyContent:'flex-start'}}>
                    <img src={CloudIcon} alt="Cloud"/>
                    <p style={{width:'150px', textAlign:'center', marginLeft:'15px', marginRight:'15px'}}>Find The Trending product you want to Export</p>
                    <img src={Tic} alt="Tic Icon" style={{height:'46px', marginTop:'15px'}}/>
                </div>
                
            </div>

            <div style={{width:'50%', margin:'auto'}}>

                {/* api code goes to here */}
                <div style={{display:'flex', flexWrap:'wrap', justifyContent:'center', marginBottom:'10px'}}>
                    <ImageList imageUrls={apiResponse.data.image_urls} limit={5}/>
                </div>
                <div style={{display:'flex', flexWrap:'wrap', justifyContent:'center', marginBottom:'10px'}}>
                  <h3 style={{color:'#42C686', fontFamily:'Inter', fontWeight:'300', textAlign:'center'}}>{apiResponse.data.major_topic} Exporters In Sri Lanka</h3>
                </div>
                

            </div>

        </div>

        <div style={{display:'flex', flexWrap:'wrap', justifyContent:'flex-end'}}>
            <a href="/" style={{width:'130px',color:'#33E68F', textAlign:'center', fontWeight:'600', borderRadius:'25px', border:'2px solid #33E68F',paddingLeft:'38px',paddingRight:'38px',paddingTop:'10px',paddingBottom:'10px', marginLeft:'10px', marginRight:'10px' ,background:'transparent', textDecoration:'none'}}>Update</a>
            <a href="/" style={{width:'130px', color:'#FFFFFF', textAlign:'center', fontWeight:'600', borderRadius:'25px', border:'2px solid #33E68F',paddingLeft:'38px',paddingRight:'38px',paddingTop:'10px',paddingBottom:'10px', marginLeft:'10px', marginRight:'10px' ,background:'#33E68F', textDecoration:'none'}}>Next</a>
        </div>

          <br/><br/>
      </div>
    );
  }
  
  export default SectionOne;
  