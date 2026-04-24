"use client";

import { pdfjs } from "react-pdf";

// Set worker IMMEDIATELY before anything else
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.4.296/pdf.worker.min.mjs`;
import dynamic from "next/dynamic";
import { useState, useRef } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

const HTMLFlipBook = dynamic(() => import("react-pageflip"), { ssr: false });
const PDFDocument = dynamic(() => import("react-pdf").then(mod => mod.Document), { ssr: false });
const PDFPage = dynamic(() => import("react-pdf").then(mod => mod.Page), { ssr: false });

export default function PdfFlipBook({ pdfExtrait, onClose }) {
  const [numPages, setNumPages] = useState(null);
  const [pdfLoading, setPdfLoading] = useState(true);
  const [pdfError, setPdfError] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const flipBookRef = useRef(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPdfLoading(false);
  };

  const onDocumentLoadError = () => {
    setPdfError(true);
    setPdfLoading(false);
  };

  const goToPreviousPage = () => {
    if (flipBookRef.current && currentPage > 0) {
      flipBookRef.current.pageFlip().flipPrev();
    }
  };

  const goToNextPage = () => {
    if (flipBookRef.current && numPages && currentPage < numPages - 1) {
      flipBookRef.current.pageFlip().flipNext();
    }
  };

  const onFlip = (e) => setCurrentPage(e.data);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4" onClick={e => e.stopPropagation()}>

      {pdfLoading && (
        <div className="text-white text-xl flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white mb-4" />
          Chargement du livre...
        </div>
      )}

      {pdfError && (
        <div className="text-white text-center">
          <p className="text-xl mb-4">Erreur lors du chargement du PDF</p>
          <p className="text-sm text-gray-400">Cliquez pour fermer et voir les images</p>
        </div>
      )}

      {/* Hidden loader — triggers onLoadSuccess/onLoadError */}
      <div className="hidden">
        <PDFDocument
          file={pdfExtrait}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading=""
        >
          <PDFPage pageNumber={1} width={380} />
        </PDFDocument>
      </div>

      {!pdfLoading && !pdfError && numPages && (
        <div className="flex flex-col items-center gap-4 max-w-2xl sm:mt-20 mb-10 px-4">
          <PDFDocument file={pdfExtrait} loading="">
            <HTMLFlipBook
              ref={flipBookRef}
              width={380}
              height={540}
              size="fixed"
              minWidth={300}
              maxWidth={400}
              minHeight={400}
              maxHeight={600}
              drawShadow={true}
              flippingTime={1000}
              usePortrait={true}
              startZIndex={0}
              autoSize={false}
              maxShadowOpacity={0.5}
              showCover={true}
              mobileScrollSupport={true}
              onFlip={onFlip}
              className="mx-auto drop-shadow-2xl"
              startPage={0}
              clickEventForward={true}
              useMouseEvents={true}
              swipeDistance={30}
              showPageCorners={true}
              disableFlipByClick={false}
            >
              {Array.from({ length: numPages }, (_, index) => (
                <div key={`page_${index + 1}`} className="page bg-white shadow-2xl">
                  <PDFPage
                    pageNumber={index + 1}
                    width={360}
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                    className="mx-auto"
                  />
                </div>
              ))}
            </HTMLFlipBook>
          </PDFDocument>

          {/* Navigation */}
          <div className="flex items-center gap-6 bg-white/10 backdrop-blur-sm rounded-full p-4 z-10">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 0}
              className="p-2.5 rounded-full bg-purple-600 hover:bg-purple-700 disabled:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <IoChevronBack className="size-5 text-white" />
            </button>
            <span className="text-purple-600 font-semibold px-6 py-2 bg-white rounded-full text-sm">
              {currentPage + 1} / {numPages}
            </span>
            <button
              onClick={goToNextPage}
              disabled={currentPage >= numPages - 1}
              className="p-2.5 rounded-full bg-purple-600 hover:bg-purple-700 disabled:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <IoChevronForward className="size-5 text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
