import React, { useState } from 'react';
import './NoticeBoard.css'; // Import CSS file for styling

const notices = [
  { id: 1, name: 'Notice 1', pdfUrl: '/path/to/notice1.pdf' },
  { id: 2, name: 'Notice 2', pdfUrl: '/path/to/notice2.pdf' },
  // Add more notices as needed
];

const NoticeBoard = () => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="notice-board">
      <div
        className={`notices-container ${isPaused ? 'paused' : ''}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {notices.map(notice => (
          <div key={notice.id} className="notice-item">
                                    <img src="https://e7.pngegg.com/pngimages/598/645/png-clipart-pdf-computer-icons-adobe-acrobat-algemene-voorwaarden-text-logo-thumbnail.png" alt="PDF Logo" className="pdf-logo" />

            <a href={notice.pdfUrl} target="_blank" rel="noopener noreferrer">{notice.name}</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoticeBoard;

