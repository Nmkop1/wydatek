'use client'
import React from 'react'

import styled from "styled-components"
import { theme } from "../public/theme"

const WrappSectionText = styled.section`
width:100%;   
display:flex;

justify-content:center;
align-items:flex-start;
padding:2vh 0;
 @media only screen and ${theme.size.tablet} {
  padding:8vh 0;
    
   

 background :    ${theme.colors.gradientTla} ; 
  
 backdrop-filter: blur( 4px );
-webkit-backdrop-filter: blur( 4px );
}
`
const WrapText = styled.div`
       display:flex;
       max-width:90%;
     padding: 0 1%;
    flex-direction:column;
     h1{
       color: ${theme.colors.zielony};
         font-size:1.6rem;
         padding-top:7vh;
         font-weight:800;
         @media only screen and ${theme.size.tablet} {
          font-size:50px;
  }
     }
     h2{
        font-size:1.4rem;
         padding : 4vh 0 0.8vh 0;
         line-height: 1.4;
         font-weight:600;
         margin: .5rem 0;
         color:  ${theme.colors.fonts} ;
        @media only screen and ${theme.size.tablet} {
          font-size:32px;
  }
     }
     h4,h5{
        font-size: 16px;
    line-height: 1.4;
    padding-bottom:.5rem;
    margin:0;
    text-align:justify;
    @media only screen and ${theme.size.tablet} {
          font-size:21px;
  }
  
     }
     a{
      color:   ${theme.colors.fonts1} ;
     }
     p{
        font-size: 16px;
    line-height: 1.4;
    padding :1% 0 1% 0;
    
    text-align:justify;
    @media only screen and ${theme.size.tablet} {
          font-size:21px;
  }
  
     }
     li{
    font-size: 16px;
    line-height: 1.4;
    padding : 0 0 0 1%;
    text-align:justify;
   @media only screen and ${theme.size.tablet} {
          font-size:21px;
  } 
  }
     span {
  color:   ${theme.colors.czerwony} ;
   
 }
 h3{
  color:   theme.colors.czerwony ;
 }

 @media only screen and ${theme.size.tablet} {
    max-width:78%;
    padding: 0 5%;
  }
`
const SectionText = ({ opis }) => {


  return (
    <WrappSectionText>
      <WrapText>{opis}</WrapText>
    </WrappSectionText>
  )
}
export default SectionText