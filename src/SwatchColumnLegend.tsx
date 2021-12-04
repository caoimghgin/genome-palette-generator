import React from 'react';
import { weights } from './constants'

export const SwatchColumnLegend: React.FC<{}> = props => {

    const wrapper = { display: 'inline-block' };

    return (
        <div style={wrapper}>

            <input
                type="text"
                placeholder="Enter a message"
            />

            {weights.map(row => (
                <Swatch label={row}/>
            ))}
        </div>
    )

}

interface ILabel { label: string }

export const Swatch: React.FC<ILabel> = (model): JSX.Element => {

    const wrapper = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        background: "#FFFFFF",
        height: '48px',
    };

    return (
        <div style={wrapper as React.CSSProperties}>
            {model.label}
        </div>
    )

}

export default SwatchColumnLegend;