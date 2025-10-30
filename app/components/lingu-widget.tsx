'use client';

import { useEffect } from 'react';

export default function LinguWidget() {
  useEffect(() => {
    if (document.getElementById('lingu-widget-script')) return;

    const script = document.createElement('script');
    script.id = 'lingu-widget-script';
    script.src = 'https://chrisegbaaaibon.github.io/lingu/index.mjs';
    script.type = 'module'; // mjs needs module
    script.async = true;
    script.defer = true;

    // Required config
    script.setAttribute('data-api-key', process.env.NEXT_PUBLIC_LINGU_API_KEY || '');

    // Optional config
    // script.setAttribute('data-language', 'en');
    // script.setAttribute('data-theme', 'light');
    // script.setAttribute('data-position', 'bottom-right');

    document.body.appendChild(script);
  }, []);

  return null;
}