"use client";

import React from "react";
import HTMLFlipBook from "react-pageflip";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import dynamic from "next/dynamic";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.mjs`;

function Flipbook({ pdfLink }: { pdfLink: string }) {
  const [numPages, setNumPages] = useState(5);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div className="w-full flex items-center justify-center">
      <div className="hidden md:flex w-full items-center justify-center">
        {/* @ts-ignore */}
        <HTMLFlipBook width={400} height={570} showPageCorners={false}>
          {[...Array(numPages).keys()].map((pNum) => (
            <div key={pNum}>
              <Document file={pdfLink} onLoadSuccess={onDocumentLoadSuccess}>
                <div>
                  <Page
                    pageNumber={pNum + 1}
                    width={400}
                    height={570}
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                  />
                </div>
              </Document>
            </div>
          ))}
        </HTMLFlipBook>
      </div>
      <div className="flex md:hidden w-full items-center justify-center">
        {/* @ts-ignore */}
        <HTMLFlipBook width={320} height={500} showPageCorners={false}>
          {[...Array(numPages).keys()].map((pNum) => (
            <div key={pNum}>
              <Document file={pdfLink} onLoadSuccess={onDocumentLoadSuccess}>
                <div>
                  <Page
                    pageNumber={pNum + 1}
                    width={320}
                    height={500}
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                  />
                </div>
              </Document>
            </div>
          ))}
        </HTMLFlipBook>
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Flipbook), {
  ssr: false
});
