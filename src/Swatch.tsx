import React, { useState, useEffect } from 'react';
import { SwatchModel } from './models/SwatchModel'
import Modal from 'react-modal';
import { rowHeight, fontSize, Event } from './constants';
import styled from '@emotion/styled';

export const Swatch: React.FC<SwatchModel> = (model: SwatchModel) => {

    const [isVisible, setIsVisible] = React.useState(true)
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [color, setColor] = React.useState("000000");
    const [height, setHeight] = React.useState(rowHeight);


        isOK()


    window.addEventListener(Event.DISPLAY_SWATCHES_ID, ((e: CustomEvent) => {
        setIsVisible(e.detail.includes(model.id))
        // setHeight('72px')
    }) as EventListener);

    useEffect(() => {
        setColor(model.LAB.L > 70 ? '#000000' : '#FFFFFF')
    }, []);

    let label = "n/a"

    // semantic agnostic column/index of swatch saved to localStorage
    localStorage.setItem(model.id, JSON.stringify(model))

    label = model.LCH.L.toString() + " / " + model.LCH.C.toString()
    label = model.LCH.L.toString()
    label = model.LCH.L.toString() + " / " + model.hex

    function onClickHandler() {
        console.table(model)
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function isOK() {
        if (model.weight === "400" && model.LAB.L > 47) {
            console.table(model)
        }
    }

    const LayoutWrapper = styled.div`
        visibility: visible;

        font-size:  ${props => fontSize};
        height: ${props => height};
        color: ${props => (model.LAB.L < 51 ? '#FFFFFF' : '#000000')};
        background: ${props => model.hex};
        display: ${props => (isVisible ? 'flex' : 'none')};
        justify-content: center;
        align-items: center;
        flex-direction: column;
        box-shadow: ${props => (model.isUserDefined ? 'inset 0px 0px 0px 1px ' + color : '')};
        width: 100%;
        &:hover { 
            transform: scale(1.2);
            transition: 0.2s;
            transition-timing-function: ease-in;
            filter: drop-shadow(0px 0px 10px rgba(0,0,0,0.25));
        };
  `;

    const Uppercase = {
        textTransform: 'uppercase',
    };


    return (
        <div>

            <LayoutWrapper key={model.name}
                onClick={() => onClickHandler()}>
               {label}
            </LayoutWrapper>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
            >
                <button onClick={closeModal}>close</button>
                <h1 style={Uppercase as React.CSSProperties}> {model.name} </h1>
                <h3> Base: {model.semantic} +400, '{model.colorChecker.name}', dE {model.colorChecker.dE} </h3>
                <p> hex: {model.hex}</p>
                <p> L*: {model.LAB.L}</p>
                <p> WCAG2: {model.WCAG2} : 1</p>
                <p> WCAG3: {model.WCAG3}</p>

            </Modal>

        </div>
    )

}

export default Swatch;