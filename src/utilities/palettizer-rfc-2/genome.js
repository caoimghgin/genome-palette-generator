import chroma from "chroma-js"
import { l_targets, weights } from '../../constants'
import { SwatchModel } from '../../models/SwatchModel'
import Swatch from "../../Swatch"
import Spectro from './spectro'

class Palettizer {
    constructor(hexValue, semantic, columnName) {
        this.spectro = new Spectro()
        this.columnName = columnName

        this.colorModel = 'oklab' // works better on blue tints (lch/lab turns blue tints to purple shade)
        this.semantic = semantic

        this.swatch = new SwatchModel(hexValue, columnName)

        this.swatch.isUserDefined = true
        this.swatch.isNeutral = this.spectro.isNeutral(this.swatch.LCH.C)

        this.swatch.semantic = semantic

        this.swatches = Array(l_targets.length).fill(new SwatchModel("#CCCCCC"));

    }

    createSwatchColumn() {

        let index = this.mapUserDefinedColorToNormalizedSwatchWeight()
        let tints_shades = this.renderTintsAndShades(index)
        this.populateSwatchesArray(tints_shades, index)
        // this.testInsertColor("#56377F")
        this.normalizeSwatchWeights(tints_shades)
    }

    testInsertColor(hex) {

        this.renderShades(hex, "#000000", true, false)

        let insertColor = hex
        let idx = this.normalizedTargetWeightIndex(insertColor)
        let insertSwatch = new SwatchModel(insertColor)
        insertSwatch.id = this.columnName + idx
        insertSwatch.column = this.columnName
        insertSwatch.isNeutral = this.swatch.isNeutral
        insertSwatch.row = idx
        insertSwatch.l_target = l_targets[idx]
        insertSwatch.semantic = this.semantic
        insertSwatch.name = this.semantic + "-" + weights[idx]
        this.swatches[idx] = insertSwatch

        return

    }

     getClosestIndex = (target, targets) => {
        var closest = targets.reduce(function (prev, curr) {
            return (Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev);
        });
        return targets.indexOf(closest)
    }

    renderShades(start, end, clipStart, clipEnd) {

        let startIndex = this.normalizedTargetWeightIndex(start)
        let endIndex = this.normalizedTargetWeightIndex(end)
        let steps = (endIndex - startIndex) + 1

        let candidateSwatches = chroma.scale([start, end]).mode(this.colorModel).colors(steps * 3)

        let targetValuesArray = [...l_targets].splice(startIndex, steps)
        let candidateLightnessArray = []
        let rowArray = Array.apply(null, Array(steps)).map(function () {})

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

        if (clipStart) {rowArray.shift()}

        for (var i = 0; i < rowArray.length; i++) {
            let row = i + (startIndex + 1)
            let swatch = new SwatchModel(rowArray[i])
            swatch.id = this.columnName + (row)
            swatch.column = this.columnName
            swatch.isNeutral = this.swatch.isNeutral
            swatch.row = row
            swatch.l_target = l_targets[row]
            this.swatches[row] = swatch
        }

        return

    }

    xRenderShades(start, end, clipStart, clipEnd) {

        let startIndex = this.normalizedTargetWeightIndex(start)
        let endIndex = this.normalizedTargetWeightIndex(end)
        let steps = (endIndex - startIndex) + 1

        let candidateSwatches = chroma.scale([start, end]).mode(this.colorModel).colors(steps * 3)

        let targetValuesArray = [...l_targets].splice(startIndex, steps)
        let candidateLightnessArray = []
        let rowArray = Array.apply(null, Array(steps)).map(function () {})

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

        if (clipStart) {rowArray.shift()}

        // for (var i = 0; i < rowArray.length; i++) {
        //     let row = i + (startIndex + 1)
        //     let swatch = new SwatchModel(rowArray[i])
        //     swatch.id = this.columnName + (row)
        //     swatch.column = this.columnName
        //     swatch.isNeutral = this.swatch.isNeutral
        //     swatch.row = row
        //     swatch.l_target = l_targets[row]
        //     // this.swatches[row] = swatch
        // }

        return rowArray






        var shades = chroma.scale([start, end]).mode(this.colorModel).colors(steps)
        if (clipStart) { shades = shades.splice(1) }
        console.log(shades)

        for (var i = 0; i < shades.length; i++) {
            let row = i + (startIndex + 1)
            let swatch = new SwatchModel(shades[i])
            swatch.id = this.columnName + (row)
            swatch.column = this.columnName
            swatch.isNeutral = this.swatch.isNeutral
            swatch.row = row
            swatch.l_target = l_targets[row]
            this.swatches[row] = swatch
        }
    }

