import React, { useState, useRef } from 'react';

const HighlighterApp = () => {
  const [highlightedWords, setHighlightedWords] = useState([]);
  const [currentColor, setCurrentColor] = useState('yellow'); // Default color
  const [isEraserMode, setIsEraserMode] = useState(false);
  const chartRef = useRef(null);

  const handleHighlight = (event) => {
    if (isEraserMode) return; // Do not highlight if in eraser mode

    // Ensure that the event target is not a button
    if (event.target.tagName === 'BUTTON') return;

    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    if (selectedText !== '') {
      const range = selection.getRangeAt(0);
      const span = document.createElement('span');
      span.style.backgroundColor = currentColor; // Use current color
      span.appendChild(range.extractContents());
      range.insertNode(span);
      span.onclick = () => {
        if (isEraserMode) {
          handleRemoveHighlight(span);
        }
      };
      setHighlightedWords([...highlightedWords, { text: selectedText, color: currentColor, element: span }]);
    }
  };

  const changeColor = (color) => {
    setCurrentColor(color);
    setIsEraserMode(false); // Disable eraser mode when changing color
  };

  const enableEraserMode = () => {
    setIsEraserMode(true);
  };

  const handleRemoveHighlight = (element) => {
    const parent = element.parentNode;
    while (element.firstChild) {
      parent.insertBefore(element.firstChild, element);
    }
    parent.removeChild(element);
    setHighlightedWords(highlightedWords.filter(word => word.element !== element));
  };

  const handleClick = (e) => {
    if (isEraserMode && e.target.tagName === 'SPAN') {
      handleRemoveHighlight(e.target);
    }
  };

  // Count highlighted words for each color
  const yellowCount = highlightedWords.filter((word) => word.color === 'yellow').length;
  const cyanCount = highlightedWords.filter((word) => word.color === 'cyan').length;

  return (
    <div onMouseUp={handleHighlight} onClick={handleClick}>
      <button onClick={() => changeColor('yellow')}>Yellow</button>
      <button onClick={() => changeColor('cyan')}>Cyan</button>
      <button onClick={enableEraserMode}>Eraser</button>
      <div>
        <p>Yellow highlights: {yellowCount}</p>
        <p>Cyan highlights: {cyanCount}</p>
      </div>
      <div ref={chartRef}>
        {/* Your text content here */}
        <p>Although Ashley has limited credit history, she has a strong portfolio and a growing client base, which indicates her potential for success in her freelance graphic design business. Lenders may be willing to consider her application based on her skills, experience, and potential income from her clients.</p>
      </div>
    </div>
  );
};

export default HighlighterApp;
