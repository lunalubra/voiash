import { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

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
        <div
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 50%), url('${media.url}')`
          }}
          className="w-full absolute top-0 left-0 -z-[1] h-[667px] md:h-[720px] bg-no-repeat bg-center bg-cover"
        />
      ) : (
        <div className="w-full absolute -top-1/2 translate-y-1/2 left-50 -z-[1] [&_video]:min-w-min md:[&_video]:min-w-full [&_video]:w-full h-[667px] [&_video]:h-[667px] md:[&_video]:h-auto md:h-[720px] overflow-hidden">
          <video src={media?.url} autoPlay muted loop />
        </div>
      )}
      <div className="flex w-full h-full items-center justify-center flex-col bg-[radial-gradient(circle,_rgba(0,0,0,0.4)_0%,_rgba(0,0,0,0)_100%)]">
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
