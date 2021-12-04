import React, { useState } from 'react';
import { SwatchModel, ISwatchBase} from './models'
import { Swatch }  from "./Swatch";
import { SwatchesModelFactory } from './factories/SwatchesModelFactory'

interface ISwatchColumn {
    model: ISwatchBase;
}

export const SwatchColumn: React.FC<ISwatchColumn> = ({ model }: ISwatchColumn) => {

    const [base, setBase] = useState<ISwatchBase>(model);

    const wrapper = { display: 'inline-block' };

    function inputHandeler(e: React.FormEvent<HTMLInputElement>) {
        let value = e.currentTarget.value;
        if (value.length === 7) {
            setBase({ hex: value, semantic: base.semantic })
        }
    }

    var swatches = SwatchesModelFactory(base)

    return (
        <div style={wrapper as React.CSSProperties}>

            <input
                type="text"
                defaultValue={model.hex}
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