import { type Metadata } from "next";

import { strapiImage } from "@/lib/strapi/strapiImage";
import fetchContentType from "@/lib/strapi/fetchContentType";
import { generateMetadataObject } from '@/lib/shared/metadata';
import { Blog } from "@/components/dynamic-zone/blog";


export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const pageData = await fetchContentType('blog-page', {
    filters: { locale: params.locale },
    populate: "seo.metaImage",
  }, true)

  const seo = pageData?.seo;
  const metadata = generateMetadataObject(seo);
  return metadata;
}

export default async function BlogPage({
  params,
}: {
  params: { locale: string, slug: string };
}) {
  const blogPage = await fetchContentType('blog-page', {
    filters: { locale: params.locale },
    populate: '*'
  }, true)

  return (
    <div className="relative overflow-hidden py-0">
      <div className="flex flex-col items-center justify-between pb-20">
        <div 
          className="banner relative z-20 px-5  pb-20 pt-[160px] w-full flex flex-col items-center justify-center text-white"
          style={{ 
            backgroundImage: blogPage.banner_background ? 
              `url(${strapiImage(blogPage.banner_background.url)})` : 
              'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <h1 className="mb-3 text-[50px] md:text-[66px] lg:text-[78px] leading-none text-center font-bold">
            {blogPage.heading}
          </h1>
          <div className="mx-auto text-[28px] text-center">
            {blogPage.sub_heading}
          </div>
        </div>

        {/* <Blog 
          layout=""
          title=""
          description=""
          button_text=""
          button_link=""
          locale={params.locale}
        /> */}


          <Blog 
          layout=""
          title=""
          description=""
          button_text=""
          button_link=""
          readmore=""
          locale={params.locale}
        />

      </div>
    </div>
  );
}