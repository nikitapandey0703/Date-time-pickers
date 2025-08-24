# Date & Time Picker Components

A comprehensive collection of modern, customizable date and time picker components for React applications. Built with a beautiful dark theme and full accessibility support.

## 🚀 Features

- **Multiple Picker Types**: Date only, Time only, Date & Time combined, and Date Range picker
- **Dark Theme Design**: Modern, sleek dark theme with smooth animations
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Keyboard Navigation**: Full keyboard accessibility support
- **Customizable Styling**: Easy to customize colors, sizes, and themes
- **Date Range Selection**: Select date ranges with visual feedback
- **Time Picker**: Precise time selection with hours, minutes, and seconds
- **Quick Presets**: Predefined date ranges for common use cases
- **Today Highlighting**: Current date is highlighted for easy reference
- **Month Navigation**: Easy navigation between months and years
- **Apply/Cancel Actions**: Confirm or cancel selections

## 📁 Project Structure

```
src/
├── components/
│   ├── DatePicker/
│   │   ├── DatePicker.jsx
│   │   └── DatePicker.css
│   ├── TimePicker/
│   │   ├── TimePicker.jsx
│   │   └── TimePicker.css
│   ├── DateTimePicker/
│   │   ├── DateTimePicker.jsx
│   │   └── DateTimePicker.css
│   └── DateRangePicker/
│       ├── DateRangePicker.jsx
│       └── DateRangePicker.css
├── assets/
│   └── icons.jsx
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

## 🛠️ Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd date-time-picker
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📦 Usage

### Date Picker Only

```jsx
import DatePicker from "./components/DatePicker/DatePicker";

function MyComponent() {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <DatePicker
      onDateSelect={setSelectedDate}
      selectedDate={selectedDate}
      placeholder="Select a date"
    />
  );
}
```

### Time Picker Only

```jsx
import TimePicker from "./components/TimePicker/TimePicker";

function MyComponent() {
  const [selectedTime, setSelectedTime] = useState(null);

  return (
    <TimePicker
      onTimeSelect={setSelectedTime}
      selectedTime={selectedTime}
      placeholder="Select time"
    />
  );
}
```

### Date & Time Picker

```jsx
import DateTimePicker from "./components/DateTimePicker/DateTimePicker";

function MyComponent() {
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  return (
    <DateTimePicker
      onDateTimeSelect={setSelectedDateTime}
      selectedDateTime={selectedDateTime}
      placeholder="Select date & time"
    />
  );
}
```

### Date Range Picker

```jsx
import DateRangePicker from "./components/DateRangePicker/DateRangePicker";

function MyComponent() {
  const [selectedRange, setSelectedRange] = useState(null);

  return (
    <DateRangePicker
      onRangeSelect={setSelectedRange}
      selectedRange={selectedRange}
      placeholder="Select date range"
    />
  );
}
```

## 🎨 Customization

### Props

#### DatePicker Props

- `onDateSelect`: Callback function when a date is selected
- `selectedDate`: Currently selected date (Date object)
- `placeholder`: Placeholder text for the input

#### TimePicker Props

- `onTimeSelect`: Callback function when time is selected
- `selectedTime`: Currently selected time (Date object)
- `placeholder`: Placeholder text for the input

#### DateTimePicker Props

- `onDateTimeSelect`: Callback function when date and time are selected
- `selectedDateTime`: Currently selected date and time (Date object)
- `placeholder`: Placeholder text for the input

#### DateRangePicker Props

- `onRangeSelect`: Callback function when a date range is selected
- `selectedRange`: Currently selected range (object with start and end Date objects)
- `placeholder`: Placeholder text for the input

### Styling

All components use CSS custom properties for easy theming. You can override the default styles by modifying the CSS files:

```css
/* Example: Change primary color */
:root {
  --primary-color: #007bff;
  --primary-hover: #0056b3;
  --background-color: #1a1a1a;
  --border-color: #333;
  --text-color: #ffffff;
  --text-muted: #888;
}
```

## 🎯 Features in Detail

### Date Picker

- Calendar grid with month navigation
- Today highlighting
- Previous/next month days display
- Keyboard navigation support
- Responsive design

### Time Picker

- Hours, minutes, and seconds selection
- Increment/decrement buttons
- Direct input support
- 24-hour format
- Apply/Cancel actions

### Date & Time Picker

- Combined date and time selection
- Integrated calendar and time inputs
- Synchronized date and time values
- Single component for complete datetime selection

### Date Range Picker

- Left panel with quick presets:
  - Today
  - Yesterday
  - Last week
  - Last month
  - Last 30 days
  - Custom
- Right panel with calendar
- Visual range selection
- Start and end date inputs
- Range highlighting

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Design System

### Colors

- **Primary**: #007bff (Blue)
- **Background**: #0a0a0a (Dark)
- **Surface**: #1a1a1a (Dark Gray)
- **Border**: #333 (Medium Gray)
- **Text**: #ffffff (White)
- **Text Muted**: #888 (Light Gray)

### Typography

- **Font Family**: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif
- **Font Sizes**: 12px, 14px, 16px, 18px, 24px, 32px
- **Font Weights**: 400, 500, 600, 700

### Spacing

- **Base Unit**: 4px
- **Common Spacings**: 8px, 12px, 16px, 20px, 24px, 32px, 40px

### Border Radius

- **Small**: 4px
- **Medium**: 8px
- **Large**: 12px

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📱 Responsive Design

The components are fully responsive and work on:

- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## ♿ Accessibility

- Full keyboard navigation support
- ARIA labels and roles
- Focus management
- Screen reader compatibility
- High contrast support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Icons from Lucide React
- Design inspiration from modern UI libraries
- Built with React and Vite

## 📞 Support

For support and questions, please open an issue on GitHub or contact the maintainers.

---

**Note**: This project uses React 19 and Vite for optimal performance and developer experience.
