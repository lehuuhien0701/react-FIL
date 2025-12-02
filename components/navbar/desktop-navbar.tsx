"use client";
import { Logo } from "@/components/logo";
import { Button } from "@/components/elements/button";
import { NavbarItem } from "./navbar-item";
import {
  useMotionValueEvent,
  useScroll,
  motion,
  AnimatePresence,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Link } from "next-view-transitions";
import { LocaleSwitcher } from "../locale-switcher";
import { i18n } from "@/i18n.config";
import { Container } from "../container";

type Props = {
  leftNavbarItems: {
    URL: string;
    text: string;
    target?: string;
  }[];
  rightNavbarItems: {
    URL: string;
    text: string;
    target?: string;
  }[];
  logo: any;
  locale: string;
};

export const DesktopNavbar = ({ leftNavbarItems, rightNavbarItems, logo, locale }: Props) => {
  const { scrollY } = useScroll();

  const [showBackground, setShowBackground] = useState(false);

  useMotionValueEvent(scrollY, "change", (value) => {
    if (value > 100) {
      setShowBackground(true);
    } else {
      setShowBackground(false);
    }
  });
  return (
    <motion.div
      className={cn(
        "w-full relative py-5 transition duration-200 bg-transparent mx-auto"
      )}
      animate={{
        width: showBackground ? "100%" : "100%",
        background: showBackground ? "white" : "transparent",
      }}
      transition={{
        duration: 0.4,
      }}
    >
      <Container className="flex justify-between">
        <div className="flex flex-row gap-2 items-center">
          <Logo locale={locale} image={logo?.image} company={logo?.company} active={showBackground} />
          
        </div>
        <div className="flex space-x-3 items-center">

          <div className={`flex items-center gap-1.5 ${showBackground ? 'text-secondary' : 'text-white'}`}>
            {leftNavbarItems.map((item) => (
              <NavbarItem 
                href={item.URL as never}
                key={item.text} 
                target={item.target}
              >
                {item.text}
              </NavbarItem>
            ))}
          </div>


          {rightNavbarItems.map((item, index) => (
            <Button 
              key={item.text} 
              variant={index === rightNavbarItems.length - 1 ? 'primary' : 'simple'} 
              as={Link} 
              href={`${locale === i18n.defaultLocale ? '' : `/${locale}`}${item.URL}`}
            >
              {item.text}
            </Button>
          ))}

          <div className="pl-5">
            <LocaleSwitcher currentLocale={locale} />
          </div>

        </div>
      </Container>
    </motion.div>
  );
};
