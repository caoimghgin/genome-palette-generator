import chroma from "chroma-js"
import Spectro from './spectro'
import { l_targets } from '../constants'
import { SwatchModel } from '../models/SwatchModel'

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
            if (index == 0) {
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

        let shades = this.renderShades(swatchA.hex, swatchB.hex, true, true)

        let stop = false;
        do {
            if (swatchB.hex === "#000000") stop = true

            shades = this.renderShades(swatchA.hex, swatchB.hex, true, true)

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

    renderShades(base, end, clipBase, clipEnd) {

        let startIndex = this.getIndex(base)
        let endIndex = this.getIndex(end)
        let steps = (endIndex - startIndex) + 1

        let candidateSwatches = chroma.scale([base, end]).mode(this.colorModel).colors(steps * 3)

        let targetValuesArray = [...l_targets].splice(startIndex, steps)
        let candidateLightnessArray = []
        let rowArray = Array.apply(null, Array(steps)).map(function () { })

        candidateSwatches.forEach(function (hex, index) {
            let swatch = new SwatchModel(hex)
            candidateLightnessArray.push(swatch.lightness)
        })

        targetValuesArray.forEach(function (target, index) {
            var target = candidateLightnessArray.reduce(function (prev, curr) {
                return (Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev);
            });
            let r = candidateLightnessArray.indexOf(target)
            rowArray[index] = candidateSwatches[r]
        })

        if (clipBase) { rowArray.shift() }
        if (clipEnd) { rowArray.pop() }

        return rowArray

    }

    normalizeSwatchWeights() {

        console.log(this.swatches)

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
