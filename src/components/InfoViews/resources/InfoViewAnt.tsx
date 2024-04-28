import React from 'react';
import styled from '@emotion/styled'

export const InfoViewAnt: React.FC = () => {

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

            <h3> Ant Color System </h3>
            <hr/>
            <p> 
            An <b><i>Unopinionated, Definitively Named, </i></b> and <b><i>Packaged</i></b> Color System, with a 
            <b><i> Limited Color Tool</i></b> to create your own palettes.                    
             </p>

             <p> 
                Because Ant is unopinionated, Genome will not match the same steps Ant generates. 
                The base weight in this system is 6 <b>(L*60)</b>, which is 3:1 on white.
             </p>


            <p> 
                
                Learn more about Ant Color System at <b><a href="https://ant.design/docs/spec/colors" target="_blank"> 
                     ant.design
                    </a></b>
    
                </p>

        </ModalContainer>
    )
}

export default InfoViewAnt;