    getUserDefinedSwatch() {
        return this.swatches.find(element => element.isUserDefined);
    }

    normalizedTargetWeightIndex(hex) {
        let lightness = parseFloat(this.spectro.getLabValue(hex)[0].toFixed(2))
        var target = l_targets.reduce(function (prev, curr) {
            return (Math.abs(curr - lightness) < Math.abs(prev - lightness) ? curr : prev);
        });
        let index = l_targets.indexOf(target)
        return index
    }

    normalizeSwatchWeights(tints_shades) {
        for (var i = 0; i < tints_shades.length; i++) {
            this.normalizeWeightAtIndex(i)
        }
    }

    normalizeWeightAtIndex(index) {

        let swatch = this.swatches[index]

        // do not modify if user defined OR neutral
        if (swatch.isUserDefined) { return }

        //49.8 == 48.8 (De of 1 for a perfect midtone)
        let target = swatch.l_target
        if (swatch.isNeutral === false) {
            if (target === 5) { target = 7 }
            if (target === 10) { target = 13.5 }
            if (target === 50) { target = 48.5 }
            if (target === 60) { target = 57.5 }
        } else {
            if (target === 5) { target = 7 }
            if (target === 10) { target = 13.5 }
            if (target === 50) { target = 49.5 }
        }

        const n = 10
        var newHexValue = this.swatches[index].hex
        for (let i = 0; i < n; i++) {
            newHexValue = chroma(newHexValue).set('lab.l', target.toString()).hex()
        }
        let newSwatch = new SwatchModel(newHexValue)

        newSwatch.column = this.columnName
        newSwatch.row = swatch.row

        newSwatch.id = swatch.id
        newSwatch.weight = swatch.weight
        newSwatch.l_target = swatch.l_target
        newSwatch.semantic = swatch.semantic
        newSwatch.name = swatch.name
        newSwatch.isNeutral = swatch.isNeutral

        // newSwatch.WCAG2_K_30 = swatch.WCAG2_K_30
        // newSwatch.WCAG2_K_45 = swatch.WCAG2_K_45
        // newSwatch.WCAG2_W_30 = swatch.WCAG2_W_30
        // newSwatch.WCAG2_W_45 = swatch.WCAG2_W_45

        this.swatches[index] = newSwatch

    }

    mapUserDefinedColorToNormalizedSwatchWeight() {
        let color = this.swatch
        var target = l_targets.reduce(function (prev, curr) {
            return (Math.abs(curr - color.lightness) < Math.abs(prev - color.lightness) ? curr : prev);
        });
        let index = l_targets.indexOf(target)

        this.swatch.id = this.columnName + index
        this.swatch.column = this.columnName
        this.swatch.row = index

        this.swatches[index] = color
        this.swatch.weight = weights[index]
        this.swatch.l_target = l_targets[index]
        this.swatch.name = this.semantic + "-" + weights[index]

        return index
    }

    renderTintsAndShades(index) {

        let baseColor = this.swatches[index].hex
        // Render tints
        var tints = chroma.scale(['#FFFFFF', baseColor]).mode(this.colorModel).colors(index)
        // Create the L*97.5 tint, between last tint and white
        tints.splice(1, 0, chroma.scale([tints[1], tints[0]]).mode(this.colorModel).colors(3)[1])
        
        // // create shades
        // var shades = chroma.scale([this.swatches[index].hex, '#000000']).mode(this.colorModel).colors(l_targets.length - index)
        // // remove first value from shades (it is userDefined, and in last item of tints array)
        // shades.shift()

        let shades = this.xRenderShades(baseColor, "#000000", true, true)

        // return array with all tints and shades, including userDefined at index.
        return tints.concat(shades);
    }

    renderTintsAndShadesQuarterTones(index) {
        // do things
    }



    populateSwatchesArray(tints_shades, index) {

        // Loop through tints_shades, transforming into ColorModel object
        // and placing each into the 'this.swatches' array, IF the index of the
        // hexValue does not equal given index of method. This preserves the 'userDefined'
        // flag we set in constructor.

        for (var i = 0; i < tints_shades.length; i++) {
            if (i !== index) {
                let swatch = new SwatchModel(tints_shades[i])

                swatch.id = this.columnName + i
                swatch.column = this.columnName
                swatch.isNeutral = this.swatch.isNeutral
                swatch.row = i
                swatch.weight = weights[i]
                swatch.l_target = l_targets[i]
                swatch.semantic = this.semantic
                swatch.name = this.semantic + "-" + weights[i]
                this.swatches[i] = swatch
            }
        }
    }

}

export default Palettizer;
