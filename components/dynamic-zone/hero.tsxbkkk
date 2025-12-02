"use client";
import React, { useState, useRef } from "react";
import { Button } from "../elements/button";
import { HtmlParser } from "../html-parser";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import Link from "next/link";
import { SvgLoader } from '@/components/svg-loader';
import { strapiImage } from '@/lib/strapi/strapiImage';
import { useFooterData } from '@/context/FooterContext';
import { BookingForm } from "../booking-form";
import { translations } from '@/translations/common';
import { useParams } from 'next/navigation';
import { i18n } from "@/i18n.config";
import { Locale } from '@/translations/types';
import { useScrollLock } from '@/hooks/useScrollLock';

export const Hero = ({ 
  heading, 
  sub_heading, 
  button_text, 
  button_link, 
  form_title, 
  background,
}: { 
  heading: string; 
  sub_heading: string; 
  button_text: string; 
  button_link: string; 
  form_title: string; 
  background: any[];
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showMobileForm, setShowMobileForm] = useState(false);
  const sliderRef = useRef<Slider | null>(null);
  const footerData = useFooterData();
  const params = useParams();
  const currentLocale = (params?.locale as Locale) || (i18n.defaultLocale as Locale);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    beforeChange: (current: number, next: number) => setCurrentSlide(next),
  };

  const isInternalLink = (link: string) => {
    return link.startsWith('/') || link.startsWith('#');
  };

  useScrollLock(showMobileForm);
  
  return (
    <div className="relative h-[100%] md:min-h-[800px] lg:h-screen pt-[160px] pb-10 sm:pb-25">
      {/* Background Slider */}
      <div className="absolute inset-0 w-full h-full">
        <Slider ref={sliderRef} {...settings} className="h-full">
          {background && background.map((image, index) => (
            image.url ? (
              <div key={index} className="relative w-full h-full">
                <Image
                  src={strapiImage(image.url)}
                  alt={image.alternativeText || ''}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>
            ) : null
          ))}
        </Slider>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-10 xl:px-20 h-full flex flex-col md:flex-row items-center gap-10 lg:gap-15">
        <div className="relative flex flex-col md:w-1/2 xl:pl-25">
          <h1 className="text-[50px] sm:text-[66px] lg:text-[78px] leading-none font-bold relative pb-6 text-white text-center md:text-left">
            {heading}
          </h1>
          <div className="hero-desc mt-2 md:mt-6 text-[28px] leading-none font-medium text-white relative text-center md:text-left">
            <HtmlParser html={sub_heading || ''} />
          </div>
          <div className="space-x-2 items-center mt-10 hidden md:flex">
            {button_text && (
              isInternalLink(button_link) ? (
                <Link href={button_link} passHref>
                  <Button as="span">
                    {button_text}
                  </Button>
                </Link>
              ) : (
                <Button as="a" href={button_link}>
                  {button_text}
                </Button>
              )
            )}
          </div>
          
          <div className="hero-dots flex gap-5 mt-12 items-center justify-center md:justify-start">
            {background && background.map((_, index) => (
              <button
                key={index}
                onClick={() => sliderRef.current?.slickGoTo(index)}
                className={`w-[27px] h-[27px] border  rounded-full transition-all duration-300  ${
                  currentSlide === index ? 'opacity-100 border-white/70' : 'opacity-80 border-transparent'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          
          {footerData?.social && footerData.social.length > 0 && (
            <div className="social-links absolute left-4 top-1/2 -translate-y-1/2 z-20 flex-col gap-8 hidden xl:flex">
              <div className="w-[2px] h-[150px] bg-white mx-auto"></div>
              <div className="flex flex-col gap-5">
                {footerData.social.map((item: any) => (
                  <a 
                    key={item.id} 
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-5 h-5 flex items-center justify-center opacity-70 hover:opacity-100"
                  >
                    {item.icon && (
                      item.icon.url.endsWith('.svg') ? (
                        <SvgLoader 
                          url={strapiImage(item.icon.url)}
                          className="w-5 h-5"
                        />
                      ) : (
                        <Image 
                          src={strapiImage(item.icon.url)} 
                          alt={item.icon.name} 
                          width={20}
                          height={20}
                          className="w-5 h-5"
                        />
                      )
                    )}
                  </a>
                ))}
              </div>
              <div className="w-[2px] h-[150px] bg-white mx-auto"></div>
            </div>
          )}

          {/* Show Booking form on mobile */}
          <div className="space-x-2 items-center justify-center mt-10 flex md:hidden">
            <Button as="button" onClick={() => setShowMobileForm(true)}>
              {translations[currentLocale]?.bookNow || translations[i18n.defaultLocale].bookNow}
            </Button>
          </div>

          <div className="md:hidden flex items-center justify-center mt-5">
            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="1" y="0.5" width="15" height="15" rx="1.5" stroke="white"/>
<path d="M12.7069 4.793C12.8944 4.98053 12.9997 5.23484 12.9997 5.5C12.9997 5.76516 12.8944 6.01947 12.7069 6.207L7.70692 11.207C7.51939 11.3945 7.26508 11.4998 6.99992 11.4998C6.73475 11.4998 6.48045 11.3945 6.29292 11.207L4.29292 9.207C4.11076 9.0184 4.00997 8.7658 4.01224 8.5036C4.01452 8.2414 4.11969 7.99059 4.3051 7.80518C4.49051 7.61977 4.74132 7.5146 5.00352 7.51233C5.26571 7.51005 5.51832 7.61084 5.70692 7.793L6.99992 9.086L11.2929 4.793C11.4804 4.60553 11.7348 4.50021 11.9999 4.50021C12.2651 4.50021 12.5194 4.60553 12.7069 4.793Z" fill="white"/>
</svg>
            <span className="ml-[10px] text-white opacity-70 text-base font-medium">{translations[currentLocale]?.callback || translations[i18n.defaultLocale].callback}</span>
          </div>

          {/* Mobile Booking Form Modal */}
          {showMobileForm && (
            <div className="fixed inset-0 bg-black/50 z-50 md:hidden px-5">
              <div className="bg-white p-5 rounded-[20px] max-h-[90vh] overflow-y-auto mt-20">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-[24px] leading-tight text-secondary font-bold">{form_title}</h3>
                  <button 
                    onClick={() => setShowMobileForm(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100"
                  >
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.43934 6.43934C7.02513 5.85355 7.97487 5.85355 8.56066 6.43934L15 12.8787L21.4393 6.43934C22.0251 5.85355 22.9749 5.85355 23.5607 6.43934C24.1464 7.02513 24.1464 7.97487 23.5607 8.56066L17.1213 15L23.5607 21.4393C24.1464 22.0251 24.1464 22.9749 23.5607 23.5607C22.9749 24.1464 22.0251 24.1464 21.4393 23.5607L15 17.1213L8.56066 23.5607C7.97487 24.1464 7.02513 24.1464 6.43934 23.5607C5.85355 22.9749 5.85355 22.0251 6.43934 21.4393L12.8787 15L6.43934 8.56066C5.85355 7.97487 5.85355 7.02513 6.43934 6.43934Z" fill="#171C28"/>
                    </svg>

                  </button>
                </div>
                <BookingForm 
                  data={footerData}
                  className="hero-booking"
                />
              </div>
            </div>
          )}

        </div>
        {/*  Booking form */}
        <div className="hidden md:flex flex-col md:w-1/2">
          <div className="bg-white p-5 sm:p-[24px] lg:p-[34px] rounded-[10px] border border-gray-200">
            <h3 className="text-[34px] lg:text-[40px] leading-tight text-secondary font-bold mb-8">{form_title}</h3>
            <BookingForm 
              data={footerData}
              className="hero-booking"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
