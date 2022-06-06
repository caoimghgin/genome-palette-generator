
import { weightedTargetsRow, weightedTargetsColumn } from "../constants/weightedTargets"

interface ISwatchMapModel {
    target: number;
    weight: string | undefined;
 }

export class SwatchMapModel {

    private _model: weightedTargetsColumn;
    private _values: weightedTargetsRow[];

    constructor( values: weightedTargetsColumn) {

        this._values = []
        this.values = values.rows
        this._model = values
    
    }

    public newTargets(isNeutral: boolean) {

        if (isNeutral && (this._model.neutrals.length > 1)) {
            this.values = this._model.neutrals
        }

        var result = this._values.map(function (x) { 
            return x.target
        });
        return result.reverse();
    }

    public targets() {
        var result = this._values.map(function (x) { 
            return x.target
        });
        return result.reverse();
    }

    public weights() {
        var result = this._values.map(function (x) { 
            return x.weight
        });
        return result.reverse();
    }

    public set values(theValues: ISwatchMapModel[]) {
       
        var result = theValues.map(function (x) { 
            return ((x.weight == undefined) ? {"target": -1, "weight": x.weight} : {"target": x.target, "weight": x.weight} )
          });
          this._values = result
    }

    public get values() {
        return this._values;
    }
}