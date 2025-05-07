import React from "react";

function Avatar({
  children,
  backgroundColor,
  px,
  py,
  borderRadius,
  padding,
  fontSize,
  cursor,
  color,
}) {
  const style = {
    backgroundColor,
    padding: `${py} ${px}`,
    color: color || "black",
    borderRadius,
    fontSize,
    textAlign: "center",
    cursor: cursor || null,
    textDecoration: "none",
    marginLeft: "10px",
  };
  return (
    <div>
      <div style={style}>{children}</div>
    </div>
  );
}

export default Avatar;
