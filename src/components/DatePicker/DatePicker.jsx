import React, { useState } from "react";
import "./DatePicker.css";
import { ChevronLeftIcon, ChevronRightIcon } from "../../assets/icons";

const DatePicker = ({
  onDateSelect,
  selectedDate,
  placeholder = "Select Date",
}) => {
  const [currentDate, setCurrentDate] = useState(selectedDate || new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [displayDate, setDisplayDate] = useState(selectedDate || null);

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
    setDisplayDate(date);
    setIsOpen(false);
    onDateSelect && onDateSelect(date);
  };

  const navigateMonth = (direction) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const formatDate = (date) => {
    if (!date) return "";
    const day = date.getDate().toString().padStart(2, "0");
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const isSelectedDate = (date) => {
    return (
      displayDate &&
      date.getDate() === displayDate.getDate() &&
      date.getMonth() === displayDate.getMonth() &&
      date.getFullYear() === displayDate.getFullYear()
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

  const days = getDaysInMonth(currentDate);

  return (
    <div className="date-picker-container">
      <div className="date-picker-input" onClick={() => setIsOpen(!isOpen)}>
        <span className={displayDate ? "date-value" : "placeholder"}>
          {displayDate ? formatDate(displayDate) : placeholder}
        </span>
        <svg
          className="calendar-icon"
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
        </svg>
      </div>

      {isOpen && (
        <div className="date-picker-dropdown">
          <div className="date-picker-header">
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
        </div>
      )}
    </div>
  );
};

export default DatePicker;
