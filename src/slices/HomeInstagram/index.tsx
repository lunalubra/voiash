"use client";

import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Arrow from "../../images/Arrow";
import { useRef } from "react";

/**
 * Props for `HomeInstagram`.
 */
export type HomeInstagramProps =
  SliceComponentProps<Content.HomeInstagramSlice>;

/**
 * Component for "HomeInstagram" Slices.
 */
const HomeInstagram = ({ slice }: HomeInstagramProps): JSX.Element => {
  const carouselRef = useRef<HTMLDivElement>(null);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-[#F2F2F2]"
    >
      <div className="w-full max-w-screen-xl m-auto flex flex-col items-center gap-6 py-5">
        <div className="font-playfair text-3xl md:text-4xl text-brand-beige-300 px-4 py-5 md:py-10">
          <PrismicRichText field={slice.primary.title} />
        </div>
        <div className="flex gap-4 items-center max-w-full overflow-hidden">
          <div
            className="hidden md:flex"
            onClick={() =>
              carouselRef.current?.scrollBy({
                left: carouselRef.current?.scrollLeft - 800,
                behavior: "smooth"
              })
            }
          >
            <Arrow />
          </div>
          <div
            ref={carouselRef}
            className="flex items-center gap-6 no-scrollbar px-4 max-w-full overflow-auto"
          >
            {slice.primary.instagram.map((item, index) => (
              <div
                className="[&_iframe]:max-h-[510px] md:[&_iframe]:max-h-[unset] max-w-[320px] md:max-w-[400px]"
                key={index}
                dangerouslySetInnerHTML={{
                  __html: item.instagram_post_code!
                }}
              />
            ))}
          </div>
          <div
            className="hidden md:flex rotate-180"
            onClick={() =>
              carouselRef.current?.scrollBy({
                left: carouselRef.current?.scrollLeft + 400,
                behavior: "smooth"
              })
            }
          >
            <Arrow />
          </div>
        </div>
        <div className="flex">
          {slice.primary.social_media.map((item, index) => (
            <div key={index}>
              <PrismicNextLink field={item.link}>
                <PrismicNextImage field={item.logo} alt="" />
              </PrismicNextLink>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeInstagram;
