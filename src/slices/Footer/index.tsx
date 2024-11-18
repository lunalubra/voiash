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
      className="w-full max-w-screen-2xl m-auto flex flex-col py-12 px-20 gap-12"
    >
      <div className="flex items-center justify-between">
        {slice.primary.logos.map((item) => (
          <div key={item.logo.id}>
            <PrismicNextImage field={item.logo} alt="" />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between text-center">
        <div>
          <PrismicNextImage field={slice.primary.logo} />
        </div>
        <div className="text-brand-beige-400 font-martel text-[10px] leading-4 max-w-[620px]">
          <PrismicRichText field={slice.primary.disclaimer} />
        </div>
        <div className="text-brand-beige-400 font-martel text-[10px] leading-4">
          <PrismicRichText field={slice.primary.address} />
        </div>
      </div>
    </section>
  );
};

export default Footer;
