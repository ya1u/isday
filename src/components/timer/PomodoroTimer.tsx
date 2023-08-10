import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { Modal, Button } from "react-bootstrap";
import startIcon from "../../images/start_icon.png";
import pauseIcon from "../../images/pause_icon.png";
import alramIcon from "../../images/alram_icon.png";

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
  color: darkorange;
  background-color: #333333;
  margin: 52px;
  height: 200px;
  line-height: 200px;
  border-radius: 20px;
  p {
    position: relative;
    bottom: 200px;
    opacity: 0.2;
  }
`;

const ButtonContainer = styled.div`
  margin: 0 52px;
  align-items: center;
`;
interface StyledTitleProps {
  selectedLang: string;
}
interface TimerButtonProps {
  variant: "start" | "pause" | "reset" | "setting";
  onClick: () => void;
}

const CustomButton = styled.button<TimerButtonProps & StyledTitleProps>`
  width: 25%;
  height: 61px;
  border: none;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
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
  font-size: 16px;
  /* color: white; */
  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.5;
  }
  ${(props) =>
    props.variant === "start" &&
    css`
      border-top-left-radius: 15px;
      border-bottom-left-radius: 15px;
      background-color: grey;
      color: #fff;
    `}

  ${(props) =>
    props.variant === "pause" &&
    css`
      background-color: #333;
      color: #fff;
    `}

  ${(props) =>
    props.variant === "reset" &&
    css`
      background-color: grey;
      color: #fff;
    `}

  ${(props) =>
    props.variant === "setting" &&
    css`
      border-top-right-radius: 15px;
      border-bottom-right-radius: 15px;
      background-color: #333;
      color: #fff;
    `}

  img {
    width: 80%;
    height: auto;
  }
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
    display: flex;
    div {
      border: 1px solid lightgray;
      button {
        border: none;
        &:hover {
          opacity: 0.7;
        }
        &:active {
          opacity: 0.5;
        }
      }
    }
    label {
      margin: auto 10px;
      input {
        margin-right: 3px;
        :checked {
          width: 100px;
        }
      }
    }
  }
