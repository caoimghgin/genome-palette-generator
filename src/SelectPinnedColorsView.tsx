import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled'

interface IPinnedColors {
    pinnedColors: string[];
    userDefined: string;
    dismissModal: () => void
    updatePinnedColors: (arg: string[]) => void
}

export const SelectPinnedColorsView: React.FC<IPinnedColors> = ({pinnedColors, userDefined, dismissModal, updatePinnedColors} : IPinnedColors) => {

    const [pin1, setPin1] = useState('');
    const [pin2, setPin2] = useState('');
    const [pin3, setPin3] = useState('');
    const [pin4, setPin4] = useState('');
    const [pin5, setPin5] = useState('');

    const SwatchContainer = styled.div(props => ({
        width: '100%',
        height: '200px',
        backgroundColor: userDefined
      }))

      const FormContainer = styled.div(props => ({
        padding: "44px"
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

    return (
        <div>
            <SwatchContainer/>

            <FormContainer className="container">
            <h1> Pin Colors </h1>
            <p> Add hex codes in the fields below to insert additional colors in the column.</p>
                <form id="contact-form" onSubmit={submitForm} method="POST">
                    <div className="form-group">
                        {/* <label htmlFor="name">Name</label> */}
                        <input type="text" className="form-control" id="pin1" value={pin1} onChange={(e) => setPin1(e.target.value)} />
                        <input type="color" id="head" name="head" value={scrubColor(pin1)} />
                    </div>
                    <div className="form-group">
                        {/* <label htmlFor="name">Name</label> */}
                        <input type="text" className="form-control" id="pin2" value={pin2} onChange={(e) => setPin2(e.target.value)} />
                        <input type="color" id="head" name="head" value={scrubColor(pin2)} />

                    </div>
                    <div className="form-group">
                        {/* <label htmlFor="name">Name</label> */}
                        <input type="text" className="form-control" id="pin3" value={pin3} onChange={(e) => setPin3(e.target.value)} />
                        <input type="color" id="head" name="head" value={scrubColor(pin3)} />

                    </div>
                    <div className="form-group">
                        {/* <label htmlFor="name">Name</label> */}
                        <input type="text" className="form-control" id="pin4" value={pin3} onChange={(e) => setPin4(e.target.value)} />
                        <input type="color" id="head" name="head" value={scrubColor(pin4)} />
                    </div>
                    <div className="form-group">
                        {/* <label htmlFor="name">Name</label> */}
                        <input type="text" className="form-control" id="pin5" value={pin3} onChange={(e) => setPin5(e.target.value)} />
                        <input type="color" id="head" name="head" value={scrubColor(pin5)} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <button onClick={dismissModal}>Cancel</button>

            </FormContainer>
        </div>
    )
}

export default SelectPinnedColorsView;