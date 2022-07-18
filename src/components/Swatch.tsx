import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled/macro';
import { SwatchModel } from './../models/SwatchModel'
import { rowHeight, fontSize, Event } from './../constants';

export const Swatch: React.FC<SwatchModel> = (model: SwatchModel) => {

    const [isVisible, setIsVisible] = React.useState(true)
    const [color, setColor] = React.useState("000000");
    const [height, setHeight] = React.useState(rowHeight);
    const [fillColor, setFillColor] = React.useState(model.hex);
    const [textColor, setTextColor] = React.useState((model.WCAG2_W_30 || model.WCAG2_W_45 ? '#FFFFFF' : '#000000'));
    const [fontWeight, setFontWeight] = React.useState((model.WCAG2_W_30 && !model.WCAG2_W_45 ? 700 : 400));
    // const fontWeight = useState( () => fontWeightConstructor(model) );
    const swatchLabel = useState( () => swatchLabelConstructor(model) );
    const infoLabel = useState( () => infoLabelConstructor(model) );

    function fontWeightConstructor(model: SwatchModel) {
        if (model.WCAG2_W_30 && !model.WCAG2_W_45 ) return 700
        return 400
        // return (model.WCAG2_W_30 && !model.WCAG2_W_45 ? 700 : 400)
    }

    function swatchLabelConstructor(model: SwatchModel) {
        let result = (model.isUserDefined ? "⭐️ " + model.hex : model.hex)
        if (model.isPinned) { result = "📍 " + result}
        return result
    }

    function infoLabelConstructor(model: SwatchModel) {
        let result = (model.isUserDefined ? "⭐️ " + "L*" + model.LAB.L.toString() + " / " + model.hex : "L*" + model.LAB.L.toString() + " / " + model.hex)
        if (model.isPinned) { result = "📍 " + result}
        return result
    }

    //
    // This is a LOT of event listeners. I wonder if we can move logic back to the column
    // and have it re-render on update? Filtering out what should display directly. Should prevent 
    // any race conditions.
    //

    // window.addEventListener("keydown", ((e: CustomEvent) => {
    //     // setIsVisible(e.detail.includes(model.id))
    //     setColor('#000000')
    // }) as EventListener);

    // window.addEventListener("keyup", ((e: CustomEvent) => {
    //     // setIsVisible(e.detail.includes(model.id))
    //     setColor(model.hex)
    // }) as EventListener);

    useEffect(() => {
        setColor(model.LAB.L > 70 ? '#000000' : '#FFFFFF')
    }, []);

    useEffect(() => {
        localStorage.setItem(model.id, JSON.stringify(model))
    }, [color]);

    const WrapperInfo = styled.div`
            visibility: hidden;
            display: none;
            opacity:0;

        color: ${textColor};
        font-weight: ${fontWeight};
        font-size: 14pt;
        background: ${fillColor};
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
        color: ${textColor};
        font-weight: ${fontWeight};
        background: ${fillColor};
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

        <Wrapper key={model.id}>
            {swatchLabel}
            <WrapperInfo onClick={onClick}> {infoLabel} </WrapperInfo>
        </Wrapper>

    )

}

export default Swatch;