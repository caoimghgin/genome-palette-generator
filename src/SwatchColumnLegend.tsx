import React from 'react';
import { brotliDecompress } from 'zlib';
import { weights, rowHeight, columnWidth, fontSize, l_targets, Event } from './constants'

export const SwatchColumnLegend: React.FC<{}> = props => {

    const [model, setModel] = React.useState(l_targets)

    window.addEventListener(Event.DISPLAY_LEGEND, ((e: CustomEvent) => {

        let data = e.detail

        var filtered = data.filter(function(x:any) {
            return x !== -1;
       });

        console.log(filtered)

       setModel(filtered)

     }) as EventListener);

  
    const wrapper = { 
        display: 'inline-block',
        paddingTop: '44px'
    }

    return (
        <div style={wrapper}>

            {model.map(row => (
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
        alignItems: 'flex-end',
        justifyContent: 'center',
        width: columnWidth,
        background: "#FFFFFF",
        height: rowHeight ,
        textAlign: 'right',
        paddingRight: '20px'
    };

    return (
        <div style={wrapper as React.CSSProperties}>
            {model.label}
        </div>
    )

}

export default SwatchColumnLegend;