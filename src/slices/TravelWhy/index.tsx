"use client";

import { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { motion } from "motion/react";

/**
 * Props for `TravelWhy`.
 */
export type TravelWhyProps = SliceComponentProps<Content.TravelWhySlice>;

/**
 * Component for "TravelWhy" Slices.
 */
const TravelWhy = ({ slice }: TravelWhyProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-[#F5F5F5] mt-16"
    >
      <div className="w-full max-w-screen-xl m-auto py-11 flex flex-col gap-8 items-center px-4">
        <div className="font-playfair text-4xl md:text-5xl text-center text-brand-beige-300">
          <PrismicRichText field={slice.primary.title} />
        </div>
        <div className="font-martel md:text-lg text-center max-w-[700px] text-brand-beige-300">
          <PrismicRichText field={slice.primary.description} />
        </div>
        <div className="font-playfair text-brand-beige-300 text-xl px-8 py-4 md:py-3 rounded-full border border-brand-beige-300">
          <PrismicNextLink field={slice.primary.cta} />
        </div>
        <div className="flex flex-col gap-20 justify-center max-w-[425px] mb-y">
          {slice.primary.items.map((item, index) =>
            index % 2 === 1 ? (
              <motion.div
                initial={{ x: "49vw", opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: index + 1 }}
                key={index}
                className="overflow-x-hidden pb-6 w-full flex gap-9 items-start"
              >
                <div className="font-playfair text-[150px] leading-[75px] md:text-[170px] md:leading-[85px] text-brand-beige-300">
                  {index + 1}
                </div>
                <div className="font-martel md:text-lg text-brand-beige-400 text-justify max-w-[315px]">
                  <PrismicRichText field={item.description} />
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ x: "-49vw", opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: index }}
                key={index}
                className="overflow-x-hidden pb-6 w-full flex gap-9 items-start"
              >
                <div className="font-playfair text-[150px] leading-[75px] md:text-[170px] md:leading-[85px] text-brand-beige-300">
                  {index + 1}
                </div>
                <div className="font-martel md:text-lg text-brand-beige-400 text-justify max-w-[315px]">
                  <PrismicRichText field={item.description} />
                </div>
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default TravelWhy;
