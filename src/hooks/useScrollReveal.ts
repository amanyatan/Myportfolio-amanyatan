import { useEffect } from 'react';

export const useScrollReveal = (dependency?: any) => {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -25% 0px', // Trigger at 75% of viewport
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [dependency]);
};
