import React, { useState } from "react";
import "./DateTimePicker.css";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "../../assets/icons";

const DateTimePicker = ({
  onDateTimeSelect,
  selectedDateTime,
  placeholder = "Select Date & Time",
}) => {
  const [currentDate, setCurrentDate] = useState(
    selectedDateTime || new Date()
  );
  const [isOpen, setIsOpen] = useState(false);
  const [displayDateTime, setDisplayDateTime] = useState(
    selectedDateTime || null
  );
  const [hours, setHours] = useState(
    selectedDateTime ? selectedDateTime.getHours() : 0
  );
  const [minutes, setMinutes] = useState(
    selectedDateTime ? selectedDateTime.getMinutes() : 0
  );
  const [seconds, setSeconds] = useState(
    selectedDateTime ? selectedDateTime.getSeconds() : 0
  );

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days = [];

    // Add days from previous month
    const prevMonth = new Date(year, month - 1, 0);
    const prevMonthDays = prevMonth.getDate();
    for (let i = startingDay - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthDays - i),
        isCurrentMonth: false,
      });
    }

    // Add days from current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }

    // Add days from next month
    const remainingDays = 42 - days.length; // 6 rows * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }

    return days;
  };

  const handleDateClick = (date) => {
    const newDateTime = new Date(date);
    newDateTime.setHours(hours, minutes, seconds);
    setCurrentDate(newDateTime);
    setDisplayDateTime(newDateTime);
    onDateTimeSelect && onDateTimeSelect(newDateTime);
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

    const newDateTime = new Date(currentDate);
    newDateTime.setHours(newHours, newMinutes, newSeconds);
    setDisplayDateTime(newDateTime);
    onDateTimeSelect && onDateTimeSelect(newDateTime);
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

  const navigateMonth = (direction) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const formatDateTime = (dateTime) => {
    if (!dateTime) return "";
    const day = dateTime.getDate().toString().padStart(2, "0");
    const month = months[dateTime.getMonth()];
    const year = dateTime.getFullYear();
    const h = dateTime.getHours().toString().padStart(2, "0");
    const m = dateTime.getMinutes().toString().padStart(2, "0");
    const s = dateTime.getSeconds().toString().padStart(2, "0");
    return `${day}-${month}-${year} ${h}:${m}:${s}`;
  };

  const isSelectedDate = (date) => {
    return (
      displayDateTime &&
      date.getDate() === displayDateTime.getDate() &&
      date.getMonth() === displayDateTime.getMonth() &&
      date.getFullYear() === displayDateTime.getFullYear()
    );
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const handleApply = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    if (selectedDateTime) {
      setCurrentDate(selectedDateTime);
      setHours(selectedDateTime.getHours());
      setMinutes(selectedDateTime.getMinutes());
      setSeconds(selectedDateTime.getSeconds());
      setDisplayDateTime(selectedDateTime);
    } else {
      const now = new Date();
      setCurrentDate(now);
      setHours(now.getHours());
      setMinutes(now.getMinutes());
      setSeconds(now.getSeconds());
      setDisplayDateTime(null);
    }
    setIsOpen(false);
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="datetime-picker-container">
      <div className="datetime-picker-input" onClick={() => setIsOpen(!isOpen)}>
        <span className={displayDateTime ? "datetime-value" : "placeholder"}>
          {displayDateTime ? formatDateTime(displayDateTime) : placeholder}
        </span>
        <svg
          className="calendar-clock-icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5 4.5 3 8 3H16C19.5 3 21 5 21 8.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
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
        <div className="datetime-picker-dropdown">
          <div className="datetime-picker-header">
            <button className="nav-button" onClick={() => navigateMonth(-1)}>
              <ChevronLeftIcon />
            </button>
            <span className="current-month">
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
            <button className="nav-button" onClick={() => navigateMonth(1)}>
              <ChevronRightIcon />
            </button>
          </div>

          <div className="calendar-grid">
            <div className="days-header">
              {daysOfWeek.map((day) => (
                <div key={day} className="day-header">
                  {day}
                </div>
              ))}
            </div>
            <div className="days-grid">
              {days.map((day, index) => (
                <button
                  key={index}
                  className={`day-cell ${
                    !day.isCurrentMonth ? "other-month" : ""
                  } ${isSelectedDate(day.date) ? "selected" : ""} ${
                    isToday(day.date) ? "today" : ""
                  }`}
                  onClick={() => handleDateClick(day.date)}
                  disabled={!day.isCurrentMonth}
                >
                  {day.date.getDate()}
                </button>
              ))}
            </div>
          </div>

          <div className="time-picker-section">
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

          <div className="datetime-picker-actions">
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

export default DateTimePicker;
