import React from 'react';
import styled from '@emotion/styled'

export const InfoViewNewsKit: React.FC = () => {

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

            <h3> NewsKit Color System </h3>
            <hr/>
            <p> Here I can explain things about NewsKit and even provide a few hyperlinks!</p>
            <p> Some interesing details you'd love to know!</p>

        </ModalContainer>
    )
}

export default InfoViewNewsKit;
