import React from 'react';
import styled from '@emotion/styled'

export const InfoViewGenome: React.FC = () => {

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

            <p> 
                A <b><i>Meaningfully Weighted, Semantically Named </i></b> Color System 
                designed for white-label and dark-mode support.          
            </p>                

            <p><b>Numeric weights are based on typography,</b> where weight <b>400</b> represents 'normal' (a mid-tone value, approx L*45).
            Higher numbers are darker (bolder) and lower numbers are lighter (thinner). </p>

            <p> Weights below <b>100</b> are <b><i>incidental colors,</i></b>  typically used for backgrounds, borders, lines, and disabled states 
                in light-mode. Unlike hues, Neutral <b>600</b> thru <b>900</b> are darker by <b>L*5</b> to better meet pure black.</p>

            <p>Practically speaking, there is little purpose in hues darker than L*10 (being so close to black), yet black is an important
                 color and deserves special treatment. </p>                                 

        </ModalContainer>
    )
}

export default InfoViewGenome;
