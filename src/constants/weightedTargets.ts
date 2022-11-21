
export type weightedTargetsRow = {
    target: number;
    weight: string | undefined;
};

export type weightedTargetsColumn = {
    rows: weightedTargetsRow[], 
    neutrals: weightedTargetsRow[]
};

const msgNonOpt = "Non-optimized is the basis of Genome Color Space. TIP: Hover over any swatch and press the '3', '4', or '7' keys to see which swatches pass for WCAG 3:1, 4.5:1, and 7:1 contrast ratios."
const msgCarbon = "Carbon Color System is DEFINITIVELY NAMED, PRE-PACKAGED, and MEANINGFULLY WEIGHTED. For 3:1 on white, use 50. For 4.5:1, use 60. Genome Color Space is not assosicated with IBM in any way. Results may not be exact to IBM desired weights."
const msgLightning = "Lightning Color System is DEFINITIVELY NAMED, PRE-PACKAGED, and MEANINGFULLY WEIGHTED. For 3:1 on white, use 60. For 4.5:1, use 50. Unlike other systems, Lightning uses the L* value as target number which may seem non-intuitive (lighter colors having larger numbers). Genome Color Space is not assosicated with SalesForce and results may not exactly match their desired weights."
const msgAnt = "Explain and provide a link to ANT"
const msgAccp = "Explain and provide a link to Accessible Color Palette"
const msgColorBox = "Explain and provide a link to ColorBox"
const msgGenome = "Genome Color System is SEMANTICALLY NAMED, and MEANINGFULLY WEIGHTED. For 3:1 contrast on white, use swatches 100 and 200 (L*60, L*55). Swatches 300 and 400 pass on 4.5:1 (L*50, L*45). To switch modes, select EVEN numbers for light-mode (200, 400) and ODD for dark-mode (100, 300). Genome includes a light density 015 (L* 97.5) which is useful for paper whites. This Color System has a few more colors than most, but offers better flexability."
const msgNK = "NewsKit Color System is based on IBM Carbon, but the 090 and 100 are lighter by L*5. For 3:1 on white, use 50. For 4.5:1, use 60. Genome Color Space is not assosicated with NewsKit."
const msgAdobeSpectrum = "Genome Color Space is not assosicated with Adobe Spectrum. Results may not exactly match specified weights."

export const Options = [
    { value: '0', label: 'Non-optimized', message: msgNonOpt},
    { value: '1', label: 'Genome' , message: msgGenome},
    { value: '2', label: 'IBM Carbon' , message: msgCarbon},
    { value: '3', label: 'SalesForce Lightning' , message: msgLightning},
    { value: '4', label: 'Adobe Spectrum' , message: msgAdobeSpectrum},
    { value: '5', label: 'Ant' , message: msgAnt},
    { value: '6', label: 'Material' , message: msgNK},
    { value: '7', label: 'Accessible Palette' , message: msgAccp},
    { value: '8', label: 'ColorBox' , message: msgColorBox},
  ];


enum WeightedTargetsOptions {
    Spectrum = 0,
    Genome,
    Carbon,
    Lightning,
    AdobeSpectrum,
    Ant,
    Material,
    AccessiblePalette,
    ColorBox,
}

export const weightedTargets = (index: WeightedTargetsOptions): weightedTargetsColumn => {

    switch (index) {
        case WeightedTargetsOptions.Spectrum:
            return weightedTargets_spectrum
        case WeightedTargetsOptions.Carbon:
            return weightedTargets_carbon
        case WeightedTargetsOptions.Lightning:
            return weightedTargets_lightning
        case WeightedTargetsOptions.AdobeSpectrum:
          return weightedTargets_adobe          
        case WeightedTargetsOptions.Ant:
            return weightedTargets_ant
        case WeightedTargetsOptions.AccessiblePalette:
            return weightedTargets_accplt      
        case WeightedTargetsOptions.ColorBox:
            return weightedTargets_colorbox        
        case WeightedTargetsOptions.Genome:
            return weightedTargets_genome      
        case WeightedTargetsOptions.Material:
           return weightedTargets_material                                                      
        default:
            return weightedTargets_spectrum
    }

}

const weightedTargets_adobe: weightedTargetsColumn = {
    rows: [
        { target: 0, weight: undefined },
        { target: 5, weight: undefined },
        { target: 10, weight: undefined },
        { target: 15, weight: "1300" },
        { target: 20, weight: undefined },
        { target: 25, weight: "1200" },
        { target: 30, weight: "1100" },
        { target: 35, weight: "1000" },
        { target: 40, weight: undefined },
        { target: 45, weight: "900" },
        { target: 50, weight: "800" },
        { target: 55, weight: undefined },
        { target: 60, weight: "700" },
        { target: 65, weight: "600"},
        { target: 70, weight: undefined },
        { target: 75, weight: "500" },
        { target: 80, weight: "400" },
        { target: 85, weight: "300" },
        { target: 90, weight: "200" },
        { target: 95, weight: "100" },
        { target: 97.5, weight: undefined },
        { target: 100, weight: undefined},
    ],
    neutrals:[]
}

