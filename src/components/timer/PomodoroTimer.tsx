import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { Modal, Button } from "react-bootstrap";
import startIcon from "../../images/start_icon.png";
import pauseIcon from "../../images/pause_icon.png";
import alramIcon from "../../images/alram_icon.png";

// 알림음 리스트를 정의해 줄테니, 네가 경로를 맞춰서 파일을 추가하면 돼.
const alertSounds = [
  {
    id: 1,
    name: "Premiere",
    src: "/alertSounds/Adrián Berenguer - Premiere.mp3",
  },
  { id: 2, name: "Blades", src: "/alertSounds/Evgeny Bardyuzha - Blades.mp3" },
  {
    id: 3,
    name: "I Just Wanna Have Fun",
    src: "/alertSounds/Flint - I Just Wanna Have Fun.mp3",
  },
  {
    id: 4,
    name: "Together",
    src: "/alertSounds/John Dada & the Weathermen - Together.mp3",
  },
  {
    id: 5,
    name: "Eyes on the Prize",
    src: "/alertSounds/Rewind Kid - Eyes on the Prize.mp3",
  },
  {
    id: 6,
    name: "Galaxy Groove",
    src: "/alertSounds/Yarin Primak - Galaxy Groove.mp3",
  },
  {
    id: 7,
    name: "VI Gigue",
    src: "/alertSounds/Yoed Nir - Cello Suite No1 in G Major BWV 1007 - VI Gigue.mp3",
  },
  {
    id: 8,
    name: "Its a Slippery Slope",
    src: "/alertSounds/Yonatan Riklis - Its a Slippery Slope.mp3",
  },
];

const StyledContainer = styled.div`
  background-color: #f7f7f7;
  border: 1px solid transparent;
  border-radius: 25px; /* 둥근 모서리 추가 */
  box-shadow: 5px 10px 100px 50px rgba(0, 0, 0, 0.1); /* 그림자 효과 추가 */
  margin: 0;
  padding: 0;
`;

interface StyledTitleProps {
  selectedLang: string;
}

const StyledTitle = styled.div<StyledTitleProps>`
  font-size: 28px;
  margin: 80px auto;
  ${(props) =>
    props.selectedLang === "ko" &&
    css`
      font-family: "Jalnan", "MaplestoryBold";
    `}

  ${(props) =>
    props.selectedLang === "en" &&
    css`
      font-family: "Jalnan", "MaplestoryBold";
    `}

  ${(props) =>
    props.selectedLang === "ja" &&
    css`
      font-weight: 900;
    `}
`;

const PomodoroWrapper = styled.div`
  /* 타이머 페이지 전체 스타일링은 이곳에 추가하면 돼 */
`;

const TimerContainer = styled.div`
  /* 전자시계처럼 보이는 타이머 컨테이너 스타일링 */
  padding-bottom: 80px;
`;

const TimeDisplay = styled.div`
  /* 시간을 보여주는 부분의 스타일링 */
  font-family: "DSEG7Classic-BoldItalic";
  font-size: 64px;
  background-color: darkorange;
  margin: 52px;
  height: 200px;
  line-height: 200px;
  border: 5px solid black;
  border-radius: 20px;
  p {
    position: relative;
    bottom: 200px;
    opacity: 0.2;
  }
`;

const ButtonContainer = styled.div`
  /* 버튼들을 담는 컨테이너 스타일링 */
  /* display: flex; */
`;

const TimerButton = styled.button`
  /* 타이머 버튼 스타일링 */
  /* font-size: 20px; */
  padding: 10px 20px;
`;

const AlertSoundSelect = styled.select`
  /* 알림음 선택 셀렉트 박스 스타일링 */
  font-size: 18px;
  padding-left: 10px;
  border: none;
  width: 230px;
  height: 40px;
  &:focus {
    outline: none;
  }
`;

const AlertDiv = styled.div`
  margin-top: 40px;
  div:first-child {
    font-size: 22px;
  }
  div:last-child {
    border: 1px solid lightgray;
    width: 296px;
    button {
      border: none;
      &:active {
        opacity: 0.5;
      }
    }
  }
`;

