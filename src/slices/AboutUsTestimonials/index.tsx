import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import ActiveStart from "../../images/ActiveStart";
import InactiveStart from "../../images/InactiveStart";

/**
 * Props for `AboutUsTestimonials`.
 */
export type AboutUsTestimonialsProps =
  SliceComponentProps<Content.AboutUsTestimonialsSlice>;

/**
 * Component for "AboutUsTestimonials" Slices.
 */
const AboutUsTestimonials = ({
  slice
}: AboutUsTestimonialsProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="md:bg-[#f5f5f5] py-16"
    >
      <div className="w-full max-w-screen-xl m-auto py-10 md:bg-[#eaeaea] flex flex-col gap-8 relative">
        <div className="px-4 font-playfair text-[150px] md:text-[300px] md:absolute top-0 left-0 text-[#162136] leading-[16px] mt-10">
          “
        </div>
        <div className="px-4 font-playfair text-4xl md:text-5xl text-[#162136] md:pl-[150px]">
          <PrismicRichText field={slice.primary.title} />
        </div>
        <div className="w-full max-w-full overflow-auto px-4 md:px-10 pb-10 flex items-start gap-4 no-scrollbar">
          {slice.primary.testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-2xl shadow-lg p-6 min-w-[210px] md:min-w-[334px] bg-white flex flex-col gap-4 items-center"
            >
              <div className="flex gap-1">
                {Array.from(Array(5).keys()).map((_, index) =>
                  testimonial.rating! >= index + 1 ? (
                    <ActiveStart key={index + 1} />
                  ) : (
                    <InactiveStart key={index + 1} />
                  )
                )}
              </div>
              <div className="font-martel text-center text-brand-beige-400">
                <PrismicRichText field={testimonial.description} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUsTestimonials;
