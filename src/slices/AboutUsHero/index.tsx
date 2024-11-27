import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `AboutUsHero`.
 */
export type AboutUsHeroProps = SliceComponentProps<Content.AboutUsHeroSlice>;

/**
 * Component for "AboutUsHero" Slices.
 */
const AboutUsHero = ({ slice }: AboutUsHeroProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full max-w-[720px] mx-auto mt-[150px] mb-16 flex flex-col items-center gap-4 px-8 mx:px-2"
    >
      <div className="font-playfair text-6xl md:text-8xl text-brand-beige-300 text-left md:text-center">
        <PrismicRichText field={slice.primary.title} />
      </div>
      <div className="font-martel md:text-lg text-brand-beige-400 text-center">
        <PrismicRichText field={slice.primary.description} />
      </div>
    </section>
  );
};

export default AboutUsHero;
