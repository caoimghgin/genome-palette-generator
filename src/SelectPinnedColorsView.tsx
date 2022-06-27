import React, { useState, useEffect, useCallback } from 'react';


interface IPinnedColors {
    pinnedColors: string[];
    updatePinnedColors: (arg: string[]) => void
}

export const SelectPinnedColorsView: React.FC<IPinnedColors> = ({pinnedColors, updatePinnedColors} : IPinnedColors) => {

    const [pin1, setPin1] = useState('');
    const [pin2, setPin2] = useState('');
    const [pin3, setPin3] = useState('');

    useEffect(() => {
        if (pinnedColors[0] !== undefined) { setPin1(pinnedColors[0]) }
        if (pinnedColors[1] !== undefined) { setPin2(pinnedColors[1]) }
        if (pinnedColors[2] !== undefined) { setPin3(pinnedColors[2]) }
    }, []);

    const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Preventing the page from reloading
        let r = []
        if (pin1 != '') { r.push(pin1) }
        if (pin2 != '') { r.push(pin2) }
        if (pin3 != '') { r.push(pin3) }
        updatePinnedColors(r)
    }

    return (
        <div>
            <h1> Pin Colors </h1>
            <p> Add hex codes in the fields below to insert additional colors in the column.</p>
            <div className="container">
                <form id="contact-form" onSubmit={submitForm} method="POST">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" id="pin1" value={pin1} onChange={(e) => setPin1(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" id="pin2" value={pin2} onChange={(e) => setPin2(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" id="pin3" value={pin3} onChange={(e) => setPin3(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default SelectPinnedColorsView;