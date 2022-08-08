import React, { useState, useEffect } from 'react';
import { InfoViewNonOpt } from './resources/InfoViewNonOpt'
import { InfoViewGenome } from './resources/InfoViewGenome'
import { InfoViewCarbon } from './resources/InfoViewCarbon'
import { InfoViewLightning } from './resources/InfoViewLightning'
import { InfoViewAnt } from './resources/InfoViewAnt'
import { InfoViewAccessible } from './resources/InfoViewAccessible'
import { InfoViewColorBox } from './resources/InfoViewColorBox'
import { InfoViewNewsKit } from './resources/InfoViewNewsKit'
import { InfoViewMaterial } from './resources/infoViewMaterial'

interface IFactory {
    selection: number
}

export const Factory: React.FC<IFactory> = ({selection} : IFactory) => {

    function selectionView() {

        switch(selection) { 
            case 0: { 
                return <InfoViewNonOpt/>
            } 
            case 1: { 
                return <InfoViewGenome/>
            } 
            case 2: { 
                return <InfoViewCarbon/>
            } 
            case 3: { 
                return <InfoViewLightning/>
            } 
            case 4: { 
                return <InfoViewAnt/>
            }
            case 5: { 
                return <InfoViewMaterial/>
            }
            case 6: { 
                return <InfoViewAccessible/>
            }
            case 7: { 
                return <InfoViewColorBox/>
            }                    
            case 8: { 
                return <InfoViewNewsKit/>
            }             
            default: { 
                return <InfoViewNonOpt/>

            } 
         } 

        return <InfoViewGenome/>
    }

    return (
         selectionView()
    )
}

export default Factory;



