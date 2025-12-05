import { Container } from "./container"; 
import Image from "next/image";
import { Link } from "next-view-transitions";
import { strapiImage } from "@/lib/strapi/strapiImage";
import { Article } from "@/types/types";
import fetchContentType from "@/lib/strapi/fetchContentType";
import { HtmlParser } from "./html-parser";
import { headers } from "next/headers";
import { i18n } from "@/i18n.config";
import { translations } from '@/translations/common';
import { Locale } from '@/translations/types';
import { useParams } from 'next/navigation';

// Utility to extract thumbnail URL from highlightBlocks[0].thumbnail
function getThumbnailUrl(thumb: any): string | undefined {
  if (!thumb) return undefined;
  if (typeof thumb === "string") return thumb;
  if (thumb.url) return thumb.url;
  if (thumb.data?.attributes?.url) return thumb.data.attributes.url;
  return undefined;
}

export async function BlogLayout({ 
  article,
  locale,
  children, 
}: {
  article: Article;
  locale: string;
  children: React.ReactNode;
}) {
  const headersList = headers();
  const domain = headersList.get("host") || "";
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const shareUrl = `${protocol}://${domain}${
    locale === i18n.defaultLocale ? "" : `/${locale}`
  }/blog/${article.slug}`;

  const globalData = await fetchContentType(
    "global",
    {
      filters: { locale },
      populate: {
      global_highlight_blocks: {
        on: {
          'dynamic-zone.block-category-single': {
            populate: ['thumbnail', 'list_details'],
          },
        },
      },
    }
    },
    true
  );


  // Get highlight blocks from globalData
  const highlightBlocks = globalData?.global_highlight_blocks ?? [];
  // Debug: log the highlightBlocks array to inspect thumbnail structure
 //console.log('highlightBlocks:', globalData);

  // Thêm dòng này để lấy currentLocale từ params hoặc fallback về i18n.defaultLocale
  const params = typeof window !== "undefined" ? (require('next/navigation').useParams() as any) : {};
  const currentLocale: Locale = (params?.locale as Locale) || (locale as Locale) || (i18n.defaultLocale as Locale);

  return (
    <>
      <div>

        <div className='max-w-[1440px] mx-auto w-full'>
          <Image
            className='w-full'
            alt={article.title}
            src={article.image ? (strapiImage(article.image.url) ?? "/thumbnail04.jpg") : "/thumbnail04.jpg"}
            width={1440}
            height={600}
            priority={false}
          />
        </div>

        <div className='max-w-[880px] lg:max-w-[960px] mx-auto w-full px-5 md:px-10 lg:px-20 relative z-10 pb-[40px] pt-20'>
          <div className='font-bold text-[15px] leading-[26px] text-[#6B7280]'>
           {/* <p>{publishedDateStr} / <span> {companyName}</span></p> */}  
          </div>
          <h2 className='font-display font-medium text-[32px] leading-10 text-primary'>
            {article.title}
          </h2>
        </div>

        <div className='single-content-style font-inter text-[15px] leading-[26px] text-[#6B7280] max-w-[880px] lg:max-w-[960px] mx-auto w-full px-5 md:px-10 lg:px-20 relative z-10 pb-[60px]'>
       
          {children}

          <div className='mt-4'>
              <p className='text-center'>{globalData?.Articles?.share_label ?? "Share this post"}</p>
              <div className='flex justify-center gap-6 mt-4'>
                  <div className="flex items-center gap-4">
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        shareUrl
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary hover:text-primary transition-colors"
                    >
                      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17 0.5C26.1127 0.5 33.5 7.8873 33.5 17C33.5 26.1127 26.1127 33.5 17 33.5C7.8873 33.5 0.5 26.1127 0.5 17C0.5 7.8873 7.8873 0.5 17 0.5Z" stroke="#0A2540"/>
                      <g clip-path="url(#clip0_2280_15249)">
                      <path d="M17.3771 15.5506H20.7771L20.3993 17.0617H17.3771V23.8617H15.866V17.0617H12.8438V15.5506H15.866V14.1362C15.866 12.789 16.0065 12.3002 16.2694 11.8076C16.5271 11.3209 16.9251 10.9228 17.4118 10.6652C17.9045 10.4022 18.3933 10.2617 19.7405 10.2617C20.1349 10.2617 20.4809 10.2995 20.7771 10.375V11.7728H19.7405C18.7401 11.7728 18.4356 11.8318 18.1251 11.998C17.8954 12.1204 17.7246 12.2911 17.6022 12.5208C17.436 12.8314 17.3771 13.1358 17.3771 14.1362V15.5506Z" fill="#0A2540" stroke="#0A2540" stroke-width="0.8"/>
                      </g>
                      <defs>
                      <clipPath id="clip0_2280_15249">
                      <rect width="10" height="16" fill="white" transform="translate(12 9)"/>
                      </clipPath>
                      </defs>
                      </svg> 
                    </a>
                    <a
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                        shareUrl
                      )}&title=${encodeURIComponent(article.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary hover:text-primary transition-colors"
                    >
                      <svg width="40" height="40" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.31753 14.7093H5.29504V8.42092H7.31753V14.7093ZM6.37624 7.46482H6.36175C5.71448 7.46482 5.29536 6.98299 5.29536 6.37984C5.29536 5.76565 5.72551 5.29517 6.38727 5.29517C7.04904 5.29517 7.45398 5.76219 7.46848 6.37984C7.46816 6.98299 7.04904 7.46482 6.37624 7.46482ZM14.7092 14.7093H12.6867V11.2709C12.6867 10.4472 12.3923 9.88437 11.6606 9.88437C11.1016 9.88437 10.7707 10.2625 10.6235 10.6309C10.5684 10.7633 10.5536 10.9435 10.5536 11.1275V14.7093H8.53108V8.42092H10.5536V9.29603C10.8479 8.87691 11.3077 8.27375 12.3775 8.27375C13.7052 8.27375 14.7095 9.14886 14.7095 11.0355L14.7092 14.7093Z" fill="#2F324A"/>
                      <path d="M2.08319 9.99992C2.08319 6.26797 2.08319 4.40199 3.24256 3.24262C4.40193 2.08325 6.26791 2.08325 9.99986 2.08325C13.7318 2.08325 15.5978 2.08325 16.7572 3.24262C17.9165 4.40199 17.9165 6.26797 17.9165 9.99992C17.9165 13.7318 17.9165 15.5978 16.7572 16.7573C15.5978 17.9166 13.7318 17.9166 9.99986 17.9166C6.26791 17.9166 4.40193 17.9166 3.24256 16.7573C2.08319 15.5978 2.08319 13.7318 2.08319 9.99992Z" stroke="#2F324A" strokeLinejoin="round"/>
                      </svg>

                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                        shareUrl
                      )}&text=${encodeURIComponent(article.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary hover:text-primary transition-colors"
                    >
                      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.0374 34H16.9626C7.60952 34 0 26.3905 0 17.0374V16.9626C0 7.60951 7.60952 0 16.9626 0H17.0374C26.3905 0 34 7.60951 34 16.9626V17.0374C34 26.3905 26.3905 34 17.0374 34ZM16.9626 1.15087C8.24365 1.15087 1.15087 8.24363 1.15087 16.9626V17.0374C1.15087 25.7564 8.24365 32.8491 16.9626 32.8491H17.0374C25.7564 32.8491 32.8491 25.7564 32.8491 17.0374V16.9626C32.8491 8.24363 25.7564 1.15087 17.0374 1.15087H16.9626Z" fill="#2F324A"/>
                      <path d="M7.23664 8.01221L14.8116 18.1398L7.18945 26.3743H8.9054L15.5793 19.1653L20.9711 26.3743H26.8094L18.8086 15.677L25.9037 8.01221H24.1877L18.0421 14.6516L13.0761 8.01221H7.23778H7.23664ZM9.75933 9.27588H12.4409L24.2844 25.1106H21.6029L9.75933 9.27588Z" fill="#2F324A"/>
                      </svg>

                    </a>
                  </div>
              </div>
          </div>   
        </div>

        <section className="w-full bg-[#efede7] py-16 px-2 bg-[url('/bg-line2.svg')] bg-top bg-repeat-y">
          <h2 className="text-center text-2xl md:text-3xl font-serif font-bold text-[#0A2540] mb-12 mt-12">
            
            {(translations as any)[currentLocale]?.more_news_button || (translations as any)[i18n.defaultLocale]?.more_news_button || "More News"} 
          </h2>
          <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-2 max-w-screen-xl mx-auto">
            {/* Executive Bureau */}
            <div className="box1 relative bg-[#88938F] text-white rounded-none shadow-lg w-full md:w-1/2 px-8 py-12 flex flex-col gap-4 min-h-[340px] ">
 
 
              <div>
                  <h3 className="font-bold text-[20px]">{highlightBlocks[0]?.title ?? "Press Releases"}</h3>
                  <p className="mb-5 opacity-90 text-[15px] leading-[26px]">
                    {highlightBlocks[0]?.description ?? "Official positions of the Federation on key strategic topics:"}
                  </p>
                  <div className="flex flex-col gap-0 pb-2">
                    {/* List details for box1 */}
                    {Array.isArray(highlightBlocks[0]?.list_details) && highlightBlocks[0].list_details.length > 0 && (
                      highlightBlocks[0].list_details.map((item: any, i: number) => (
                        <div key={i} className="flex items-start py-5 border-b border-[#fff]">
                          <div className="flex items-center gap-4 flex-1">
                            <div className='w-4'>
                              <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5.84192 11.077C5.56569 11.077 5.28999 10.9733 5.07904 10.7653L0 5.75889L1.52576 4.25442L5.84192 8.50885L14.4742 0L16 1.50447L6.6048 10.7653C6.39385 10.9733 6.11816 11.077 5.84192 11.077Z" fill="white"/>
                              </svg> 
                            </div>
                            <div className='w-[calc(100%-16px)]'>
                              <span className="text-[#fff] text-[15px] leading-6">{item.title}</span>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                    <div className="mt-7">
                      {highlightBlocks[0]?.button_link && (
                        <Link href={highlightBlocks[0].button_link} className="inline-flex items-center gap-2 text-[#fff] font-medium text-sm" rel="noopener noreferrer">
                          {highlightBlocks[0]?.button_text ?? "Find out more"}
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.5 9.16663L9.16667 0.5M9.16667 0.5V8.82003M9.16667 0.5H0.84667" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </Link>
                      )}
                    </div>
                  </div>
              </div>
               {(() => {
                const thumbUrl = getThumbnailUrl(highlightBlocks[0]?.thumbnail);
                return thumbUrl ? (
                  <Image
                    alt={highlightBlocks[0]?.title ?? ""}
                    src={strapiImage(thumbUrl)}
                    width={248}
                    height={397}
                    className="absolute bottom-0 right-0 object-cover"
                  />
                ) : null;
              })()}

            </div>
            {/* General Assembly */}
            <div className="relative bg-[#efede7] text-white rounded-none shadow-lg w-full md:w-1/2 flex flex-col gap-4 min-h-[340px]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                {/* Top-left: Market News */}
                <article className="box2 bg-[#EDF0E5] text-[#0A2540] px-8 py-12">
                  {highlightBlocks[1]?.thumbnail?.data?.attributes?.url && (
                    <Image
                      alt={highlightBlocks[1]?.title ?? ""}
                      src={strapiImage(highlightBlocks[1].thumbnail.data.attributes.url)}
                      className="mb-4 rounded w-20 h-20 object-cover"
                      width={80}
                      height={80}
                    />
                  )}
                  <h3 className="text-xl font-semibold mb-3">{highlightBlocks[1]?.title ?? "Market News"}</h3>
                  <p className="text-sm leading-7 mb-6">
                    {highlightBlocks[1]?.description ?? "Trend analyses, barometers, statistics and studies to better understand the evolution of prices and demand in Luxembourg."}
                  </p>
                  {highlightBlocks[1]?.button_link && (
                    <Link href={highlightBlocks[1].button_link} className="inline-flex items-center gap-2 text-[#0A2540] font-medium" rel="noopener noreferrer">
                      {highlightBlocks[1]?.button_text ?? "Find out more"}
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 12.0001L12.6667 3.3335M12.6667 3.3335V11.6535M12.6667 3.3335H4.34667" stroke="#0A2540" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Link>
                  )}
                </article>

                {/* Top-right: Federation Events */}
                <article className="box3 bg-[#0A2540] text-white px-8 py-12 flex flex-col">
                  {highlightBlocks[2]?.thumbnail?.data?.attributes?.url && (
                    <Image
                      alt={highlightBlocks[2]?.title ?? ""}
                      src={strapiImage(highlightBlocks[2].thumbnail.data.attributes.url)}
                      className="mb-4 rounded w-20 h-20 object-cover"
                      width={80}
                      height={80}
                    />
                  )}
                  <div>
                    <h3 className="text-xl font-semibold mb-3">{highlightBlocks[2]?.title ?? "Federation Events and Activities"}</h3>
                    <p className="text-sm leading-7 mb-6 opacity-95">
                      {highlightBlocks[2]?.description ?? "Information on conferences, meetings, training sessions and collective actions organized by FIL."}
                    </p>
                  </div>
                  {highlightBlocks[2]?.button_link && (
                    <Link href={highlightBlocks[2].button_link} className="inline-flex items-center gap-2 text-[#BBA25A] font-medium" rel="noopener noreferrer">
                      {highlightBlocks[2]?.button_text ?? "Find out more"}
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 12.0001L12.6667 3.3335M12.6667 3.3335V11.6535M12.6667 3.3335H4.34667" stroke="#BBA25A" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Link>
                  )}
                </article>
              </div>
              <div className="box4 bg-white px-8 py-12 border-t-[5px] border-[#efede7]">
                {highlightBlocks[3]?.thumbnail?.data?.attributes?.url && (
                  <Image
                    alt={highlightBlocks[3]?.title ?? ""}
                    src={strapiImage(highlightBlocks[3].thumbnail.data.attributes.url)}
                    className="mb-4 rounded w-20 h-20 object-cover"
                    width={80}
                    height={80}
                  />
                )}
                <h4 className="text-xl font-semibold text-[#0A2540] mb-2">{highlightBlocks[3]?.title ?? "Regulatory Watch"}</h4>
                <p className="text-sm text-[#0A2540] leading-[26px] mb-4">
                  {highlightBlocks[3]?.description ?? "Presentation of new laws, decrees or decisions that impact agencies, developers and consumers. Each publication is accompanied by practical explanations to understand its concrete impact."}
                </p>
                {highlightBlocks[3]?.button_link && (
                  <Link href={highlightBlocks[3].button_link} className="text-[#BBA25A] font-medium text-sm inline-flex items-center gap-2" rel="noopener noreferrer">
                    {highlightBlocks[3]?.button_text ?? "Find out more"}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 12.0001L12.6667 3.3335M12.6667 3.3335V11.6535M12.6667 3.3335H4.34667" stroke="#BBA25A" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>              



      </div>

    
    </>
  );
}