import { useState, useEffect } from "react";
import Image from "next/image";
import PICTURES from "../data/pictures";

const minDelay = 1;
const maxDelay = 10;

function Gallery() {
    const [index, setIndex] = useState(0);
    const [delay, setDelay] = useState(3);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((currentState) => (currentState + 1) % PICTURES.length);
        }, delay * 1000);

        return () => {
            clearInterval(interval);
        };
    }, [delay]);

    const updateDelay = (e) => {
        const delay = Number(e.target.value);

        setDelay(delay < minDelay ? minDelay : delay > maxDelay ? maxDelay : delay);
    };

    return (
        <div className="Gallery">
            <Image src={PICTURES[index].image} width={500} height={334} alt="gallery image" />
            <div className="multiform">
                <div>
                    Gallery transition delay (seconds):
                    <input type="number" value={delay} min="1" max="10" onChange={updateDelay} />
                </div>
            </div>
        </div>
    );
}

export default Gallery;
