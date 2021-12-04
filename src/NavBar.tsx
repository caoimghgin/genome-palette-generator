import React from 'react';
import { swatchExportDictionary, semantics } from "./constants"


const weights = {
    '000': '000',
    '015': '015',
    '025': '025',
    '050': '050',
    '075': '075',
    '100': '100',
    '200': '200',
    '300': '300',
    '400': '400',
    '500': '500',
    '600': '600',
    '700': '700',
    '800': '800',
    '900': '900',
    '950': '950'
}

interface ISemanticWeightValues {
    value: string,
    description: string,
}

interface Props { }

export const NavBar: React.FC<Props> = (props) => {

    const downloadJSON = () => {

        let dict = {} as any

        Object.keys(semantics).forEach(function (semantic) {
            dict[semantic] = {}
            Object.keys(weights).forEach(function (weight) {
                let semantic_weight = semantic + "-" + weight
                let value = localStorage.getItem(semantic_weight), description: "laksdjf"
                if (value) dict[semantic][weight] = { value: value }
            });
        });

        const items = { ...dict };

        let tempLink;
        let res = JSON.stringify({ color: { palette: items } }, null, 4);
        var data = new Blob([res], { type: 'text/csv' });
        var csvURL = window.URL.createObjectURL(data);
        tempLink = document.createElement('a');
        tempLink.href = csvURL;
        tempLink.setAttribute('download', 'palette.json');
        tempLink.click();
    }

    const wrapper = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        background: 'green',
        height: '88px',
        marginBottom: '22pt',
        borderBottom: '1px solid ' + localStorage.getItem('neutral-050'),
    };

    return (
        <div style={wrapper as React.CSSProperties}>
            <button onClick={downloadJSON}> Download </button>
        </div>
    )

}

export default NavBar;