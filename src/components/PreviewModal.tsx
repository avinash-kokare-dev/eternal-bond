
import React, { useMemo, useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { TemplateRenderer } from './home/TemplateRenderer';
import { Button } from './Button';
import * as htmlToImage from 'html-to-image';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({ isOpen, onClose }) => {
  const { biodata, lang } = useApp();
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    }
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      document.body.style.overflow = 'unset';
      document.body.style.touchAction = 'auto';
    };
  }, [isOpen]);

  const previewScale = useMemo(() => {
    // Tighter margins for mobile to maximize visibility
    const isMobile = windowSize.width < 640;
    const horizontalPadding = isMobile ? 24 : 80;
    const verticalPadding = isMobile ? 120 : 160;
    
    const availableWidth = windowSize.width - horizontalPadding;
    const availableHeight = windowSize.height - verticalPadding;
    
    const a4WidthPx = 794;
    const a4HeightPx = 1123;
    
    const scaleX = availableWidth / a4WidthPx;
    const scaleY = availableHeight / a4HeightPx;
    
    // Ensure we don't scale up past 1, but scale down as much as needed
    return Math.min(1, scaleX, scaleY);
  }, [windowSize, isOpen]);

  const handleDownload = async () => {
    const node = document.getElementById('modal-preview-container');
    if (!node) return;
    setIsExporting(true);
    try {
      const dataUrl = await htmlToImage.toPng(node, {
        width: 794,
        height: 1123,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        cacheBust: true,
        style: {
          transform: 'none',
          margin: '0',
        }
      });
      const link = document.createElement('a');
      link.download = `${biodata.fullName || 'Biodata'}_EternalBond.png`;
      link.href = dataUrl;
      link.click();
    } catch (e) {
      console.error('Download failed', e);
      alert('Failed to generate image. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-0 no-print">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl transition-opacity animate-fade-in" 
        onClick={onClose}
      />
      
      {/* Content Wrapper */}
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        
        {/* Action Controls - Positioned for thumb reach on mobile */}
        <div className="absolute top-6 right-6 sm:top-8 sm:right-8 flex gap-3 pointer-events-auto z-[310]">
          <Button 
            variant="gold" 
            size="sm" 
            onClick={(e) => { e.stopPropagation(); handleDownload(); }} 
            disabled={isExporting}
            className="shadow-2xl h-12 px-6 rounded-2xl border border-white/10"
          >
            {isExporting ? '...' : (
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                PNG
              </span>
            )}
          </Button>
          
          <button 
            onClick={onClose}
            className="w-12 h-12 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-2xl flex items-center justify-center transition-all backdrop-blur-md shadow-2xl active:scale-90"
            aria-label="Close Preview"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scaled Preview Container */}
        <div 
          className="flex-none pointer-events-auto animate-fade-in-up"
          style={{ 
            width: '794px', 
            height: '1123px',
            transform: `scale(${previewScale})`,
            transformOrigin: 'center center',
            transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
        >
          <div 
            id="modal-preview-container"
            className="w-full h-full bg-white shadow-[0_60px_150px_-30px_rgba(0,0,0,0.8)] rounded-sm overflow-hidden"
          >
            <TemplateRenderer data={biodata} lang={lang} />
          </div>
        </div>

        {/* Mobile Helper Text */}
        <div className="absolute bottom-8 text-white/40 text-[10px] font-black uppercase tracking-[0.3em] pointer-events-none sm:hidden">
          Pinch to zoom not supported
        </div>
      </div>
      
      <style>{`
        @keyframes fade-in { 
          from { opacity: 0; } 
          to { opacity: 1; } 
        }
        @keyframes fade-in-up { 
          from { opacity: 0; transform: scale(0.9) translateY(20px); } 
          to { opacity: 1; transform: scale(${previewScale}) translateY(0); } 
        }
      `}</style>
    </div>
  );
};
