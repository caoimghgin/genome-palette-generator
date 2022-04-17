import chroma from "chroma-js"
import { l_targets, weights } from '../../constants'
import { SwatchModel } from '../../models'

class Palettizer {

    constructor(hexValue, semantic) {
        this.colorModel = 'lch'
        this.semantic = semantic

        this.swatch = new SwatchModel(hexValue)
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

        let l_star_actual = swatch.LCH.L
        let l_star_target = swatch.l_target

        if (l_star_actual > l_star_target) {


            let hexValue = this.swatches[index].hex
            let newHexValue = chroma(hexValue).set('lch.l',  l_star_target).hex()

            let newSwatch = new SwatchModel(newHexValue)

            newSwatch.index = swatch.index
            newSwatch.weight = swatch.weight
            newSwatch.l_target = swatch.l_target
            newSwatch.semantic = swatch.semantic
            newSwatch.name = swatch.name

            // swatch.index = i
            // swatch.weight = weights[i]
            // swatch.l_target = l_targets[i]
            // swatch.semantic = this.semantic
            // swatch.name = this.semantic + "-" + weights[i]

            // newSwatch.isUserDefined = swatch.isUserDefined



            // this.swatches[index] = color
            // this.swatch.index = index
            // this.swatch.weight = weights[index]
            // this.swatch.l_target = l_targets[index]
            // this.swatch.name = this.semantic + "-" + weights[index]

            this.swatches[index] = newSwatch

        } else if (l_star_actual < l_star_target) {

            let hexValue = this.swatches[index].hex
            let newHexValue = chroma(hexValue).set('lch.l',  l_star_target)


            let newSwatch = new SwatchModel(newHexValue)

            // newSwatch.original = swatch

            newSwatch.index = swatch.index
            newSwatch.weight = swatch.weight
            newSwatch.l_target = swatch.l_target
            newSwatch.semantic = swatch.semantic
            newSwatch.name = swatch.name

            // this.swatches[index] = color
            // this.swatch.index = index
            // this.swatch.weight = weights[index]
            // this.swatch.l_target = l_targets[index]
            // this.swatch.name = this.semantic + "-" + weights[index]

            this.swatches[index] = newSwatch
        }

    }
    

    mapUserDefinedColorToNormalizedSwatchWeight() {
        let color = this.swatch
        var target = l_targets.reduce(function (prev, curr) {
            return (Math.abs(curr - color.lightness) < Math.abs(prev - color.lightness) ? curr : prev);
        });
        let index = l_targets.indexOf(target)
        this.swatches[index] = color
        this.swatch.index = index
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
        var shades = chroma.scale([this.swatches[index].hex, '#000000']).mode(this.colorModel).colors(l_targets.length - index)

        // remove first value from shades (it is userDefined, and in last item of tints array)
        shades.shift()

        // return array with all tints and shades, including userDefined at index.
        return tints.concat(shades);

    }

    populateSwatchesArray(tints_shades, index) {

        // Loop through tints_shades, transforming into ColorModel object
        // and placing each into the 'this.swatches' array, IF the index of the
        // hexValue does not equal given index of method. This preserves the 'userDefined'
        // flag we set in constructor.

        for (var i=0; i<tints_shades.length; i++) {
            if (i !== index) {
                let swatch = new SwatchModel(tints_shades[i])
                swatch.index = i
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
