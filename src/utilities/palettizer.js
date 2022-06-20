import chroma from "chroma-js"
import { l_targets, weights } from '../constants'
import { SwatchModel } from '../models/SwatchModel'
import Spectro from './spectro'

class Palettizer {

    constructor(hexValue, semantic, columnName, hexValues) {
        this.spectro = new Spectro()
        this.swatches = Array(l_targets.length).fill(new SwatchModel("#FFFFFF", columnName, semantic));

        this.hexValues = hexValues
        this.columnName = columnName
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
                this.swatch = new SwatchModel(hexValue, this.columnName, this.semantic)
                this.swatch.isUserDefined = true
                this.swatch.isNeutral = this.spectro.isNeutral(this.swatch.LCH.C)
                this.swatch.semantic = this.semantic
                this.swatch.id = this.columnName + this.swatch.row
                this.swatches[this.swatch.row] = this.swatch
                console.log("Set user defined")
            } else {
                this.swatch = new SwatchModel(hexValue, this.columnName, this.semantic)
                this.swatch.isPinned = true
                this.swatch.isNeutral = this.spectro.isNeutral(this.swatch.LCH.C)
                this.swatch.semantic = this.semantic
                this.swatch.id = this.columnName + this.swatch.row
                this.swatches[this.swatch.row] = this.swatch
            }

        });
    }

    createTintsAndShades() {

        let index = 0
        let swatches = [...this.swatches]

        let swatchA = swatches[index]
        swatchA.id = this.columnName + index
        let swatchB = swatches.find(swatch => ((swatch.isPinned === true) || (swatch.isUserDefined === true)));

        if (swatchB === undefined) {
            let hex = "#000000"
            let swatch = new SwatchModel(hex, this.semantic)
            swatch.id = this.columnName +  swatch.row
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
                swatch.id = this.columnName + swatch.row
                swatch.column = this.columnName
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
                swatch.id = this.columnName +  swatch.row
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
                if (target === 50) { target = 49.75 } // Bring the L*50 slightly lower to pass WCAG2 Large text

                var newHexValue = swatch.hex
                for (let i = 0; i < n; i++) {
                    newHexValue = chroma(newHexValue).set('lab.l', target.toString()).hex()
                }
                let normalizedSwatch = new SwatchModel(newHexValue, this.columnName, this.semantic)
                normalizedSwatch.isNeutral = this.spectro.isNeutral(this.swatch.LCH.C)
                normalizedSwatch.semantic = this.semantic
                normalizedSwatch.id = this.columnName + normalizedSwatch.row
                this.swatches[index] = normalizedSwatch
            }

        });

        return



        for (var index = 0; index < this.swatches.length; index++) {
            let swatch = this.swatches[index]

            console.log(swatch)

            if (swatch.isUserDefined) { 
                console.log("I refuse to normalize", swatch.id, swatch.hex, "because it is USER DEFINED")
            }

            if (swatch.isPinned) { 
                console.log("I refuse to normalize", swatch.id, swatch.hex, "because it is USER PINNED")
            }

            if (!swatch.isUserDefined || !swatch.isPinned) {
                let target = swatch.l_target
                if (target === 50) { target = 60.2 }
        
                const n = 10
                var newHexValue = this.swatches[index].hex
                for (let i = 0; i < n; i++) {
                    newHexValue = chroma(newHexValue).set('lab.l', target.toString()).hex()
                }

                let newSwatch = new SwatchModel(newHexValue)
                newSwatch.column = this.columnName
                newSwatch.row = swatch.row
                newSwatch.id = swatch.id
                // newSwatch.weight = swatch.weight
                newSwatch.l_target = swatch.l_target
                newSwatch.semantic = swatch.semantic
                // newSwatch.name = swatch.name
                newSwatch.isNeutral = swatch.isNeutral
                this.swatches[index] = newSwatch
            }

        }
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
