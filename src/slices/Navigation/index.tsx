"use client";

import { useRef, useState } from "react";
import { Content, ImageField, LinkField } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import HamburgerMenuIcon from "../../images/HamburgerMenuIcon";
import CloseIcon from "../../images/CloseIcon";
import { useOnClickOutside } from "usehooks-ts";

/**
 * Props for `Navigation`.
 */
export type NavigationProps = SliceComponentProps<Content.NavigationSlice>;

/**
 * Component for "Navigation" Slices.
 */

const DesktopNavigationItem = ({
  link,
  image,
  color
}: {
  link: LinkField;
  image: ImageField<never>;
  color: string;
}) => {
  console.log(color);

  return (
    <div
      className={`${color ? "text-[" + color + "]" : "text-brand-beige-200"} font-playfair text-lg leading-6 uppercase`}
    >
      <PrismicNextLink scroll={false} field={link}>
        {image.url ? <PrismicNextImage field={image} alt="" /> : link.text}
      </PrismicNextLink>
    </div>
  );
};

const DesktopNavigation = ({ slice }: { slice: NavigationProps["slice"] }) => {
  const firsSection = slice.primary.navigation_item.slice(0, 2)!;
  const middleSection = slice.primary.navigation_item[2]!;
  const secondSection = slice.primary.navigation_item.slice(3, 6)!;

  return (
    <div className="w-full flex items-center justify-normal py-8 px-4 max-w-screen-xl m-auto">
      <div className="w-full flex items-center justify-around">
        {firsSection.map((navigationItem) => (
          <DesktopNavigationItem
            key={navigationItem.link.text}
            link={navigationItem.link}
            image={navigationItem.image}
            color={slice.primary.forced_color as string}
          />
        ))}
      </div>
      <div className="flex items-center min-w-[200px] justify-center">
        <DesktopNavigationItem
          link={middleSection.link}
          image={middleSection.image}
          color={slice.primary.forced_color as string}
        />
      </div>
      <div className="w-full flex items-center justify-around">
        {secondSection.map((navigationItem) => (
          <DesktopNavigationItem
            key={navigationItem.link.text}
            link={navigationItem.link}
            image={navigationItem.image}
            color={slice.primary.forced_color as string}
          />
        ))}
      </div>
    </div>
  );
};

const MobileNavigationItem = ({
  link,
  image
}: {
  link: LinkField;
  image: ImageField<never>;
}) => {
  return (
    <div className="font-playfair text-xl leading-6 mb-4">
      <PrismicNextLink scroll={false} field={link}>
        {image.url ? <PrismicNextImage field={image} alt="" /> : link.text}
      </PrismicNextLink>
    </div>
  );
};

const MobileNavigation = ({ slice }: { slice: NavigationProps["slice"] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ref = useRef(null);
  useOnClickOutside(ref, () => setIsModalOpen(false));

  const navigationItemsCopy = [...slice.primary.navigation_item];
  const imageItem = navigationItemsCopy[2];
  const navigationItems = [
    ...slice.primary.navigation_item.slice(0, 2),
    ...slice.primary.navigation_item.slice(3, 6)!
  ];

  return (
    <div className="w-full p-8" onClick={() => setIsModalOpen(!isModalOpen)}>
      <HamburgerMenuIcon forcedColor={slice.primary.forced_color as string} />
      <div className="absolute top-4 left-1/2 -translate-x-1/2 ">
        <MobileNavigationItem link={imageItem.link} image={imageItem.image} />
      </div>
      {isModalOpen && (
        <div className="w-full max-w-[285px] h-max absolute top-8 left-8 bg-black bg-opacity-80 p-8 rounded-3xl flex flex-col items-center">
          <div
            className="absolute top-6 right-6"
            onClick={() => setIsModalOpen(false)}
          >
            <CloseIcon />
          </div>
          <div className="mb-4">
            <MobileNavigationItem
              link={imageItem.link}
              image={imageItem.image}
            />
          </div>
          {navigationItems.map((navigationItem) => (
            <div
              className="text-brand-beige opacity-60"
              key={navigationItem.link.text}
            >
              <MobileNavigationItem
                link={navigationItem.link}
                image={navigationItem.image}
              />
            </div>
          ))}
          <div className="w-full max-w-[200px] h-[1px] rounded-sm bg-brand-beige my-4"></div>
          <div className="font-playfair text-brand-beige text-xl p-3 rounded-full border border-white bg-brand-beige bg-opacity-10 mt-4">
            <PrismicNextLink scroll={false} field={slice.primary.mobile_cta} />
          </div>
        </div>
      )}
    </div>
  );
};

const Navigation = ({ slice }: NavigationProps): JSX.Element => {
  return (
    <div
      className="w-full fixed top-0 left-1/2 -translate-x-1/2 z-40"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.4) 20%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.1) 80%, rgba(0,0,0,0) 100%)`
      }}
    >
      <div className="w-full hidden md:flex">
        <DesktopNavigation slice={slice} />
      </div>
      <div className="w-full flex md:hidden">
        <MobileNavigation slice={slice} />
      </div>
    </div>
  );
};

export default Navigation;
