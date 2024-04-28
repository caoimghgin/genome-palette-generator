import chroma from "chroma-js"
import Spectro from './spectro'
import { l_targets } from '../../constants'
import { SwatchModel } from '../../models/SwatchModel'

class Palettizer {

    constructor(column, semantic, hexValues) {
        this.spectro = new Spectro()
        this.swatches = Array(l_targets.length).fill(new SwatchModel("#FFFFFF", column, semantic));

        this.hexValues = hexValues
        this.column = column
        this.colorModel = 'oklab' // works better on blue tints (lch/lab turns blue tints to purple shade)
        this.semantic = semantic
    }

    createSwatchColumn() {
        this.insertPinnedColors()
        this.createTintsAndShades()
        this.normalizeSwatchWeights()
        return this.swatches
    }

    insertPinnedColors() {
        this.hexValues.forEach((hexValue, index) => {
            if (index === 0) {
                this.swatch = new SwatchModel(hexValue, this.column, this.semantic)
                this.swatch.isUserDefined = true
                this.swatch.isNeutral = this.spectro.isNeutral(this.swatch.LCH.C)
                this.swatch.semantic = this.semantic
                this.swatch.id = this.column + this.swatch.row
                this.swatches[this.swatch.row] = this.swatch
            } else {
                this.swatch = new SwatchModel(hexValue, this.column, this.semantic)
                this.swatch.isPinned = true
                this.swatch.isNeutral = this.spectro.isNeutral(this.swatch.LCH.C)
                this.swatch.semantic = this.semantic
                this.swatch.id = this.column + this.swatch.row
                this.swatches[this.swatch.row] = this.swatch
            }

        });
    }

    createTintsAndShades() {

        let index = 0
        let swatches = [...this.swatches]

        let swatchA = swatches[index]
        swatchA.id = this.column + index
        let swatchB = swatches.find(swatch => ((swatch.isPinned === true) || (swatch.isUserDefined === true)));

        if (swatchB === undefined) {
            let hex = "#000000"
            let swatch = new SwatchModel(hex, this.semantic)
            swatch.id = this.column +  swatch.row
            swatch.isNeutral = this.swatch.isNeutral
            swatch.semantic = this.semantic
            this.swatches[this.getIndex(hex)] = swatch
            this.swatches[swatch.row] = swatch
            swatchB = swatch

        }

        let shades = this.tweenTintsAndShades(swatchA.hex, swatchB.hex, true, true)

        let stop = false;
        do {
            if (swatchB.hex === "#000000") stop = true

            shades = this.tweenTintsAndShades(swatchA.hex, swatchB.hex, true, true)

            for (var i = 0; i < shades.length; i++) {
                let hex = shades[i]
                let index = this.getIndex(hex)
                let swatch = new SwatchModel(hex, this.semantic)
                swatch.id = this.column + swatch.row
                swatch.column = this.column
                swatch.isNeutral = this.swatch.isNeutral
                swatch.semantic = this.semantic

                if (!this.swatches[index].isPinned && 
                    !this.swatches[index].isUserDefined ) {
                    this.swatches[index] = swatch
                }
            }

            index = index + shades.length + 1
            swatches.splice(0, shades.length + 2);

            swatchA = Object.assign({}, swatchB);
            swatchB = swatches.find(swatch => ((swatch.isPinned === true) || (swatch.isUserDefined === true)));

            if (swatchB === undefined) {
                let hex = "#000000"
                let index = this.getIndex(hex)
                let swatch = new SwatchModel(hex, this.semantic)
                swatch.id = this.column +  swatch.row
                swatch.isNeutral = this.swatch.isNeutral
                swatch.semantic = this.semantic
                this.swatches[index] = swatch
                this.swatches[swatch.row] = swatch
                swatchB = swatch

            }

        } while (stop === false);

    }

    tweenTintsAndShades(base, end, clipBase, clipEnd) {

        //
        // The closer a color approaches white and black it will
        // lose chroma which, results in a desaturated render of
        // steps. Increasing the steps and selecting best match to 
        // knownn L* targets preserves the chroma as it becomes
        // darker and lighter.
        //
        //
        // SpreadSteps is three times more (* 3) than the number of steps
        // needed and places the results in 'candidateSwatches'.
        // Looping through targetValuesArray with a reduce function 
        // returns the best matches of the candidateSwatches.
        //

        let startIndex = this.getIndex(base)
        let endIndex = this.getIndex(end)
        let steps = (endIndex - startIndex) + 1
        const spreadSteps = steps * 3
        let candidateHexValues = chroma.scale([base, end]).mode(this.colorModel).colors(spreadSteps)
        let targetValuesArray = [...l_targets].splice(startIndex, steps)
        let candidateLightnessArray = []
        let rowArray = Array.apply(null, Array(steps)).map(function () { })

        //
        // Loop candidateHexValues and populate candidateLightnessArray 
        // with L* values
        //
        candidateHexValues.forEach(function (hex, index) {
            candidateLightnessArray.push(new SwatchModel(hex).lightness)
        })

        //
        // Loop targetValuesArray and reduce to closes L* match. The index 
        // of the result is the best cadidateHexValue created.
        //
        targetValuesArray.forEach(function (target, index) {
            var target = candidateLightnessArray.reduce(function (prev, curr) {
                return (Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev);
            });
            let r = candidateLightnessArray.indexOf(target)
            rowArray[index] = candidateHexValues[r]
        })

        if (clipBase) { rowArray.shift() }
        if (clipEnd) { rowArray.pop() }

        return rowArray

    }

    normalizeSwatchWeights() {

        this.swatches.forEach((swatch, index) => {
            
            if (!swatch.isUserDefined && !swatch.isPinned) {
                const n = 10

                let target = l_targets[index]

                // Bring the L*50 slightly lower to pass WCAG2 Large text
                if (target === 50) { target = 49.75 } 

                var newHexValue = swatch.hex
                for (let i = 0; i < n; i++) {
                    newHexValue = chroma(newHexValue).set('lab.l', target.toString()).hex()
                }
                let normalizedSwatch = new SwatchModel(newHexValue, this.column, this.semantic)
                normalizedSwatch.isNeutral = this.spectro.isNeutral(this.swatch.LCH.C)
                normalizedSwatch.semantic = this.semantic
                normalizedSwatch.id = this.column + normalizedSwatch.row
                this.swatches[index] = normalizedSwatch
            }

        });

    }

    getIndex(hex) {
        let lightness = parseFloat(this.spectro.getLabValue(hex)[0].toFixed(2))
        var target = l_targets.reduce(function (prev, curr) {
            return (Math.abs(curr - lightness) < Math.abs(prev - lightness) ? curr : prev);
        });
        return l_targets.indexOf(target)
    }

}

export default Palettizer;
