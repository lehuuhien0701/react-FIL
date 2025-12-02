import { Metadata } from 'next';
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
// Lệnh gọi API cho Metadata (Giữ nguyên)
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
          // "dynamic-zone.list-category-single": { populate: "*" },
          "dynamic-zone.form-contact": { populate: "*" }, 
          "dynamic-zone.image-address-social": { populate: "*" },
          "dynamic-zone.blog": { populate: "*" },
          "dynamic-zone.our-services-box": { populate: "*" },
          "dynamic-zone.member-profile": { populate: "*" },
          "dynamic-zone.member-directory-block": { populate: "*" },
          "dynamic-zone.banner-page": { populate: "*" },
          "dynamic-zone.section-block": { populate: "*" },
          "dynamic-zone.our-role": { populate: "*" },
          "dynamic-zone.section-block-commitment-card": { populate: "*" },
          "dynamic-zone.background-full": { populate: "*" },
          "dynamic-zone.real-estate-barometer": { populate: "*" },
          "dynamic-zone.news-innovation": { populate: "*" },
          "dynamic-zone.why-join": { populate: "*" },
          "dynamic-zone.three-pillars-section": { populate: "*" },
          "dynamic-zone.our-founding-values": { populate: "*" }, 
        },
      },
    },
  },
  true
);

const globalData = await fetchContentType(
  "global",
  {
    populate: {
      global_highlight_blocks: {
        on: {
          "global.global_highlight_blocks": {
            populate: ["thumbnail", "list_details"],
          },
        },
      },
    },
  },
  true
);









// Truy cập dữ liệu block bên trong dynamic zone
const highlightBlocks = globalData?.global_highlight_blocks ?? [];
//console.log("Highlight blocks:", highlightBlocks);

const localizedSlugs = pageData?.localizations?.reduce(
(acc: Record<string, string>, localization: any) => {
acc[localization.locale] = localization.slug;
return acc;
},
{ [params.locale]: params.slug }
) || { [params.locale]: params.slug };

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