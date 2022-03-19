import React, { useEffect, useRef } from "react";
import {mount} from "solidMfe/solidMfe";

const SolidMfeModule = () => {
    const ref = useRef(null);
    useEffect(() => {
        mount(ref.current);
    }, []);
    return <div className="solid-mfe" ref={ref} />;
};

export default SolidMfeModule;
