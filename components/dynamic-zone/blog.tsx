"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useSearchParams, useRouter } from "next/navigation";

import fetchContentTypeClient from "@/lib/strapi/fetchContentTypeClient";
import { strapiImage } from "@/lib/strapi/strapiImage";
import { translations } from "@/translations/common";
import { Locale } from "@/translations/types";
import { i18n } from "@/i18n.config";

const POSTS_PER_PAGE = 8;

export const Blog = ({
  layout,
  title,
  description,
  button_text,
  button_link,
  readmore,
  locale,
}: {
  layout: string;
  title: string;
  description: string;
  button_text: string;
  button_link: string;
  readmore: string;
  locale: string;
}) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [categories, setCategories] = useState<
    { key: string; label: string; slug: string }[]
  >([]);

  // Derive activeTab from URL
  const tabParam = searchParams?.get("tab");
  const activeTab = tabParam || "all";

  const currentLocale =
    (params?.locale as Locale) || (i18n.defaultLocale as Locale);

  const extractMediaUrl = (media: any): string | null => {
    if (!media) return null;
    if (typeof media === "string") return media;
    if (media.url) return media.url;
    if (media.attributes?.url) return media.attributes.url;
    if (media.data?.attributes?.url) return media.data.attributes.url;
    if (media.data && Array.isArray(media.data) && media.data[0]?.attributes?.url)
      return media.data[0].attributes.url;
    if (media.formats?.thumbnail?.url) return media.formats.thumbnail.url;
    if (media.attributes?.formats?.thumbnail?.url)
      return media.attributes.formats.thumbnail.url;
    return null;
  };

  const normalizeArticles = useCallback((items: any[]) => {
    return items.map((item: any) => {
      if (!item) return item;

      // Strapi REST v5 trả về { id, attributes }
      const attrs = item.attributes ?? item;
      const id = item.id ?? attrs?.id;

      const normalized: any = { id, ...attrs };

      const possibleImage =
        attrs.image ?? attrs.Image ?? attrs.thumbnail ?? attrs.media;
      const rawUrl = extractMediaUrl(possibleImage);
      if (rawUrl) {
        try {
          normalized.image = { url: strapiImage(rawUrl) ?? rawUrl };
        } catch {
          normalized.image = { url: rawUrl };
        }
      }

      return normalized;
    });
  }, []);

  const extractTextFromRichContent = (content: any): string => {
    if (!content) return "";
    const walk = (node: any): string => {
      if (node == null) return "";
      if (typeof node === "string") return node;
      if (Array.isArray(node)) return node.map(walk).join(" ");
      if (node.children) return walk(node.children);
      if (node.text) return String(node.text);
      if (typeof node === "object")
        return Object.values(node)
          .map(walk)
          .join(" ");
      return "";
    };
    return walk(content).replace(/\s+/g, " ").trim();
  };

  const top3Posts = useMemo(() => posts.slice(0, 3), [posts]);

  // Lấy bài viết
  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      try {
        const pageSize = POSTS_PER_PAGE;

        // Query object đúng chuẩn REST
        const query: any = {
          locale: locale || undefined,
          populate: "*",
          sort: ["publishedAt:desc"],
          pagination: { page: currentPage, pageSize },
          filters: {},
        };

        // Filter theo category slug nếu không phải "all"
        if (activeTab !== "all") {
          query.filters.categories = { slug: activeTab };
        }

        const articles = await fetchContentTypeClient("articles", query);
        let data = articles?.data ?? [];

        // Fallback: nếu locale hiện tại không có bài, thử không truyền locale
        if ((!data || data.length === 0) && locale) {
          const fallbackQuery: any = {
            populate: "*",
            sort: ["publishedAt:desc"],
            pagination: { page: 1, pageSize },
            filters: {},
          };
          if (activeTab !== "all") {
            fallbackQuery.filters.categories = { slug: activeTab };
          }
          const fallback = await fetchContentTypeClient("articles", fallbackQuery);
          data = fallback?.data ?? [];
        }

        const normalized = normalizeArticles(data);
        setPosts(normalized);
        setTotalPages(articles?.meta?.pagination?.pageCount ?? 1);
      } catch (error) {
        console.error("Lỗi khi fetch bài viết:", error);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, [locale, currentPage, activeTab, normalizeArticles]);

  // Lấy categories (dùng slug làm filter)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // CẢI TIẾN: Truyền thêm tham số locale vào query
        const res = await fetchContentTypeClient("categories", {
          locale: currentLocale, // Đảm bảo lấy đúng name theo ngôn ngữ đang chọn
          populate: "*",
          sort: ["name:asc"], // Tùy chọn: Sắp xếp tên theo bảng chữ cái
        });

        const cats =
          res?.data?.map((cat: any) => {
            const attrs = cat.attributes ?? cat;
            return {
              // Dùng slug làm key và slug để filter trên URL (không đổi theo ngôn ngữ)
              key: attrs.slug ?? String(cat.id),
              // Name sẽ thay đổi theo ngôn ngữ nhờ tham số locale ở trên
              label: attrs.name ?? "Unnamed", 
              slug: attrs.slug ?? "",
            };
          }) ?? [];

        setCategories([
          {
            key: "all",
            label:
              (translations as any)[currentLocale]?.allnews ||
              (translations as any)[i18n.defaultLocale]?.allnews ||
              "All News",
            slug: "all",
          },
          ...cats,
        ]);
      } catch (err) {
        console.error("Lỗi khi fetch categories:", err);
        // Fallback giữ nguyên nút "All News" nếu lỗi
        setCategories([
          {
            key: "all",
            label:
              (translations as any)[currentLocale]?.allnews ||
              (translations as any)[i18n.defaultLocale]?.allnews ||
              "All News",
            slug: "all",
          },
        ]);
      }
    };

    fetchCategories();
  }, [currentLocale]); 

  const isInternalLink = (link: string) => {
    return link?.startsWith?.("/") || link?.startsWith?.("#");
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1, 2, 3, "...", totalPages - 2, totalPages - 1, totalPages);
    }

    const onGoto = (e: React.MouseEvent, p: number) => {
      e.preventDefault();
      if (p < 1 || p > totalPages) return;
      setCurrentPage(p);
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    return (
      <div className="wp-pageNavi flex justify-between items-center w-full">
        <div>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage((prev) => Math.max(prev - 1, 1));
            }}
            className="flex items-center font-normal text-sm leading-[26px] text-primary"
            aria-label="Previous page"
          >
            <svg
              className="mr-2"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.8332 10.0001H4.1665M4.1665 10.0001L9.99984 15.8334M4.1665 10.0001L9.99984 4.16675"
                stroke="#2F324A"
                strokeWidth={1.67}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {translations[currentLocale]?.previous ||
              translations[i18n.defaultLocale].previous}
          </a>
        </div>

        <div className="flex items-center font-normal text-sm leading-[26px] text-primary">
          {pages.map((p, idx) =>
            p === "..." ? (
              <span
                key={`dot-${idx}`}
                className="w-10 h-10 flex items-center justify-center"
              >
                ...
              </span>
            ) : (
              <a
                key={p}
                href="#"
                onClick={(e) => onGoto(e, Number(p))}
                className={`w-10 h-10 flex items-center justify-center ${
                  p === currentPage ? "text-white bg-primary rounded-full" : ""
                }`}
                aria-current={p === currentPage ? "page" : undefined}
              >
                {p}
              </a>
            )
          )}
        </div>

        <div>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage((prev) => Math.min(prev + 1, totalPages));
            }}
            className="flex items-center font-normal text-sm leading-[26px] text-primary"
            aria-label="Next page"
          >
            {translations[currentLocale]?.next ||
              translations[i18n.defaultLocale].next}
            <svg
              className="ml-2"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.1665 10.0001H15.8332M15.8332 10.0001L9.99984 4.16675M15.8332 10.0001L9.99984 15.8334"
                stroke="#2F324A"
                strokeWidth={1.67}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    );
  };

  const normalizedLayout = String(layout ?? "").trim().toLowerCase();
  const showDefaultLayout = normalizedLayout === "defaultgrid";
  const showPaginatedLayout =
    normalizedLayout === "paginatedgrid" || !showDefaultLayout;

  return (
    <div className="py-20 md:py-[100px] relative bg-[#EDEBE7] bg-[url('/bg-line2.svg')] bg-top bg-repeat-y">
      <div className="max-w-[1400px] mx-auto w-full px-5 md:px-10 lg:px-20 text-center">

        {/* Tabs */}
        <div className="mb-12">
          {/* Desktop tab buttons */}
          <div className="hidden lg:inline-block justify-center border border-[#88938F] p-[2px] rounded-full">
            {categories.map((tab) => (
              <button
                key={tab.key}
                className={`px-5 py-[5px] rounded-full text-[15px] font-medium transition ${
                  activeTab === tab.slug
                    ? "bg-[#0A2540] text-white"
                    : "bg-transparent text-[#0A2540] hover:bg-[#ecebe6]"
                }`}
                onClick={() => {
                  // Update tab param in URL
                  const params = new URLSearchParams(window.location.search);
                  if (tab.slug === "all") {
                    params.delete("tab");
                  } else {
                    params.set("tab", tab.slug);
                  }
                  router.replace(`?${params.toString()}`, { scroll: false });
                  setCurrentPage(1);
                }}
                type="button"
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Mobile dropdown */}
          <div className="flex lg:hidden items-center gap-2 justify-center">
            <span className="text-[15px] text-[#0A2540]">
              {(translations as any)[currentLocale]?.select_category ||
                (translations as any)[i18n.defaultLocale]?.select_category ||
                "Select category"}
            </span>
            <div className="relative">
              <select
                className="bg-transparent appearance-none border border-[#88938F] rounded-full px-4 py-2 text-[15px] font-medium text-[#0A2540] pr-8"
                value={activeTab}
                onChange={(e) => {
                  const slug = e.target.value;
                  const params = new URLSearchParams(window.location.search);
                  if (slug === "all") {
                    params.delete("tab");
                  } else {
                    params.set("tab", slug);
                  }
                  router.replace(`?${params.toString()}`, { scroll: false });
                  setCurrentPage(1);
                }}
              >
                {categories.map((tab) => (
                  <option key={tab.key} value={tab.slug}>
                    {tab.label}
                  </option>
                ))}
              </select>
              {/* Dropdown arrow */}
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#0A2540]">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.70768 3.89575L5.49935 7.10409L2.29102 3.89575" stroke="#0A2540" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                </svg> 
              </span>
            </div>
          </div>
        </div>

        {/* DefaultGrid */}
        {showDefaultLayout && (
          <div className="layout-DefaultGrid">
            <div className="flex items-start justify-between mb-[60px]">
              {title && (
                <h2 className="font-normal text-2xl leading-[34px] text-primary">
                  {title}
                </h2>
              )}
              {button_text && (
                <div className="font-normal text-sm leading-[26px] flex items-center">
                  {button_link ? (
                    isInternalLink(button_link) ? (
                      <Link
                        href={button_link}
                        className="font-normal text-sm leading-[26px] flex items-center"
                        data-discover="true"
                      >
                        {button_text}
                        <svg
                          className="ml-[17px]"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.5 3.75L15.75 9M15.75 9L10.5 14.25M15.75 9L2.25 9"
                            stroke="#2F324A"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Link>
                    ) : (
                      <a
                        href={button_link}
                        className="font-normal text-sm leading-[26px] flex items-center"
                        data-discover="true"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {button_text}
                      </a>
                    )
                  ) : (
                    <span className="font-normal text-sm leading-[26px]">
                      {button_text}
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="mt-6">
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-[10px]">
                {loading && currentPage === 1 ? (
                  [...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="aspect-[380/250] bg-gray-200 rounded-lg mb-6" />
                      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
                      <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                    </div>
                  ))
                ) : top3Posts && top3Posts.length > 0 ? (
                  top3Posts.map((item: any) => {
                    const imgSrc =
                      item.image?.url ?? item.image ?? "/thumbnail02.jpg";
                    const postTitle = String(item.title ?? item.Title ?? "");
                    const date =
                      item.publishedAt ??
                      item.published_at ??
                      item.createdAt ??
                      item.created_at ??
                      "";
                    const dateText = date
                      ? new Date(date).toLocaleDateString()
                      : "";
                    const company =
                      item.company ??
                      item.author ??
                      "Fiduciaire Premier Luxembourg S.A.";
                    const rawExcerpt =
                      item.description ??
                      item.excerpt ??
                      item.summary ??
                      extractTextFromRichContent(item.content) ??
                      "";
                    const excerptText = String(rawExcerpt);
                    const href = `/blog/${
                      item.slug ?? item.slug_current ?? item.id
                    }`;

                    return (
                      <div key={item.id ?? href}>
                        <div className="mb-[10px]">
                          <Link href={href}>
                            <Image
                              className="w-full h-[180px] object-cover"
                              alt={postTitle}
                              src={String(imgSrc)}
                              width={800}
                              height={195}
                              unoptimized={/^(https?:)?\/\//.test(
                                String(imgSrc)
                              )}
                            />
                          </Link>
                        </div>
                        <div className="px-[20px] text-left">
                          <h3 className="font-medium text-xl leading-[30px] text-primary mb-3">
                            <Link href={href}>
                              {postTitle.length > 80
                                ? postTitle.slice(0, 55) + "..."
                                : postTitle}
                            </Link>
                          </h3>
                          <strong className="font-bold text-xs leading-3 text-[#9CA3AF] mb-3 block">
                            {dateText ? `${dateText} / ${company}` : company}
                          </strong>
                          <div className="mb-4">
                            <p className="text-[15px] leading-[26px] text-[#6B7280]">
                              {excerptText.length > 160
                                ? excerptText.slice(0, 100) + "..."
                                : excerptText}
                            </p>
                          </div>
                          <Link
                            href={href}
                            className="text-center inline-block w-full sm:w-auto text-sm leading-[44px] font-medium text-white bg-primary h-11 px-10 hover:bg-[#CCAB80] hover:text-[#2F324A] transition duration-200"
                          >
                            {readmore?.trim()
                              ? readmore
                              : (translations as any)[currentLocale]?.find_out_more ||
                                (translations as any)[i18n.defaultLocale]?.find_out_more ||
                                "Find out more"}
                          </Link>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  !loading && (
                    <div className="text-center text-gray-500 col-span-3">
                      No posts found.
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        )}

        {/* PaginatedGrid */}
        {showPaginatedLayout && (
          <div className="layout-PaginatedGrid"> 
            {loading && currentPage > 1 ? (
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-y-[20px] gap-[10px]">
                {[...Array(POSTS_PER_PAGE)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-[380/250] bg-gray-200 rounded-lg mb-6" />
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-y-[20px] gap-[10px]">
                  {posts.map((item: any) => {
                    const imgSrc =
                      item.image?.url ?? item.image ?? "/thumbnail02.jpg";
                    const postTitle = String(item.title ?? item.Title ?? "");
                    const rawExcerpt =
                      item.description ??
                      item.excerpt ??
                      item.summary ??
                      extractTextFromRichContent(item.content) ??
                      "";
                    const excerptText = String(rawExcerpt);
                    const href = `/blog/${
                      item.slug ?? item.slug_current ?? item.id
                    }`;

                    return (
                      <div key={item.id ?? href}>
                        <div className="mb-[10px]">
                          <Link href={href}>
                            <Image
                              className="w-full h-[180px] object-cover"
                              alt={postTitle}
                              src={String(imgSrc)}
                              width={800}
                              height={195}
                              unoptimized={/^(https?:)?\/\//.test(
                                String(imgSrc)
                              )}
                            />
                          </Link>
                        </div>
                        <div className="px-[20px] text-left">
                          <h3 className="font-medium text-xl leading-[30px] text-primary mb-3">
                            <Link href={href}>
                              {postTitle.length > 80
                                ? postTitle.slice(0, 55) + "..."
                                : postTitle}
                            </Link>
                          </h3>
                          <div className="mb-4">
                            <p className="text-[15px] leading-[26px] text-[#6B7280]">
                              {excerptText.length > 160
                                ? excerptText.slice(0, 100) + "..."
                                : excerptText}
                            </p>
                          </div>
                          <Link
                            href={href}
                            className="font-inter text-[13px] leading-5 text-[#BBA25A] flex items-center"
                          >
                            {readmore?.trim()
                              ? readmore
                              : (translations as any)[currentLocale]?.find_out_more ||
                                (translations as any)[i18n.defaultLocale]?.find_out_more ||
                                "Find out more"}
                            <svg
                              className="ml-3"
                              width="10"
                              height="10"
                              viewBox="0 0 10 10"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M0.5 9.16663L9.16667 0.5M9.16667 0.5V8.82003M9.16667 0.5H0.84667"
                                stroke="#BBA25A"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-16 flex items-center justify-between">
                  {renderPagination()}
                </div>
              </>
            )}
          </div>
        )}

        
      </div>
    </div>
  );
};