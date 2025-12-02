"use client";
import React from "react";
import { Container } from "../container";
import { strapiImage } from "@/lib/strapi/strapiImage";
import Image from "next/image";

export const BackgroundFull = ({ background = null }: { background?: any | null }) => {
	if (!background) return null;
  const safeImageSrc = (media: any, fallback: string) => {
      try {
        const url =
          media?.url ??
          media?.data?.attributes?.url ??
          media?.attributes?.url ??
          null;
        return strapiImage(url) ?? fallback;
      } catch {
        return fallback;
      }
    };

	return (
		<section className="bg-navy">
			<Container>
				<Image width={2500} height={439}
					src={strapiImage(background?.url)}
					alt={background?.alternativeText ?? ""}
					className="m-auto block object-cover w-full h-auto"
				/>
			</Container>
		</section>
	);
}; 
