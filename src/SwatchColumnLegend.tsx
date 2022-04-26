import React from 'react';
import { brotliDecompress } from 'zlib';
import { weights, rowHeight, fontSize, l_targets, Event } from './constants'

export const SwatchColumnLegend: React.FC<{}> = props => {
    const [isVisible, setIsVisible] = React.useState(true)

    window.addEventListener(Event.DISPLAY_SWATCHES, ((e: CustomEvent) => {
        setIsVisible(false)
     }) as EventListener);

  
    const wrapper = { display: (isVisible ? 'inline-block' : 'none') }

    return (
        <div style={wrapper}>

            <input
                type="text"
                placeholder="Enter a message"
            />

            {l_targets.map(row => (
                <Swatch label={row.toString()}/>
            ))} 
{/* 
            {weights.map(row => (
                <Swatch label={row.toString()}/>
            ))} */}

        </div>
    )

}

interface ILabel { label: string }

export const Swatch: React.FC<ILabel> = (model): JSX.Element => {

    const wrapper = {
        fontSize: fontSize,
        fontWeight: 800,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        background: "#FFFFFF",
        height: rowHeight ,
    };

    return (
        <div style={wrapper as React.CSSProperties}>
            {model.label}
        </div>
    )

}

export default SwatchColumnLegend;