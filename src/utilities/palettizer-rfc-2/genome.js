import chroma from "chroma-js"
import { l_targets, weights } from '../../constants'
import { SwatchModel } from '../../models/SwatchModel'
import Spectro from './spectro'

class Palettizer {

    constructor(hexValue, semantic, columnName) {

        this.swatches = Array(l_targets.length).fill(new SwatchModel("#FFFFFF", columnName, semantic));

        this.pinned = "wsj"

        this.spectro = new Spectro()
        this.columnName = columnName
        this.colorModel = 'oklab' // works better on blue tints (lch/lab turns blue tints to purple shade)
        this.semantic = semantic
        
        
        this.swatch = new SwatchModel(hexValue, columnName, semantic)
        this.swatch.isUserDefined = true
        this.swatch.isNeutral = this.spectro.isNeutral(this.swatch.LCH.C)
        this.swatch.semantic = semantic

        this.pinnedQuarterToneSwatch = undefined
        this.pinnedThreeQuarterToneSwatch = undefined

        //////////////////////////////////////////////////////////////////////////////////////
        //                                                                                  //
        //////////////////////////////////////////////////////////////////////////////////////

    }

    //
    // I want to add all the defined/pinned swatches into the array
    // then I can ask the array to get every defined/pinned, sort them by row (index)
    // and holistically generate SHADES from white to next pinned, to next defined, to pinned
    // and finally to black. Should be much easier to work with.
    //

    createSwatchColumn() {

        let tints_shades = []
        // let index = this.getIndex(this.swatch)
        let index = this.mapUserDefinedColorToNormalizedSwatchWeight()
        tints_shades = this.renderTintsAndShades(index)



        this.insertPinnedColors()

        this.createTintsShades()
        this.normalizeSwatchWeights(tints_shades)
        return this.swatches
    }

