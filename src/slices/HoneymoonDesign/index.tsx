import { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `HoneymoonDesign`.
 */
export type HoneymoonDesignProps =
  SliceComponentProps<Content.HoneymoonDesignSlice>;

/**
 * Component for "HoneymoonDesign" Slices.
 */
const HoneymoonDesign = ({ slice }: HoneymoonDesignProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-[#f5f5f5]"
    >
      <div className="w-full max-w-screen-xl m-auto flex flex-col items-center justify-center py-10 gap-5">
        <div className="m-auto w-full max-w-[660px] font-playfair text-4xl md:text-5xl text-brand-beige-300 md:[&_strong]:text-7xl text-center md:text-right px-8 md:px-0">
          <PrismicRichText field={slice.primary.title} />
        </div>
        <div className="max-w-[660px] font-martel text-brand-beige-400 md:text-lg text-center px-8 md:px-0">
          <PrismicRichText field={slice.primary.description} />
        </div>
        <div className="font-playfair text-brand-beige-300 text-xl px-8 py-4 md:py-3 rounded-full border border-brand-beige-300 mt-5 md:mt-4">
          <PrismicNextLink field={slice.primary.cta} />
        </div>
        <div className="flex flex-wrap gap-8 w-full items-center justify-center mt-6 px-8 md:px-0">
          {slice.primary.items.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-xl w-[370px] h-min md:w-[565px] md:h-[453px] rounded-3xl flex flex-col items-start md:items-center justify-center gap-8 md:gap-16 p-5 md:p-0"
            >
              <div
                className={`${index % 2 === 1 ? "ml-auto" : "mr-auto"} md:text-center flex items-start`}
              >
                <div className="md:text-center font-playfair text-[100px] md:text-[170px] leading-[45px] md:leading-[65px] text-brand-beige-300">
                  {index + 1}
                </div>
                <div className="text-3xl md:text-5xl font-playfair text-brand-beige-300 [&_strong]:block">
                  <PrismicRichText field={item.title} />
                </div>
              </div>
              <div className="font-martel text-brand-beige-400 md:text-lg text-justify md:text-center max-w-[350px]">
                <PrismicRichText field={item.description} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HoneymoonDesign;
