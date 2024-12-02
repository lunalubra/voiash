"use client";

import React, { useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import dynamic from "next/dynamic";
import Arrow from "../images/Arrow";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import CloseIcon from "../images/CloseIcon";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;

function Flipbook({ pdfLink }: { pdfLink: string }) {
  const [numPages, setNumPages] = useState(5);
  const flipbookRef = useRef<any>(null);
  const handle = useFullScreenHandle();

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  function handleGoNext() {
    flipbookRef.current.pageFlip().flipNext();
  }

  function handleGoPrev() {
    flipbookRef.current.pageFlip().flipPrev();
  }

  if (typeof window === "undefined") return;

  return (
    <div className="w-full flex items-center justify-center">
      <div className="hidden md:flex w-full flex-col items-center justify-center gap-4">
        <FullScreen handle={handle}>
          <div className="flex items-center justify-center gap-4 min-w-[1000px] w-full h-full bg-white relative">
            {handle.active && (
              <div
                onClick={handle.exit}
                className="[&_path]:stroke-brand-beige-300 absolute top-16 right-16 z-50"
              >
                <CloseIcon />
              </div>
            )}

            <div onClick={handleGoPrev}>
              <Arrow />
            </div>
            {!handle.active && (
              <>
                {/* @ts-ignore */}
                <HTMLFlipBook
                  ref={flipbookRef}
                  width={400}
                  height={570}
                  showPageCorners={false}
                  // style={undefined}
                  // startPage={0}
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
                    <div key={pNum} className="w-full">
                      <Document
                        onError={console.log}
                        file={pdfLink}
                        onLoadSuccess={onDocumentLoadSuccess}
                      >
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
              </>
            )}
            {handle.active && (
              <>
                {/* @ts-ignore */}
                <HTMLFlipBook
                  ref={flipbookRef}
                  width={600}
                  height={849}
                  showPageCorners={false}
                  // style={undefined}
                  // startPage={0}
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
                    <div key={pNum} className="w-full">
                      <Document
                        file={pdfLink}
                        onLoadSuccess={onDocumentLoadSuccess}
                        onError={console.log}
                      >
                        <div>
                          <Page
                            pageNumber={pNum + 1}
                            width={600}
                            height={849}
                            renderAnnotationLayer={false}
                            renderTextLayer={false}
                          />
                        </div>
                      </Document>
                    </div>
                  ))}
                </HTMLFlipBook>
              </>
            )}
            <div onClick={handleGoNext} className="rotate-180">
              <Arrow />
            </div>
          </div>
        </FullScreen>
        <button
          onClick={handle.enter}
          className="text-brand-beige-300 font-martel"
        >
          Ver más
        </button>
      </div>
      <div className="flex md:hidden w-full items-center justify-center">
        {/* @ts-ignore */}
        <HTMLFlipBook
          className={""}
          style={{}}
          startPage={0}
          size={"fixed"}
          minWidth={0}
          maxWidth={0}
          minHeight={0}
          maxHeight={0}
          drawShadow={false}
          usePortrait={false}
          startZIndex={0}
          autoSize={false}
          maxShadowOpacity={0}
          showCover={false}
          clickEventForward={false}
          useMouseEvents={false}
          swipeDistance={0}
          disableFlipByClick={false}
          mobileScrollSupport={true}
          width={320}
          height={500}
          showPageCorners={false}
        >
          {[...Array(numPages).keys()].map((pNum) => (
            <div key={pNum}>
              <Document
                onError={console.log}
                file={pdfLink}
                onLoadSuccess={onDocumentLoadSuccess}
              >
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