    insertPinnedColors() {
        if (this.pinned === "wsj") {
            if (this.semantic === "primary") {

                let pinnedHexQuarterTone = "#66C7FF"
                let pinnedHexThreeQuarterTone = "#015483"

                this.pinnedQuarterToneSwatch = new SwatchModel(pinnedHexQuarterTone, this.columnName, this.semantic)
                this.pinnedQuarterToneSwatch.isAnchored = true
                this.pinnedQuarterToneSwatch.isPinned = true
                this.pinnedQuarterToneSwatch.id = this.columnName + this.pinnedQuarterToneSwatch.row

                this.pinnedThreeQuarterToneSwatch = new SwatchModel(pinnedHexThreeQuarterTone, this.columnName, this.semantic)
                this.pinnedThreeQuarterToneSwatch.isAnchored = true
                this.pinnedThreeQuarterToneSwatch.isPinned = true
                this.pinnedThreeQuarterToneSwatch.id = this.columnName + this.pinnedThreeQuarterToneSwatch.row

                this.swatches[this.pinnedQuarterToneSwatch.row] = this.pinnedQuarterToneSwatch
                this.swatches[this.pinnedThreeQuarterToneSwatch.row] = this.pinnedThreeQuarterToneSwatch


            }

            if (this.semantic === "secondary") {

                let pinnedHexQuarterTone = "#C0A1FF"
                let pinnedHexThreeQuarterTone = "#59348A"

                this.pinnedQuarterToneSwatch = new SwatchModel(pinnedHexQuarterTone, this.columnName, this.semantic)
                this.pinnedQuarterToneSwatch.isAnchored = true
                this.pinnedQuarterToneSwatch.isPinned = true
                this.pinnedQuarterToneSwatch.id = this.columnName + this.pinnedQuarterToneSwatch.row

                this.pinnedThreeQuarterToneSwatch = new SwatchModel(pinnedHexThreeQuarterTone, this.columnName, this.semantic)
                this.pinnedThreeQuarterToneSwatch.isAnchored = true
                this.pinnedThreeQuarterToneSwatch.isPinned = true
                this.pinnedThreeQuarterToneSwatch.id = this.columnName + this.pinnedThreeQuarterToneSwatch.row

                this.swatches[this.pinnedQuarterToneSwatch.row] = this.pinnedQuarterToneSwatch
                this.swatches[this.pinnedThreeQuarterToneSwatch.row] = this.pinnedThreeQuarterToneSwatch
            }

            if (this.semantic === "tertiary") {

                let pinnedHexQuarterTone = "#9E855E"
                let pinnedHexThreeQuarterTone = "#69583E"

                this.pinnedQuarterToneSwatch = new SwatchModel(pinnedHexQuarterTone, this.columnName, this.semantic)
                this.pinnedQuarterToneSwatch.isAnchored = true
                this.pinnedQuarterToneSwatch.isPinned = true
                this.pinnedQuarterToneSwatch.id = this.columnName + this.pinnedQuarterToneSwatch.row

                this.pinnedThreeQuarterToneSwatch = new SwatchModel(pinnedHexThreeQuarterTone, this.columnName, this.semantic)
                this.pinnedThreeQuarterToneSwatch.isAnchored = true
                this.pinnedThreeQuarterToneSwatch.isPinned = true
                this.pinnedThreeQuarterToneSwatch.id = this.columnName + this.pinnedThreeQuarterToneSwatch.row

                this.swatches[this.pinnedQuarterToneSwatch.row] = this.pinnedQuarterToneSwatch
                this.swatches[this.pinnedThreeQuarterToneSwatch.row] = this.pinnedThreeQuarterToneSwatch
            }

            if (this.semantic === "positive") {

                let pinnedHexQuarterTone = "#73EF69"
                let pinnedHexThreeQuarterTone = "#064F00"

                this.pinnedQuarterToneSwatch = new SwatchModel(pinnedHexQuarterTone, this.columnName, this.semantic)
                this.pinnedQuarterToneSwatch.isAnchored = true
                this.pinnedQuarterToneSwatch.isPinned = true
                this.pinnedQuarterToneSwatch.id = this.columnName + this.pinnedQuarterToneSwatch.row

                this.pinnedThreeQuarterToneSwatch = new SwatchModel(pinnedHexThreeQuarterTone, this.columnName, this.semantic)
                this.pinnedThreeQuarterToneSwatch.isAnchored = true
                this.pinnedThreeQuarterToneSwatch.isPinned = true
                this.pinnedThreeQuarterToneSwatch.id = this.columnName + this.pinnedThreeQuarterToneSwatch.row

                this.swatches[this.pinnedQuarterToneSwatch.row] = this.pinnedQuarterToneSwatch
                this.swatches[this.pinnedThreeQuarterToneSwatch.row] = this.pinnedThreeQuarterToneSwatch
            }

            if (this.semantic === "negative") {

                let pinnedHexQuarterTone = "#FF8585"
                let pinnedHexThreeQuarterTone = "#BA0000"

                this.pinnedQuarterToneSwatch = new SwatchModel(pinnedHexQuarterTone, this.columnName, this.semantic)
                this.pinnedQuarterToneSwatch.isAnchored = true
                this.pinnedQuarterToneSwatch.isPinned = true
                this.pinnedQuarterToneSwatch.id = this.columnName + this.pinnedQuarterToneSwatch.row

                this.pinnedThreeQuarterToneSwatch = new SwatchModel(pinnedHexThreeQuarterTone, this.columnName, this.semantic)
                this.pinnedThreeQuarterToneSwatch.isAnchored = true
                this.pinnedThreeQuarterToneSwatch.isPinned = true
                this.pinnedThreeQuarterToneSwatch.id = this.columnName + this.pinnedThreeQuarterToneSwatch.row

                this.swatches[this.pinnedQuarterToneSwatch.row] = this.pinnedQuarterToneSwatch
                this.swatches[this.pinnedThreeQuarterToneSwatch.row] = this.pinnedThreeQuarterToneSwatch

            }

            if (this.semantic === "highlight") {

                let pinnedHexQuarterTone = "#FFECB1"
                let pinnedHexThreeQuarterTone = "#5B3D2F"

                this.pinnedQuarterToneSwatch = new SwatchModel(pinnedHexQuarterTone, this.columnName, this.semantic)
                this.pinnedQuarterToneSwatch.isAnchored = true
                this.pinnedQuarterToneSwatch.isPinned = true
                this.pinnedQuarterToneSwatch.id = this.columnName + this.pinnedQuarterToneSwatch.row

                this.pinnedThreeQuarterToneSwatch = new SwatchModel(pinnedHexThreeQuarterTone, this.columnName, this.semantic)
                this.pinnedThreeQuarterToneSwatch.isAnchored = true
                this.pinnedThreeQuarterToneSwatch.isPinned = true
                this.pinnedThreeQuarterToneSwatch.id = this.columnName + this.pinnedThreeQuarterToneSwatch.row

                this.swatches[this.pinnedQuarterToneSwatch.row] = this.pinnedQuarterToneSwatch
                this.swatches[this.pinnedThreeQuarterToneSwatch.row] = this.pinnedThreeQuarterToneSwatch

            }
        }
    }

