import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `AboutUsPress`.
 */
export type AboutUsPressProps = SliceComponentProps<Content.AboutUsPressSlice>;

/**
 * Component for "AboutUsPress" Slices.
 */
const AboutUsPress = ({ slice }: AboutUsPressProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full max-w-screen-xl m-auto flex flex-col md:flex-row py-10 gap-14 items-center md:items-start"
    >
      <div className="flex flex-col gap-14 md:max-w-[376px]">
        <div className="px-4 font-playfair text-6xl md:text-8xl text-center text-brand-beige-300 md:text-start">
          <PrismicRichText field={slice.primary.title} />
        </div>
        <div className="px-4 font-martel md:text-lg text-center text-brand-beige-400 md:text-justify">
          <PrismicRichText field={slice.primary.description} />
        </div>
      </div>
      <div className="w-full max-w-full overflow-auto no-scrollbar px-4 flex gap-4 md:flex-wrap md:justify-around">
        {slice.primary.press_notes.map((pressNote, index) => (
          <div
            key={index}
            className="min-w-[222px] md:max-w-[400px] md:max-h-[200px] p-6 flex flex-col gap-4 items-center text-center bg-[#faf5f0]"
          >
            <div>
              <PrismicNextImage field={pressNote.logo} alt="" />
            </div>
            <div className="font-martel text-center text-brand-beige-400">
              <PrismicRichText field={pressNote.description} />
            </div>
            <div className="font-martel font-bold mt-auto">
              <PrismicNextLink field={pressNote.cta} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutUsPress;
