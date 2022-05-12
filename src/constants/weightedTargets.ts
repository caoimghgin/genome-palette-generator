
type weightedTargetsRow = {
    target: number;
    weight: string | undefined;
};

type weightedTargetsColumn = {
    rows: weightedTargetsRow[];
};

enum WeightedTargetsOptions {
    Spectrum = 0,
    Carbon,
    NewsKit,
    Lightning,
    Ant,
}

// export const xx = (index: WeightedTargetsOptions) => {
//     let xxx = weightedTargets(WeightedTargetsOptions.Spectrum)
//     let yyy = weightedTargets(1)
// }

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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
}
