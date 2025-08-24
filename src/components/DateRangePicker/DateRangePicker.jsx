import React, { useState } from "react";
import "./DateRangePicker.css";
import { ChevronLeftIcon, ChevronRightIcon } from "../../assets/icons";

const DateRangePicker = ({
  onRangeSelect,
  selectedRange,
  placeholder = "Select Date Range",
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [displayRange, setDisplayRange] = useState(selectedRange || null);
  const [startDate, setStartDate] = useState(selectedRange?.start || null);
  const [endDate, setEndDate] = useState(selectedRange?.end || null);
  const [selectedPreset, setSelectedPreset] = useState("custom");

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

  const presets = [
    {
      id: "today",
      label: "Today",
      getRange: () => {
        const today = new Date();
        return { start: today, end: today };
      },
    },
    {
      id: "yesterday",
      label: "Yesterday",
      getRange: () => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return { start: yesterday, end: yesterday };
      },
    },
    {
      id: "lastWeek",
      label: "Last week",
      getRange: () => {
        const today = new Date();
        const lastWeek = new Date(today);
        lastWeek.setDate(today.getDate() - 7);
        return { start: lastWeek, end: today };
      },
    },
    {
      id: "lastMonth",
      label: "Last month",
      getRange: () => {
        const today = new Date();
        const lastMonth = new Date(today);
        lastMonth.setMonth(today.getMonth() - 1);
        return { start: lastMonth, end: today };
      },
    },
    {
      id: "last30Days",
      label: "Last 30 days",
      getRange: () => {
        const today = new Date();
        const last30Days = new Date(today);
        last30Days.setDate(today.getDate() - 30);
        return { start: last30Days, end: today };
      },
    },
    { id: "custom", label: "Custom", getRange: () => null },
  ];

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
    if (!startDate || (startDate && endDate)) {
      // Start new selection
      setStartDate(date);
      setEndDate(null);
    } else {
      // Complete the range
      if (date >= startDate) {
        setEndDate(date);
      } else {
        setStartDate(date);
        setEndDate(startDate);
      }
    }
  };

  const handlePresetClick = (preset) => {
    setSelectedPreset(preset.id);
    if (preset.id === "custom") {
      setStartDate(null);
      setEndDate(null);
      setDisplayRange(null);
    } else {
      const range = preset.getRange();
      setStartDate(range.start);
      setEndDate(range.end);
      setDisplayRange(range);
      onRangeSelect && onRangeSelect(range);
    }
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
    if (!startDate) return false;
    if (!endDate) {
      return (
        date.getDate() === startDate.getDate() &&
        date.getMonth() === startDate.getMonth() &&
        date.getFullYear() === startDate.getFullYear()
      );
    }
    return date >= startDate && date <= endDate;
  };

  const isStartDate = (date) => {
    return (
      startDate &&
      date.getDate() === startDate.getDate() &&
      date.getMonth() === startDate.getMonth() &&
      date.getFullYear() === startDate.getFullYear()
    );
  };

  const isEndDate = (date) => {
    return (
      endDate &&
      date.getDate() === endDate.getDate() &&
      date.getMonth() === endDate.getMonth() &&
      date.getFullYear() === endDate.getFullYear()
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
    if (startDate && endDate) {
      const range = { start: startDate, end: endDate };
      setDisplayRange(range);
      onRangeSelect && onRangeSelect(range);
    }
    setIsOpen(false);
  };

  const handleCancel = () => {
    if (selectedRange) {
      setStartDate(selectedRange.start);
      setEndDate(selectedRange.end);
      setDisplayRange(selectedRange);
    } else {
      setStartDate(null);
      setEndDate(null);
      setDisplayRange(null);
    }
    setIsOpen(false);
  };

  const getDisplayText = () => {
    if (displayRange) {
      return `${formatDate(displayRange.start)} - ${formatDate(
        displayRange.end
      )}`;
    }
    if (startDate && endDate) {
      return `${formatDate(startDate)} - ${formatDate(endDate)}`;
    }
    if (startDate) {
      return `${formatDate(startDate)} - To`;
    }
    return placeholder;
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="daterange-picker-container">
      <div
        className="daterange-picker-input"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={
            displayRange || startDate ? "daterange-value" : "placeholder"
          }
        >
          {getDisplayText()}
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
        <div className="daterange-picker-dropdown">
          <div className="daterange-picker-layout">
            {/* Left Panel - Presets */}
            <div className="presets-panel">
              <h3 className="presets-title">Quick Select</h3>
              <div className="presets-list">
                {presets.map((preset) => (
                  <button
                    key={preset.id}
                    className={`preset-item ${
                      selectedPreset === preset.id ? "selected" : ""
                    }`}
                    onClick={() => handlePresetClick(preset)}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Panel - Calendar */}
            <div className="calendar-panel">
              <div className="daterange-picker-header">
                <button
                  className="nav-button"
                  onClick={() => navigateMonth(-1)}
                >
                  <ChevronLeftIcon />
                </button>
                <span className="current-month">
                  {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                </span>
                <button className="nav-button" onClick={() => navigateMonth(1)}>
                  <ChevronRightIcon />
                </button>
              </div>

              <div className="date-range-inputs">
                <input
                  type="text"
                  value={startDate ? formatDate(startDate) : ""}
                  placeholder="Start Date"
                  readOnly
                  className="date-input"
                />
                <span className="date-separator">-</span>
                <input
                  type="text"
                  value={endDate ? formatDate(endDate) : "To"}
                  placeholder="To"
                  readOnly
                  className="date-input"
                />
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
                        isStartDate(day.date) ? "start-date" : ""
                      } ${isEndDate(day.date) ? "end-date" : ""} ${
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

              <div className="daterange-picker-actions">
                <button className="cancel-button" onClick={handleCancel}>
                  Cancel
                </button>
                <button className="apply-button" onClick={handleApply}>
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
