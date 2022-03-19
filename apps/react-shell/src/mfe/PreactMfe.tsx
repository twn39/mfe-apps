import React, { useEffect, useRef } from "react";
import {mount} from "preactMfe/preactMfe";

const PreactMfeModule = () => {
    const ref = useRef(null);
    useEffect(() => {
        mount(ref.current);
    }, []);
    return <div className="preact-mfe" ref={ref} />;
};

export default PreactMfeModule;
