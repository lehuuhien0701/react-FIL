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
        dynamic_zone: { populate: "*" }
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