import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `AboutUsQuote`.
 */
export type AboutUsQuoteProps = SliceComponentProps<Content.AboutUsQuoteSlice>;

/**
 * Component for "AboutUsQuote" Slices.
 */
const AboutUsQuote = ({ slice }: AboutUsQuoteProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full max-w-screen-xl m-auto p-10 md:pt-0 flex justify-end"
    >
      <div className="text-end font-playfair text-5xl leading-snug md:text-[85px] text-[#162136] max-w-[874px]">
        <PrismicRichText field={slice.primary.title} />
      </div>
    </section>
  );
};

export default AboutUsQuote;
