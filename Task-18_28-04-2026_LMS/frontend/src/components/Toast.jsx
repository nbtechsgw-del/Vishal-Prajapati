import React from "react";

export const Toast = ({ message, type, visible }) => {
  if (!visible) return null;

  return <div className={`toast ${type}`}>{message}</div>;
};

export default Toast;
