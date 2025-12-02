"use client";
import React from "react"; 
import parse from "html-react-parser"; 

export const BlockCta = ({ heading = "", sub_heading = "", content = "", layout = "Full BlockCta", className = "" }: { heading?: string; sub_heading?: string; content?: string | string[]; layout?: string; className?: string }) => {
	// SVGs as components that accept props/className
	const CheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
		<svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
			<path d="M5.84192 12.0008C5.56569 12.0008 5.28999 11.8971 5.07904 11.6891L0 6.68272L1.52576 5.17825L5.84192 9.43268L14.4742 0.923828L16 2.4283L6.6048 11.6891C6.39385 11.8971 6.11816 12.0008 5.84192 12.0008Z" fill="#BBA25A"/>
		</svg>
	);


	// BlockCta: nhận content (string hoặc string[]), render từng item với đúng cấu trúc yêu cầu
	const BlockCtaInner: React.FC<{ content?: string | string[] | null }> = ({ content }) => {
		if (!content) return null;
		const items = Array.isArray(content)
			? content
			: String(content).split(/\r?\n/).map(s => s.trim()).filter(Boolean);
		if (!items.length) return null;

		return (
			<div className={`cta-block ${className || ""}`}>
				{items.map((item, idx) => (
					// add a stable class on each item so parent can target it with arbitrary variant
					<div key={idx} className={`cta-item flex items-center py-3 border-b`}>
						{/* phần bạn yêu cầu: hai div cố định */}
						<div className="w-4 mr-4">
							<CheckIcon className="text-teal-500 mt-1 flex-shrink-0" />
						</div>
						<div className="w-[calc(100%-16px)]">
							<span className="text-[#333] text-[14px] leading-5">{parse(item)}</span>
						</div>
					</div>
				))}
			</div>
		);
	};

	return (
		<>
			{/* no outer max-w / px wrapper — content rendered directly */}
			{heading && <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">{parse(heading)}</h3>}
			{sub_heading && <p className="text-gray-600 mb-6">{parse(sub_heading)}</p>}
			{/* features from single content field */}
			<BlockCtaInner content={content ?? null} />
		</>  
	);
};

export default BlockCta;