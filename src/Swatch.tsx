import React, { useState } from 'react';
import { SwatchModel } from './models'
import Modal from 'react-modal';
import { rowHeight, fontSize } from './constants';

export const Swatch: React.FC<SwatchModel> = (model: SwatchModel) => {

    const [modalIsOpen, setIsOpen] = React.useState(false);

    let label = "n/a"

    // semantic agnostic column/index of swatch saved to localStorage
    localStorage.setItem(model.id, JSON.stringify(model))
    console.log("I CHANGE ID: ", model.id) // It's nil on update, why???
    console.log("I CHANGE COLUMN: ", model.column) // It's nil on update, why???
    console.log("I CHANGE ROW: ", model.row) // It's nil on update, why???

    // console.log(JSON.stringify(model))


    // let newObject = window.localStorage.getItem("obj-" + model.name);
    // let a = undefined
    // if(newObject) {
    //     try {
    //          a = JSON.parse(newObject);
    //     } catch(e) {
    //         alert(e); // error in the above string (in this case, yes)!
    //     }
    // }
    // console.log(a)




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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        background: model.hex,
        height: rowHeight ,
        color: (model.LAB.L < 51 ? '#FFFFFF' : '#000000'),
        boxShadow: (model.isUserDefined ? 'inset 0px 0px 0px 1px #FFF' : ''),

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