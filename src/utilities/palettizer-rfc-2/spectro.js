import convert from 'color-convert'
import deltaE from "delta-e"
import tinycolor, { readability }  from 'tinycolor2'
import { sRGBtoY, APCAcontrast } from  './apca'

import { colorNames, hueValues, neutralTolerance, colorCheckerValuesLab } from '../../constants'

class Spectro {

    getWCAG(color) {
        let result = readability(color, '#FFFFFF');
        return Math.round((result + Number.EPSILON) * 100) / 100
    }

    getAPCA(color) {
        let txt = sRGBtoY("FFFFFF")
        let bkg = sRGBtoY(color)
        // console.log("WORKING: (" + txt + " -> " + bkg + ")")
        // let r = APCAcontrast(b, a) // 81
        let r = APCAcontrast(txt, bkg) // 86
        return Math.abs(r)
    }

    getColorSpecs(color) {
        let result = undefined
        result = this.getClosestColorCheckerName(color)
        return result
    }

    getColorType(color) {
        let result = undefined

        let hue = this.getHueValue(color)
        var closest = hueValues.reduce(function (prev, curr) {
            return (Math.abs(curr - hue) < Math.abs(prev - hue) ? curr : prev);
        });
        let colorType = "CHROMA"
        let saturation = this.getSaturationValue(color)
        let lightness = this.getLightnessValue(color)
        let colorValue = this.getColorValue(color)
        let colorChecker = this.getClosestColorCheckerName(color)

        if (this.isNeutral(color)) { colorType = colorNames[colorNames.length - 1] }

        let hexValue = color.toHexString()
        result = { 
            name: colorChecker.name, 
            type: colorType,             
            hex: color.toHexString(), 
            h: Math.round(hue), 
            s: Math.round(saturation), 
            v: Math.round(colorValue), 
            // C: Math.round(chroma(hexValue).lch()[1]),
            // H: Math.round(chroma(hexValue).lch()[2]),
            L: lightness, 
            ccDE: colorChecker.dE }
        return result
    }

    getHueValue(color) {
        let result = undefined
        let hsv = color.toHsv()
        result = hsv.h
        return result
    }

    getSaturationValue(color) {
        let result = undefined
        let hsv = color.toHsv()
        result = hsv.s
        return result * 100
    }

    getColorValue(color) {
        let result = undefined
        let hsv = color.toHsv()
        result = hsv.v
        return result * 100
    }

    getLightnessValue(hexString) {
        return convert.hex.lab(hexString)[0]
    }

    getLabValue(hexString) {
        return convert.hex.lab(hexString)
    }

    getLchValue(hexString) {
        return convert.hex.lch(hexString)
    }

    getHsvValue(hexString) {
        return convert.hex.hsv(hexString)
    }

    isNeutral(color) {
        let value = this.getSaturationValue(color)
        if (value > neutralTolerance) {
            return false
        }
        return true
    }

     lowestValueAndKey(obj) {
        var [lowestItems] = Object.entries(obj).sort(([ ,v1], [ ,v2]) => v1 - v2);

        return {key: lowestItems[0], value: lowestItems[1] }

        return `Lowest value is ${lowestItems[1]}, with a key of ${lowestItems[0]}`;
      }

    getClosestColorCheckerName(color) {

        let dict = {}
        let lab =  convert.hex.lab(color)
        var base = {L: lab[0], A: lab[1], B: lab[2]};
        for (const [key, value] of Object.entries(colorCheckerValuesLab)) {
            let dE = deltaE.getDeltaE00(base, value);
            dict[key] = dE;
        }

        let result = this.lowestValueAndKey(dict);
        return {["name"]:result.key, ["dE"]:Math.round(result.value * 100) / 100}  


    }

    getLightnessValue(hexString) {
        return convert.hex.lab(hexString)[0]
    }

    darken(color) {
        return tinycolor(color.clone()).darken(1)
    }

    lighten(color) {
        return tinycolor(color.clone()).lighten(1)
    }

    darkenToTarget(color, saturation, targetValue) {
        let result = color.clone()
        while (this.getLightnessValue(result) > targetValue) {
            result = this.darken(result)
        }
        return result
    }




}

export default Spectro;