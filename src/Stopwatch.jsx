import React, { useState, useEffect, useRef } from 'react';

const Stopwatch = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [lapTimes, setLapTimes] = useState([]);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect(() => {
        if (isRunning) {
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 10);
        }
        return () => {
            clearInterval(intervalIdRef.current);
        };
    }, [isRunning]);

    function start() {
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
    }

    function stop() {
        setIsRunning(false);
    }

    function reset() {
        setElapsedTime(0);
        setIsRunning(false);
        setLapTimes([]);
    }

    function lap() {
        if (isRunning) {
            const lapTime = Date.now() - startTimeRef.current;
            setLapTimes(prevLapTimes => [...prevLapTimes, lapTime]);
        }
    }

    function deleteLapTime(index) {
        setLapTimes(prevLapTimes => {
            const newLapTimes = [...prevLapTimes];
            newLapTimes.splice(index, 1);
            return newLapTimes;
        });
    }
    
        
    function formatTime(time) {
        if (isNaN(time) || time === null || time === undefined) {
            return `00:00:00:000`;
        }

        let hours = Math.floor(time / (1000 * 60 * 60));
        let minutes = Math.floor((time / (1000 * 60)) % 60);
        let seconds = Math.floor((time / 1000) % 60);
        let milliseconds = Math.floor((time % 1000));

        hours = String(hours).padStart(2, '0');
        minutes = String(minutes).padStart(2, '0');
        seconds = String(seconds).padStart(2, '0');
        milliseconds = String(milliseconds).padStart(3, '0');

        return `${hours}:${minutes}:${seconds}:${milliseconds}`;
    }

    return (<>
        <div className='stopwatch'>
            <div className='display'>{formatTime(elapsedTime)}</div>
            <div className='controls'>
                <button className='start-button' onClick={start}>Start</button>
                <button className='stop-button' onClick={stop}>Stop</button>
                <button className='lap-button' onClick={lap}>Lap</button>
                <button className='reset-button' onClick={reset}>Reset</button>
            </div>
           
        </div>
        <div className='lap-times'>
                <h1>Lap Times</h1>
                
                <ul>
                {lapTimes.slice().reverse().map((lapTime, index) => (<p>
            <li key={index}>{formatTime(lapTime)}</li> <button className='delete-button' onClick={() => deleteLapTime(lapTimes.length - 1 - index)}>❌</button></p>))}
                </ul>
                
            </div>
        </>
    );
};

export default Stopwatch;
