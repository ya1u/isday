import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const PomodoroTimer: React.FC = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prevSeconds) => prevSeconds - 1);
        } else {
          if (minutes === 0) {
            setIsBreak((prevIsBreak) => !prevIsBreak);
            setMinutes(isBreak ? 25 : 5);
          } else {
            setMinutes((prevMinutes) => prevMinutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);
    } else {
      clearInterval(intervalRef.current!);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, seconds, minutes, isBreak]);

  const handleStartStop = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsBreak(false);
    setMinutes(25);
    setSeconds(0);
  };

  const formatTime = (time: number) => {
    return time.toString().padStart(2, "0");
  };

  return (
    <PomodoroContainer>
      <TimerDisplay>
        {formatTime(minutes)}:{formatTime(seconds)}
      </TimerDisplay>
      <ButtonGrid>
        <Button onClick={handleStartStop}>{isRunning ? "일시정지" : "시작"}</Button>
        <Button onClick={handleReset}>초기화</Button>
      </ButtonGrid>
    </PomodoroContainer>
  );
};

const PomodoroContainer = styled.div`
  background-color: #333;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  width: 300px;
  margin: 0 auto;
  text-align: center;
`;

const TimerDisplay = styled.p`
  color: #fff;
  font-size: 32px;
  margin: 0;
`;

const ButtonGrid = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  padding: 8px 15px;
  cursor: pointer;
`;

export default PomodoroTimer;
