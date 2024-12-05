import React from 'react';
import Link from 'next/link';
import Navbar from '../components/navbar';

const PdfViewer = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar />
      {/* PDF Viewer */}
      <div className="container mx-auto mt-8">
        <iframe
          src="/christopher_devops.pdf"
          width="100%"
          height="800px"
          className="border-2 border-gray-300"
        ></iframe>
      </div>
    </div>
  );
};

export default PdfViewer;