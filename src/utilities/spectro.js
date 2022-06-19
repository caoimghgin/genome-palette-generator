import convert from 'color-convert'
import deltaE from "delta-e"
import tinycolor, { readability }  from 'tinycolor2'
import { sRGBtoY, APCAcontrast } from  './apca'
import chroma from "chroma-js"
import { colorNames, hueValues, neutralTolerance, colorCheckerValuesLab } from '../constants'

class Spectro {

    generateRandomColor(x) {
        var color = null

        if (x === null) {
            color = tinycolor.random();
            console.log(this.getClosestColorCheckerName(color.toHexString()))
            return color.toHexString()
        } else {
            console.log("ELSE")
            let ccName = null;

            do {
                color = tinycolor.random();
                let j = this.getClosestColorCheckerName(color.toHexString());
                ccName = j.name
                console.log(ccName)

              } while (x !== ccName);

              return color
        }
    }

    generateRandomColorForCCName(x) {
        var color = null
        var ccName

            do {
                color = tinycolor.random();
                let j = this.getClosestColorCheckerName(color.toHexString());
                ccName = j.name
                console.log(ccName)

              } while (x !== ccName);

              return color
        
    }

    getWCAGBools(color) {
        let result = []

        let onWhite = chroma.contrast(color, "#FFFFFF");
        let onBlack = chroma.contrast(color, "#000000");

        result.push( ( onWhite >= 3 ) ? true : false)
        result.push( ( onWhite >= 4.5 ) ? true : false)
        result.push( ( onBlack >= 3 ) ? true : false)
        result.push( ( onBlack >= 4.5 ) ? true : false)

        return result
    }

    getWCAG(color) {
        let result = chroma.contrast(color, "#FFFFFF");
        return Math.round((result + Number.EPSILON) * 100) / 100
    }

    getAPCA(color) {
        let txt = sRGBtoY("FFFFFF")
        let bkg = sRGBtoY(color)
        let r = APCAcontrast(txt, bkg) // 86
        return Math.abs(r)
    }

    getColorSpecs(color) {
        let result = undefined
        result = this.getClosestColorCheckerName(color)
        return result
    }

    createColorObject(input) {
        let result = undefined
        let color = tinycolor(input)

        let hue = this.getHueValue(color)
        var closest = hueValues.reduce(function (prev, curr) {
            return (Math.abs(curr - hue) < Math.abs(prev - hue) ? curr : prev);
        });
        let colorType = "CHROMA"
        let saturation = this.getSaturationValue(color)
        let lightness = this.getLightnessValue(color)
        let colorValue = this.getColorValue(color)
        let colorChecker = this.getClosestColorCheckerName(color)
        let chroma = this.getLchValue(color)[1]

        if (this.isNeutral(color)) { colorType = colorNames[colorNames.length - 1] }

        let hexValue = color.toHexString()
        result = {
            color: color,
            name: colorChecker.name, 
            type: colorType,             
            hex: color.toHexString(), 
            hue: Math.round(hue), 
            saturation: Math.round(saturation), 
            value: Math.round(colorValue), 
            // C: Math.round(chroma(hexValue).lch()[1]),
            // H: Math.round(chroma(hexValue).lch()[2]),
            lightness: lightness, 
            ccDE: colorChecker.dE,
            chroma: chroma}
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
        let chroma = this.getLchValue(color)[1]

        if (this.isNeutral(color)) { colorType = colorNames[colorNames.length - 1] }

        let hexValue = color.toHexString()
        result = {
            color: color,
            name: colorChecker.name, 
            type: colorType,             
            hex: color.toHexString(), 
            hue: Math.round(hue), 
            saturation: Math.round(saturation), 
            value: Math.round(colorValue), 
            // C: Math.round(chroma(hexValue).lch()[1]),
            // H: Math.round(chroma(hexValue).lch()[2]),
            lightness: lightness, 
            ccDE: colorChecker.dE,
            chroma: chroma}
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

    getLabValue(hex) {
        // return convert.hex.lab(hexString)
        return chroma(hex).lab()
    }

    getLightnessValue(color) {
        let result = chroma(color).get('lab.l');
    }

    getLchValue(hexString) {
        return convert.hex.lch(hexString)
    }

    getHsvValue(hexString) {
        return convert.hex.hsv(hexString)
    }

    isNeutral(value) {

        return ((value > 12) ? false : true)
   
    }

     lowestValueAndKey(obj) {
        var [lowestItems] = Object.entries(obj).sort(([ ,v1], [ ,v2]) => v1 - v2);

        return {key: lowestItems[0], value: lowestItems[1] }

      }

      getDeltaE(hex_a, hex_b) {
     
        let result = chroma.deltaE(hex_a, hex_b);
        return result

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



    lighten(color) {
        return tinycolor(color.clone()).lighten(1)
    }

    // darkenToTarget(color, targetValue) {
    //     let result = tinycolor(color)
    //     while (this.getLightnessValue(result) > targetValue) {
    //         result = this.darken(result)
    //     }
    //     return result
    // }

    // darken(color) {
    //     return tinycolor(color.clone()).darken(1)
    // }

    // getLightnessValue(hexString) {
    //     // return chroma(hexString).get('lab.l');
    //     return convert.hex.lab(hexString)[0]
    // }

    darkenToTarget(color, targetValue) {
        return    chroma(color).set('lch.l', targetValue);

        let result = color
       
        while ( chroma(result).get('lab.l') > targetValue) {
            // result = chroma(result).darken(1).hex()
            result = chroma(result).set('lch.l', targetValue);
        }
        return result
    }

    darken(color) {
        return chroma(color).darken().hex()

        // return tinycolor(color.clone()).darken(1)
    }

    getLightnessValue(hexString) {
        return chroma(hexString).get('lab.l');
    }

}

export default Spectro;