import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled'

export const InfoViewMaterial: React.FC = () => {

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

            <h3> Material Design Color System </h3>
            <hr/>
            <p> 
            An <b><i>Unopinionated, Definitively Named, </i></b> and <b><i>Packaged</i></b> Color System, with a 
            <b><i> Limited Color Tool</i></b> to create your own palettes.                    
             </p>

             <p> 
                Because Material Design is unopinionated, Genome is not able match the same steps Google generates. 
                The base weight in this system is 400 <b>(L*50)</b>, which is 4.5:1 on white.
             </p>


            <p> 
                
                Learn more about Material Color System at <b><a href="https://material.io/design/color/the-color-system.html#tools-for-picking-colors" target="_blank"> 
                     Material Design
                    </a></b>
    
                </p>

        </ModalContainer>
    )
}

export default InfoViewMaterial;
