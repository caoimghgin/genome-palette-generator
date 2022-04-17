import React, { useState } from 'react';
import { SwatchModel, ISwatchBase} from './models'
import { Swatch }  from "./Swatch";
// import { SwatchesModelFactory } from './factories/SwatchesModelFactory'
import { SwatchesModelFactory } from './factories/NewSwatchesModelFactory'

interface ISwatchColumn {
    model: ISwatchBase;
}

export const SwatchColumn: React.FC<ISwatchColumn> = ({ model }: ISwatchColumn) => {

    // window.postMessage(JSON.stringify({
    //     message: "HI",
    //     time: new Date()
    // }), 'http://receiver.com');

    const [base, setBase] = useState<ISwatchBase>(model);
    // const [swatches, setSwatches] = useState<SwatchModel[]>(model);

    const wrapper = { display: 'inline-block' };

    function inputHandeler(e: React.FormEvent<HTMLInputElement>) {
        let value = e.currentTarget.value;
        if (value.length === 7) {
            console.log(value)
            setBase({ hexString: value, semantic: base.semantic })
        }
    }

    var swatches = SwatchesModelFactory(base)

    return (
        <div style={wrapper as React.CSSProperties}>

            <input
                type="text"
                defaultValue={model.hexString}
                placeholder="Enter a message"
                onChange={(e) => inputHandeler(e)}
            />

            {swatches.map(swatch => (
                <Swatch {...swatch as SwatchModel} />
            ))}

        </div>
    )

}

export default SwatchColumn;