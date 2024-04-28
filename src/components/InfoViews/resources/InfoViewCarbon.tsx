import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled'

export const InfoViewCarbon: React.FC = () => {

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
{/* https://carbondesignsystem.com/data-visualization/color-palettes/ */}
            <h3> IBM Carbon Color System </h3>
            <hr/>
            <p> 
            A <b><i>Meaningfully Weighted, Definitively Named, </i></b> and <b><i>Packaged</i></b> Color System, 
            IBM Carbon is WCAG compliant with a wide variety of colors of tints/shades, 
                but does not offer a Color Tool to create your own.           
             </p>
            <p> 
                Base weight is <b>60 (L*45)</b> which passes for 4.5:1 ratio on white and weight <b>10</b>. Weight <b>50</b> passes for 3:1 on white.
            </p>            
            <p> 
                
            Learn more about IBM Carbon Color System at <b><a href="https://carbondesignsystem.com/data-visualization/color-palettes/" target="_blank"> 
                 carbondesignsystem.com
                </a></b>

            </p>

        </ModalContainer>
    )
}

export default InfoViewCarbon;
