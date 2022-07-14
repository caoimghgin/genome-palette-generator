import React from 'react';
import { rowHeight, columnWidth, l_targets, Event } from './../constants'

export const SwatchColumnWeights: React.FC<{}> = props => {

    const [model, setModel] = React.useState(l_targets)

    window.addEventListener(Event.DISPLAY_TARGETS, ((e: CustomEvent) => {

        let data = e.detail

        var filtered = data.filter(function(x:any) {
            return x !== undefined;
       });

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
        fontSize: '10pt',
        fontWeight: 400,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'left',
        width: '44px',
        background: "#FFFFFF",
        height: rowHeight ,
        textAlign: 'left',
        paddingLeft: '12px'
    };

    return (
        <div style={wrapper as React.CSSProperties}>
            {model.label}
        </div>
    )

}

export default SwatchColumnWeights;