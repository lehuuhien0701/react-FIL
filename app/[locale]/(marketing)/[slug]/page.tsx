import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageContent from '@/lib/shared/PageContent';
import fetchContentType from '@/lib/strapi/fetchContentType';
import { generateMetadataObject } from '@/lib/shared/metadata';
import ClientSlugHandler from '../ClientSlugHandler';
import { strapiImage } from '@/lib/strapi/strapiImage';

export async function generateMetadata({
params,
}: {
params: { locale: string; slug: string };
}): Promise<Metadata> {
const pageData = await fetchContentType(
  "pages",
  {
  filters: {
  slug: params.slug,
  locale: params.locale,
  },
  populate: "seo.metaImage",
  },
  true,
);


  // Xóa hoặc giữ lại console.log nếu cần debug
  // console.log("Page data:", pageData);

  // Trả về metadata mặc định nếu không có dữ liệu
  if (!pageData || !pageData.slug) {
    return {};
  }

  const seo = pageData?.seo;
  const metadata = generateMetadataObject(seo);
  return metadata;
}

export default async function Page({ params }: { params: { locale: string, slug: string } }) {
// --- VỊ TRÍ CODE CŨ (Đã bị thay thế) ---
/*
const pageData = await fetchContentType(
"pages",
{
filters: {
slug: params.slug,
locale: params.locale,
},
},
true,
);
*/

// --- CODE MỚI (Đã thêm) ---
// const pageData = await fetchContentType(
// "pages",
// {
// filters: {
// slug: params.slug,
// locale: params.locale,
// },
// populate: {
// dynamic_zone: {
// populate: "*"
// }
// }
// },
// true,
// );

// const pageData = await fetchContentType(
//     "pages",
//     {
//       filters: {
//         slug: params.slug,
//         locale: params.locale,
//       },
//       populate: {
//         localizations: { populate: "*" },
//         dynamic_zone: { populate: "*" }
//       }
//     },
//     true,
//   );



const pageData = await fetchContentType(
  "pages",
  {
    filters: {
      slug: params.slug,
      locale: params.locale, 
    },
    populate: {
      localizations: { populate: "*" },
      dynamic_zone: {
        on: {
          "dynamic-zone.governance-structure": { 
            populate: {
              governance_structure: { // Trường lặp lại cấp 1 (component chính)
                populate: ["thumbnail", "list_details"] // Thêm "list_details" vào mảng populate
              },
            },
          }, 


          "dynamic-zone.section-block-commitment-card": { 
            populate: {
              SectionBlockCommitmentCard: { // Đúng tên repeatable component như Strapi schema
                populate: ["icon", "background", "blockcta"]
              },
            },
          }, 

          
            "dynamic-zone.why-join": { 
              populate: {
                list_logo: { // Đúng tên repeatable component như Strapi schema
                  populate: ["image"]
                }, 
                background: true,
                multiple_logo: true,
                icon_comment: true,        
                list_details_top_section: true,
                list_details_top_section2: true,
                blockcta: true,
                our_missions_in_action: true, 
              },
            },  
            "dynamic-zone.banner-page": { 
              populate: {
                list_logo: { // Đúng tên repeatable component như Strapi schema
                  populate: ["image"]
                },  
              },
            },  
 
          // "dynamic-zone.list-category-single": { populate: "*" },
          "dynamic-zone.thank-you-page": { populate: "*" }, 
          "dynamic-zone.form-contact": { populate: "*" }, 
          "dynamic-zone.image-address-social": { populate: "*" },
          "dynamic-zone.blog": { populate: "*" },
          "dynamic-zone.our-services-box": { populate: "*" },
          "dynamic-zone.member-profile": { populate: "*" },
          "dynamic-zone.member-directory-block": { populate: "*" },
          //"dynamic-zone.banner-page": { populate: "*" },
          "dynamic-zone.section-block": { populate: "*" },
          "dynamic-zone.our-role": { populate: "*" },
          //"dynamic-zone.section-block-commitment-card": { populate: "*" },
          "dynamic-zone.background-full": { populate: "*" },
          "dynamic-zone.real-estate-barometer": { populate: "*" },
          "dynamic-zone.news-innovation": { populate: "*" },
          //"dynamic-zone.why-join": { populate: "*" },
          "dynamic-zone.three-pillars-section": { populate: "*" },
          "dynamic-zone.our-founding-values": { populate: "*" }, 
        },
      },
    },
  },
  true
);


const localizedSlugs = pageData?.localizations?.reduce(
(acc: Record<string, string>, localization: any) => {
acc[localization.locale] = localization.slug;
return acc;
},
{ [params.locale]: params.slug }
) || { [params.locale]: params.slug };

if (!pageData || !pageData.slug) {
  notFound();
}

return (
<>
<ClientSlugHandler localizedSlugs={localizedSlugs} />
{pageData?.banner_background ? (
<div 
className="banner relative z-20 px-5 pb-20 pt-[160px] w-full flex flex-col items-center justify-center text-white"
style={{ 
backgroundImage: pageData?.banner_background ? 
`url(${strapiImage(pageData.banner_background.url)})` : 
'none',
backgroundSize: 'cover',
backgroundPosition: 'center'
}}
>
  {pageData.banner_title ? (
  <h1 className="mb-3 text-[50px] md:text-[66px] lg:text-[78px] leading-none text-center font-bold">
  {pageData.banner_title}
  </h1>
  ) : null}

  {pageData.banner_description ? (
    <div className="mx-auto text-[28px] text-center">
    {pageData.banner_description}
    </div>
  ) : null}

</div>
) : null }

<PageContent pageData={pageData} />
</>

);
}