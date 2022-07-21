import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled/macro';
import { SwatchModel } from './../models/SwatchModel'
import { rowHeight, fontSize, Event } from './../constants';
import chroma from "chroma-js"

        // Event.FOCUSED_SWATCH
        // SETFOCUSEDSQWASKDF

export const Swatch: React.FC<SwatchModel> = (model: SwatchModel) => {

    const [isVisible, setIsVisible] = React.useState(true)
    const [color, setColor] = React.useState("000000");
    const [height, setHeight] = React.useState(rowHeight);
    const [fillColor, setFillColor] = React.useState(model.hex);
    const [textColor, setTextColor] = React.useState((model.WCAG2_W_30 || model.WCAG2_W_45 ? '#FFFFFF' : '#000000'));
    const [infoTextColor, setInfoTextColor] = React.useState((model.WCAG2_W_30 || model.WCAG2_W_45 ? '#FFFFFF' : '#000000'));

    const [fontWeight, setFontWeight] = React.useState((model.WCAG2_W_30 && !model.WCAG2_W_45 ? 700 : 400));
    const swatchLabel = useState( () => swatchLabelConstructor(model) );
    const infoLabel = useState( () => infoLabelConstructor(model));
    const [isFocused, setIsFocused] = React.useState(false)


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

    window.addEventListener(Event.SHOW_CONTRAST, ((e: CustomEvent) => {
        // setVisibleSwatches(e.detail)
        // let result = e.detail as SwatchModel

        e.preventDefault()

        let hex = e.detail.focus;
        let parameter = e.detail.contrast
        let contrast = chroma.contrast(model.hex, hex);

        if (contrast < parameter) {
            setFillColor(fillColor+"40")
            setTextColor(model.WCAG2_W_30 || model.WCAG2_W_45 ? '#FFFFFF' : '#00000033')
        }


    }) as EventListener);

    window.addEventListener(Event.HIDE_CONTRAST, ((e: CustomEvent) => {
        e.preventDefault()
        let result = e.detail as SwatchModel
        setFillColor(model.hex)
        setTextColor(model.WCAG2_W_30 || model.WCAG2_W_45 ? '#FFFFFF' : '#000000')
    }) as EventListener);

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

        color: ${infoTextColor};
        font-weight: ${fontWeight};
        font-size: 14pt;
        background: ${model.hex};
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

    const foo = (event: any) => {
        if (!isFocused) {
            dispatchEvent(new CustomEvent(Event.FOCUSED_SWATCH, { detail: model.hex }));

            // const myEvent = new CustomEvent("myevent", { detail: model.hex, bubbles: true, cancelable: true, composed: false});
            // document.dispatchEvent(myEvent);

            setIsFocused(true)
            // console.log("FOCUSED", model.id)
        }

    }

    const bar = (event: any) => {
        setIsFocused(false)
        // console.log("NOT FOCUSED", model.id)
        // dispatchEvent(new CustomEvent("SETFOCUSEDSQWASKDF", { detail: undefined }));

    }

    return (

        <Wrapper key={model.id} onMouseOut={bar} onMouseEnter={foo}>
            {swatchLabel}
            <WrapperInfo onClick={onClick}> {infoLabel} </WrapperInfo>
        </Wrapper>

    )

}

export default Swatch;