const CustomModal = styled(Modal)`
  margin-top: 160px;
  /* 모달 헤더 스타일링 */
  .modal-header {
    font-family: "Jalnan", "MaplestoryBold";
    background-color: darkcyan;
    border-bottom: none;
    padding: 15px 20px;

    .modal-title {
      color: #fff;
      font-size: 24px;
    }

    button.close {
      color: #fff;
      font-size: 24px;
      &:hover {
        color: #fff;
      }
    }
  }

  /* 모달 바디 스타일링 */
  .modal-body {
    padding: 50px;
    div:first-child {
      display: flex;
      div {
        display: flex;
        flex-direction: column;
        margin: 0 10px 0 0;
        font-size: 22px;
        label {
          /* font-family: "MaplestoryBold"; */
        }
        div {
          flex-direction: row;
          border: 1px solid lightgrey;
          button {
            border: none;
            font-size: 22px;
            &:active {
              opacity: 0.5;
            }
          }
          select {
            width: 85px;
            height: 50px;
            font-size: 18px;
            text-align: center;
            border: none;
            &:focus {
              outline: none;
            }
          }
        }
      }
    }
  }

  /* 모달 푸터 스타일링 */
  .modal-footer {
    /* border-top: none; */
    padding: 10px 20px;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    button:first-child {
      background-color: grey;
      border: none;
      color: white;
      padding: 10px 30px;
      &:hover, &:active {
        opacity: 0.8;
      }
    }
    button:last-child {
      background-color: darkcyan;
      border: none;
      color: white;
      padding: 10px 30px;
      &:hover, &:active {
        opacity: 0.8;
      }
    }
  }
`;

const AlertModal = styled(Modal)`
  margin-top: 160px;
  /* 모달 헤더 스타일링 */
  .modal-header {
    font-family: "Jalnan", "MaplestoryBold";
    background-color: darkcyan;
    border-bottom: none;
    padding: 15px 20px;

    .modal-title {
      color: #fff;
      font-size: 24px;
    }
  }

  /* 모달 바디 스타일링 */
  .modal-body {
    text-align: center;
    font-size: 20px;
    margin-top: 30px;
    p {
      margin-top: 30px;
      font-size: 24px;
    }
  }

  /* 모달 푸터 스타일링 */
  .modal-footer {
    button {
      background-color: darkcyan;
      border: none;
      color: white;
      padding: 10px 30px;
      &:hover, &:active {
        background-color: darkcyan;
        opacity: 0.8;
      }
    }
  }
`;

interface Sound {
  id: number;
  name: string;
  src: string;
}

interface PomodoroTimerProps {
  selectedLang: string;
}

