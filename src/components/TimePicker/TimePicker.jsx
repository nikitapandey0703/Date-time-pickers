import React, { useState } from "react";
import "./TimePicker.css";
import { ChevronUpIcon, ChevronDownIcon } from "../../assets/icons";

const TimePicker = ({
  onTimeSelect,
  selectedTime,
  placeholder = "Select Time",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [displayTime, setDisplayTime] = useState(selectedTime || null);
  const [hours, setHours] = useState(
    selectedTime ? selectedTime.getHours() : 0
  );
  const [minutes, setMinutes] = useState(
    selectedTime ? selectedTime.getMinutes() : 0
  );
  const [seconds, setSeconds] = useState(
    selectedTime ? selectedTime.getSeconds() : 0
  );

  const formatTime = (time) => {
    if (!time) return "";
    const h = time.getHours().toString().padStart(2, "0");
    const m = time.getMinutes().toString().padStart(2, "0");
    const s = time.getSeconds().toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const handleTimeChange = (type, value) => {
    let newHours = hours;
    let newMinutes = minutes;
    let newSeconds = seconds;

    switch (type) {
      case "hours":
        newHours = Math.max(0, Math.min(23, value));
        setHours(newHours);
        break;
      case "minutes":
        newMinutes = Math.max(0, Math.min(59, value));
        setMinutes(newMinutes);
        break;
      case "seconds":
        newSeconds = Math.max(0, Math.min(59, value));
        setSeconds(newSeconds);
        break;
      default:
        break;
    }

    const newTime = new Date();
    newTime.setHours(newHours, newMinutes, newSeconds);
    setDisplayTime(newTime);
    onTimeSelect && onTimeSelect(newTime);
  };

  const increment = (type) => {
    switch (type) {
      case "hours":
        handleTimeChange("hours", hours + 1);
        break;
      case "minutes":
        handleTimeChange("minutes", minutes + 1);
        break;
      case "seconds":
        handleTimeChange("seconds", seconds + 1);
        break;
      default:
        break;
    }
  };

  const decrement = (type) => {
    switch (type) {
      case "hours":
        handleTimeChange("hours", hours - 1);
        break;
      case "minutes":
        handleTimeChange("minutes", minutes - 1);
        break;
      case "seconds":
        handleTimeChange("seconds", seconds - 1);
        break;
      default:
        break;
    }
  };

  const handleInputChange = (type, value) => {
    const numValue = parseInt(value) || 0;
    handleTimeChange(type, numValue);
  };

  const handleApply = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    if (selectedTime) {
      setHours(selectedTime.getHours());
      setMinutes(selectedTime.getMinutes());
      setSeconds(selectedTime.getSeconds());
      setDisplayTime(selectedTime);
    } else {
      setHours(0);
      setMinutes(0);
      setSeconds(0);
      setDisplayTime(null);
    }
    setIsOpen(false);
  };

  return (
    <div className="time-picker-container">
      <div className="time-picker-input" onClick={() => setIsOpen(!isOpen)}>
        <span className={displayTime ? "time-value" : "placeholder"}>
          {displayTime ? formatTime(displayTime) : placeholder}
        </span>
        <svg
          className="clock-icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.71 15.18L12.61 13.33C12.07 13.01 11.63 12.24 11.63 11.61V7.51001"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {isOpen && (
        <div className="time-picker-dropdown">
          <div className="time-picker-content">
            <div className="time-inputs">
              <div className="time-input-group">
                <button
                  className="time-nav-button"
                  onClick={() => increment("hours")}
                >
                  <ChevronUpIcon />
                </button>
                <input
                  type="number"
                  min="0"
                  max="23"
                  value={hours.toString().padStart(2, "0")}
                  onChange={(e) => handleInputChange("hours", e.target.value)}
                  className="time-input"
                />
                <button
                  className="time-nav-button"
                  onClick={() => decrement("hours")}
                >
                  <ChevronDownIcon />
                </button>
              </div>

              <span className="time-separator">:</span>

              <div className="time-input-group">
                <button
                  className="time-nav-button"
                  onClick={() => increment("minutes")}
                >
                  <ChevronUpIcon />
                </button>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={minutes.toString().padStart(2, "0")}
                  onChange={(e) => handleInputChange("minutes", e.target.value)}
                  className="time-input"
                />
                <button
                  className="time-nav-button"
                  onClick={() => decrement("minutes")}
                >
                  <ChevronDownIcon />
                </button>
              </div>

              <span className="time-separator">:</span>

              <div className="time-input-group">
                <button
                  className="time-nav-button"
                  onClick={() => increment("seconds")}
                >
                  <ChevronUpIcon />
                </button>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={seconds.toString().padStart(2, "0")}
                  onChange={(e) => handleInputChange("seconds", e.target.value)}
                  className="time-input"
                />
                <button
                  className="time-nav-button"
                  onClick={() => decrement("seconds")}
                >
                  <ChevronDownIcon />
                </button>
              </div>
            </div>

            <div className="time-labels">
              <span className="time-label">Hours</span>
              <span className="time-label">Minutes</span>
              <span className="time-label">Seconds</span>
            </div>
          </div>

          <div className="time-picker-actions">
            <button className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
            <button className="apply-button" onClick={handleApply}>
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimePicker;
