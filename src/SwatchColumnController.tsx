import React from "react";
import Budget, { SwatchData } from "./interfaces";

// interface SwatchData {
//     budgets: SwatchModel[];
// }

export const SwatchColumnController: React.FC<SwatchData> = ({budgets}: SwatchData) => {
    return <div className="Budget-Overview">
        <table>
            <tbody>
            <tr className="Table-Header">
                <td>
                    <h4>CATEGORY</h4>
                </td>
                <td>
                    <h4>BUDGETED</h4>
                </td>
                <td>
                    <h4>SPENT</h4>
                </td>
                <td>
                    <h4>REMAINING</h4>
                </td>
            </tr>
            {budgets.map(item => {
                return <SwatchView budgeted={item.budgeted}
                                   spent={item.spent}
                                   category={item.category}>
                </SwatchView>
            })}
            </tbody>
        </table>
    </div>
}

const SwatchView: React.FC<Budget> = ({category, budgeted, spent}: Budget) => {
    const remainingAmount: number = (budgeted - spent) > 0 ? (budgeted - spent) : 0;
    return <tr>
        <td>
            <h5>{category}</h5>
        </td>
        <td>
            <h5>{"$" + budgeted}</h5>
        </td>
        <td>
            <h5>{"$" + spent}</h5>
        </td>
        <td>
            <h5>{"$" + remainingAmount}</h5>
        </td>
    </tr>
}