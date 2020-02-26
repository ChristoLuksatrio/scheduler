import {useState} from 'react';


export default function useVisualMode(initial) {
    const [mode, setMode] = useState(initial);
    const [history, setHistory] = useState([initial]);


    function transition(newMode, replace = false) {
        if (replace) {
            const newHistory = history.slice(0, history.length - 1)
            setHistory(prev => [
                ...newHistory,
                newMode
            ]);
            setMode(newMode);
        } else {
            setMode(newMode)
            setHistory(prev => [
                ...history,
                newMode
            ])
        }
    }

    function back() {
        if (history.length > 1) {
            const newHistory = history.slice(0, history.length - 1)
            setMode(newHistory[newHistory.length - 1])
            setHistory(newHistory);
        }
    }

    return {mode, transition, back};
}
