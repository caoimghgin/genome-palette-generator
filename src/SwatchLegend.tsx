import React, { useState } from 'react';

export const SwatchLegend = () => {

    const wrapper = {
        display: 'inline-block',
        backgroundColor: "#FFFFFF"
    };

    var data = [
        { label: '000', bg_color: "FFFFFF"},
        { label: '015', bg_color: "FFFFFF"},
        { label: '025', bg_color: "FFFFFF"},
        { label: '050', bg_color: "FFFFFF"},
        { label: '075', bg_color: "FFFFFF"},
        { label: '100', bg_color: "FFFFFF"},
        { label: '200', bg_color: "FFFFFF"},
        { label: '300', bg_color: "FFFFFF"},
        { label: '400', bg_color: "FFFFFF"},
        { label: '500', bg_color: "FFFFFF"},
        { label: '600', bg_color: "FFFFFF"},
        { label: '700', bg_color: "FFFFFF"},
        { label: '800', bg_color: "FFFFFF"},
        { label: '900', bg_color: "FFFFFF"},
        { label: '950', bg_color: "FFFFFF"},

    ];

    return (
        <div style={wrapper}>

            <input
                type="text"
                placeholder="Enter a message"
            /> 


            {data.map(row => (
                <div>{row.label}</div>
            ))}
        </div>
    )
}

export default SwatchLegend;