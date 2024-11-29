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
      className="min-w-full md:w-[500px] min-h-full md:h-[500px] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('${image.url}')`
      }}
    />
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
      <div className="hidden md:flex w-full max-w-[1000px]">
        <Carousel
          items={slides}
          startIndex={0}
          showArrows
          showIndicators={false}
          showStatus={false}
          containerWidth="100%"
          width="500px"
          height="500px"
          perspective="350px"
          defaultOption={{ widthFactor: 2, angleFactor: 0 }}
          arrows={{ hoverColor: "#b48149", color: "#e7c9a8" }}
        />
      </div>
      <div className="flex md:hidden w-full max-w-full">
        <Carousel
          items={slides}
          startIndex={0}
          showIndicators={false}
          showStatus={false}
          containerWidth="100%"
          width="200px"
          height="200px"
          perspective="150px"
          defaultOption={{ widthFactor: 1.75, angleFactor: 0 }}
          arrows={{ hoverColor: "#b48149", color: "#e7c9a8" }}
        />
      </div>
    </section>
  );
};

export default HomeTravelCarousel;
