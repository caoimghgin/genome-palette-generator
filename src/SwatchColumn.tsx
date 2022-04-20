import React, { useState } from 'react';
import { SwatchModel, ISwatchBase} from './models'
import { Swatch }  from "./Swatch";
import { SwatchesModelFactory } from './factories/NewSwatchesModelFactory'

interface ISwatchColumn {
    model: ISwatchBase;
}

export const SwatchColumn: React.FC<ISwatchColumn> = ({ model }: ISwatchColumn) => {

    let columnName = localStorage.getItem('columnName') as string
    localStorage.setItem('columnName', nextChar(columnName))
    console.log(columnName)

    model.columnName = columnName

    const [base, setBase] = useState<ISwatchBase>(model);
    const wrapper = { display: 'inline-block' };

    console.log(base)
    var swatches = SwatchesModelFactory(base)

    function nextChar(c: string) {
        return String.fromCharCode(c.charCodeAt(0) + 1);
    }

    function inputHandeler(e: React.FormEvent<HTMLInputElement>) {
        let value = e.currentTarget.value;
        if (value.length === 7) {
            console.log(value)
            setBase({ hexString: value, semantic: base.semantic })
        }
    }

    return (
        <div style={wrapper as React.CSSProperties}>

        <form>
        <input
                type="text"
                defaultValue={model.hexString}
                placeholder="Enter a message"
                onChange={(e) => inputHandeler(e)}
            />
            {/* <input
                type="text"
                defaultValue={model.hexString}
                placeholder="Enter a message"
                onChange={(e) => inputHandeler(e)}
            /> */}

            {swatches.map(swatch => (
                <Swatch {...swatch as SwatchModel} />
            ))}
        </form>

        </div>
    )

}

export default SwatchColumn;