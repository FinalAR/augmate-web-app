import React, { useCallback, useState } from "react";
import AdexplorePage from "./exploreAdvancedComponent.js";
import CapturingComponent from "../components/CapturingComponent2.js";

function ArExplore() {

  const [state, setState] = useState(0);
  const [pHash, setPHash] = useState(null);

  const handleStateChange = (state) => {
    setState(state);
  };

  const handlePhashChange = (hash) => {
    setPHash(hash);
  };


  return (
    <div>
      {/* image capturing UI */}
      {state==0 && <CapturingComponent onStateChange={handleStateChange} onPhashChange={handlePhashChange}/>}

      {/* Pass pHash to AR experience */}
      {state==1 && <AdexplorePage phashIdvalue={pHash} onStateChange={handleStateChange}/>}
    </div>
  );
}

export default ArExplore;
