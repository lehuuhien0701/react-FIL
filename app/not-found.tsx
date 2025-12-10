import fetchContentType from '@/lib/strapi/fetchContentType'; // Giả sử hàm fetchContentType có sẵn
import NotFoundClient from './NotFoundClient'; // Import component mới tạo

// Loại bỏ "use client" để biến nó thành Server Component

export default async function NotFound() {
    
    // 1. Fetch dữ liệu Global (Không cần populate phức tạp, chỉ cần các trường cấp 1)
    const globalData = await fetchContentType(
        "global", 
        {
            // Không cần populate nếu title_404, description_404, button_404 là các trường cấp 1
        }, 
        true // true thường là để lấy dữ liệu cấp 1
    );

    // 2. Chuẩn bị dữ liệu (Fallback nếu Strapi không có)
    const title = globalData?.title_404 || "Page Not Found";
    const description = globalData?.description_404 || "The page you are looking for does not exist.";
    const buttonText = globalData?.button_404 || "Back to Home";

    // 3. Render Client Component với dữ liệu fetched
    return (
        <NotFoundClient 
            title={title} 
            description={description} 
            buttonText={buttonText}  
        />
    );
}