import React, { useState, useEffect } from 'react';
import { SwatchModel } from './models'
import Modal from 'react-modal';
import { rowHeight, fontSize, Event } from './constants';

export const Swatch: React.FC<SwatchModel> = (model: SwatchModel) => {

    //
    // User defined swatches may not fit into the L*5 slots of chosen color system.
    // With current alg, they will be chopped off. Need to find a way to communicate
    // to 'replace' isUserDefined=false with isUserDefined=true IF the 'true' swatch
    // is hidden.
    //
    //
    // Am I thinking of this wrong? Perhaps a message to a controller that reads
    // all stored swatches, and re-renders only those that best match, preferring 
    // user defined colors. 

    // The problem here is I'm working on an individual swatch that has no idea about
    // any other swatch on the grid. I'll need to know the entire row contents to make
    // that decision. Then, perhaps I can individually message each swatch by ID to turn
    // on or off as required. For instance, controller tells A0, A1, A2 swatches to be NOT visible
    // Each swatch would have addEventListener(model.id), so everything can listen to directions
    // of the controller.
    //
    // OR...
    // I could broadcast 'A0, A2, A4...B0, B2, B3' array. Use.detail.includes(model.id) is 
    // the trigger for visible. So, the NavBar must sort out the details and send the message.
    // THIS IS MUCH BETTER. 
    //

    const [isVisible, setIsVisible] = React.useState(true)
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [color, setColor] = React.useState("000000");
    const [height, setHeight] = React.useState(rowHeight);

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
    
    const wrapper = {
        fontSize: fontSize,
        display: (isVisible ? 'flex' : 'none'),
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        background: model.hex,
        height: height,
        color: (model.LAB.L < 51 ? '#FFFFFF' : '#000000'),
        boxShadow: (model.isUserDefined ? 'inset 0px 0px 0px 1px ' + color : ''),
        
    };

    const asdf = {
        textTransform: 'uppercase',
    };

    isOK()

    return (
        <div>

            <div key={model.name} style={wrapper as React.CSSProperties}
                onClick={() => onClickHandler()}>
                {label}
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
            >
                <button onClick={closeModal}>close</button>
                <h1 style={asdf as React.CSSProperties}> {model.name} </h1>
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