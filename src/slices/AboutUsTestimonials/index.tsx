"use client";

import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import ActiveStart from "../../images/ActiveStart";
import InactiveStart from "../../images/InactiveStart";
import { useRef } from "react";
import Arrow from "../../images/Arrow";

/**
 * Props for `AboutUsTestimonials`.
 */
export type AboutUsTestimonialsProps =
  SliceComponentProps<Content.AboutUsTestimonialsSlice>;

/**
 * Component for "AboutUsTestimonials" Slices.
 */
const AboutUsTestimonials = ({
  slice
}: AboutUsTestimonialsProps): JSX.Element => {
  const carouselRef = useRef<HTMLDivElement>(null);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="md:bg-[#f5f5f5] pt-16 md:py-16"
    >
      <div className="w-full max-w-screen-xl m-auto pt-10 md:py-10 md:bg-[#eaeaea] flex flex-col gap-8 relative">
        <div className="px-4 font-playfair text-[150px] md:text-[300px] md:absolute top-0 left-0 text-[#162136] leading-[16px] -mt-6 -mb-2 md:mb-0 md:mt-10">
          “
        </div>
        <div className="px-4 font-playfair text-4xl md:text-5xl text-[#162136] md:pl-[150px]">
          <PrismicRichText field={slice.primary.title} />
        </div>
        <div className="flex gap-4 items-center flex-1 overflow-hidden px-4">
          <div
            className="hidden md:flex relative z-[60]"
            onClick={() => {
              console.log(carouselRef.current?.scrollLeft);
              carouselRef.current?.scrollTo({
                left: carouselRef.current?.scrollLeft - 334,
                behavior: "smooth"
              });
            }}
          >
            <Arrow />
          </div>
          <div
            ref={carouselRef}
            className="w-full max-w-full overflow-auto px-4 md:px-0 pb-10 md:pb-0 flex items-start gap-4 no-scrollbar"
          >
            {slice.primary.testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="rounded-2xl shadow-lg p-6 min-w-[210px] md:min-w-[334px] bg-white flex flex-col gap-4 items-center"
              >
                <div className="flex gap-1">
                  {Array.from(Array(5).keys()).map((_, index) =>
                    testimonial.rating! >= index + 1 ? (
                      <ActiveStart key={index + 1} />
                    ) : (
                      <InactiveStart key={index + 1} />
                    )
                  )}
                </div>
                <div className="font-martel text-center text-brand-beige-400">
                  <PrismicRichText field={testimonial.description} />
                </div>
              </div>
            ))}
          </div>
          <div
            className="hidden md:flex  relative z-[60] rotate-180"
            onClick={() => {
              carouselRef.current?.scrollBy({
                left: carouselRef.current?.scrollLeft + 334,
                behavior: "smooth"
              });
            }}
          >
            <Arrow />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsTestimonials;
