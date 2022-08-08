import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled/macro'
import { SwatchModel } from './../models/SwatchModel'

interface IPinnedColors {
    semantic: string
    userDefined: SwatchModel;
    pinnedColors: string[]
    updatePinnedColors: (arg: string[]) => void
}

export const SelectPinnedColorsView: React.FC<IPinnedColors> = ({pinnedColors, userDefined, semantic, updatePinnedColors} : IPinnedColors) => {

    const [pin1, setPin1] = useState('');
    const [pin2, setPin2] = useState('');
    const [pin3, setPin3] = useState('');
    const [pin4, setPin4] = useState('');
    const [pin5, setPin5] = useState('');

    const ModalContainer = styled.div(props => ({
        width: '600px',
        height: '100%',   
      }))

    const SwatchContainer = styled.div(props => ({
        width: '100%',
        height: '120px',
        backgroundColor: userDefined.hex,
        color: (userDefined.WCAG2_W_30 || userDefined.WCAG2_W_45 ? '#FFFFFF' : '#000000'),
        padding: '24px',

      }))

      const FormContainer = styled.div(props => ({
        paddingLeft: "44px",
        paddingRight: "44px",
        paddingBottom: "44px"

      }))

    useEffect(() => {
        if (pinnedColors[0] !== undefined) { setPin1(pinnedColors[0]) }
        if (pinnedColors[1] !== undefined) { setPin2(pinnedColors[1]) }
        if (pinnedColors[2] !== undefined) { setPin3(pinnedColors[2]) }
        if (pinnedColors[3] !== undefined) { setPin4(pinnedColors[3]) }
        if (pinnedColors[4] !== undefined) { setPin5(pinnedColors[4]) }
    }, []);

    const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Preventing the page from reloading
        let r = []
        if (pin1 != '') { r.push(pin1) }
        if (pin2 != '') { r.push(pin2) }
        if (pin3 != '') { r.push(pin3) }
        if (pin4 != '') { r.push(pin4) }
        if (pin5 != '') { r.push(pin5) }
        updatePinnedColors(r)
    }

    const scrubColor = (color: string) => {
        if (color == '') { 
            return "#FFFFFF" 
        } 
        return color
    }

    function hexInputHandler(event: React.FormEvent<HTMLInputElement>) {
        event.preventDefault();

        let value = event.currentTarget.value
        let pin = event.currentTarget.id
        var re = /[0-9A-Fa-f]{6}/g;

        if(re.test(value)) {

            let hex = value.startsWith("#") ? value : ("#" + value)

            if (pin === "pin1") { setPin1(hex) }
            if (pin === "pin2") { setPin2(hex) }
            if (pin === "pin3") { setPin3(hex) }
            if (pin === "pin4") { setPin4(hex) }
            if (pin === "pin5") { setPin5(hex) }

        } else {

            if (pin === "pin1") { setPin1('') }
            if (pin === "pin2") { setPin2('') }
            if (pin === "pin3") { setPin3('') }
            if (pin === "pin4") { setPin4('') }
            if (pin === "pin5") { setPin5('') }
            
        }

    }

    return (
        <ModalContainer>
            <SwatchContainer> <h3>{semantic}</h3> </SwatchContainer>

            <FormContainer className="container">
            <h2> Add More Colors </h2>
            <p> Enter additional hex codes of similar hues in the fields below to insert in the column.
                Order does not matter. Genome will place each value in the closest matching weight for WCAG compliance.
            </p>
                <form id="contact-form" onSubmit={submitForm} method="POST">
                    <div className="form-group">
                        {/* <label htmlFor="name">Name</label> */}
                        <input type="color" id="head" name="head" value={scrubColor(pin1)} disabled/>
                        <input type="text" className="form-control" id="pin1" defaultValue={pin1}  onChange={(e) => hexInputHandler(e)} />
                    </div>
                    <div className="form-group">
                        {/* <label htmlFor="name">Name</label> */}
                        <input type="color" id="head" name="head" value={scrubColor(pin2)} disabled/>
                        <input type="text" className="form-control" id="pin2" defaultValue={pin2} onChange={(e) => hexInputHandler(e)} />

                    </div>
                    <div className="form-group">
                        {/* <label htmlFor="name">Name</label> */}
                        <input type="color" id="head" name="head" value={scrubColor(pin3)} disabled/>
                        <input type="text" className="form-control" id="pin3" defaultValue={pin3} onChange={(e) => hexInputHandler(e)} />

                    </div>
                    <div className="form-group">
                        {/* <label htmlFor="name">Name</label> */}
                        <input type="color" id="head" name="head" value={scrubColor(pin4)} disabled/>
                        <input type="text" className="form-control" id="pin4" defaultValue={pin4} onChange={(e) => hexInputHandler(e)} />
                    </div>
                    <div className="form-group">
                        {/* <label htmlFor="name">Name</label> */}
                        <input type="color" id="head" name="head" value={scrubColor(pin5)} disabled/>
                        <input type="text" className="form-control" id="pin5" value={pin5} onChange={(e) => hexInputHandler(e)} />
                    </div>
                    <button type="submit" className="btn btn-primary">Cancel</button>
                    <button type="submit" className="btn btn-primary">Submit</button>

                </form>

            </FormContainer>
        </ModalContainer>
    )
}

export default SelectPinnedColorsView;