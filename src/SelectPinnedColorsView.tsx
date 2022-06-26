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
        console.log("ALL THE PROPS...", pinnedColors)
        console.log("updatePinnedColors...", updatePinnedColors)

        if (pinnedColors.length > 0) {
            setPin1(pinnedColors[0])
        }
    }, []);

    const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Preventing the page from reloading
        // console.log(pin1, pin2, pin3)
        // Do something 
        // alert(term);
        updatePinnedColors(["#C0E8FF", "#003353"])  
        console.log([pin1, pin2, pin3])
    }

    return (
        <div>
            <h1> Hello! </h1>
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