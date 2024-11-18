import { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Image from "next/image";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

export interface LinkType {
  link_type: string;
  kind: "image" | "file";
  id: string;
  url: string;
  name: string;
  size: string;
  width: string;
  height: string;
}

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  const media = slice.primary.background as unknown as LinkType | undefined;
  const isImage = media?.kind === "image";

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full relative h-[667px] md:h-[720px]"
    >
      {isImage ? (
        <div className="w-full absolute top-0 left-0 -z-[1] [&_img]:w-full [&_img]:h-[667px] md:[&_img]:h-[720px]">
          <Image src={media.url} width={1280} height={720} alt="" />
        </div>
      ) : (
        "video"
      )}
      <div className="flex w-full h-full items-center justify-center flex-col">
        <div className="font-playfair text-3xl text-center md:text-4xl text-brand-beige-200">
          <PrismicRichText field={slice.primary.title} />
        </div>
        <div className="font-playfair text-brand-beige-200 text-xl px-8 py-4 md:py-3 rounded-full border border-brand-beige-200 bg-black bg-opacity-40 mt-5 md:mt-4">
          <PrismicNextLink field={slice.primary.cta} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
