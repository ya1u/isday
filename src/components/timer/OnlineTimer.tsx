import React, { useState, useEffect, useRef } from "react";
import styles from "../../styles/OnlineTimer.module.css";
import styled from "styled-components";
import { Modal, Button } from "react-bootstrap";
import startIcon from "../../images/start_icon.png";
import pauseIcon from "../../images/pause_icon.png";
import alramIcon from "../../images/alram_icon.png";
import { getLanguageStyle } from "../../App";
import { Helmet } from "react-helmet-async";

interface StyledTitleProps {
  selectedLang: string;
}

interface TimerButtonProps {
  variant: "start" | "pause" | "reset" | "setting";
  onClick: () => void;
}

const StyledTitle = styled.div<StyledTitleProps>`
  ${(props) => getLanguageStyle(props.selectedLang)}
`;

const ButtonContainer = styled.div<StyledTitleProps>`
  ${(props) => getLanguageStyle(props.selectedLang)}
`;

const CustomButton = styled.button<TimerButtonProps>`
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

interface PomodoroTimerProps {
  selectedLang: string;
}

const OnlineTimer: React.FC<PomodoroTimerProps> = ({ selectedLang }) => {
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
      name:
        selectedLang === "ko"
          ? "알람소리 1"
          : selectedLang === "en"
          ? "Alarm 1"
          : selectedLang === "ja"
          ? "アラーム 1"
          : "",
      src: "/alertSounds/alarm1.mp3",
    },
    {
      id: 2,
      name:
        selectedLang === "ko"
          ? "알람소리 2"
          : selectedLang === "en"
          ? "Alarm 2"
          : selectedLang === "ja"
          ? "アラーム 2"
          : "",
      src: "/alertSounds/alarm2.mp3",
    },
    {
      id: 3,
      name:
        selectedLang === "ko"
          ? "알람소리 3"
          : selectedLang === "en"
          ? "Alarm 3"
          : selectedLang === "ja"
          ? "アラーム 3"
          : "",
      src: "/alertSounds/alarm3.mp3",
    },
    {
      id: 4,
      name:
        selectedLang === "ko"
          ? "알람소리 4"
          : selectedLang === "en"
          ? "Alarm 4"
          : selectedLang === "ja"
          ? "アラーム 4"
          : "",
      src: "/alertSounds/alarm4.mp3",
    },
    {
      id: 5,
      name:
        selectedLang === "ko"
          ? "뻐꾸기"
          : selectedLang === "en"
          ? "Cuckoo"
          : selectedLang === "ja"
          ? "カッコウ"
          : "",
      src: "/alertSounds/cuckoo.mp3",
    },
    {
      id: 6,
      name:
        selectedLang === "ko"
          ? "초인종 1"
          : selectedLang === "en"
          ? "Doorbell 1"
          : selectedLang === "ja"
          ? "呼び鈴 1"
          : "",
      src: "/alertSounds/doorbell1.mp3",
    },
    {
      id: 7,
      name:
        selectedLang === "ko"
          ? "초인종 2"
          : selectedLang === "en"
          ? "Doorbell 2"
          : selectedLang === "ja"
          ? "呼び鈴 2"
          : "",
      src: "/alertSounds/doorbell2.mp3",
    },
    {
      id: 8,
      name:
        selectedLang === "ko"
          ? "노크 1"
          : selectedLang === "en"
          ? "Knock 1"
          : selectedLang === "ja"
          ? "ノック 1"
          : "",
      src: "/alertSounds/Knock1.mp3",
    },
    {
      id: 9,
      name:
        selectedLang === "ko"
          ? "노크 2"
          : selectedLang === "en"
          ? "Knock 2"
          : selectedLang === "ja"
          ? "ノック 2"
          : "",
      src: "/alertSounds/Knock2.mp3",
    },
    {
      id: 10,
      name:
        selectedLang === "ko"
          ? "노크 3"
          : selectedLang === "en"
          ? "Knock 3"
          : selectedLang === "ja"
          ? "ノック 3"
          : "",
      src: "/alertSounds/Knock3.mp3",
    },
    {
      id: 11,
      name:
        selectedLang === "ko"
          ? "노크 4"
          : selectedLang === "en"
          ? "Knock 4"
          : selectedLang === "ja"
          ? "ノック 4"
          : "",
      src: "/alertSounds/Knock4.mp3",
    },
    {
      id: 12,
      name:
        selectedLang === "ko"
          ? "신나는 음악 1"
          : selectedLang === "en"
          ? "Exciting Music 1"
          : selectedLang === "ja"
          ? "楽しい音楽 1"
          : "",
      src: "/alertSounds/ExcitingMusic1.mp3",
    },
    {
      id: 13,
      name:
        selectedLang === "ko"
          ? "신나는 음악 2"
          : selectedLang === "en"
          ? "Exciting Music 2"
          : selectedLang === "ja"
          ? "楽しい音楽 2"
          : "",
      src: "/alertSounds/ExcitingMusic2.mp3",
    },
    {
      id: 14,
      name:
        selectedLang === "ko"
          ? "신나는 음악 3"
          : selectedLang === "en"
          ? "Exciting Music 3"
          : selectedLang === "ja"
          ? "楽しい音楽 3"
          : "",
      src: "/alertSounds/ExcitingMusic3.mp3",
    },
    {
      id: 15,
      name:
        selectedLang === "ko"
          ? "신나는 음악 4"
          : selectedLang === "en"
          ? "Exciting Music 4"
          : selectedLang === "ja"
          ? "楽しい音楽 4"
          : "",
      src: "/alertSounds/ExcitingMusic4.mp3",
    },
    {
      id: 16,
      name:
        selectedLang === "ko"
          ? "신나는 음악 5"
          : selectedLang === "en"
          ? "Exciting Music 5"
          : selectedLang === "ja"
          ? "楽しい音楽 5"
          : "",
      src: "/alertSounds/ExcitingMusic5.mp3",
    },
    {
      id: 17,
      name:
        selectedLang === "ko"
          ? "긍정적인 음악 1"
          : selectedLang === "en"
          ? "Positive Music 1"
          : selectedLang === "ja"
          ? "ポジティブな音楽 1"
          : "",
      src: "/alertSounds/PositiveMusic1.mp3",
    },
    {
      id: 18,
      name:
        selectedLang === "ko"
          ? "긍정적인 음악 2"
          : selectedLang === "en"
          ? "Positive Music 2"
          : selectedLang === "ja"
          ? "ポジティブな音楽 2"
          : "",
      src: "/alertSounds/PositiveMusic2.mp3",
    },
    {
      id: 19,
      name:
        selectedLang === "ko"
          ? "긍정적인 음악 3"
          : selectedLang === "en"
          ? "Positive Music 3"
          : selectedLang === "ja"
          ? "ポジティブな音楽 3"
          : "",
      src: "/alertSounds/PositiveMusic3.mp3",
    },
    {
      id: 20,
      name:
        selectedLang === "ko"
          ? "긍정적인 음악 4"
          : selectedLang === "en"
          ? "Positive Music 4"
          : selectedLang === "ja"
          ? "ポジティブな音楽 4"
          : "",
      src: "/alertSounds/PositiveMusic4.mp3",
    },
    {
      id: 21,
      name:
        selectedLang === "ko"
          ? "긍정적인 음악 5"
          : selectedLang === "en"
          ? "Positive Music 5"
          : selectedLang === "ja"
          ? "ポジティブな音楽 5"
          : "",
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
      <Helmet>
        <title>
          {selectedLang == "en"
            ? "Online Timer"
            : selectedLang == "ja"
            ? "オンラインタイマー"
            : "온라인 타이머"}
        </title>
        <meta name="url" content="https://isday.net/onlinetimer/" />
        <meta 
          name="description" 
          content={
            selectedLang == "en"
              ? "Online timers help users effectively manage their time and reschedule. Use this page to allow users to set the desired time and start a timer to concentrate on their work or relax for a break for a specified time."
              : selectedLang == "ja"
              ? "オンライン タイマーは、ユーザが時間とスケジュールを効果的に管理するのに役立ちます。 このページを使用すると、ユーザは目的の時間を設定し、タイマーを起動して作業に集中したり、指定した時間の休憩を取ることができます。"
              : "온라인 타이머는 사용자가 시간을 효과적으로 관리하고 일정을 조절하는 데 도움을 줍니다. 이 페이지를 사용하여 사용자는 원하는 시간을 설정하고 타이머를 시작하여 지정된 시간 동안 작업을 집중하거나 휴식을 취할 수 있습니다."
          }
        />
      </Helmet>
      <div>
        <div className={styles.TimerContainer}>
          <StyledTitle className={styles.Title} selectedLang={selectedLang}>
            {selectedLang === "ko"
              ? "온라인 타이머"
              : selectedLang === "en"
              ? "Online Timer"
              : "オンラインタイマー"}
          </StyledTitle>
          <div className={styles.TimeDisplay}>
            {`${hours.toString().padStart(2, "0")}:${minutes
              .toString()
              .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}
            <p className={styles.ShadowTime}>88:88:88</p>
          </div>
          <ButtonContainer
            className={styles.ButtonContainer}
            selectedLang={selectedLang}
          >
            <CustomButton
              className={styles.CustomButton}
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
              className={styles.CustomButton}
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
              className={styles.CustomButton}
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
              className={styles.CustomButton}
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
        </div>

        {/* 기존 시간 설정 모달 */}
        <Modal
          className={styles.SettingModal}
          selectedLang={selectedLang}
          show={showModal}
          onHide={handleCloseModal}
        >
          <Modal.Header className={styles.ModalHeader}>
            <Modal.Title className={styles.ModalTitle}>
              {selectedLang === "ko"
                ? "설정"
                : selectedLang === "en"
                ? "Setting"
                : "設定"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles.ModalBody}>
            <div className={styles.TimeSetContainer}>
              <div className={styles.Hour}>
                <label>
                  {selectedLang === "ko"
                    ? "시간"
                    : selectedLang === "en"
                    ? "Hour"
                    : "時間"}
                </label>
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
                <label>
                  {selectedLang === "ko"
                    ? "분"
                    : selectedLang === "en"
                    ? "Min"
                    : "分"}
                </label>
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
                <label>
                  {selectedLang === "ko"
                    ? "초"
                    : selectedLang === "en"
                    ? "Sec"
                    : "秒"}
                </label>
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
              <div className={styles.Sound}>
                {selectedLang === "ko"
                  ? "알림음"
                  : selectedLang === "en"
                  ? "Sound"
                  : "通知音"}
              </div>
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
                  />
                  {selectedLang === "ko"
                    ? "반복재생"
                    : selectedLang === "en"
                    ? "Loop"
                    : "反復再生"}
                </label>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className={styles.ModalFooter}>
            <Button className={styles.CancelBtn} onClick={handleCloseModal}>
              {selectedLang === "ko"
                ? "취소"
                : selectedLang === "en"
                ? "Cancel"
                : "キャンセル"}
            </Button>
            <Button className={styles.SaveBtn} onClick={handleSaveModal}>
              {selectedLang === "ko"
                ? "저장"
                : selectedLang === "en"
                ? "Save"
                : "貯蔵"}
            </Button>
          </Modal.Footer>
        </Modal>

        {/* 별개의 알림 모달 */}
        <Modal 
          className={styles.AlarmModal}
          show={showAlertModal}
          onHide={handleCloseAlertModal}
        >
          <Modal.Header className={styles.ModalHeader}>
            <Modal.Title className={styles.ModalTitle}>
              {selectedLang === "ko"
                ? "타이머 종료"
                : selectedLang === "en"
                ? "Timer termination"
                : "タイマー終了"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles.ModalBody}>
            <img src={alramIcon} alt="Toggle Icon" />
            <p className={styles.Ment}>
              {selectedLang === "ko"
                ? "타이머가 종료되었습니다."
                : selectedLang === "en"
                ? "Timer has ended."
                : "タイマーが終了しました。"}
            </p>
          </Modal.Body>
          <Modal.Footer className={styles.ModalFooter}>
            <Button className={styles.CheckBtn} onClick={handleCloseAlertModal}>
              {selectedLang === "ko"
                ? "확인"
                : selectedLang === "en"
                ? "Check"
                : "確認"}
            </Button>
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
