import React from 'react';
import { rowHeight, Event } from './../constants'
import { weightedTargets_univers } from '../constants/weightedTargets';

export const SwatchColumnLegend: React.FC<{}> = props => {

    const [model, setModel] = React.useState(weightedTargets_univers.rows.map(item => item.weight).reverse())
    
    window.addEventListener(Event.DISPLAY_LEGEND, ((e: CustomEvent) => {

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
                // @ts-ignore
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
        fontSize: '14pt',
        fontWeight: 700,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'center',
        width: '30px',
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