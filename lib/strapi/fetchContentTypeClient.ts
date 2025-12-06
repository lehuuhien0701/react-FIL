import qs from "qs";

export default async function fetchContentTypeClient(
  contentType: string,
  params: Record<string, unknown> = {},
): Promise<any> {
  try {
    const url = new URL(`api/${contentType}`, process.env.NEXT_PUBLIC_API_URL);
    const queryString = qs.stringify(params, {
      encodeValuesOnly: true
    });

    const response = await fetch(`${url.href}?${queryString}`);

    //console.log(`FetchContentTypeClient: url=${url.toString()}?${queryString}, status=${response.status}`); 
    if (!response.ok) {
      throw new Error(`Lỗi khi fetch từ Strapi (url=${url.toString()}, status=${response.status})`);
    }

    return response.json();
  } catch (error) {
    console.error('FetchContentTypeError', error);
    return null;
  }
} 
   