import React, { useEffect, useState } from "react";
import "./RealtimeDualTimezone.css";

function getTimeInTimezone(timezone) {
  return new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: timezone,
  });
}

export default function RealtimeDualTimezone() {
  const [indiaTime, setIndiaTime] = useState(getTimeInTimezone("Asia/Kolkata"));
  const [ukTime, setUkTime] = useState(getTimeInTimezone("Europe/London"));

  useEffect(() => {
    const interval = setInterval(() => {
      setIndiaTime(getTimeInTimezone("Asia/Kolkata"));
      setUkTime(getTimeInTimezone("Europe/London"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dual-timezone-container">
      <div className="timezone-card">
        <h2 className="timezone-title">India</h2>
        <p className="timezone-time">{indiaTime}</p>
        <div>Asia/Kolkata</div>
      </div>
      <div className="timezone-card">
        <h2 className="timezone-title">UK</h2>
        <p className="timezone-time">{ukTime}</p>
        <div>Europe/London</div>
      </div>
    </div>
  );
}