"use client";
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import Script from 'next/script';

interface LinguWidgetProps {
  apiKey: string;
  baseURL?: string;
  className?: string;
}

const LinguWidget = ({ 
  apiKey, 
  baseURL = 'https://lingu.vodertech.com/api',
  className = "lingu-chat-container" 
}: LinguWidgetProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetInstanceRef = useRef<any>(null);
  const scriptLoadedRef = useRef(false);

  const initializeWidget = () => {
    if (!containerRef.current || !apiKey || !(window as any).LinguWidget || scriptLoadedRef.current) return;
    
    try {
      // Clean up existing widget if any
      if (widgetInstanceRef.current) {
        widgetInstanceRef.current.destroy?.();
      }

      // Create new widget instance
      widgetInstanceRef.current = new (window as any).LinguWidget({
        apiKey,
        baseURL
      });

      // Mount the widget
      widgetInstanceRef.current.mount(containerRef.current.id);
      scriptLoadedRef.current = true;
    } catch (error) {
      console.error('Failed to initialize Lingu widget:', error);
    }
  };

  useEffect(() => {
    // Make React and ReactDOM available globally for the UMD widget
    if (typeof window !== 'undefined') {
      (window as any).React = React;
      (window as any).ReactDOM = ReactDOM;
    }

    // Set unique container ID
    if (containerRef.current) {
      containerRef.current.id = `lingu-chat-${Math.random().toString(36).substr(2, 9)}`;
    }

    // Initialize if script is already loaded
    if ((window as any).LinguWidget) {
      initializeWidget();
    }

    return () => {
      if (widgetInstanceRef.current) {
        widgetInstanceRef.current.destroy?.();
        widgetInstanceRef.current = null;
      }
      scriptLoadedRef.current = false;
    };
  }, [apiKey, baseURL]);

  return (
    <>
      <Script
        src="https://chrisegbaaaibon.github.io/lingu/index.umd.js"
        strategy="afterInteractive"
        onLoad={initializeWidget}
        onError={(e) => {
          console.error('Failed to load Lingu widget script:', e);
        }}
      />
      <div 
        ref={containerRef}
        className={className}
      />
    </>
  );
};

// Type declaration for the global LinguWidget
declare global {
  interface Window {
    LinguWidget: any;
    React: any;
    ReactDOM: any;
  }
}

export default LinguWidget; 