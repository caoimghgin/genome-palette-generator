import React from 'react';
import styled from '@emotion/styled'

export const InfoViewLightning: React.FC = () => {

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

            <h3> SalesForce Lightning Color System </h3>
            <hr/>
            <p> 
            A <b><i>Meaningfully Weighted, Definitively Named, </i></b> and <b><i>Packaged</i></b> Color System, 
            SalesForce Lightning is WCAG compliant with a wide variety of colors of tints/shades, 
                but does not offer a Color Tool to create your own.           
             </p>
            <p>
                Numeric weights directly adopt L* values from CIELAB, so
                lighter values have higher numbers and darker values are lower. 
                This can be counter-intuitive to users.
            </p>            
            <p> 
                
            Learn more about SalesForce Lightning Color System at <b><a href="https://www.lightningdesignsystem.com/design-tokens/#category-text-color" target="_blank"> 
            www.lightningdesignsystem.com
                </a></b>

            </p>

        </ModalContainer>
    )
}

export default InfoViewLightning;
