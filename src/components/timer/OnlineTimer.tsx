import React, { useState, useEffect, useRef } from "react";
import styles from "../../styles/OnlineTimer.module.css";
import styled from "styled-components";
import { Modal, Button } from "react-bootstrap";
import startIcon from "../../images/start_icon.png";
import pauseIcon from "../../images/pause_icon.png";
import alramIcon from "../../images/alram_icon.png";
// import Head from "next/head";

interface TimerButtonProps {
  variant: "start" | "pause" | "reset" | "setting";
  onClick: () => void;
}

const CustomButton = styled.button<TimerButtonProps>`
  font-family: 'Jalnan';
  background-color: ${({ variant }) =>
    variant === "pause" || variant === "setting" ? "#333" : "grey"};
  color: #fff;
  border-top-left-radius: ${({ variant }) =>
    variant === "start" ? "15px" : "0"};
  border-bottom-left-radius: ${({ variant }) =>
    variant === "start" ? "15px" : "0"};
  border-top-right-radius: ${({ variant }) =>
    variant === "setting" ? "15px" : "0"};
  border-bottom-right-radius: ${({ variant }) =>
    variant === "setting" ? "15px" : "0"};
`;

const OnlineTimer = () => {
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
      name: "알람소리 1",
      src: "/alertSounds/alarm1.mp3",
    },
    {
      id: 2,
      name: "알람소리 2",
      src: "/alertSounds/alarm2.mp3",
    },
    {
      id: 3,
      name: "알람소리 3",
      src: "/alertSounds/alarm3.mp3",
    },
    {
      id: 4,
      name: "알람소리 4",
      src: "/alertSounds/alarm4.mp3",
    },
    {
      id: 5,
      name: "뻐꾸기",
      src: "/alertSounds/cuckoo.mp3",
    },
    {
      id: 6,
      name: "초인종 1",
      src: "/alertSounds/doorbell1.mp3",
    },
    {
      id: 7,
      name: "초인종 2",
      src: "/alertSounds/doorbell2.mp3",
    },
    {
      id: 8,
      name: "노크 1",
      src: "/alertSounds/Knock1.mp3",
    },
    {
      id: 9,
      name: "노크 2",
      src: "/alertSounds/Knock2.mp3",
    },
    {
      id: 10,
      name: "노크 3",
      src: "/alertSounds/Knock3.mp3",
    },
    {
      id: 11,
      name: "노크 4",
      src: "/alertSounds/Knock4.mp3",
    },
    {
      id: 12,
      name: "신나는 음악 1",
      src: "/alertSounds/ExcitingMusic1.mp3",
    },
    {
      id: 13,
      name: "신나는 음악 2",
      src: "/alertSounds/ExcitingMusic2.mp3",
    },
    {
      id: 14,
      name: "신나는 음악 3",
      src: "/alertSounds/ExcitingMusic3.mp3",
    },
    {
      id: 15,
      name: "신나는 음악 4",
      src: "/alertSounds/ExcitingMusic4.mp3",
    },
    {
      id: 16,
      name: "신나는 음악 5",
      src: "/alertSounds/ExcitingMusic5.mp3",
    },
    {
      id: 17,
      name: "긍정적인 음악 1",
      src: "/alertSounds/PositiveMusic1.mp3",
    },
    {
      id: 18,
      name: "긍정적인 음악 2",
      src: "/alertSounds/PositiveMusic2.mp3",
    },
    {
      id: 19,
      name: "긍정적인 음악 3",
      src: "/alertSounds/PositiveMusic3.mp3",
    },
    {
      id: 20,
      name: "긍정적인 음악 4",
      src: "/alertSounds/PositiveMusic4.mp3",
    },
    {
      id: 21,
      name: "긍정적인 음악 5",
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

  // const handleShowAlertModal = () => setShowAlertModal(true);
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
    <div className={styles.Container}>
      {/* <Head>
        <title>온라인 타이머</title>
        <meta name="url" content="https://isday.net/onlinetimer/" />
        <meta name="description" content="온라인 타이머는 사용자가 시간을 효과적으로 관리하고 일정을 조절하는 데 도움을 줍니다. 이 페이지를 사용하여 사용자는 원하는 시간을 설정하고 타이머를 시작하여 지정된 시간 동안 작업을 집중하거나 휴식을 취할 수 있습니다."/>
        <meta property="og:title" content="온라인 타이머 - isDay.net"/>
        <meta property="og:description" content="온라인 타이머는 사용자가 시간을 효과적으로 관리하고 일정을 조절하는 데 도움을 줍니다. 이 페이지를 사용하여 사용자는 원하는 시간을 설정하고 타이머를 시작하여 지정된 시간 동안 작업을 집중하거나 휴식을 취할 수 있습니다."/>
      </Head> */}
      <div>
        <div className={styles.TimerContainer}>
          <div className={styles.Title}>온라인 타이머</div>
          <div className={styles.TimeDisplay}>
            {`${hours.toString().padStart(2, "0")}:${minutes
              .toString()
              .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}
            <p className={styles.ShadowTime}>88:88:88</p>
          </div>
          <div className={styles.ButtonContainer}>
            <CustomButton className={styles.CustomButton} variant="start" onClick={handleStartTimer}>
              시작
            </CustomButton>
            <CustomButton className={styles.CustomButton} variant="pause" onClick={handlePauseTimer}>
              일시정지
            </CustomButton>
            <CustomButton className={styles.CustomButton} variant="reset" onClick={handleResetTimer}>
              리셋
            </CustomButton>
            <CustomButton className={styles.CustomButton} variant="setting" onClick={handleShowModal}>
              설정
            </CustomButton>
          </div>
        </div>

        {/* 기존 시간 설정 모달 */}
        <Modal
          className={styles.SettingModal}
          show={showModal}
          onHide={handleCloseModal}
        >
          <Modal.Header className={styles.ModalHeader}>
            <Modal.Title className={styles.ModalTitle}>설정</Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles.ModalBody}>
            <div className={styles.TimeSetContainer}>
              <div className={styles.Hour}>
                <label>시간</label>
                <div className={styles.TimeSet}>
                  <button
                    className={styles.TimeSetBtn}
                    onClick={() => decreaseTime("hours")}
                  >
                    &lt;
                  </button>
                  <select
                    className={styles.TimeSelect}
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
                  <button
                    className={styles.TimeSetBtn}
                    onClick={() => increaseTime("hours")}
                  >
                    &gt;
                  </button>
                </div>
              </div>
              <div className={styles.Min}>
                <label>분</label>
                <div className={styles.TimeSet}>
                  <button
                    className={styles.TimeSetBtn}
                    onClick={() => decreaseTime("minutes")}
                  >
                    &lt;
                  </button>
                  <select
                    className={styles.TimeSelect}
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
                  <button
                    className={styles.TimeSetBtn}
                    onClick={() => increaseTime("minutes")}
                  >
                    &gt;
                  </button>
                </div>
              </div>
              <div className={styles.Sec}>
                <label>초</label>
                <div className={styles.TimeSet}>
                  <button
                    className={styles.TimeSetBtn}
                    onClick={() => decreaseTime("seconds")}
                  >
                    &lt;
                  </button>
                  <select
                    className={styles.TimeSelect}
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
                  <button
                    className={styles.TimeSetBtn}
                    onClick={() => increaseTime("seconds")}
                  >
                    &gt;
                  </button>
                </div>
              </div>
            </div>

            {/* 알림음 선택 셀렉트 박스 */}
            <div className={styles.SoundSetContainer}>
              <div className={styles.Sound}>알림음</div>
              <div className={styles.SoundSet}>
                <div className={styles.SoundOption}>
                  <select
                    className={styles.SoundSelect}
                    value={selectedAlertSound}
                    onChange={handleAlertSoundChange}
                  >
                    {alertSounds.map((sound) => (
                      <option key={sound.id} value={sound.src}>
                        {sound.name}
                      </option>
                    ))}
                  </select>
                  {isPlaying ? (
                    <button className={styles.TogleBtn} onClick={pauseAlertSound}>
                      <div className={styles.CenteredImageContainer}>
                        <img
                          className={styles.ToggleIcon}
                          src={pauseIcon}
                          alt="Toggle Icon"
                        />
                      </div>
                    </button>
                  ) : (
                    <button className={styles.TogleBtn} onClick={playPreviewAlertSound}>
                      <div className={styles.CenteredImageContainer}>
                        <img
                          className={styles.ToggleIcon}
                          src={startIcon}
                          alt="Toggle Icon"
                        />
                      </div>
                    </button>
                  )}
                </div>
                <label className={styles.CheckBox}>
                  <input
                    className={styles.CheckBoxInput}
                    type="checkbox"
                    checked={inputIsLooping}
                    onChange={() => {
                      setInputIsLooping(!inputIsLooping);
                    }}
                  />반복재생</label>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className={styles.ModalFooter}>
            <Button className={styles.CancelBtn} onClick={handleCloseModal}>취소</Button>
            <Button className={styles.SaveBtn} onClick={handleSaveModal}>저장</Button>
          </Modal.Footer>
        </Modal>

        {/* 별개의 알림 모달 */}
        <Modal 
          className={styles.AlarmModal}
          show={showAlertModal}
          onHide={handleCloseAlertModal}
        >
          <Modal.Header className={styles.ModalHeader}>
            <Modal.Title className={styles.ModalTitle}>타이머 종료</Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles.ModalBody}>
            <img src={alramIcon} alt="Toggle Icon" />
            <p className={styles.Ment}>타이머가 종료되었습니다.</p>
          </Modal.Body>
          <Modal.Footer className={styles.ModalFooter}>
            <Button className={styles.CheckBtn} onClick={handleCloseAlertModal}>확인</Button>
          </Modal.Footer>
        </Modal>
      </div>
      {selectedAlertSound && (
        <audio ref={audioRef} src={selectedAlertSound} preload="auto" />
      )}
    </div>
  );
};

export default OnlineTimer;