    createTintsShades() {

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

        let shades = this.xRenderShades(swatchA.hex, swatchB.hex, true, true)

        let stop = false;
        do {
            if (swatchB.hex === "#000000") stop = true

            shades = this.xRenderShades(swatchA.hex, swatchB.hex, true, true)

            for (var i = 0; i < shades.length; i++) {
                let hex = shades[i]
                let swatch = new SwatchModel(hex, this.semantic)
                swatch.id = this.columnName + swatch.row
                swatch.column = this.columnName
                swatch.isNeutral = this.swatch.isNeutral
                swatch.semantic = this.semantic
                this.swatches[this.getIndex(hex)] = swatch
            }
            index = index + shades.length + 1
            swatches.splice(0, shades.length + 2);

            swatchA = Object.assign({}, swatchB);
            swatchB = swatches.find(swatch => ((swatch.isPinned === true) || (swatch.isUserDefined === true)));

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


        } while (stop === false);

    }

    getClosestIndex = (target, targets) => {
        var closest = targets.reduce(function (prev, curr) {
            return (Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev);
        });
        return targets.indexOf(closest)
    }

    renderShades(start, end, clipStart, clipEnd) {

        let startIndex = this.getIndex(start)
        let endIndex = this.getIndex(end)
        let steps = (endIndex - startIndex) + 1

        let candidateSwatches = chroma.scale([start, end]).mode(this.colorModel).colors(steps * 3)

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

        if (clipStart) { rowArray.shift() }

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

    xRenderTints(base, end, clipStart, clipEnd) {

        let baseIndex = this.getIndex(base)
        let endIndex = this.getIndex(end)
        let steps = (baseIndex - endIndex) + 1

        let candidateSwatches = chroma.scale([end, base]).mode(this.colorModel).colors(steps * 3)
        let targetValuesArray = [...l_targets].splice(endIndex, steps)
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

        if (clipStart) { rowArray.shift() }
        if (clipEnd) { rowArray.pop() }

        return rowArray

    }


    xRenderShades(base, end, clipBase, clipEnd) {

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

    getUserDefinedSwatch() {
        return this.swatches.find(element => element.isUserDefined);
    }

    getIndex(hex) {
        let lightness = parseFloat(this.spectro.getLabValue(hex)[0].toFixed(2))
        var target = l_targets.reduce(function (prev, curr) {
            return (Math.abs(curr - lightness) < Math.abs(prev - lightness) ? curr : prev);
        });
        return l_targets.indexOf(target)
    }

    normalizeSwatchWeights(tints_shades) {
        for (var i = 0; i < tints_shades.length; i++) {
            this.normalizeWeightAtIndex(i)
        }
    }

    normalizeWeightAtIndex(index) {

        let swatch = this.swatches[index]
        if (swatch.isUserDefined || swatch.isPinned) { return }
        let target = swatch.l_target
        if (target === 50) { target = 49.5 }

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
        this.swatches[index] = newSwatch
    }

    mapUserDefinedColorToNormalizedSwatchWeight() {

        let index = this.getIndex(this.swatch.hex)

        this.swatch.id = this.columnName + index
        this.swatch.column = this.columnName
        this.swatch.row = index

        this.swatch.weight = weights[index]
        this.swatch.l_target = l_targets[index]
        this.swatch.name = this.semantic + "-" + weights[index]

        this.swatches[index] = this.swatch

        return index
    }

    insertTintAndShades(tints_shades, insert) {
        if (insert.length < 2) return tints_shades
        let r = [...tints_shades]
        let startIndex = this.getIndex(insert[0])
        r.splice(startIndex, insert.length, ...insert)
        return r
    }

    renderTintsAndShades(index) {

        let baseColor = this.swatches[index].hex
        let tints = this.xRenderTints(baseColor, "#FFFFFF", false, true)
        tints.push(baseColor)
        let shades = this.xRenderShades(baseColor, "#000000", true, false)
        return tints.concat(shades);
    }

    populateSwatchesArray(tints_shades, index) {

        // Loop through tints_shades, transforming into ColorModel object
        // and placing each into the 'this.swatches' array, IF the index of the
        // hexValue does not equal given index of method. This preserves the 'userDefined'
        // flag we set in constructor.

        for (var i = 0; i < this.swatches.length; i++) {
            this.swatches[i].id = this.columnName + i
        }
        return

        for (var i = 0; i < tints_shades.length; i++) {
            if (this.swatches[i].id === undefined) {
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
