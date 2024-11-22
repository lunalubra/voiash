import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `HomeInstagram`.
 */
export type HomeInstagramProps =
  SliceComponentProps<Content.HomeInstagramSlice>;

/**
 * Component for "HomeInstagram" Slices.
 */
const HomeInstagram = ({ slice }: HomeInstagramProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-[#F2F2F2]"
    >
      <div className="w-full max-w-screen-xl m-auto flex flex-col items-center gap-6 py-5">
        <div className="font-playfair text-3xl md:text-4xl text-brand-beige-300 px-4">
          <PrismicRichText field={slice.primary.title} />
        </div>
        <div className="flex items-center gap-6 max-w-full overflow-auto no-scrollbar px-4">
          {slice.primary.instagram.map((item, index) => (
            <div
              className="[&_iframe]:max-h-[510px] md:[&_iframe]:max-h-[unset]"
              key={index}
              dangerouslySetInnerHTML={{
                __html: item.instagram_post_code!
              }}
            />
          ))}
        </div>
        <div className="flex">
          {slice.primary.social_media.map((item, index) => (
            <div key={index}>
              <PrismicNextLink field={item.link}>
                <PrismicNextImage field={item.logo} alt="" />
              </PrismicNextLink>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeInstagram;
