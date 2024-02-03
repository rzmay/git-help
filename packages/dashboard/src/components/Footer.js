import React from "react";

const MyComponent = () => {
  // Add the script tag to the document
  const script = document.createElement("script");
  script.src = "http://localhost:7000/embed/?key=Flying-Abdoul-2QC7A-iavnQ-Cg4Tgqsjr&user=testuser";
  document.head.appendChild(script);

  return <div>This is my component</div>;
};

export default MyComponent;