import React, { useState, useEffect, useCallback } from 'react';
import { SwatchModel } from './models/SwatchModel'
import { ISwatchBase } from './models/SwatchBase'
import { Swatch } from "./Swatch";
import { SwatchesModelFactory } from './factories/NewSwatchesModelFactory'
import { columns, columnWidth } from './constants'
import { debounce } from 'lodash';
import styled from '@emotion/styled';

interface ISwatchColumn {
    model: ISwatchBase;
}

export const SwatchColumn: React.FC<ISwatchColumn> = ({ model }: ISwatchColumn) => {

    const [base, setBase] = useState<ISwatchBase>(model);
    const [column, setColumn] = useState<string>('A');
    const [semantic, setSemantic] = useState<string>(model.semantic);

    model.columnName = column
    var swatches = SwatchesModelFactory(base, model.columnName)

    useEffect(() => {

        initColumnIndex()
        let columnIndex = localStorage.getItem('columnIndex') as string
        let index = parseInt(columnIndex) + 1
        setColumn(columns[index])

        console.log(columns[index], model.semantic, index)

        localStorage.setItem('columnIndex', index.toString())
        localStorage.setItem(columns[index], model.semantic)

    }, []);

    const debounceAndSave = useCallback(debounce((col, sem) => {
        localStorage.setItem(col, sem)
    }, 500), []);

    function semanticInputHandler(e: React.FormEvent<HTMLInputElement>) {
        let value = e.currentTarget.value
        setSemantic(value)
        debounceAndSave(column, value)
    }

    function initColumnIndex(): void {
        let columnIndex = localStorage.getItem('columnIndex') as string
        if (columnIndex === null) {
            localStorage.setItem('columnIndex', '-1')
        }
    }

    function inputHandeler(e: React.FormEvent<HTMLInputElement>) {
        console.log("My column = " + column)
        let value = e.currentTarget.value;
        if (value.length === 7) {
            console.log(value)
            setBase({ hexString: value, semantic: base.semantic })
        }
    }

    const Wrapper = styled.div`
        visibility: visible;
        display: inline-block;
        margin-bottom: 88px;
  `;

    // const InputWrapper = styled.div`
    // display: flex;
    // flex-direction: column
    // align-items: center;
    // justify-content: center;
    // width: ${props => columnWidth};
    // `;    

    const inputWrapper = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: columnWidth,
    }

    return (
        <Wrapper>

            <div style={inputWrapper as React.CSSProperties}>

                <input
                    type="text"
                    defaultValue={semantic}
                    placeholder="Enter a message"
                    onChange={(e) => semanticInputHandler(e)}
                />

                <input
                    type="text"
                    defaultValue={model.hexString}
                    placeholder="Enter a message"
                    onChange={(e) => inputHandeler(e)}
                />
            </div>

            {swatches.map(swatch => (
                <Swatch {...swatch as SwatchModel} />
            ))}

        </Wrapper>
    )

}

export default SwatchColumn;