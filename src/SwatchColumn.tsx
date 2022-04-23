import React, { useState, useEffect } from 'react';
import { SwatchModel, ISwatchBase} from './models'
import { Swatch }  from "./Swatch";
import { SwatchesModelFactory } from './factories/NewSwatchesModelFactory'

interface ISwatchColumn {
    model: ISwatchBase;
}

export const SwatchColumn: React.FC<ISwatchColumn> = ({ model }: ISwatchColumn) => {

    const [base, setBase] = useState<ISwatchBase>(model);
    const [column, setColumn] = useState<string>('A');

    useEffect(() => {
        let columnName = localStorage.getItem('columnName') 
        if (!columnName) {
            localStorage.setItem('columnName', 'A')
            setColumn('A')
        } else {
            localStorage.setItem('columnName', nextChar(columnName))
            setColumn(columnName)
        }

    }, []);

    const wrapper = { display: 'inline-block' };

    // let columnName = localStorage.getItem('columnName') as string
    // localStorage.setItem('columnName', nextChar(columnName))
    // console.log(columnName)
    model.columnName = column
    // setBase(model)

    console.log(base)
    var swatches = SwatchesModelFactory(base, column)

    function nextChar(c: string) {
        return String.fromCharCode(c.charCodeAt(0) + 1);
    }

    function inputHandeler(e: React.FormEvent<HTMLInputElement>) {

        console.log("My column = " + column)

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