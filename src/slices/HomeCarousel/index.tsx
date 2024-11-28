"use client";

import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { useEffect, useRef, useState } from "react";
import { useInterval } from "usehooks-ts";

/**
 * Props for `HomeCarousel`.
 */
export type HomeCarouselProps = SliceComponentProps<Content.HomeCarouselSlice>;

/**
 * Component for "HomeCarousel" Slices.
 */
const HomeCarousel = ({ slice }: HomeCarouselProps): JSX.Element => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left:
          activeTab === 1
            ? 0
            : (activeTab - 1) * carouselRef.current.offsetWidth,
        behavior: "smooth"
      });
    }
  }, [activeTab]);

  const tabsNumber = 6;

  useInterval(() => {
    setActiveTab(tabsNumber === activeTab ? 1 : activeTab + 1);
  }, 4000);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative w-full"
    >
      <div className="w-full max-w-screen-xl h-[500px] m-auto py-[72px] px-10 md:px-14 flex flex-col items-center md:items-start text-center md:text-left">
        <div className="font-playfair text-brand-beige text-[45px] md:text-6xl">
          <PrismicRichText field={slice.primary.title} />
        </div>
        <div className="font-playfair text-brand-beige text-2xl md:text-3xl">
          <PrismicRichText field={slice.primary.subtitle} />
        </div>
        <div className="w-min font-playfair text-brand-beige-200 text-xl px-8 py-4 md:py-3 rounded-full border border-brand-beige-200 bg-black bg-opacity-40 hover:bg-opacity-60 mt-5 md:mt-4">
          <PrismicNextLink field={slice.primary.cta} />
        </div>
      </div>
      <div
        ref={carouselRef}
        className="absolute -z-[1] flex top-0 left-0 max-w-full overflow-auto no-scrollbar w-full h-[500px]"
      >
        {slice.primary.carousel.map((item, index) => (
          <div
            key={index}
            className="min-w-full min-h-full bg-no-repeat bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 50%), url('${item.image.url}')`
            }}
          />
        ))}
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1">
        {Array.from(Array(tabsNumber).keys()).map((_, index) => (
          <div
            className={`${index + 1 === activeTab ? "bg-brand-beige-200" : "bg-white"} min-w-[8px] min-h-[8px]  rounded-full cursor-pointer`}
            key={index}
            onClick={() => {
              setActiveTab(index + 1);
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default HomeCarousel;
