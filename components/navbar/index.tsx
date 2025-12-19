"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { strapiImage } from "@/lib/strapi/strapiImage";
import { LocaleSwitcher } from "../locale-switcher";
import { translations } from '@/translations/common';
import { Locale } from '@/translations/types';
import { useParams, usePathname } from 'next/navigation';
import { i18n } from "@/i18n.config";

interface Props {
    data: any;
    logo: any;
    footer: any;
    locale: string;
}

export function Navbar({ data, logo, footer, locale }: Props) { 
    //... (Các hooks và useEffect giữ nguyên)
    const params = useParams();
    const currentLocale = (params?.locale as Locale) || (i18n.defaultLocale as Locale);
    const currentPath = usePathname(); 

    useEffect(() => {
        // ... (Logic Menu Overlay và Body class giữ nguyên)
        const svgOpen = document.querySelector<SVGElement>("svg.open");
        const svgClose = document.querySelector<SVGElement>("svg.close");
        const menu = document.querySelector<HTMLElement>(".menu-click");
        const formSubmitButton = document.querySelector<HTMLButtonElement>('form button[type="submit"]');

        if (!svgOpen || !menu || !svgClose) return;

        // Inject CSS... (giữ nguyên)

        const openHandler = () => {
            menu.classList.remove("hidden");
            menu.classList.add("show");
            document.body.classList.add("menu-open");
        };

        const closeHandler = () => {
            menu.classList.remove("show");
            menu.classList.add("hidden");
            document.body.classList.remove("menu-open");
        };

        // Nếu bạn có đoạn JS/jQuery nào tự động ẩn submenu khi click vào bất kỳ item, hãy kiểm tra lại:
        // Đặc biệt, đoạn này:
        // document.addEventListener("click", onDocumentClick);
        // và trong onDocumentClick:
        // if (!target) return;
        // if (menu.contains(target)) return;
        // if (svgOpen.contains(target)) return;
        // if (svgClose && svgClose.contains(target)) return;
        // closeHandler();

        // Nếu muốn submenu không bị ẩn khi click vào arrow hoặc vào item con, hãy thêm điều kiện:
        // if (target.closest('.submenu')) return;

        const onDocumentClick = (e: MouseEvent) => {
            const target = e.target as Node | null;
            if (!target) return;
            if (menu.contains(target)) return;
            if (svgOpen.contains(target)) return;
            if (svgClose && svgClose.contains(target)) return;
            // Không đóng menu nếu click vào arrow cấp 2
            if ((target as HTMLElement).closest('.arrow-menu-2')) return;
            if ((target as HTMLElement).closest('.submenu')) return;
            closeHandler();
        };

        const handleFormSubmitClick = () => {
            svgClose.dispatchEvent(new Event("click"));
        };
        if (formSubmitButton) {
            formSubmitButton.addEventListener("click", handleFormSubmitClick);
        }

        svgOpen.addEventListener("click", openHandler);
        svgClose.addEventListener("click", closeHandler);
        document.addEventListener("click", onDocumentClick);

        // Đóng tất cả submenu khi click ra ngoài nav
        const onNavOutsideClick = (e: MouseEvent) => {
            const navDiv = document.querySelector('.wrap-header');
            if (!navDiv) return;
            const target = e.target as Node | null;
            if (!target) return;
            // Nếu click ngoài navDiv thì đóng tất cả submenu
            if (!navDiv.contains(target)) {
                setOpenSubmenus({});
                setOpenThirdLevel({});
            }
        };
        document.addEventListener("mousedown", onNavOutsideClick);

        return () => {
            svgOpen.removeEventListener("click", openHandler);
            svgClose.removeEventListener("click", closeHandler);
            document.removeEventListener("click", onDocumentClick);
            if (formSubmitButton) {
                formSubmitButton.removeEventListener("click", handleFormSubmitClick);
            }
            document.body.classList.remove("menu-open");
            document.removeEventListener("mousedown", onNavOutsideClick);
        };
    }, []);
    
    // ... (Logic Language Switcher giữ nguyên)
    useEffect(() => {
        const buttons = Array.from(document.querySelectorAll<HTMLElement>('.open-language'));
        if (buttons.length === 0) return;
        // ... (Logic Language Switcher giữ nguyên)
        const onBtnClick = (e: Event) => {
            e.stopPropagation();
            const btn = e.currentTarget as HTMLElement;
            const container = btn.closest('.pr-5') || btn.parentElement;
            const box = container?.querySelector<HTMLElement>('.box-submenu');
            if (!box) return;

            document.querySelectorAll<HTMLElement>('.box-submenu.show').forEach(b => {
                if (b !== box) {
                    b.classList.remove('show');
                    b.classList.add('hidden');
                }
            });

            if (box.classList.contains('show')) {
                box.classList.remove('show');
                box.classList.add('hidden');
            } else {
                box.classList.add('show');
                box.classList.remove('hidden');
            }
        };

        const onDocClick = (e: MouseEvent) => {
            const t = e.target as HTMLElement | null;
            if (!t) return;
            if (!t.closest('.box-submenu') && !t.closest('.open-language')) {
                document.querySelectorAll<HTMLElement>('.box-submenu.show').forEach(b => {
                    b.classList.remove('show');
                    b.classList.add('hidden');
                });
            }
        };

        buttons.forEach(b => b.addEventListener('click', onBtnClick));
        document.addEventListener('click', onDocClick);

        return () => {
            buttons.forEach(b => b.removeEventListener('click', onBtnClick));
            document.removeEventListener('click', onDocClick);
        };
    }, []);

    const [openSubmenus, setOpenSubmenus] = useState<{ [key: number]: boolean }>({});

    // 🌟 HÀM MỚI: Đóng tất cả Submenu
    const closeAllSubmenus = () => {
        setOpenSubmenus({});
    };

    // HÀM TOGGLE: Thực hiện Logic Accordion
    const toggleSubmenu = (id: number) => {
        setOpenSubmenus(prev => {
            const isCurrentlyOpen = !!prev[id];

            if (isCurrentlyOpen) {
                return {}; // Đóng chính nó
            } 
            else {
                return {
                    [id]: true, // Mở menu này và đóng tất cả menu khác
                };
            }
        });
    };
    

    // Đặt state cho cấp 3 ở ngoài hàm renderMenuItems (trong component)
    const [openThirdLevel, setOpenThirdLevel] = useState<{ [key: number]: boolean }>({});

    // Đóng tất cả menu cấp 3 khi mở menu cấp 2 khác
    const closeAllThirdLevel = () => setOpenThirdLevel({});

    const [arrowRotated, setArrowRotated] = useState<{ [key: number]: boolean }>({});

    function renderMenuItems(menuData: any[]) {
        if (!Array.isArray(menuData)) {
            return [];
        }

        // Loại bỏ useState trong hàm này, dùng state ở ngoài như trên

        return menuData
            .filter(item => !item.parent) 
            .sort((a, b) => a.order - b.order) 
            .map(item => {
                const children = menuData
                    .filter(child => child.parent?.id === item.id)
                    .sort((a, b) => a.order - b.order);

                const isActive =
                    item.url === currentPath || children.some(child => child.url === currentPath);

                // SVG cho icon cấp 2
                const ArrowIcon = ({ onClick, id }: { onClick: (e: React.MouseEvent) => void, id: number }) => (
                    <span
                        className={`arrow-menu-2 ml-2 cursor-pointer flex items-center justify-end absolute h-[38px] top-0 right-0 pr-[12px] w-full`}
                        onClick={(e) => {
                            e.stopPropagation();
                            setArrowRotated(prev => ({ ...prev, [id]: !prev[id] }));
                            onClick(e);
                        }}
                    >
                        <svg
                            width="4"
                            height="8"
                            viewBox="0 0 4 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ transform: arrowRotated[id] ? "rotate(90deg)" : "none", transition: "transform 0.3s" }}
                        >
                            <path d="M0.5 7.09998L3.21666 4.38333C3.5375 4.0625 3.5375 3.5375 3.21666 3.21666L0.5 0.5" stroke="#0A2540" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </span>
                );

                const toggleThirdLevel = (id: number) => {
                    setOpenThirdLevel(prev => {
                        // Đóng tất cả, chỉ mở đúng id
                        const newState: { [key: number]: boolean } = {};
                        newState[id] = !prev[id];
                        return newState;
                    });
                };

                // Hàm render cấp 3
                const renderSubMenu = (parentId: number, level = 2) => {
                    const subItems = menuData
                        .filter(sub => sub.parent?.id === parentId)
                        .sort((a, b) => a.order - b.order);

                    if (!subItems.length) return null;

                    return (
                        <ul className={`submenu lg:absolute top-0 left-[100%] lg:w-[190px] bg-white transition-all duration-300 overflow-hidden`}>
                            {subItems.map(sub => {
                                const isSubActive = sub.url === currentPath;
                                const hasThirdLevel = menuData.some(third => third.parent?.id === sub.id);

                                return (
                                    <li
                                        key={sub.id}
                                        className={`relative block lg:flex items-center font-inter font-medium text-sm leading-[18px] text-[#0A2540] ${isSubActive ? "border-[#D9BA92]" : "border-transparent"}`}
                                    >
                                        {sub.url ? (
                                            <Link
                                                href={sub.url || "#"}
                                                className={`${isSubActive ? "text-[#0A2540] block bg-[#EDF0E5] px-[8px] py-[10px] w-full text-center" : "block px-[8px] py-[10px] w-full text-center"}`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    closeAllSubmenus();
                                                    closeAllThirdLevel();
                                                    const svgClose = document.querySelector<SVGElement>("svg.close");
                                                    if (svgClose) svgClose.dispatchEvent(new Event("click"));
                                                }}
                                            >
                                                {sub.icon?.url && (
                                                    <Image
                                                        className="mr-4"
                                                        alt={sub.icon.alternativeText || ""}
                                                        src={strapiImage(sub.icon.url)}
                                                        width={24}
                                                        height={24}
                                                    />
                                                )}
                                                {sub.title}
                                            </Link>
                                        ) : (
                                            <div
                                                className="flex items-center gap-3 px-[8px] py-[10px] w-full cursor-pointer"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleThirdLevel(sub.id);
                                                }}
                                            >
                                                {sub.icon?.url && (
                                                    <Image
                                                        className="mr-4"
                                                        alt={sub.icon.alternativeText || ""}
                                                        src={strapiImage(sub.icon.url)}
                                                        width={24}
                                                        height={24}
                                                    />
                                                )}
                                                <span>{sub.title}</span>
                                                {hasThirdLevel && (
                                                    <ArrowIcon
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            toggleThirdLevel(sub.id);
                                                        }}
                                                        id={sub.id}
                                                    />
                                                )}
                                            </div>
                                        )}
                                        {/* Render cấp 3 nếu có và được mở */}
                                        {hasThirdLevel && openThirdLevel[sub.id] && renderSubMenu(sub.id, level + 1)}
                                    </li>
                                );
                            })}
                        </ul>
                    );
                };

                console.log('Rendering menu item:', item.title, item.is_active);
                return (
                    <li
                        key={item.id}
                        className={`relative  font-inter font-medium text-sm leading-[18px] text-white group ${isActive ? "border-[#D9BA92]" : "border-transparent"}`}
                    >
                        {item.url ? (
                            <Link
                                href={item.url}
                                className={`pl-[10px] lg:pl-[20px] xl:pl-[40px] ${item.url === currentPath ? "text-[#CCAB80]" : ""} ${item.is_active == true ? "border border-[#BBA25A] rounded-full py-[10px] xl:pl-5 xl:pr-5 xl:ml-10 [&>span]:text-[#BBA25A] w-auto" : ""}`} 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    closeAllSubmenus();
                                    closeAllThirdLevel(); // Đóng tất cả menu cấp 3 khi click vào menu cha khác
                                    const svgClose = document.querySelector<SVGElement>("svg.close");
                                    if (svgClose) svgClose.dispatchEvent(new Event("click"));
                                }}
                            >
                                {item.title}
                            </Link>
                        ) : (
                            <div
                                className={`inline-flex xl:flex items-center gap-3 pl-[10px] lg:pl-[20px] xl:pl-[40px] cursor-pointer${item.is_active == true ? " border border-[#BBA25A] rounded-full pr-10 py-[10px] pl-10 xl:pl-5 xl:pr-5 xl:ml-10 [&>span]:text-[#BBA25A] w-auto" : ""}`}
                                onClick={() => {
                                    toggleSubmenu(item.id);
                                    closeAllThirdLevel(); // Đóng tất cả menu cấp 3 khi mở menu cha khác
                                }}
                            >
                                <span>{item.title}</span>
                                

                                <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg"
                                className={`transition-transform duration-300 rotate-90 ${openSubmenus[item.id] ? "rotate-0" : ""}`}
                                >
                                <path d="M0.5 9.73997L4.30333 5.93666C4.7525 5.4875 4.7525 4.7525 4.30333 4.30333L0.5 0.5" stroke="#BBA25A" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>



                            </div>
                        )}
                        {children.length > 0 && openSubmenus[item.id] && (
                            <ul className={`lg:absolute m-auto w-[95%] lg:w-[196px] left-[20px] top-[54px] mt-5 lg:mt-0 submenu bg-white transition-all duration-300 overflow-hidden-bk max-h-screen lg:block`}>
                                {children.map(child => {
                                    const isChildActive = child.url === currentPath;
                                    const hasThirdLevel = menuData.some(third => third.parent?.id === child.id);
                                    // Kiểm tra cấp 3 active
                                    const isThirdLevelActive = menuData.some(
                                        third => third.parent?.id === child.id && third.url === currentPath
                                    );

                                    return (
                                        <li
                                            key={child.id}
                                            className={`px-1 border-b border-[#EDEBE7] relative block lg:flex items-center font-inter font-medium text-sm leading-[18px] text-[#0A2540] ${
                                                isChildActive || isThirdLevelActive ? "border-[#D9BA92]" : "border-transparent"
                                            }`}
                                        >
                                            <Link
                                                href={child.url || "#"}
                                                className={`${
                                                    isChildActive || isThirdLevelActive
                                                        ? "text-[#0A2540] block bg-[#EDF0E5] px-[8px] py-[10px] w-full text-center"
                                                        : "block px-[8px] py-[10px] w-full text-center"
                                                }`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    closeAllSubmenus();
                                                    closeAllThirdLevel();
                                                    const svgClose = document.querySelector<SVGElement>("svg.close");
                                                    if (svgClose) svgClose.dispatchEvent(new Event("click"));
                                                }}
                                            >
                                                {child.icon?.url && (
                                                    <Image
                                                        className="mr-4"
                                                        alt={child.icon.alternativeText || ""}
                                                        src={strapiImage(child.icon.url)}
                                                        width={24}
                                                        height={24}
                                                    />
                                                )}
                                                {child.title}
                                            </Link>
                                            {hasThirdLevel && (
                                                <ArrowIcon onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleThirdLevel(child.id);
                                                }} id={child.id} />
                                            )}
                                            {/* Render cấp 3 nếu có và được mở */}
                                            {hasThirdLevel && openThirdLevel[child.id] && renderSubMenu(child.id, 3)}
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </li>
                );
            });
    }

    return (
        // ... (phần render Navbar giữ nguyên)
        <div className='wrap-header bg-[#0A2540] relative z-[99999]'>  
            <div className='max-w-[1400px] mx-auto w-full px-5 md:px-10 lg:px-20 relative z-10'>
                <nav className="border-b border-white/10 sticky top-0">
                    <div className="h-[69px] flex items-center justify-between">
                        <h1 className='font-merriweather font-bold text-base md:text-xl leading-6'>
                            <Link
                              href={currentLocale === i18n.defaultLocale ? "/" : `/${currentLocale}`}
                              aria-label="Go to home"
                              className="text-[#2F324A] flex items-center gap-2"
                            >
                              {logo?.url ? (
                                <Image
                                  src={strapiImage(logo.url)}
                                  alt={logo?.alternativeText || logo?.logo_text || "Logo"}
                                  width={logo?.width || 30}
                                  height={logo?.height || 27}
                                  className="inline-block"
                                />
                              ) : (
                                <span>
                                  {logo?.logo_text || "FIL"}
                                </span>
                              )}
                            </Link>
                        </h1>
                        <div className="flex items-center">
                            {/* Menu desktop: chỉ hiện khi lg trở lên */}
                            <ul className='hidden lg:flex items-center pr-10'>
                                {renderMenuItems(data)}
                            </ul>
                            <div className="block">
                                <LocaleSwitcher currentLocale={locale} />
                            </div>
                            {/* Menu mobile: chỉ hiện khi nhỏ hơn lg */}
                            <div className='flex items-center lg:hidden pl-5 md:pl-10'>
                                <svg className='open cursor-pointer' width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="15.1602" y="30.2928" width="20.9723" height="3.22651" rx="1.61326" fill="#CCAB80"/>
                                    <rect x="23.2265" y="21.4199" width="12.9061" height="3.22651" rx="1.61326" fill="#CCAB80"/>
                                    <rect x="3.86743" y="13.3536" width="32.2651" height="3.22651" rx="1.61326" fill="#CCAB80"/>
                                    <rect x="15.1602" y="4.48069" width="20.9723" height="3.22651" rx="1.61326" fill="#CCAB80"/>
                                </svg>
                                <span className='font-inter font-bold text-base leading-6 text-[#CCAB80] ml-[10px]'>
                                    {(translations as any)[currentLocale]?.menu || (translations as any)[i18n.defaultLocale]?.menu || "Menu"} 
                                </span>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>

            {/* Menu overlay mobile: chỉ hiện khi nhỏ hơn lg và khi click vào nút mở menu */}
            <div className='menu-click bg-[linear-gradient(180deg,#383842_0%,#19191D_100%)] absolute top-0 left-0 right-0 z-[99999] hidden lg:hidden'>
                <div className='max-w-[1400px] mx-auto w-full px-0 md:px-10 lg:px-20 relative'>
                    <div className='absolute top-6 right-[20px] sm:right-[40px] md:right-[90px] lg:right-[130px]'>
                        <svg className='close cursor-pointer' width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 29L29 11M11 11L29 29" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>

                    {/* primary nav list */}
                    <div className='md:px-6 pb-20 pt-24'>
                        <ul className='space-y-6'>
                            {renderMenuItems(data)}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}