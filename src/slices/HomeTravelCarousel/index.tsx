"use client";

import { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Image from "next/image";
import { Carousel } from "react-responsive-3d-carousel";
import "react-responsive-3d-carousel/dist/styles.css";

/**
 * Props for `HomeTravelCarousel`.
 */
export type HomeTravelCarouselProps =
  SliceComponentProps<Content.HomeTravelCarouselSlice>;

/**
 * Component for "HomeTravelCarousel" Slices.
 */
const HomeTravelCarousel = ({
  slice
}: HomeTravelCarouselProps): JSX.Element => {
  const slides = slice.primary.carousel.map(({ image }) => (
    <div
      key={image.id}
      className="[&_img]:w-full md:w-[554px] h-full [&_img]:h-full"
    >
      <Image src={(image as any).url} width={554} height={554} alt="" />
    </div>
  ));

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full max-w-screen-xl m-auto flex flex-col items-center justify-center gap-6 px-4 py-16"
    >
      <div className="font-playfair text-3xl text-brand-beige-300 text-center">
        <PrismicRichText field={slice.primary.title} />
      </div>
      <div className="font-playfair text-brand-beige-300 text-xl px-8 py-4 md:py-3 rounded-full border border-brand-beige-300 mt-5 md:mt-4">
        <PrismicNextLink field={slice.primary.cta} />
      </div>
      <div className="hidden md:flex w-full max-w-full md:max-w-[800px]">
        <Carousel
          items={slides}
          startIndex={0}
          showArrows={false}
          showIndicators={false}
          showStatus={false}
          perspective="500px"
        />
      </div>
      <div className="flex md:hidden w-full max-w-full md:max-w-[800px]">
        <Carousel
          items={slides}
          startIndex={0}
          showArrows={false}
          showIndicators={false}
          showStatus={false}
          perspective="500px"
          width="250px"
        />
      </div>
    </section>
  );
};

export default HomeTravelCarousel;
