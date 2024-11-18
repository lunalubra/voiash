import { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `HomeFormCta`.
 */
export type HomeFormCtaProps = SliceComponentProps<Content.HomeFormCtaSlice>;

/**
 * Component for "HomeFormCta" Slices.
 */
const HomeFormCta = ({ slice }: HomeFormCtaProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full bg-[#162136]"
    >
      <div className="max-w-[490px] m-auto flex flex-col items-center text-center gap-6 py-11 px-6">
        <div className="font-playfair text-2xl md:text-3xl text-brand-beige">
          <PrismicRichText field={slice.primary.title} />
        </div>
        <div className="font-martel md:text-lg text-brand-beige">
          <PrismicRichText field={slice.primary.description} />
        </div>
        <div className="font-playfair text-brand-beige text-xl px-8 py-4 md:py-3 rounded-full border border-brand-beige">
          <PrismicNextLink field={slice.primary.cta} />
        </div>
      </div>
    </section>
  );
};

export default HomeFormCta;
