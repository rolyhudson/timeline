import React, { useState, useEffect } from "react";
import Phase from './Phase';
export default function Timeline(){
    const [phases, setPhases] = useState([{name: 'phase_0'}]);

    return(
        
        <>
        {
            phases.map((phase,i) => {
                return(
        
                    <div className="phase" key = {i}>
                        <Phase name = {phase.name}/>
                        <div className="phaseEnd">
                        <span/>
                        <span className="dot" onClick={() => setPhases([...phases,{name: 'phase_'+phases.length}])}></span>
                        </div>
                    </div>
                    );
            }
                )
        }
        
       </>
    )
}


