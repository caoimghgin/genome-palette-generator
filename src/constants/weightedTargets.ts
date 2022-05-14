
export type weightedTargetsRow = {
    target: number;
    weight: string | undefined;
};

export type weightedTargetsColumn = {
    rows: weightedTargetsRow[], 
    neutrals: weightedTargetsRow[]
};

export const Options = [
    { value: '0', label: 'Spectrum' },
    { value: '1', label: 'NewsKit' },
    { value: '2', label: 'Carbon' },
    { value: '3', label: 'Lightning' },
    { value: '4', label: 'Ant' },
    { value: '5', label: 'Accessible Palette' },
    { value: '6', label: 'ColorBox' },
    { value: '7', label: 'Genome' },
    { value: '8', label: 'User Defined' },
  ];

enum WeightedTargetsOptions {
    Spectrum = 0,
    NewsKit,
    Carbon,
    Lightning,
    Ant,
    AccessiblePalette,
    ColorBox,
    Genome,
}

export const weightedTargets = (index: WeightedTargetsOptions): weightedTargetsColumn => {

    switch (index) {
        case WeightedTargetsOptions.Spectrum:
            return weightedTargets_spectrum
        case WeightedTargetsOptions.Carbon:
            return weightedTargets_carbon
        case WeightedTargetsOptions.NewsKit:
            return weightedTargets_newskit
        case WeightedTargetsOptions.Lightning:
            return weightedTargets_lightning
        case WeightedTargetsOptions.Ant:
            return weightedTargets_ant
        case WeightedTargetsOptions.AccessiblePalette:
            return weightedTargets_accplt      
        case WeightedTargetsOptions.ColorBox:
            return weightedTargets_colorbox        
        case WeightedTargetsOptions.Genome:
            return weightedTargets_genome                                 
        default:
            return weightedTargets_spectrum
    }

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
        { target: 5, weight: undefined },
        { target: 10, weight: "100" },
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
        { target: 35, weight: "500" },
        { target: 40, weight: undefined },
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