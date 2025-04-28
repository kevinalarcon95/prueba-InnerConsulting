'use client';
import { useState, useEffect, useCallback } from 'react';

export const useOnlineStatus = () => {
    const [isOnline, setIsOnline] = useState(
      typeof navigator !== 'undefined' ? navigator.onLine : false
    );
  
    const updateOnlineStatus = useCallback(() => {
      if (typeof navigator !== 'undefined') {
        setIsOnline(navigator.onLine);
        console.log(`useOnlineStatus: Status check - ${navigator.onLine}`);
      }
    }, []);
  
    useEffect(() => {
      window.addEventListener('online', updateOnlineStatus);
      window.addEventListener('offline', updateOnlineStatus);
  
      return () => {
        window.removeEventListener('online', updateOnlineStatus);
        window.removeEventListener('offline', updateOnlineStatus);
      };
    }, [updateOnlineStatus]);
  
    return isOnline;
  };
  
