import chroma from "chroma-js"
import { l_targets, weights } from '../../constants'
import { SwatchModel } from '../../models'
import Spectro from './spectro'

class Palettizer {

    constructor(hexValue, semantic, columnName) {
        this.spectro = new Spectro()
        console.log("Does this fire second time? ", columnName)
        this.columnName = columnName
        
        // this.colorModel = 'lch' // better overall
        this.colorModel = 'oklab' // works better on blue tints (lch turns tints to purple shade)
        this.colorModelDarks = 'lch' // I like lch better for 3/4 and shadow tones.

        this.semantic = semantic

        this.swatch = new SwatchModel(hexValue, columnName)
        this.swatch.isUserDefined = true
        this.swatch.semantic = semantic

        this.swatches = Array(l_targets.length).fill(new SwatchModel("#CCCCCC"));
    }

    createSwatchColumn() {
        
        let index = this.mapUserDefinedColorToNormalizedSwatchWeight()
        let tints_shades = this.renderTintsAndShades(index)
        this.populateSwatchesArray(tints_shades, index)
        this.normalizeSwatchWeights(tints_shades)
    }

    normalizeSwatchWeights(tints_shades) {
        for (var i=0; i<tints_shades.length; i++) {
            this.normalizeWeightAtIndex(i)
        }
    }

    normalizeWeightAtIndex(index) {

        let swatch = this.swatches[index]

        // do not modify if user defined
        if (swatch.isUserDefined) { return }

        const n = 5
        var newHexValue =  this.swatches[index].hex
        for (let i = 0; i < n; i++) {
            newHexValue = chroma(newHexValue).set('lab.l',  swatch.l_target.toString()).hex()
        }
        let newSwatch = new SwatchModel(newHexValue)

        newSwatch.column = this.columnName
        newSwatch.row = swatch.row

        newSwatch.id = swatch.id
        newSwatch.weight = swatch.weight
        newSwatch.l_target = swatch.l_target
        newSwatch.semantic = swatch.semantic
        newSwatch.name = swatch.name
     
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
        // Render tints
        var tints = chroma.scale(['#FFFFFF', this.swatches[index].hex]).mode(this.colorModel).colors(index)
        // Create the L*97.5 tint, between last tint and white
        tints.splice(1, 0, chroma.scale([tints[1], tints[0]]).mode(this.colorModel).colors(3)[1])
        // create shades
        var shades = chroma.scale([this.swatches[index].hex, '#000000']).mode(this.colorModelDarks).colors(l_targets.length - index)
        // remove first value from shades (it is userDefined, and in last item of tints array)
        shades.shift()
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

        for (var i=0; i<tints_shades.length; i++) {
            if (i !== index) {
                let swatch = new SwatchModel(tints_shades[i])

                swatch.id = this.columnName + i
                swatch.column = this.columnName
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
