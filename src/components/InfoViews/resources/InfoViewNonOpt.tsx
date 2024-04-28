import React from 'react';
import styled from '@emotion/styled'

export const InfoViewNonOpt: React.FC = () => {

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

            <h3> Non-Optimized Color System </h3>
            <hr/>
            <p><b>The Genome Color Tool</b> is based on a non-optimized color scale, linerized on the 
            
            <b><a href="https://en.wikipedia.org/wiki/CIELAB_color_space" target="_blank"> L* value of CIELAB </a></b>

            to provide easy and understandable 

            <b><a href="https://www.w3.org/TR/WCAG21/#contrast-minimum" target="_blank"> WCAG 2.1 Color Contrast </a></b>

            compliance.</p>
            
            <p>Each step is approximately <b>L*5 distance</b> away from the next, with an additional <b>L*97.5</b> inserted 
            between <b>L*95</b> and <b>white </b>
                (because it is a commonly used density in many designs.)</p>

            <p>The scale represents 22 tints/shades (including black and white), which is <b><i> too many choices 
            to be practically useful</i></b> for design  (i.e., Hicks Law).</p>

            <p>Therefore, <b><i> users should choose an 'optimization' </i></b> which 
            provides a more reasonable amount of color choices - closer to 10 steps. </p>

            <p>Genome offers several common optimizations to choose from, but <b><i> Genome IS NOT affiliated with any Design System, 
                Color System or larger organization</i></b>. Therefore, all results are soley the research and opinions of myself.
            </p>

        </ModalContainer>
    )
}

export default InfoViewNonOpt;
