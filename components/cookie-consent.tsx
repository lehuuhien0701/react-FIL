"use client";
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import parse from "html-react-parser"; 

interface CookieConsentProps {
  translations: {
    title: string;
    description: string;
    cookie_accept: string;
    cookie_decline: string;
  }
}

export const CookieConsent = ({ translations }: CookieConsentProps) => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = Cookies.get('cookie-consent');
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const acceptCookies = () => {
    Cookies.set('cookie-consent', 'accepted', { expires: 365 });
    setShowConsent(false);
  };

  const declineCookies = () => {
    Cookies.set('cookie-consent', 'declined', { expires: 365 });
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-10 w-[370px] right-5 sm:right-10 transform md:transform-none bg-secondary rounded-[10px] z-50 p-[30px] md:p-6 shadow-lg">
      <div className="flex flex-col items-center justify-between gap-10">
        <div className="flex-1">
          <h3 className="text-[34px] font-bold text-white mb-2">
            {translations.title}
          </h3>
          {translations.description && (
            <p className="text-sm leading-5 text-white">
              
                <div className='details-cookie'>
                  {parse(translations.description)} 
                </div>
              
            </p>
          )}
        </div>
        <div className="flex gap-6 w-full">
          <a
            className="text-base w-full font-medium py-[10px] border border-[#EDEBE733] text-white text-center rounded-[40px] cursor-pointer"
            onClick={declineCookies}
          >
            {translations.cookie_decline || "Refuser"} 
          </a>
          <a
            className="text-primary w-full font-medium py-[10px] bg-[#BBA25A] text-center rounded-[40px] cursor-pointer"
            onClick={acceptCookies}
          >
            {translations.cookie_accept || "Accepter"}
          </a>
        </div>
      </div>
    </div>
  ); 
};
