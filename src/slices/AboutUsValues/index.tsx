import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `AboutUsValues`.
 */
export type AboutUsValuesProps =
  SliceComponentProps<Content.AboutUsValuesSlice>;

/**
 * Component for "AboutUsValues" Slices.
 */

const BackgroundImageWrapper = ({
  children,
  slice
}: {
  children: React.ReactNode;
  slice: AboutUsValuesProps["slice"];
}) => {
  return (
    <>
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) 100%), url('${slice.primary.image.url}')`
        }}
        className="flex md:hidden bg-no-repeat bg-center bg-cover w-full max-w-screen-xl m-auto flex-col-reverse md:flex-row gap-12 p-10 items-start justify-center"
      >
        {children}
      </section>
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="hidden md:flex w-full max-w-screen-xl m-auto flex-col md:flex-row gap-12 p-10 items-center justify-center"
      >
        {children}
      </section>
    </>
  );
};

const AboutUsValues = ({ slice }: AboutUsValuesProps): JSX.Element => {
  return (
    <BackgroundImageWrapper slice={slice}>
      <div className="font-martel md:text-lg text-white md:text-brand-beige-400 text-justify w-full max-w-[755px]">
        <PrismicRichText field={slice.primary.description} />
      </div>
      <div className="font-playfair text-4xl md:text-[60px] text-white md:text-brand-beige-300 [&_strong]:text-4xl md:[&_strong]:text-[80px] md:[&_strong]:block md:[&_strong]:leading-[80px] text-center md:text-right flex items-center md:flex-col md:items-end justify-center">
        <PrismicRichText field={slice.primary.title} />
      </div>
    </BackgroundImageWrapper>
  );
};

export default AboutUsValues;
