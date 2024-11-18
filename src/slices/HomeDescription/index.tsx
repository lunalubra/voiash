import { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `HomeDescription`.
 */
export type HomeDescriptionProps =
  SliceComponentProps<Content.HomeDescriptionSlice>;

/**
 * Component for "HomeDescription" Slices.
 */
const HomeDescription = ({ slice }: HomeDescriptionProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full max-w-screen-xl m-auto flex flex-col md:flex-row justify-center gap-10 py-10"
    >
      <div className="flex flex-col gap-8 px-8">
        <div className="text-6xl font-playfair text-brand-beige-300">
          <PrismicRichText field={slice.primary.title} />
        </div>
        <div className="font-martel leading-7 text-justify text-brand-beige-400 max-w-[425px]">
          <PrismicRichText field={slice.primary.description} />
        </div>
      </div>
      <div className="flex max-w-full overflow-auto no-scrollbar gap-3 px-8 md:px-0">
        {slice.primary.products.map((item, index) => (
          <div
            key={index}
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.7) 100%), url('${item.background.url}')`
            }}
            className="min-w-[270px] w-[270px] h-[450px] md:min-w-[345px] md:w-[345px] md:h-[575px] rounded-xl flex flex-col items-start justify-center px-8 md:px-16"
          >
            <div className="font-playfair text-[50px] leading-[3rem] text-brand-beige">
              <PrismicRichText field={item.title} />
            </div>
            <div className="font-playfair text-brand-beige text-xl px-8 py-4 md:py-3 rounded-full border border-brand-beige bg-black bg-opacity-40 mt-5 md:mt-4">
              <PrismicNextLink field={item.cta} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeDescription;