`;

const CustomModal = styled(Modal)<StyledTitleProps>`
  margin-top: 200px;
  /* 모달 헤더 스타일링 */
  .modal-header {
    background-color: darkcyan;
    border-bottom: none;
    padding: 15px 20px;
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
    margin: 0 10px;
    div:first-child {
      display: flex;
      justify-content: space-between;
      div {
        display: flex;
        flex-direction: column;
        font-size: 22px;
        label {
        }
        div {
          flex-direction: row;
          border: 1px solid lightgrey;
          button {
            border: none;
            &:hover {
              opacity: 0.8;
            }
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
      &:hover {
        opacity: 0.8;
      }
      &:active {
        opacity: 0.5;
      }
    }
    button:last-child {
      background-color: darkcyan;
      border: none;
      color: white;
      padding: 10px 30px;
      &:hover {
        opacity: 0.8;
      }
      &:active {
        opacity: 0.5;
      }
    }
  }
`;

const AlertModal = styled(Modal)<StyledTitleProps>`
  margin-top: 200px;
  /* 모달 헤더 스타일링 */
  .modal-header {
    font-family: "Jalnan", "MaplestoryBold";
    background-color: darkcyan;
    border-bottom: none;
    padding: 15px 20px;
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
      &:hover {
        opacity: 0.8;
      }
      &:active {
        background-color: darkcyan;
        opacity: 0.5;
      }
    }
  }
`;

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
  const [inputIsLooping, setInputIsLooping] = useState<boolean>(true);
  const [outputIsLooping, setOutputIsLooping] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLooping, setIsLooping] = useState<boolean>(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const alertSounds = [
    {
      id: 1,
      name: selectedLang === "ko" ? "알람소리 1" : selectedLang === "en" ? "Alarm 1" : selectedLang === "ja" ? "アラーム 1": "",
      src: "/alertSounds/alarm1.mp3",
    },
    {
      id: 2,
      name: selectedLang === "ko" ? "알람소리 2" : selectedLang === "en" ? "Alarm 2" : selectedLang === "ja" ? "アラーム 2": "",
      src: "/alertSounds/alarm2.mp3",
    },
    {
      id: 3,
      name: selectedLang === "ko" ? "알람소리 3" : selectedLang === "en" ? "Alarm 3" : selectedLang === "ja" ? "アラーム 3": "",
      src: "/alertSounds/alarm3.mp3",
    },
    {
      id: 4,
      name: selectedLang === "ko" ? "알람소리 4" : selectedLang === "en" ? "Alarm 4" : selectedLang === "ja" ? "アラーム 4": "",
      src: "/alertSounds/alarm4.mp3",
    },
    {
      id: 5,
      name: selectedLang === "ko" ? "뻐꾸기" : selectedLang === "en" ? "Cuckoo" : selectedLang === "ja" ? "カッコウ": "",
      src: "/alertSounds/cuckoo.mp3",
    },
    {
      id: 6,
      name: selectedLang === "ko" ? "초인종 1" : selectedLang === "en" ? "Doorbell 1" : selectedLang === "ja" ? "呼び鈴 1": "",
      src: "/alertSounds/doorbell1.mp3",
    },
    {
      id: 7,
      name: selectedLang === "ko" ? "초인종 2" : selectedLang === "en" ? "Doorbell 2" : selectedLang === "ja" ? "呼び鈴 2": "",
      src: "/alertSounds/doorbell2.mp3",
    },
    {
      id: 8,
      name: selectedLang === "ko" ? "노크 1" : selectedLang === "en" ? "Knock 1" : selectedLang === "ja" ? "ノック 1": "",
      src: "/alertSounds/Knock1.mp3",
    },
    {
      id: 9,
      name: selectedLang === "ko" ? "노크 2" : selectedLang === "en" ? "Knock 2" : selectedLang === "ja" ? "ノック 2": "",
      src: "/alertSounds/Knock2.mp3",
    },
    {
      id: 10,
      name: selectedLang === "ko" ? "노크 3" : selectedLang === "en" ? "Knock 3" : selectedLang === "ja" ? "ノック 3": "",
      src: "/alertSounds/Knock3.mp3",
    },
    {
      id: 11,
      name: selectedLang === "ko" ? "노크 4" : selectedLang === "en" ? "Knock 4" : selectedLang === "ja" ? "ノック 4": "",
      src: "/alertSounds/Knock4.mp3",
    },
    {
      id: 12,
      name: selectedLang === "ko" ? "신나는 음악 1" : selectedLang === "en" ? "Exciting Music 1" : selectedLang === "ja" ? "楽しい音楽 1": "",
      src: "/alertSounds/ExcitingMusic1.mp3",
    },
    {
      id: 13,
      name: selectedLang === "ko" ? "신나는 음악 2" : selectedLang === "en" ? "Exciting Music 2" : selectedLang === "ja" ? "楽しい音楽 2": "",
      src: "/alertSounds/ExcitingMusic2.mp3",
    },
    {
      id: 14,
      name: selectedLang === "ko" ? "신나는 음악 3" : selectedLang === "en" ? "Exciting Music 3" : selectedLang === "ja" ? "楽しい音楽 3": "",
      src: "/alertSounds/ExcitingMusic3.mp3",
    },
    {
      id: 15,
      name: selectedLang === "ko" ? "신나는 음악 4" : selectedLang === "en" ? "Exciting Music 4" : selectedLang === "ja" ? "楽しい音楽 4": "",
      src: "/alertSounds/ExcitingMusic4.mp3",
    },
    {
      id: 16,
      name: selectedLang === "ko" ? "신나는 음악 5" : selectedLang === "en" ? "Exciting Music 5" : selectedLang === "ja" ? "楽しい音楽 5": "",
      src: "/alertSounds/ExcitingMusic5.mp3",
    },
    {
      id: 17,
      name: selectedLang === "ko" ? "긍정적인 음악 1" : selectedLang === "en" ? "Positive Music 1" : selectedLang === "ja" ? "ポジティブな音楽 1": "",
      src: "/alertSounds/PositiveMusic1.mp3",
    },
    {
      id: 18,
      name: selectedLang === "ko" ? "긍정적인 음악 2" : selectedLang === "en" ? "Positive Music 2" : selectedLang === "ja" ? "ポジティブな音楽 2": "",
      src: "/alertSounds/PositiveMusic2.mp3",
    },
    {
      id: 19,
      name: selectedLang === "ko" ? "긍정적인 음악 3" : selectedLang === "en" ? "Positive Music 3" : selectedLang === "ja" ? "ポジティブな音楽 3": "",
      src: "/alertSounds/PositiveMusic3.mp3",
    },
    {
      id: 20,
      name: selectedLang === "ko" ? "긍정적인 음악 4" : selectedLang === "en" ? "Positive Music 4" : selectedLang === "ja" ? "ポジティブな音楽 4": "",
      src: "/alertSounds/PositiveMusic4.mp3",
    },
    {
      id: 21,
      name: selectedLang === "ko" ? "긍정적인 음악 5" : selectedLang === "en" ? "Positive Music 5" : selectedLang === "ja" ? "ポジティブな音楽 5": "",
      src: "/alertSounds/PositiveMusic5.mp3",
    },
  ];

  const [selectedAlertSound, setSelectedAlertSound] = useState<string>(
    alertSounds[0].src
  );

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
  }, [isRunning, hours, minutes, seconds, isLooping]);

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
    setInputIsLooping(outputIsLooping);
    setIsPlaying(false);
    audioRef.current?.pause();
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // 음악을 처음으로 되감기하여 정지
    }
    setShowModal(false);
  };
  const handleSaveModal = () => {
    setHours(inputHours);
    setMinutes(inputMinutes);
    setSeconds(inputSeconds);
    setIsLooping(inputIsLooping);
    setOutputHours(inputHours);
    setOutputMinutes(inputMinutes);
    setOutputSeconds(inputSeconds);
    setOutputIsLooping(inputIsLooping);
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

  const playAlertSound = () => {
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.loop = isLooping; // 여기서 isLooping 값을 설정함
      audioRef.current.play();
      audioRef.current.onended = () => {
        setIsPlaying(false);
      };
    }
  };

  const playPreviewAlertSound = () => {
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.loop = false;
      audioRef.current.play();
      audioRef.current.onended = () => {
        setIsPlaying(false);
      };
    }
  };

  // 알림음 일시정지 함수
  const pauseAlertSound = () => {
    setIsPlaying(false);
    audioRef.current?.pause();
    console.log("정지");
  };

  return (
    <StyledContainer>
      <PomodoroWrapper>
        {/* 타이머 컨테이너 */}
        <TimerContainer>
          <StyledTitle selectedLang={selectedLang}>
            {selectedLang === "ko"
              ? "온라인 타이머"
              : selectedLang === "en"
              ? "Online Timer"
              : "オンラインタイマー"}
          </StyledTitle>
          <TimeDisplay>
            {`${hours.toString().padStart(2, "0")}:${minutes
              .toString()
              .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}
            <p>88:88:88</p>
          </TimeDisplay>
          <ButtonContainer>
            <CustomButton
              selectedLang={selectedLang}
              variant="start"
              onClick={handleStartTimer}
            >
              {selectedLang === "ko"
                ? "시작"
                : selectedLang === "en"
                ? "Start"
                : "スタート"}
            </CustomButton>
            <CustomButton
              selectedLang={selectedLang}
              variant="pause"
              onClick={handlePauseTimer}
            >
              {selectedLang === "ko"
                ? "일시정지"
                : selectedLang === "en"
                ? "Pause"
                : "一時停止"}
            </CustomButton>
            <CustomButton
              selectedLang={selectedLang}
              variant="reset"
              onClick={handleResetTimer}
            >
              {selectedLang === "ko"
                ? "리셋"
                : selectedLang === "en"
                ? "Reset"
                : "リセット"}
            </CustomButton>
            <CustomButton
              selectedLang={selectedLang}
              variant="setting"
              onClick={handleShowModal}
            >
              {selectedLang === "ko"
                ? "설정"
                : selectedLang === "en"
                ? "Setting"
                : "設定"}
            </CustomButton>
          </ButtonContainer>
        </TimerContainer>

        {/* 기존 시간 설정 모달 */}
        <CustomModal
          selectedLang={selectedLang}
          show={showModal}
          onHide={handleCloseModal}
        >
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
                    {isPlaying ? (
                      <button onClick={pauseAlertSound}>
                        <img
                          src={pauseIcon}
                          width={40}
                          style={{ opacity: 1 }}
                          alt="Toggle Icon"
                        />
                      </button>
                    ) : (
                      <button onClick={playPreviewAlertSound}>
                        <img
                          src={startIcon}
                          width={40}
                          style={{ opacity: 1 }}
                          alt="Toggle Icon"
                        />
                      </button>
                    )}
                  </button>
                </div>
                <label>
                  <input
                    type="checkbox"
                    checked={inputIsLooping}
                    onChange={() => {
                      setInputIsLooping(!inputIsLooping);
                    }}
                  />
                  {selectedLang === "ko"
                    ? "반복재생"
                    : selectedLang === "en"
                    ? "Loop"
                    : "反復再生"}
                </label>
              </div>
            </AlertDiv>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleCloseModal}>
              {selectedLang === "ko"
                ? "취소"
                : selectedLang === "en"
                ? "Cancel"
                : "キャンセル"}
            </Button>
            <Button onClick={handleSaveModal}>
              {selectedLang === "ko"
                ? "저장"
                : selectedLang === "en"
                ? "Save"
                : "貯蔵"}
            </Button>
          </Modal.Footer>
        </CustomModal>

        {/* 별개의 알림 모달 */}
        <AlertModal
          selectedLang={selectedLang}
          show={showAlertModal}
          onHide={handleCloseAlertModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {selectedLang === "ko"
                ? "타이머 종료"
                : selectedLang === "en"
                ? "Timer termination"
                : "タイマー終了"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={alramIcon} alt="Toggle Icon" />
            <p>
              {selectedLang === "ko"
                ? "타이머가 종료되었습니다."
                : selectedLang === "en"
                ? "Timer has ended."
                : "タイマーが終了しました。"}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleCloseAlertModal}>
              {selectedLang === "ko"
                ? "확인"
                : selectedLang === "en"
                ? "Check"
                : "確認"}
            </Button>
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
