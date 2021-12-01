import { useState, useEffect } from "react";
import Image from "next/image";
import MATRIX_FRAMES from "../data/matrix";

function Matrix() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((currentState) => (currentState + 1) % MATRIX_FRAMES.length);
        }, 10);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="Matrix">
            <Image src={MATRIX_FRAMES[index]} width={1440} height={782} alt="matrix" />
        </div>
    );
}

export default Matrix;
