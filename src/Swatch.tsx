import React, { useState } from 'react';
import { SwatchModel } from './models'

export const Swatch: React.FC<SwatchModel> = (model: SwatchModel) => {

    let label = "n/a"
    // Do not write 000 or 950 weights if semantic name != 'neutral'
    if (!(model.semantic != 'neutral' && (model.weight == '000' || model.weight == '950'))) {
        localStorage.setItem(model.name, model.hex)
        label = model.hex
    }

    function onClickHandler() {
        console.table(model)
        // let foo = prompt('Type here');
        // let bar = confirm('Confirm or deny');
        // console.log(foo, bar);
    }

    function isOK() {
        if (model.weight === "400" && model.LAB.L > 47) {
            console.log("EHHIHDFHIDHF")
            console.table(model)

        }
    }

    const wrapper = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        background: model.hex,
        height: '48px',
        color: (model.LAB.L < 51 ? '#FFFFFF' : '#000000'),
    };

    isOK()

    return (
        <div key={model.name} style={wrapper as React.CSSProperties}
            onClick={() => onClickHandler()}>
            {label}
        </div>
    )

}

export default Swatch;