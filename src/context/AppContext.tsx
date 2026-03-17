
"use client";
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Biodata, BlogPost } from '../types';
import { Language } from '../translations';
import { INITIAL_BIODATA } from '../constants';

export type Page = 'home' | 'editor' | 'blog' | 'privacy' | 'contact' | 'blog-post' | 'about' | 'templates';

interface AppContextType {
  biodata: Biodata;
  setBiodata: React.Dispatch<React.SetStateAction<Biodata>>;
  resetBiodata: () => void;
  lang: Language;
  setLang: React.Dispatch<React.SetStateAction<Language>>;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  selectedPost: BlogPost | null;
  setSelectedPost: (post: BlogPost | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'eternalbond_draft';
const LANG_KEY = 'eternalbond_lang';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('en');
  const [biodata, setBiodata] = useState<Biodata>(INITIAL_BIODATA);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data on mount
  useEffect(() => {
    const savedLang = localStorage.getItem(LANG_KEY) as Language;
    if (savedLang) setLang(savedLang);

    const savedDraft = localStorage.getItem(STORAGE_KEY);
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        // Basic validation to ensure we have a valid object
        if (parsed && typeof parsed === 'object' && parsed.fullName !== undefined) {
          setBiodata(parsed);
        }
      } catch (e) {
        console.error("Error parsing saved draft", e);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save changes to local storage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(LANG_KEY, lang);
    }
  }, [lang, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(biodata));
    }
  }, [biodata, isLoaded]);

  const resetBiodata = useCallback(() => {
    if (window.confirm("Are you sure you want to reset all form data? This cannot be undone.")) {
      setBiodata(INITIAL_BIODATA);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <AppContext.Provider value={{ 
      biodata, 
      setBiodata, 
      resetBiodata,
      lang, 
      setLang, 
      currentPage, 
      setCurrentPage,
      selectedPost,
      setSelectedPost
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within an AppProvider");
  return context;
};
