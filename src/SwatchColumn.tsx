import React, { useState } from 'react';

import Spectro from "./utilities/palettizer-rfc-2/spectro"
import Palettizer from "./utilities/palettizer-rfc-2"
import { weights } from './constants'
import { SwatchModel, LAB, HSV, LCH } from './SwatchModel'
import { Swatch }  from "./Swatch";


export interface ISwatchBase {
    hex: string;
    semantic: string;
    colorChecker?: ISwatchColorChecker
}

class ISwatchColorChecker {
    name?: String;
    dE?: number;
}

interface ISwatchColumnProps {
    model: ISwatchBase;
}

export const SwatchColumn: React.FC<ISwatchColumnProps> = ({ model }: ISwatchColumnProps) => {

    const [base, setBase] = useState<ISwatchBase>(model);

    const spectro = new Spectro();
    const palettizer = new Palettizer(97, 0.30)

    const wrapper = { display: 'inline-block' };

    function inputHandeler(e: React.FormEvent<HTMLInputElement>) {
        let value = e.currentTarget.value;
        if (value.length === 7) {
            setBase({ hex: value, semantic: base.semantic })
        }
    }

    function swatchContructor(hex: string) {

        let result = []

        let rootColorName = spectro.getClosestColorCheckerName(hex)
        let swatchColumnModel = palettizer.createSwatchRow(hex)

        var hexValues = Object.values(swatchColumnModel);

        for (let i in hexValues) {
            let swatch = new SwatchModel(hexValues[i])
            swatch.key =  base.semantic + "-" + weights[i]
            swatch.LAB = new LAB(spectro.getLabValue(swatch.hex))
            swatch.LCH = new LCH(spectro.getLchValue(swatch.hex))
            swatch.HSV = new HSV(spectro.getHsvValue(swatch.hex))
            swatch.name = base.semantic + "-" + weights[i]
            swatch.weight = weights[i]
            result.push(swatch)
        }

        return result

    }

    var swatches = swatchContructor(base.hex)
    var keyValue = (Math.random() + 1).toString(36).substring(7);

    return (
        <div key={keyValue} style={wrapper}>

            <input
                type="text"
                defaultValue={model.hex}
                placeholder="Enter a message"
                onChange={e => inputHandeler(e)}
            />

            {swatches.map(swatch => (
                <Swatch {...swatch as SwatchModel} />
            ))}

        </div>
    )

}

export default SwatchColumn;