const weightedTargets_spectrum: weightedTargetsColumn = {
    rows: [
        { target: 0, weight: "0" },
        { target: 5, weight: "5" },
        { target: 10, weight: "10" },
        { target: 15, weight: "15" },
        { target: 20, weight: "20" },
        { target: 25, weight: "25" },
        { target: 30, weight: "30" },
        { target: 35, weight: "35" },
        { target: 40, weight: "40" },
        { target: 45, weight: "45" },
        { target: 50, weight: "50" },
        { target: 55, weight: "55" },
        { target: 60, weight: "60" },
        { target: 65, weight: "65" },
        { target: 70, weight: "70" },
        { target: 75, weight: "75" },
        { target: 80, weight: "80" },
        { target: 85, weight: "85" },
        { target: 90, weight: "90" },
        { target: 95, weight: "95" },
        { target: 97.5, weight: "97.5" },
        { target: 100, weight: "100" },
    ],
    neutrals:[]
}

const weightedTargets_carbon: weightedTargetsColumn = {
    rows: [
        { target: 0, weight: undefined },
        { target: 5, weight: "100" },
        { target: 10, weight: undefined },
        { target: 15, weight: "90" },
        { target: 20, weight: undefined },
        { target: 25, weight: "80" },
        { target: 30, weight: undefined },
        { target: 35, weight: "70" },
        { target: 40, weight: undefined },
        { target: 45, weight: "60" },
        { target: 50, weight: undefined },
        { target: 55, weight: undefined },
        { target: 60, weight: "50" },
        { target: 65, weight: undefined },
        { target: 70, weight: "40" },
        { target: 75, weight: undefined },
        { target: 80, weight: "30" },
        { target: 85, weight: undefined },
        { target: 90, weight: "20" },
        { target: 95, weight: "10" },
        { target: 97.5, weight: undefined },
        { target: 100, weight: undefined }
    ],
    neutrals:[]

}

const weightedTargets_newskit: weightedTargetsColumn = {
    rows: [
        { target: 0, weight: undefined },
        { target: 5, weight:  undefined  },
        { target: 10, weight: "100"},
        { target: 15, weight: undefined },
        { target: 20, weight: "090" },
        { target: 25, weight: "080" },
        { target: 30, weight: undefined },
        { target: 35, weight: undefined },
        { target: 40, weight: "070" },
        { target: 45, weight: undefined },
        { target: 50, weight: "060" },
        { target: 55, weight: undefined },
        { target: 60, weight: "050" },
        { target: 65, weight: undefined },
        { target: 70, weight: "040" },
        { target: 75, weight: "030" },
        { target: 80, weight: undefined },
        { target: 85, weight: undefined },
        { target: 90, weight: "020" },
        { target: 95, weight: "010" },
        { target: 97.5, weight: undefined },
        { target: 100, weight: undefined }
    ],
    neutrals:[]

}

const weightedTargets_lightning: weightedTargetsColumn = {
    rows: [
        { target: 0, weight: undefined },
        { target: 5, weight: undefined },
        { target: 10, weight: "10" },
        { target: 15, weight: "15" },
        { target: 20, weight: "20" },
        { target: 25, weight: undefined },
        { target: 30, weight: "30" },
        { target: 35, weight: undefined },
        { target: 40, weight: "40" },
        { target: 45, weight: undefined },
        { target: 50, weight: "50" },
        { target: 55, weight: undefined },
        { target: 60, weight: "60" },
        { target: 65, weight: undefined },
        { target: 70, weight: "70" },
        { target: 75, weight: undefined },
        { target: 80, weight: "80" },
        { target: 85, weight: undefined },
        { target: 90, weight: "90" },
        { target: 95, weight: "95" },
        { target: 97.5, weight: undefined },
        { target: 100, weight: undefined },
    ],
    neutrals:[]

}

const weightedTargets_ant: weightedTargetsColumn = {
    rows: [
        { target: 0, weight: undefined },
        { target: 5, weight: undefined },
        { target: 10, weight: undefined },
        { target: 15, weight: undefined },
        { target: 20, weight: "10" },
        { target: 25, weight: "9" },
        { target: 30, weight: undefined },
        { target: 35, weight: "8" },
        { target: 40, weight: undefined },
        { target: 45, weight: "7" },
        { target: 50, weight: undefined },
        { target: 55, weight: undefined },
        { target: 60, weight: "6" },
        { target: 65, weight: "5" },
        { target: 70, weight: undefined },
        { target: 75, weight: "4" },
        { target: 80, weight: "3" },
        { target: 85, weight: undefined },
        { target: 90, weight: "2" },
        { target: 95, weight: "1" },
        { target: 97.5, weight: undefined },
        { target: 100, weight: undefined },
    ],
    neutrals:[]

}

