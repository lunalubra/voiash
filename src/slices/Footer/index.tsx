import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Footer`.
 */
export type FooterProps = SliceComponentProps<Content.FooterSlice>;

/**
 * Component for "Footer" Slices.
 */
const Footer = ({ slice }: FooterProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full max-w-screen-2xl m-auto flex flex-col py-6 px-8 md:py-12 md:px-20 md:gap-12 overflow-hidden"
    >
      <div className="flex items-center justify-between infinite-scroll gap-16">
        {slice.primary.logos.map((item) => (
          <div key={item.logo.id} className="min-w-max">
            <PrismicNextImage field={item.logo} alt="" />
          </div>
        ))}
        {slice.primary.logos.map((item) => (
          <div key={item.logo.id} className="min-w-max">
            <PrismicNextImage field={item.logo} alt="" />
          </div>
        ))}
        {slice.primary.logos.map((item) => (
          <div key={item.logo.id} className="min-w-max">
            <PrismicNextImage field={item.logo} alt="" />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between text-center gap-4 w-full">
        <div className="min-w-[32px] min-h-[32px] [&_img]:min-w-full [&_img]:min-h-full md:min-w-[unset] md:min-h-[unset]">
          <PrismicNextImage field={slice.primary.logo} alt="" />
        </div>
        <div className="text-brand-beige-400 font-martel text-[5px] md:text-[10px] md:leading-4 max-w-[620px]">
          <PrismicRichText field={slice.primary.disclaimer} />
        </div>
        <div className="text-brand-beige-400 font-martel text-[5px] md:text-[10px] md:leading-4 min-w-[50px]">
          <PrismicRichText field={slice.primary.address} />
        </div>
      </div>
    </section>
  );
};

export default Footer;