const PomodoroTimer: React.FC<PomodoroTimerProps> = ({ selectedLang }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showAlertModal, setShowAlertModal] = useState<boolean>(false);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(5);
  const [seconds, setSeconds] = useState<number>(0);
  const [inputHours, setInputHours] = useState<number>(0);
  const [inputMinutes, setInputMinutes] = useState<number>(5);
  const [inputSeconds, setInputSeconds] = useState<number>(0);
  const [outputHours, setOutputHours] = useState<number>(0);
  const [outputMinutes, setOutputMinutes] = useState<number>(5);
  const [outputSeconds, setOutputSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [selectedAlertSound, setSelectedAlertSound] = useState<string>(
    alertSounds[0].src
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prev) => prev - 1);
        } else {
          if (minutes > 0) {
            setMinutes((prev) => prev - 1);
            setSeconds(59);
          } else {
            if (hours > 0) {
              setHours((prev) => prev - 1);
              setMinutes(59);
              setSeconds(59);
            } else {
              // 타이머 종료 처리
              setIsRunning(false);
              // 알림음 재생
              playAlertSound();
              // 별개의 알림 모달 띄우기
              setShowAlertModal(true);
            }
          }
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, hours, minutes, seconds]);

  const handleStartTimer = () => {
    // 타이머 시작 로직
    setIsRunning(true);
  };

  const handlePauseTimer = () => {
    // 타이머 일시정지 로직
    setIsRunning(false);
  };

  const handleResetTimer = () => {
    // 타이머 리셋 로직
    setIsRunning(false);
    setHours(inputHours);
    setMinutes(inputMinutes);
    setSeconds(inputSeconds);
  };

  const increaseTime = (unit: string) => {
    if (unit === "hours") {
      if (inputHours < 99) {
        setInputHours((prev) => prev + 1);
      } else {
        setInputHours(0);
      }
    } else if (unit === "minutes") {
      if (inputMinutes < 59) {
        setInputMinutes((prev) => prev + 1);
      } else {
        setInputMinutes(0);
      }
    } else if (unit === "seconds") {
      if (inputSeconds < 59) {
        setInputSeconds((prev) => prev + 1);
      } else {
        setInputSeconds(0);
      }
    }
  };

  const decreaseTime = (unit: string) => {
    if (unit === "hours") {
      if (inputHours > 0) {
        setInputHours((prev) => prev - 1);
      } else {
        setInputHours(99);
      }
    } else if (unit === "minutes") {
      if (inputMinutes > 0) {
        setInputMinutes((prev) => prev - 1);
      } else {
        setInputMinutes(59);
      }
    } else if (unit === "seconds") {
      if (inputSeconds > 0) {
        setInputSeconds((prev) => prev - 1);
      } else {
        setInputSeconds(59);
      }
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setInputHours(outputHours);
    setInputMinutes(outputMinutes);
    setInputSeconds(outputSeconds);
    setShowModal(false);
  };
  const handleSaveModal = () => {
    setHours(inputHours);
    setMinutes(inputMinutes);
    setSeconds(inputSeconds);
    setOutputHours(inputHours);
    setOutputMinutes(inputMinutes);
    setOutputSeconds(inputSeconds);
    setIsRunning(false);
    setIsPlaying(false);
    audioRef.current?.pause();
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // 음악을 처음으로 되감기하여 정지
    }
    setShowModal(false);
  };

  const handleShowAlertModal = () => setShowAlertModal(true);
  const handleCloseAlertModal = () => {
    setIsPlaying(false);
    audioRef.current?.pause();
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // 음악을 처음으로 되감기하여 정지
    }
    setShowAlertModal(false);
  };

  const handleAlertSoundChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsPlaying(false);
    audioRef.current?.pause();
    setSelectedAlertSound(e.target.value);
  };

  // 알림음 재생 함수
  const playAlertSound = () => {
    setIsPlaying(true);
    audioRef.current?.play();
  };

  // 알림음 일시정지 함수
  const pauseAlertSound = () => {
    setIsPlaying(false);
    audioRef.current?.pause();
  };

  return (
    <StyledContainer>
      <PomodoroWrapper>
        {/* 타이머 컨테이너 */}
        <TimerContainer>
          <StyledTitle selectedLang={selectedLang}>
            {selectedLang === "ko"
              ? "뽀모도로 타이머"
              : selectedLang === "en"
              ? "Pomodoro Timer"
              : "ポモドーロタイマー"}
          </StyledTitle>
          <TimeDisplay>
            {`${hours.toString().padStart(2, "0")}:${minutes
              .toString()
              .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}
            <p>88:88:88</p>
          </TimeDisplay>
          <ButtonContainer>
            <TimerButton onClick={handleStartTimer}>
              {selectedLang === "ko"
                ? "시작"
                : selectedLang === "en"
                ? "Start"
                : "スタート"}
            </TimerButton>
            <TimerButton onClick={handlePauseTimer}>
              {selectedLang === "ko"
                ? "일시정지"
                : selectedLang === "en"
                ? "Pause"
                : "一時停止"}
            </TimerButton>
            <TimerButton onClick={handleResetTimer}>
              {selectedLang === "ko"
                ? "리셋"
                : selectedLang === "en"
                ? "Reset"
                : "リセット"}
            </TimerButton>
            <TimerButton onClick={handleShowModal}>
              {selectedLang === "ko"
                ? "설정"
                : selectedLang === "en"
                ? "Setting"
                : "設定"}
            </TimerButton>
          </ButtonContainer>
        </TimerContainer>

        {/* 기존 시간 설정 모달 */}
        <CustomModal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              {selectedLang === "ko"
                ? "설정"
                : selectedLang === "en"
                ? "Setting"
                : "設定"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div>
                <label>
                  {selectedLang === "ko"
                    ? "시간"
                    : selectedLang === "en"
                    ? "Hour"
                    : "時間"}
                </label>
                <div>
                  <button onClick={() => decreaseTime("hours")}>&lt;</button>
                  <select
                    value={inputHours}
                    onChange={(e) => setInputHours(Number(e.target.value))}
                  >
                    {/* 시간 설정 옵션, 0 이상 선택 가능 */}
                    {Array.from({ length: 100 }, (_, i) => (
                      <option key={i} value={i}>
                        {i.toString().padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                  <button onClick={() => increaseTime("hours")}>&gt;</button>
                </div>
              </div>
              <div>
                <label>
                  {selectedLang === "ko"
                    ? "분"
                    : selectedLang === "en"
                    ? "Min"
                    : "分"}
                </label>
                <div>
                  <button onClick={() => decreaseTime("minutes")}>&lt;</button>
                  <select
                    value={inputMinutes}
                    onChange={(e) => setInputMinutes(Number(e.target.value))}
                  >
                    {/* 분 설정 옵션, 0부터 59까지 선택 가능 */}
                    {Array.from({ length: 60 }, (_, i) => (
                      <option key={i} value={i}>
                        {i.toString().padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                  <button onClick={() => increaseTime("minutes")}>&gt;</button>
                </div>
              </div>
              <div>
                <label>
                  {selectedLang === "ko"
                    ? "초"
                    : selectedLang === "en"
                    ? "Sec"
                    : "秒"}
                </label>
                <div>
                  <button onClick={() => decreaseTime("seconds")}>&lt;</button>
                  <select
                    value={inputSeconds}
                    onChange={(e) => setInputSeconds(Number(e.target.value))}
                  >
                    {/* 초 설정 옵션, 0부터 59까지 선택 가능 */}
                    {Array.from({ length: 60 }, (_, i) => (
                      <option key={i} value={i}>
                        {i.toString().padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                  <button onClick={() => increaseTime("seconds")}>&gt;</button>
                </div>
              </div>
            </div>
            {/* 알림음 선택 셀렉트 박스 */}
            <AlertDiv>
              <div>
                {selectedLang === "ko"
                  ? "알림음"
                  : selectedLang === "en"
                  ? "Sound"
                  : "通知音"}
              </div>
              <div>
                <AlertSoundSelect
                  value={selectedAlertSound}
                  onChange={handleAlertSoundChange}
                >
                  {alertSounds.map((sound) => (
                    <option key={sound.id} value={sound.src}>
                      {sound.name}
                    </option>
                  ))}
                </AlertSoundSelect>
                <button>
                  <button
                    onClick={() =>
                      isPlaying ? pauseAlertSound() : playAlertSound()
                    }
                  >
                    <img
                      src={isPlaying ? pauseIcon : startIcon}
                      width={40}
                      alt="Toggle Icon"
                    />
                  </button>
                </button>
              </div>
            </AlertDiv>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleCloseModal}>취소</Button>
            <Button onClick={handleSaveModal}>저장</Button>
          </Modal.Footer>
        </CustomModal>

        {/* 별개의 알림 모달 */}
        <AlertModal show={showAlertModal} onHide={handleCloseAlertModal}>
          <Modal.Header closeButton>
            <Modal.Title>타이머 종료</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={alramIcon} alt="Toggle Icon" />
            <p>타이머가 종료되었습니다.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleCloseAlertModal}>확인</Button>
          </Modal.Footer>
        </AlertModal>
      </PomodoroWrapper>
      {/* 오디오 요소를 추가하여 알림음을 재생하는 역할 수행 */}
      {selectedAlertSound && (
        <audio ref={audioRef} src={selectedAlertSound} preload="auto" />
      )}
    </StyledContainer>
  );
};

export default PomodoroTimer;
