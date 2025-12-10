"use client";
import Link from "next/link";

interface NotFoundClientProps {
    title: string;
    description: string;
    buttonText: string;
}

export default function NotFoundClient({ title, description, buttonText }: NotFoundClientProps) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-primary text-white">
            {/* SỬ DỤNG DỮ LIỆU ĐƯỢC TRUYỀN TỪ GLOBAL */}
            <h1 className="text-5xl font-bold mb-4">{title}</h1> 
            <p className="mb-6 text-lg">{description}</p>
            <Link href="/" className="px-4 py-2 bg-white text-primary rounded hover:bg-gray-200 transition">
                {buttonText}
            </Link>
        </div>
    );
}