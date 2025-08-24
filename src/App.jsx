import React, { useState } from "react";
import "./App.css";
import DatePicker from "./components/DatePicker/DatePicker";
import TimePicker from "./components/TimePicker/TimePicker";
import DateTimePicker from "./components/DateTimePicker/DateTimePicker";
import DateRangePicker from "./components/DateRangePicker/DateRangePicker";

function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [selectedRange, setSelectedRange] = useState(null);

  const formatDate = (date) => {
    if (!date) return "Not selected";
    return date.toLocaleDateString();
  };

  const formatTime = (time) => {
    if (!time) return "Not selected";
    return time.toLocaleTimeString();
  };

  const formatDateTime = (dateTime) => {
    if (!dateTime) return "Not selected";
    return dateTime.toLocaleString();
  };

  const formatRange = (range) => {
    if (!range) return "Not selected";
    return `${formatDate(range.start)} to ${formatDate(range.end)}`;
  };

  return (
    <div className="app">
      <div className="app-header">
        <h1>Date & Time Picker Components</h1>
        <p>
          A comprehensive collection of date and time picker components for
          React
        </p>
      </div>

      <div className="app-content">
        <div className="picker-section">
          <h2>Date Picker Only</h2>
          <p>Select only a date without time</p>
          <div className="picker-demo">
            <DatePicker
              onDateSelect={setSelectedDate}
              selectedDate={selectedDate}
              placeholder="Select a date"
            />
            <div className="selected-value">
              <strong>Selected:</strong> {formatDate(selectedDate)}
            </div>
          </div>
        </div>

        <div className="picker-section">
          <h2>Time Picker Only</h2>
          <p>Select only time without date</p>
          <div className="picker-demo">
            <TimePicker
              onTimeSelect={setSelectedTime}
              selectedTime={selectedTime}
              placeholder="Select time"
            />
            <div className="selected-value">
              <strong>Selected:</strong> {formatTime(selectedTime)}
            </div>
          </div>
        </div>

        <div className="picker-section">
          <h2>Date & Time Picker</h2>
          <p>Select both date and time together</p>
          <div className="picker-demo">
            <DateTimePicker
              onDateTimeSelect={setSelectedDateTime}
              selectedDateTime={selectedDateTime}
              placeholder="Select date & time"
            />
            <div className="selected-value">
              <strong>Selected:</strong> {formatDateTime(selectedDateTime)}
            </div>
          </div>
        </div>

        <div className="picker-section">
          <h2>Date Range Picker</h2>
          <p>Select a date range with quick presets</p>
          <div className="picker-demo">
            <DateRangePicker
              onRangeSelect={setSelectedRange}
              selectedRange={selectedRange}
              placeholder="Select date range"
            />
            <div className="selected-value">
              <strong>Selected:</strong> {formatRange(selectedRange)}
            </div>
          </div>
        </div>
      </div>

      <div className="app-footer">
        <h3>Features</h3>
        <ul>
          <li>✅ Dark theme design</li>
          <li>✅ Responsive layout</li>
          <li>✅ Keyboard navigation</li>
          <li>✅ Customizable styling</li>
          <li>✅ Date range selection</li>
          <li>✅ Time picker with hours, minutes, seconds</li>
          <li>✅ Quick preset options</li>
          <li>✅ Today highlighting</li>
          <li>✅ Month navigation</li>
          <li>✅ Apply/Cancel actions</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