const weightedTargets_accplt: weightedTargetsColumn = {
    rows: [
        { target: 0, weight: undefined},
        { target: 5, weight: undefined },
        { target: 10, weight: undefined},
        { target: 15, weight: undefined },
        { target: 20, weight: undefined },
        { target: 25, weight: "900" },
        { target: 30, weight: "800" },
        { target: 35, weight: undefined},
        { target: 40, weight: "700" },
        { target: 45, weight: undefined},
        { target: 50, weight: "600" },
        { target: 55, weight: undefined},
        { target: 60, weight: "500" },
        { target: 65, weight: "400" },
        { target: 70, weight: undefined },
        { target: 75, weight: "300" },
        { target: 80, weight: undefined },
        { target: 85, weight: "200" },
        { target: 90, weight: undefined },
        { target: 95, weight: "100" },
        { target: 97.5, weight: "50" },
        { target: 100, weight: undefined },
    ],
    neutrals:[]

}

const weightedTargets_colorbox: weightedTargetsColumn = {
    rows: [
        { target: 0, weight: "10" },
        { target: 5, weight: undefined },
        { target: 10, weight: "9" },
        { target: 15, weight: undefined},
        { target: 20, weight: "8" },
        { target: 25, weight: undefined },
        { target: 30, weight: "7" },
        { target: 35, weight: "6" },
        { target: 40, weight: "5" },
        { target: 45, weight: undefined },
        { target: 50, weight: "4" },
        { target: 55, weight: undefined },
        { target: 60, weight: "3" },
        { target: 65, weight: undefined},
        { target: 70, weight: "2" },
        { target: 75, weight: "1.5" },
        { target: 80, weight: undefined},
        { target: 85, weight: "1" },
        { target: 90, weight: "0.5" },
        { target: 95, weight: "0" },
        { target: 97.5, weight: undefined},
        { target: 100, weight: undefined},
    ],
    neutrals:[]
}

const weightedTargets_genome: weightedTargetsColumn = {
    rows: [
        { target: 0, weight: undefined },
        { target: 5, weight: undefined },
        { target: 10, weight: "900" },
        { target: 15, weight: "800" },
        { target: 20, weight: "700" },
        { target: 25, weight: undefined },
        { target: 30, weight: "600" },
        { target: 35, weight: undefined },
        { target: 40, weight: "500" },
        { target: 45, weight: "400" },
        { target: 50, weight: "300" },
        { target: 55, weight: "200" },
        { target: 60, weight: "100" },
        { target: 65, weight: undefined },
        { target: 70, weight: "085" },
        { target: 75, weight: undefined },
        { target: 80, weight: "075" },
        { target: 85, weight: undefined },
        { target: 90, weight: "050" },
        { target: 95, weight: "025" },
        { target: 97.5, weight: "015" },
        { target: 100, weight: undefined},
    ],
    neutrals: [
        { target: 0, weight: undefined },
        { target: 5, weight: "900" },
        { target: 10, weight: "800" },
        { target: 15, weight: "700" },
        { target: 20, weight: undefined },
        { target: 25, weight: "600" },
        { target: 30, weight: undefined},
        { target: 35, weight: undefined },
        { target: 40, weight: "500" },
        { target: 45, weight: "400" },
        { target: 50, weight: "300" },
        { target: 55, weight: "200" },
        { target: 60, weight: "100" },
        { target: 65, weight: undefined },
        { target: 70, weight: "085" },
        { target: 75, weight: undefined },
        { target: 80, weight: "075" },
        { target: 85, weight: undefined },
        { target: 90, weight: "050" },
        { target: 95, weight: "025" },
        { target: 97.5, weight: "015" },
        { target: 100, weight: undefined},
    ]
}
const weightedTargets_material: weightedTargetsColumn = {
    rows: [
        { target: 0, weight: undefined },
        { target: 5, weight: undefined },
        { target: 10, weight: undefined },
        { target: 15, weight: undefined },
        { target: 20, weight: "900" },
        { target: 25, weight: "800" },
        { target: 30, weight: "700" },
        { target: 35, weight: "600" },
        { target: 40, weight: "500" },
        { target: 45, weight: undefined },
        { target: 50, weight: "400" },
        { target: 55, weight: "300" },
        { target: 60, weight: undefined },
        { target: 65, weight: undefined },
        { target: 70, weight: "200" },
        { target: 75, weight: undefined },
        { target: 80, weight: undefined },
        { target: 85, weight: "100" },
        { target: 90, weight: undefined },
        { target: 95, weight: "50" },
        { target: 97.5, weight: undefined },
        { target: 100, weight: undefined }
    ],
    neutrals:[
        { target: 0, weight: undefined },
        { target: 5, weight: undefined },
        { target: 10, weight: undefined },
        { target: 15, weight: "900" },
        { target: 20, weight: undefined},
        { target: 25, weight: "800" },
        { target: 30, weight: "700" },
        { target: 35, weight: undefined},
        { target: 40, weight: "600" },
        { target: 45, weight: "500" },
        { target: 50, weight: "400" },
        { target: 55, weight: undefined },
        { target: 60, weight: "300" },
        { target: 65, weight: undefined },
        { target: 70, weight: undefined},
        { target: 75, weight: "200" },
        { target: 80, weight: undefined },
        { target: 85, weight: "100" },
        { target: 90, weight: undefined },
        { target: 95, weight: "50" },
        { target: 97.5, weight: undefined },
        { target: 100, weight: undefined }
    ]

}