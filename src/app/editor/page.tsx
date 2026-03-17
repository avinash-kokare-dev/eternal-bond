
"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { Button } from '../../components/Button';
import { Editor } from '../../components/Editor';
import { TemplateRenderer } from '../../components/home/TemplateRenderer';
import { useApp } from '../../context/AppContext';
import { TRANSLATIONS } from '../../translations';
import * as htmlToImage from 'html-to-image';

export default function EditorPage() {
  const { biodata, setBiodata, resetBiodata, lang } = useApp();
  const [isExporting, setIsExporting] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  
  const t = TRANSLATIONS[lang];
  const navT = t.nav;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const previewScale = useMemo(() => {
    // On large screens, the preview takes up roughly half the container width (approx 600px - padding)
    const isLargeScreen = windowWidth >= 1024;
    const padding = windowWidth < 640 ? 32 : 80;
    const containerWidth = isLargeScreen ? (Math.min(windowWidth, 1280) / 2) - 40 : windowWidth - padding;
    const a4WidthPx = 794; 
    return Math.min(1, containerWidth / a4WidthPx);
  }, [windowWidth]);

  const handlePrint = () => window.print();

  const captureAsBlob = async (): Promise<Blob | null> => {
    const originalNode = document.getElementById('biodata-preview-container');
    if (!originalNode) return null;

    const captureArea = document.createElement('div');
    captureArea.style.position = 'fixed';
    captureArea.style.left = '-9999px';
    captureArea.style.top = '0';
    captureArea.style.zIndex = '-1000';
    captureArea.style.width = '794px';
    captureArea.style.height = '1123px';
    document.body.appendChild(captureArea);

    try {
      const clone = originalNode.cloneNode(true) as HTMLElement;
      clone.style.transform = 'none';
      clone.style.margin = '0';
      clone.style.boxShadow = 'none';
      clone.style.width = '794px';
      clone.style.minHeight = '1123px';
      clone.id = '';
      captureArea.appendChild(clone);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const blob = await htmlToImage.toBlob(clone, { 
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
      return blob;
    } catch (error) {
      console.error('Capture failed:', error);
      alert('Failed to capture the biodata image. Please try again.');
      return null;
    } finally {
      document.body.removeChild(captureArea);
    }
  };

  const handleSaveAsImage = async () => {
    setIsExporting(true);
    const blob = await captureAsBlob();
    if (blob) {
      const link = document.createElement('a');
      link.download = `${biodata.fullName.replace(/\s+/g, '_')}_Biodata.png`;
      link.href = URL.createObjectURL(blob);
      link.click();
      URL.revokeObjectURL(link.href);
    } else {
      alert('Could not capture biodata. Please try again.');
    }
    setIsExporting(false);
  };

  const handleShare = async () => {
    if (typeof navigator === 'undefined') return;

    if (!navigator.share) {
      alert('Your device or browser does not support the native share feature. We will download the image for you to share manually.');
      handleSaveAsImage();
      return;
    }

    setIsSharing(true);
    const blob = await captureAsBlob();
    
    if (blob) {
      const fileName = `${biodata.fullName.replace(/\s+/g, '_')}_Biodata.png`;
      const file = new File([blob], fileName, { type: 'image/png' });
      
      try {
        const shareData: ShareData = {
          title: `${biodata.fullName}'s Biodata`,
          text: `Check out this marriage biodata for ${biodata.fullName}. Crafted with EternalBond.`,
          files: [file],
        };

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share(shareData);
        } else {
          // Fallback for browsers that support share but not file sharing
          await navigator.share({
            title: shareData.title,
            text: shareData.text,
            url: window.location.href
          });
          alert('Direct image sharing not supported by your browser. We have downloaded the image for you instead.');
          handleSaveAsImage();
        }
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Share failed:', err);
          handleSaveAsImage();
        }
      }
    }
    setIsSharing(false);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6 lg:items-start">
      {/* Editor Section */}
      <div className="w-full lg:w-1/2 no-print bg-white rounded-1xl shadow-xl border border-stone-200 overflow-hidden animate-fade-in-up">
        <div className="p-6 bg-stone-50 border-b border-stone-200 flex justify-between items-center">
          {/* <h2 className="text-lg font-black uppercase tracking-widest text-stone-700">{navT.editor}</h2> */}
          <Button variant="danger" size="sm" onClick={resetBiodata} className="text-[10px]">{t.form.buttons.reset}</Button>
        </div>
        <Editor data={biodata} onChange={setBiodata} lang={lang} />
      </div>

      {/* Preview Section */}
      <div id="preview-section" className="w-full lg:w-1/2 flex flex-col gap-6 animate-fade-in-up lg:top-24">
        <div className="no-print bg-white p-6 rounded-1xl border border-stone-200 shadow-md flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-serif font-bold italic text-rose-600">Live Preview</h2>
            <p className="text-xs text-stone-400">Perfectly scaled for A4 printing.</p>
          </div>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-center">
            <Button 
              variant="outline" 
              size="md" 
              onClick={handleSaveAsImage} 
              disabled={isExporting} 
              className="flex-1 sm:flex-none text-[10px] h-11 font-black uppercase tracking-widest bg-white px-4"
            >
              {isExporting ? '...' : 'PNG'}
            </Button>
            
            <Button 
              variant="secondary" 
              size="md" 
              onClick={handleShare} 
              disabled={isSharing} 
              className="flex-1 sm:flex-none text-[10px] h-11 font-black uppercase tracking-widest gap-2 bg-stone-800 text-white hover:bg-stone-900 border-none px-4"
            >
              {isSharing ? '...' : 'Share'}
            </Button>

            <Button 
              variant="primary" 
              size="md" 
              onClick={handlePrint} 
              className="flex-1 sm:flex-none text-[10px] h-11 font-black uppercase tracking-widest shadow-xl px-6"
            >
              {t.form.buttons.savePdf}
            </Button>
          </div>
        </div>

          <div className="preview-wrapper flex justify-center items-start">
            <div 
              id="biodata-preview-container" 
              className="bg-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] flex-none" 
              style={{ 
                width: '794px', 
                minHeight: '1123px',
                transform: `scale(${previewScale})`,
                transformOrigin: 'top center',
                marginBottom: `${-(1123 * (1 - previewScale))}px`
              }}
            >
              <TemplateRenderer data={biodata} lang={lang} />
            </div>
          </div>
        {/* <div className="bg-stone-100 p-4 sm:p-4 rounded-[10px] flex justify-center items-start min-h-[500px] border-2 border-dashed border-stone-200 overflow-hidden">
        </div> */}
      </div>
    </main>
  );
}
