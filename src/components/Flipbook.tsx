"use client";

import React from "react";
import HTMLFlipBook from "react-pageflip";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.mjs`;

function Flipbook({ pdfLink }: { pdfLink: string }) {
  const [numPages, setNumPages] = useState(5);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <div className="hidden md:flex">
        {/* @ts-ignore */}
        <HTMLFlipBook
          width={400}
          height={570}
          // className={""}
          // style={{}}
          // startPage={2}
          // size={"fixed"}
          // minWidth={0}
          // maxWidth={0}
          // minHeight={0}
          // maxHeight={0}
          // drawShadow={false}
          // flippingTime={0}
          // usePortrait={false}
          // startZIndex={0}
          // autoSize={false}
          // maxShadowOpacity={0}
          // showCover={false}
          // mobileScrollSupport={false}
          // clickEventForward={false}
          // useMouseEvents={false}
          // swipeDistance={0}
          showPageCorners={false}
          // disableFlipByClick={false}
        >
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
      <div className="flex md:hidden">
        {/* @ts-ignore */}
        <HTMLFlipBook
          width={320}
          height={500}
          // className={""}
          // style={{}}
          // startPage={2}
          // size={"fixed"}
          // minWidth={0}
          // maxWidth={0}
          // minHeight={0}
          // maxHeight={0}
          // drawShadow={false}
          // flippingTime={0}
          // usePortrait={false}
          // startZIndex={0}
          // autoSize={false}
          // maxShadowOpacity={0}
          // showCover={false}
          // mobileScrollSupport={false}
          // clickEventForward={false}
          // useMouseEvents={false}
          // swipeDistance={0}
          showPageCorners={false}
          // disableFlipByClick={false}
        >
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

export default Flipbook;