import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { Modal, Button } from "react-bootstrap";

// 알림음 리스트를 정의해 줄테니, 네가 경로를 맞춰서 파일을 추가하면 돼.
const alertSounds = [
  { id: 1, name: "Sound 1", src: "path/to/sound1.mp3" },
  { id: 2, name: "Sound 2", src: "path/to/sound2.mp3" },
  // TODO: 더 많은 알림음 추가
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
  font-size: 16px;
  padding: 5px;
  margin-right: 10px;
`;

const CustomModal = styled(Modal)`
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
        margin-right: 30px;
        font-size: 26px;
        label {
          font-family: "MaplestoryBold";
        }
        select {
          width: 80px;
          height: 50px;
          font-size: 24px;
          text-align: center;
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
  }
`;

const PomodoroTimer = ({ selectedLang }: { selectedLang: string }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showAlertModal, setShowAlertModal] = useState<boolean>(false);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(25);
  const [seconds, setSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
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
    setHours(0);
    setMinutes(25);
    setSeconds(0);
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleSaveModal = () => {
    // 시간 설정 값과 알림음 저장 로직
    setShowModal(false);
  };

  const handleShowAlertModal = () => setShowAlertModal(true);
  const handleCloseAlertModal = () => setShowAlertModal(false);

  const handleAlertSoundChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // 알림음 선택 변경 로직
    setSelectedAlertSound(e.target.value);
  };

  const playAlertSound = () => {
    // TODO: 알림음 재생 로직을 구현해주세요.
    // selectedAlertSound 변수에 저장된 알림음 경로를 사용하여 알림음을 재생할 수 있습니다.
    console.log("알림음 재생!");
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
            <Modal.Title>{selectedLang === "ko"
                ? "설정"
                : selectedLang === "en"
                ? "Setting"
                : "設定"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div>
                <label>{selectedLang === "ko"
                ? "시간"
                : selectedLang === "en"
                ? "hour"
                : "時間"}</label>
                <select
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                >
                  {/* 시간 설정 옵션, 0 이상 선택 가능 */}
                  {Array.from({ length: 24 }, (_, i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>{selectedLang === "ko"
                ? "분"
                : selectedLang === "en"
                ? "min"
                : "分"}</label>
                <select
                  value={minutes}
                  onChange={(e) => setMinutes(Number(e.target.value))}
                >
                  {/* 분 설정 옵션, 0부터 59까지 선택 가능 */}
                  {Array.from({ length: 60 }, (_, i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>{selectedLang === "ko"
                ? "초"
                : selectedLang === "en"
                ? "sec"
                : "秒"}</label>
                <select
                  value={seconds}
                  onChange={(e) => setSeconds(Number(e.target.value))}
                >
                  {/* 초 설정 옵션, 0부터 59까지 선택 가능 */}
                  {Array.from({ length: 60 }, (_, i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* 알림음 선택 셀렉트 박스 */}
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
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              취소
            </Button>
            <Button variant="primary" onClick={handleSaveModal}>
              저장
            </Button>
          </Modal.Footer>
        </CustomModal>

        {/* 별개의 알림 모달 */}
        <Modal show={showAlertModal} onHide={handleCloseAlertModal}>
          <Modal.Header closeButton>
            <Modal.Title>타이머 종료</Modal.Title>
          </Modal.Header>
          <Modal.Body>타이머가 종료되었습니다.</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseAlertModal}>
              확인
            </Button>
          </Modal.Footer>
        </Modal>
      </PomodoroWrapper>
    </StyledContainer>
  );
};

export default PomodoroTimer;
