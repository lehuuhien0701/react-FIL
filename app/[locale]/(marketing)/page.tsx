import { Metadata } from 'next';
 
import PageContent from '@/lib/shared/PageContent';
import fetchContentType from '@/lib/strapi/fetchContentType';
import { generateMetadataObject } from '@/lib/shared/metadata';
import ClientSlugHandler from './ClientSlugHandler';

export async function generateMetadata({
 params,
}: {
 params: { locale: string };
}): Promise<Metadata> {

 // KHÔNG THAY ĐỔI: Giữ lại populate SEO cho Metadata
 const pageData = await fetchContentType(
 'pages',
 {
 filters: {
 slug: "homepage",
 locale: params.locale,
 },
 populate: "seo.metaImage",
 },
 true
 );

 const seo = pageData?.seo;
 const metadata = generateMetadataObject(seo);
 return metadata;
}

export default async function HomePage({ params }: { params: { locale: string } }) {

 // VỊ TRÍ CẦN THAY THẾ: Thay thế lệnh gọi API này
// Bằng lệnh gọi mới có populate Dynamic Zone

  /* THAY THẾ KHỐI CODE SAU:
  const pageData = await fetchContentType(
    'pages',
    {
      filters: {
        slug: "homepage",
        locale: params.locale,
      },
    },
    true
  );
  */
  
  // BẰNG KHỐI CODE MỚI CỦA BẠN:
  // const pageData = await fetchContentType(
  //     'pages',
  //     {
  //       filters: {
  //         slug: "homepage",
  //         locale: params.locale,
  //       },
  //         populate: {
  //           dynamic_zone: {
  //             populate: "*"
  //           }
  //         }
  //     },
  //     true
  //   );

const pageData = await fetchContentType(
    'pages',
    {
      filters: {
        slug: "homepage",
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

            



            "dynamic-zone.bannerhome": { populate: "*" },
            // "dynamic-zone.list-category-single": { populate: "*" },
            "dynamic-zone.thank-you-page": { populate: "*" }, 
            "dynamic-zone.form-contact": { populate: "*" }, 
            "dynamic-zone.image-address-social": { populate: "*" },
            "dynamic-zone.blog": { populate: "*" },
            "dynamic-zone.our-services-box": { populate: "*" },
            "dynamic-zone.member-profile": { populate: "*" },
            "dynamic-zone.member-directory-block": { populate: "*" },
            "dynamic-zone.banner-page": { populate: "*" },
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
        }
      }
    },
    true
  );




const localizedSlugs = pageData?.localizations?.reduce(
 (acc: Record<string, string>, localization: any) => {
 acc[localization.locale] = "";
 return acc;
 },
 { [params.locale]: "" }
 );

 return <>
 <ClientSlugHandler localizedSlugs={localizedSlugs} />
 <PageContent pageData={pageData} />
 </>;
}