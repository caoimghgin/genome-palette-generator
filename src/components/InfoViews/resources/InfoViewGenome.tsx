import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled'

export const InfoViewGenome: React.FC = () => {

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

            <h3> Genome Color System </h3>
            <hr/>

            <p>Genome Color Tool offers an optimization called the <b>Genome Color System </b> which I find  
                more intuitive and better for dark-mode.</p>

            <p><b>Numeric weights are based on typography,</b> where weight <b>400</b> represents 'normal' (a mid-tone value, approx L*45).
            Higher numbers are darker (bolder) and lower numbers are lighter (thinner). </p>

            <p> Weights below <b>100</b> are <b><i>incidental</i></b> and typically used for backgrounds, borders, lines, and disabled controls 
                in light-mode. Unlike hues, Neutral <b>600</b> thru <b>900</b> are darker by <b>L*5</b> to better meet pure black.</p>                

        </ModalContainer>
    )
}

export default InfoViewGenome;
