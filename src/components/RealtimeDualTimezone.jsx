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

function getTimeStatus(timezone) {
  const hour = parseInt(
    new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      hour12: false,
      timeZone: timezone,
    }),
    10
  );

  if (hour >= 5 && hour < 12) return "🌅 Morning";
  if (hour >= 12 && hour < 17) return "☀️ Afternoon";
  if (hour >= 17 && hour < 21) return "🌇 Evening";
  return "🌙 Night";
}

export default function RealtimeDualTimezone() {
  const [indiaTime, setIndiaTime] = useState(getTimeInTimezone("Asia/Kolkata"));
  const [ukTime, setUkTime] = useState(getTimeInTimezone("Europe/London"));
  const [indiaStatus, setIndiaStatus] = useState(getTimeStatus("Asia/Kolkata"));
  const [ukStatus, setUkStatus] = useState(getTimeStatus("Europe/London"));

  useEffect(() => {
    const interval = setInterval(() => {
      setIndiaTime(getTimeInTimezone("Asia/Kolkata"));
      setUkTime(getTimeInTimezone("Europe/London"));
      setIndiaStatus(getTimeStatus("Asia/Kolkata"));
      setUkStatus(getTimeStatus("Europe/London"));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

 return (
  <div className="dual-timezone-container">
    <div className="timezone-card">
      <h2 className="timezone-title">India</h2>
      <p className="timezone-time">{indiaTime}</p>
      <div className="timezone-status">{indiaStatus}</div>
      <div>Asia/Kolkata</div>
    </div>
    <div className="timezone-card">
      <h2 className="timezone-title">UK</h2>
      <p className="timezone-time">{ukTime}</p>
      <div className="timezone-status">{ukStatus}</div>
      <div>Europe/London</div>
    </div>
  </div>
);

}
