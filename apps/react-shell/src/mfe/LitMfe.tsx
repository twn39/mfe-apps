import React, { useEffect, useRef } from "react";
import {mount} from "litMfe/litMfe";

const LitMfeModule = () => {
  const ref = useRef(null);
  useEffect(() => {
    mount(ref.current);
  }, []);
  return <div className="lit-mfe" ref={ref} />;
};

export default LitMfeModule;
