import React from "react";
import ResumeUploadForm from "../Component/ResumeUploadForm";

const UploadResume = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Upload Candidate Resume
        </h2>
        <ResumeUploadForm />
      </div>
    </div>
  );
};

export default UploadResume;
