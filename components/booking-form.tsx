"use client";

import React, { useState } from 'react';
import { Button } from "@/components/elements/button";
import { translations } from '@/translations/common';
import { useParams, useRouter } from 'next/navigation';
import { i18n } from "@/i18n.config";
import { Locale } from '@/translations/types';

export const BookingForm = ({ 
  data,
  className
}: { 
  data: any;
  className?: string;
}) => {
  const params = useParams();
  const currentLocale = (params?.locale as Locale) || (i18n.defaultLocale as Locale);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [formData, setFormData] = useState({
    name: '', 
    email: '',
    phone: '',
    purpose: '', // <-- add purpose here
    message: '',
    agreement: true
  });

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      newErrors.name = data.form_message?.required_fields || 'This field is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = data.form_message?.required_fields || 'This field is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = data.form_message?.invalid_email || 'Invalid email format';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = data.form_message?.required_fields || 'This field is required';
    }
    // Purpose validation
    if (!formData.purpose.trim()) {
      newErrors.purpose = data.form_message?.required_fields || 'This field is required';
    }
  

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setLoading(true);
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // purpose is now included
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      // Reset form after successful submission
      setFormData({
        name: '', 
        email: '',
        phone: '',
        purpose: '', // reset purpose
        message: '',
        agreement: true
      });

      // Redirect to the Thank You page
      router.push('/thank-you');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(data.form_message.submit_error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Lấy label từ data (hoặc fallback)
  const full_name_label = data?.full_name_label || "Full Name";
  const email_label = data?.email_label || "Email"; 
  const phone_label = data?.phone_label || "Phone"; 
  const purpose_label = data?.purpose_label || "Purpose"; 
  const additional_information_label = data?.additional_information_label || "Additional Information"; 
  const agreement_label = data?.agreement_label || " Personal information is transmitted and used for the purposes described in the privacy statement.";
  const select_purpose = data?.select_purpose || "Select purpose";
  const submitLabel = data?.submit_label || "Submit";

  return (
    <form onSubmit={handleSubmit} className={`space-y-5 ${className || ''}`}>  

      {/* Hàng 3 ô: Full Name – Email – Phone */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Full Name */}
        <label className="text-sm relative">
          <div className="text-[14px] mb-2 text-white/80">{full_name_label}</div>
          <input
            type="text"
            className="w-full bg-transparent border border-[#88938F] pr-[40px] px-3 py-[14px] text-[#88938F] text-[15px]"
            placeholder=""
            value={formData.name}
            onChange={e => handleInputChange('name', e.target.value)}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          <svg className='absolute right-3 top-10' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect opacity="0.01" width="20" height="20" fill="white"/>
          <path d="M10.0013 9.16667C11.8423 9.16667 13.3346 7.67428 13.3346 5.83333C13.3346 3.99238 11.8423 2.5 10.0013 2.5C8.16035 2.5 6.66797 3.99238 6.66797 5.83333C6.66797 7.67428 8.16035 9.16667 10.0013 9.16667Z" fill="white"/>
          <path d="M15.0013 17.5002C15.4615 17.5002 15.8346 17.1271 15.8346 16.6668C15.8346 13.4452 13.223 10.8335 10.0013 10.8335C6.77964 10.8335 4.16797 13.4452 4.16797 16.6668C4.16797 17.1271 4.54106 17.5002 5.0013 17.5002H15.0013Z" fill="white"/>
          </svg>

        </label>

        {/* Email */}
        <label className="text-sm relative">
          <div className="text-[14px] mb-2 text-white/80">{email_label}</div>
          <input
            type="email"
            className="w-full bg-transparent border border-[#88938F] pr-[40px] px-3 py-[14px] text-[#88938F] text-[15px]"
            value={formData.email}
            onChange={e => handleInputChange('email', e.target.value)}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          <svg className='absolute right-3 top-10' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect opacity="0.01" width="20" height="20" fill="white"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M15.8346 3.3335H4.16797C2.78726 3.3335 1.66797 4.45278 1.66797 5.8335V14.1668C1.66797 15.5475 2.78726 16.6668 4.16797 16.6668H15.8346C17.2153 16.6668 18.3346 15.5475 18.3346 14.1668V5.8335C18.3346 4.45278 17.2153 3.3335 15.8346 3.3335ZM15.8346 5.00016L10.418 8.72516C10.1601 8.87402 9.84247 8.87402 9.58464 8.72516L4.16797 5.00016H15.8346Z" fill="white"/>
          </svg> 
        </label>

        {/* Phone */}
        <label className="text-sm relative">
          <div className="text-[14px] mb-2 text-white/80">{phone_label}</div> 
          <input
            type="tel"
            className="w-full bg-transparent border border-[#88938F] pr-[40px] px-3 py-[14px] text-[#88938F] text-[15px]"
            value={formData.phone}
            onChange={e => handleInputChange('phone', e.target.value)}
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          <svg className='absolute right-3 top-10' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 1C0 0.447715 0.447715 0 1 0H3.15287C3.64171 0 4.0589 0.353413 4.13927 0.835601L4.87858 5.27147C4.95075 5.70451 4.73206 6.13397 4.3394 6.3303L2.79126 7.10437C3.90756 9.87832 6.12168 12.0924 8.89563 13.2087L9.6697 11.6606C9.86603 11.2679 10.2955 11.0492 10.7285 11.1214L15.1644 11.8607C15.6466 11.9411 16 12.3583 16 12.8471V15C16 15.5523 15.5523 16 15 16H13C5.8203 16 0 10.1797 0 3V1Z" fill="white"/>
          </svg>

        </label> 

      </div>


      {/* Purpose */}
      <div>
        <label className="text-sm w-full">
          <div className="text-[14px] mb-2 text-white/80">{purpose_label}</div>
          <select
            className="w-full bg-transparent border border-[#88938F] px-3 py-[14px] text-[#88938F] text-[15px]"
            value={formData.purpose} // <-- make select controlled
            onChange={e => handleInputChange('purpose', e.target.value)}
          >
            <option value="">{select_purpose}</option>
            {Array.isArray(data.member) && data.member.length > 0 &&
                data.member.map((item: any, idx: number) => (
                    <option key={item.id ?? idx} value={item.title}>
                        {item.title}
                    </option>
                ))
            }
          </select>
          {errors.purpose && <p className="text-red-500 text-xs mt-1">{errors.purpose}</p>} {/* show error */}
        </label>
      </div>


      {/* Additional Information */}
      <div>
        <label className="text-sm w-full">
          <div className="text-[14px] mb-2 text-white/80">{additional_information_label}</div>
          <textarea
            rows={5}
            className="w-full bg-transparent border border-[#88938F] px-3 py-[14px] text-[#88938F] text-[15px]"
            value={formData.message}
            onChange={e => handleInputChange('message', e.target.value)}
          />
        </label>
      </div>


      {/* Agreement */}
      <div className="flex items-center gap-3 text-[14px] text-[#88938F]">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="w-4 h-4 accent-[#88938F] rounded"
            checked={formData.agreement}
            onChange={e => handleInputChange('agreement', e.target.checked)}
          />
          <span>
            {agreement_label} 
          </span>
        </label>
      </div>


      {/* Submit */}
      <div className="flex items-center gap-6 mt-16">
        <button
          type="submit"
          className="inline-flex items-center text-[16px] gap-3 text-[#BBA25A] font-medium"
          disabled={loading}
        >
          {loading ? "Submitting..." : submitLabel}

          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <circle cx="30" cy="30" r="30" fill="#BBA25A" />
            <path d="M25 35L35.8333 24.167M35.8333 24.167V34.567M35.8333 24.167H25.4333"
              stroke="#0A2540" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

    </form>
  );
};