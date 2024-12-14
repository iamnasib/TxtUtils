import React, { useState } from "react";
export default function TextForm(props) {
  const [text, setText] = useState("");
  const [uppercase, setUppercase] = useState(false);

  const handleClearClick = () => {
    setText("");
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
  };
  const handleFormatClick = (event) => {
    if (uppercase === true) {
      setText(text.toLowerCase());
      setUppercase(false);
    } else {
      setText(text.toUpperCase());
      setUppercase(true);
    }
  };

  const handleCopyClick = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text);
      props.showAlert("Text Copied", "success");
    } else {
      // Fallback: Use a temporary text area
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        props.showAlert("Text Copied", "success");
      } catch (err) {
        console.error("Fallback: Failed to copy text", err);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="flex flex-col max-w-sm mx-auto gap-4 p-2">
      <label
        htmlFor="message"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Your text
      </label>
      <textarea
        id="message"
        value={text}
        onChange={handleOnChange}
        rows="4"
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 
        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Enter your text..."></textarea>
      <div className="flex flex-row">
        <button
          type="button"
          onClick={handleClearClick}
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium 
        rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
          C
        </button>
        <button
          type="button"
          onClick={handleFormatClick}
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium 
        rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
          {uppercase ? "Convert To lowercase" : "Convert To uppercase"}
        </button>{" "}
        <button
          type="button"
          disabled={text.trim() === ""}
          onClick={handleCopyClick}
          className={`text-white ${
            text.trim() === ""
              ? "bg-gray-500 dark:bg-gray-900"
              : "bg-gray-800 dark:bg-gray-800 hover:bg-gray-900 dark:hover:bg-gray-700"
          } focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium 
        rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-gray-700 dark:border-gray-700`}>
          Copy text
        </button>
      </div>

      <div className="flex flex-col">
        <h4 className="block mb-2 text-medium font-medium text-gray-900 dark:text-white">
          Text Summary
        </h4>
        <p className="block mb-2 text-sm font-normal text-gray-900 dark:text-white">
          {text.trim() === "" ? 0 : text.trim().split(/\s+/).length} Words and{" "}
          {text.trim() === "" ? 0 : text.trim().replace(/\s+/g, " ").length}{" "}
          characters
        </p>
        <p className="block mb-2 text-sm font-normal text-gray-900 dark:text-white">
          {0.008 * (text.trim() === "" ? 0 : text.trim().split(/\s+/).length)}{" "}
          minutes read.
        </p>
      </div>
    </div>
  );
}
