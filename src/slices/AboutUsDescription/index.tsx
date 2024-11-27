import { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `AboutUsDescription`.
 */
export type AboutUsDescriptionProps =
  SliceComponentProps<Content.AboutUsDescriptionSlice>;

/**
 * Component for "AboutUsDescription" Slices.
 */

const BackgroundImageWrapper = ({
  children,
  slice
}: {
  children: React.ReactNode;
  slice: AboutUsDescriptionProps["slice"];
}) => {
  return (
    <>
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) 100%), url('${slice.primary.second_image.url}')`
        }}
        className="flex md:hidden bg-no-repeat bg-center bg-cover"
      >
        {children}
      </section>
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="w-full max-w-screen-xl m-auto hidden md:grid grid-rows-3 grid-cols-5 gap-6 p-10"
      >
        {children}
      </section>
    </>
  );
};

const AboutUsDescription = ({
  slice
}: AboutUsDescriptionProps): JSX.Element => {
  return (
    <BackgroundImageWrapper slice={slice}>
      <div className="flex flex-col gap-8 items-center p-10 md:items-start md:col-span-3 md:row-span-3 md:bg-[#f5f5f5] md:p-16">
        <div className="font-playfair text-5xl md:text-8xl text-center text-white md:text-brand-beige-300 ">
          <PrismicRichText field={slice.primary.title} />
        </div>
        <div className="font-martel md:text-lg text-center md:text-justify text-white md:text-brand-beige-400">
          <PrismicRichText field={slice.primary.description} />
        </div>
        <div className="font-playfair text-white md:text-brand-beige-300 text-xl px-8 py-4 md:py-3 rounded-full border border-white md:border-brand-beige-300 bg-black bg-opacity-40 md:bg-transparent mt-5 md:mt-4">
          <PrismicNextLink field={slice.primary.cta} />
        </div>
      </div>
      <div
        style={{
          backgroundImage: `url('${slice.primary.first_image.url}')`
        }}
        className="hidden bg-no-repeat bg-cover bg-center md:grid w-full h-full col-span-1 col-start-4 row-span-2 row-start-1"
      ></div>
      <div
        style={{
          backgroundImage: `url('${slice.primary.first_image.url}')`
        }}
        className="hidden bg-no-repeat bg-cover bg-center md:grid w-full h-full col-span-1 col-start-4 row-span-1 row-start-3"
      ></div>
      <div
        style={{
          backgroundImage: `url('${slice.primary.second_image.url}')`
        }}
        className="hidden bg-no-repeat bg-cover bg-center md:grid w-full h-full col-span-1 col-start-5 row-span-1 row-start-1"
      ></div>
      <div
        style={{
          backgroundImage: `url('${slice.primary.second_image.url}')`
        }}
        className="hidden bg-no-repeat bg-cover bg-center md:grid w-full h-full col-span-1 col-start-5 row-span-2 row-start-2"
      ></div>
    </BackgroundImageWrapper>
  );
};

export default AboutUsDescription;
