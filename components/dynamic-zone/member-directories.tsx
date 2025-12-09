"use client";
import React, { useEffect, useState } from "react";
import { strapiImage } from "@/lib/strapi/strapiImage";
import fetchContentTypeClient from "@/lib/strapi/fetchContentTypeClient";
import Image from "next/image";

interface Media {
  data?: { attributes?: { url?: string } };
}
interface Member {
  id: number;
  title?: string;
  address?: string;
  button_text?: string;
  button_link?: string;
  thumbnail?: Media;
  logo?: Media; 
}

export const MemberDirectoryBlock = ({ locale, text_search }: { locale?: string; text_search?: string }) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchInput, setSearchInput] = useState(""); // người nhập
  const [keyword, setKeyword] = useState(""); // keyword khi ấn submit

  useEffect(() => {
    const getMembers = async () => {
      try {
        const res = await fetchContentTypeClient("member-directories", {
          populate: "*",
          pagination: { page: 1, pageSize: 100 },
        });

        if (res?.data) {
          setMembers(res.data);
          setFilteredMembers(res.data); // default: hiển thị tất cả
        }
      } catch (error) {
        console.error("error fetch member-directory1:", error);
      } finally {
        setLoading(false);
      }
    };
    getMembers();
  }, []);

  // Filter khi keyword thay đổi (chỉ xảy ra khi user bấm submit)
  useEffect(() => {
    const kw = keyword.toLowerCase();

    const result = members.filter((member) =>
      member.title?.toLowerCase().includes(kw) ||
      member.address?.toLowerCase().includes(kw)
    );

    setFilteredMembers(result);
  }, [keyword, members]);

  const safeImageSrc = (media: any, fallback: string) => {
    try {
      const url = media?.url ?? media?.data?.attributes?.url ?? media?.attributes?.url ?? null;
      return url ? strapiImage(url) : fallback;
    } catch {
      return fallback;
    }
  };

  // ⬅️ Khi nhấn SEARCH → chạy filter
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setKeyword(searchInput); // keyword mới để filter
  };

  return (
    <div className="bg-[#efede7] bg-[url('/bg-line2.svg')] bg-top bg-repeat-y pt-24">

      {/* FORM SEARCH */}
      <form className="w-full max-w-xl m-auto" onSubmit={handleSearch}>
        <div className="flex items-center border border-[#0A2540] rounded-md overflow-hidden">
          <input
            type="text"
            placeholder={text_search}
            className="flex-1 px-4 py-5 outline-none bg-transparent text-[#0A2540]"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit" className="px-3 py-2" aria-label="Search">
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 0.5C23.0081 0.5 29.5 6.99187 29.5 15C29.5 23.0081 23.0081 29.5 15 29.5C6.99187 29.5 0.5 23.0081 0.5 15C0.5 6.99187 6.99187 0.5 15 0.5Z" stroke="#0A2540"></path>
              <path d="M11 15H19M19 15L15.5 11M19 15L15.5 19" stroke="#0A2540" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </button>
        </div>
      </form>

      {/* LIST MEMBERS */}
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-[20px] gap-[10px] px-5 lg:px-20 py-10 lg:py-20 pb-40">
        {loading ? (
          <div className="col-span-full animate-pulse bg-gray-100 rounded-md h-64"></div>
        ) : filteredMembers.length > 0 ? (
          filteredMembers.map((member) => (
            <div key={member.id} className="bg-white rounded-md shadow-sm border border-[#e5e7eb] flex flex-col items-center pb-6">
              
              {safeImageSrc(member.thumbnail, "/no-image.jpg") && (
                <Image
                  src={safeImageSrc(member.thumbnail, "/no-image.jpg")}
                  alt={member.title ?? ""}
                  width={313}
                  height={180}
                  className="w-full h-40 object-cover rounded-t-md"
                />
              )}

              <div className="flex flex-col items-center -mt-8 mb-2">
                {safeImageSrc(member.logo, "/no-logo.png") && (
                  <div className="w-14 h-14">
                    <Image
                      src={safeImageSrc(member.logo, "/no-logo.png")}
                      alt={(member.title ?? "") + " Logo"}
                      width={60}
                      height={60}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-col items-center px-4">
                <h3 className="font-semibold text-[#0A2540] text-[20px] mt-2 mb-2 text-center">{member.title}</h3>

                {member.address && (
                  <p className="text-[#88938F] text-[15px] text-center mb-6 leading-[26px]">{member.address}</p>
                )}

                {member.button_link && member.button_text && (
                  <a
                    href={member.button_link}
                    className="text-[#BBA25A] text-sm font-medium flex items-center gap-1 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {member.button_text}
                  </a>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500">
            <p>Không tìm thấy thành viên nào.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberDirectoryBlock;
