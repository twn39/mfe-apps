import React, { useEffect, useRef } from "react";
import {mount} from "vueMfe/vueMfe";

const VueMfeModule = () => {
    const ref = useRef(null);
    useEffect(() => {
        mount(ref.current);
    }, []);
    return <div className="vue-mfe" ref={ref} />;
};

export default VueMfeModule;
