import { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `TravelDescription`.
 */
export type TravelDescriptionProps =
  SliceComponentProps<Content.TravelDescriptionSlice>;

/**
 * Component for "TravelDescription" Slices.
 */
const TravelDescription = ({ slice }: TravelDescriptionProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full max-w-screen-xl m-auto flex flex-col items-center gap-9 py-16 px-8"
    >
      <div className="font-playfair text-2xl md:text-5xl max-w-[600px] text-center text-brand-beige-300">
        <PrismicRichText field={slice.primary.title} />
      </div>
      <div className="font-martel md:text-lg max-w-[700px] text-center text-brand-beige-400">
        <PrismicRichText field={slice.primary.description} />
      </div>
      <div className="font-playfair text-brand-beige-300 text-xl px-8 py-4 md:py-3 rounded-full border border-brand-beige-300">
        <PrismicNextLink field={slice.primary.cta} />
      </div>
    </section>
  );
};

export default TravelDescription;
