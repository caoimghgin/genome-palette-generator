import React, { useState } from 'react';
import { SwatchModel } from './SwatchModel'

export const Swatch: React.FC<SwatchModel> = (model: SwatchModel) => {

    function onClickHandler() {
        console.table(model)
    }

    const wrapper = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        background: model.hex,
        height: '48px',
        color: (model.LAB.L < 51 ? '#FFFFFF' : '#000000')
    };

    return (
        <div key={model.name} style={wrapper as React.CSSProperties}
            onClick={() => onClickHandler()}>
            {model.hex}
        </div>
    )

}

export default Swatch;