import React, { useState, useEffect } from 'react';
import { SwatchModel } from './models/SwatchModel'
import { rowHeight, fontSize, Event } from './constants';
import styled from '@emotion/styled/macro';

export const Swatch: React.FC<SwatchModel> = (model: SwatchModel) => {

    const [isVisible, setIsVisible] = React.useState(true)
    const [color, setColor] = React.useState("000000");
    const [height, setHeight] = React.useState(rowHeight);

    window.addEventListener(Event.DISPLAY_SWATCHES_ID, ((e: CustomEvent) => {
        setIsVisible(e.detail.includes(model.id))
    }) as EventListener);

    useEffect(() => {
        setColor(model.LAB.L > 70 ? '#000000' : '#FFFFFF')
    }, []);

    let label = (model.isUserDefined ? "⭐️ " + model.hex : model.hex)
    let infoLabel = (model.isUserDefined ? "⭐️ " + "L*" + model.LAB.L.toString() + " / " + model.hex : "L*" + model.LAB.L.toString() + " / " + model.hex)
    if (model.isPinned) { label = "📍 " + label}
    if (model.isPinned) { infoLabel = "📍 " + infoLabel}

    localStorage.setItem(model.id, JSON.stringify(model))

    const WrapperInfo = styled.div`
            visibility: hidden;
            display: none;
            opacity:0;

        color: ${props => (model.WCAG2_W_30 || model.WCAG2_W_45 ? '#FFFFFF' : '#000000')};
        font-weight: ${props => (model.WCAG2_W_30 && !model.WCAG2_W_45 ? 700 : 400)};
        font-size: 14pt;
        background: ${props => model.hex};
        transition:visibility 0.3s linear,opacity 0.3s linear;
        text-align: center;
        vertical-align: middle;
        line-height: 80px;
        width:200px;
        height:80px;
        filter: drop-shadow(0px 0px 10px rgba(0,0,0,0.25)); 
    `

    const Wrapper = styled.div`
        display: ${props => (isVisible ? 'flex' : 'none')};
        flex-direction: column;
        justify-content: center;
        align-items: center;
        visibility: visible;
        height: ${props => height};
        color: ${props => (model.WCAG2_W_30 || model.WCAG2_W_45 ? '#FFFFFF' : '#000000')};
        font-weight: ${props => (model.WCAG2_W_30 && !model.WCAG2_W_45 ? 700 : 400)};
        background: ${props => model.hex};
        width: 100%;
        &:hover { 
            ${WrapperInfo} {
                opacity:1;
                visibility: visible;
                display: inline-block;
                position: absolute;
            }
        };
  `;

    const onClick = (event: any) => {
        console.table(model)
    }

    return (

        <Wrapper key={model.name}>
            {label}
            <WrapperInfo onClick={onClick}> {infoLabel} </WrapperInfo>
        </Wrapper>

    )

}

export default Swatch;