import React from "react";

const ResumeViewerModal = ({ resumeUrl, onClose }) => {
  if (!resumeUrl) return null;
  // console.log(resumeUrl, "resume");
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-hidden relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl font-bold"
        >
          ×
        </button>

        <div className="p-4 text-center border-b font-semibold">
          Resume Viewer
        </div>

        {/* PDF Viewer */}
        <iframe
          src={`http://localhost:4545/${resumeUrl}`}
          allowFullScreen
          title="Resume"
          width="400%"
          height="900px"
          className="border-none"
        ></iframe>
      </div>
    </div>
  );
};

export default ResumeViewerModal;
