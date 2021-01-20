import { useState, useEffect } from "react";

export default function useCounter() {
    let [num, setNum] = useState(777);
    useEffect(() => {
        setTimeout(() => setNum(++num), 1000);
    }, []);
    return [num, setNum];
}
