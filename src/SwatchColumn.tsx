import React, { useState, useEffect, useCallback } from 'react';
import { SwatchModel, ISwatchBase } from './models'
import { Swatch } from "./Swatch";
import { SwatchesModelFactory } from './factories/NewSwatchesModelFactory'
import { columns, columnWidth } from './constants'
import { debounce } from 'lodash';

interface ISwatchColumn {
    model: ISwatchBase;
}

export const SwatchColumn: React.FC<ISwatchColumn> = ({ model }: ISwatchColumn) => {

    const [base, setBase] = useState<ISwatchBase>(model);
    const [column, setColumn] = useState<string>('A');
    const [semantic, setSemantic] = useState<string>(model.semantic);

    useEffect(() => {
        initColumnIndex()
        let columnIndex = localStorage.getItem('columnIndex') as string
        let index = parseInt(columnIndex) + 1
        setColumn(columns[index])

        localStorage.setItem('columnIndex', index.toString())
        localStorage.setItem(columns[index], model.semantic)

    }, []);

    useEffect(() => {
        debounceAndSave(column, semantic)
    }, [semantic]);

    const debounceAndSave = useCallback(debounce((col, sem) => {
        localStorage.setItem(col, sem)
    }, 500), []);

    function semanticInputHandler(e: React.FormEvent<HTMLInputElement>) {
        setSemantic(e.currentTarget.value)
    }

    function initColumnIndex(): void {
        let columnIndex = localStorage.getItem('columnIndex') as string
        if (columnIndex === null) {
            localStorage.setItem('columnIndex', '-1')
        }
    }

    const wrapper = { display: 'inline-block' };

    const inputWrapper = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: columnWidth,

    }

    model.columnName = column

    console.log(base)
    var swatches = SwatchesModelFactory(base, column)

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

            <div style={inputWrapper as React.CSSProperties}>
                <input
                    type="text"
                    defaultValue={model.hexString}
                    placeholder="Enter a message"
                    onChange={(e) => inputHandeler(e)}
                />
                <input
                    type="text"
                    defaultValue={semantic}
                    placeholder="Enter a message"
                    onChange={(e) => semanticInputHandler(e)}
                />
            </div>

            {swatches.map(swatch => (
                <Swatch {...swatch as SwatchModel} />
            ))}

        </div>
    )

}

export default SwatchColumn;