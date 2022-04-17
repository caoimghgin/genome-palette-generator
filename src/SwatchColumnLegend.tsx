import React from 'react';
import { weights, l_targets } from './constants'

export const SwatchColumnLegend: React.FC<{}> = props => {

    const wrapper = { display: 'inline-block' };

    return (
        <div style={wrapper}>

            <input
                type="text"
                placeholder="Enter a message"
            />

            {/* {l_targets.map(row => (
                <Swatch label={row.toString()}/>
            ))} */}

            {weights.map(row => (
                <Swatch label={row.toString()}/>
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
        height: '40px',
    };

    return (
        <div style={wrapper as React.CSSProperties}>
            {model.label}
        </div>
    )

}

export default SwatchColumnLegend;