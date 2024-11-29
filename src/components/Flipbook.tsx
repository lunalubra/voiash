"use client";

import React, { useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import dynamic from "next/dynamic";
import Arrow from "../images/Arrow";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;

function Flipbook({ pdfLink }: { pdfLink: string }) {
  const [numPages, setNumPages] = useState(5);
  const flipbookRef = useRef<any>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  function handleGoNext() {
    console.log(flipbookRef.current.pageFlip());
    flipbookRef.current.pageFlip().flipNext();
  }

  function handleGoPrev() {
    flipbookRef.current.pageFlip().flipPrev();
  }

  return (
    <div className="w-full flex items-center justify-center">
      <div className="hidden md:flex w-full items-center justify-center gap-4">
        <div onClick={handleGoPrev}>
          <Arrow />
        </div>
        {/* @ts-ignore */}
        <HTMLFlipBook
          ref={flipbookRef}
          width={400}
          height={570}
          showPageCorners={false}
          // className={""}
          // style={undefined}
          // startPage={0}
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
        <div onClick={handleGoNext} className="rotate-180">
          <Arrow />
        </div>
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
