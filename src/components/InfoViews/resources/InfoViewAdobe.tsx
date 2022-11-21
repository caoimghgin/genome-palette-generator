import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled'

export const InfoViewAdobe: React.FC = () => {

    const handleOnClick = (event: React.MouseEvent<HTMLInputElement>) => {
       let value = event.currentTarget.value
        event.preventDefault();
        window.open(value);
    }

    const ModalContainer = styled.div`
        width: 360px;
        background-color: #ffffff;
        color: #000000;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        border-radius: 8px;
        padding: 4px 24px 24px 24px;
    `

    return (
        <ModalContainer>

            <h3> Adobe Spectrum Color System </h3>
            <hr/>
            <p> 
            A <b><i>Meaningfully Weighted, Definitively Named, </i></b> and <b><i>Packaged</i></b> Color System, 
            Adobe Spectrum is WCAG compliant with a wide variety of colors of tints/shades, 
                but does not offer a Color Tool to create your own.           
             </p>
            <p>
                Base weight is 900.
            </p>            
            <p> 
                
            Learn more about Adobe Spectrum Color at <b><a href="https://spectrum.adobe.com/page/color-palette/" target="_blank"> 
            www.spectrum.adobe.com
                </a></b>

            </p>

        </ModalContainer>
    )
}

export default InfoViewAdobe;
