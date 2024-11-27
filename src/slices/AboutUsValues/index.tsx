import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `AboutUsValues`.
 */
export type AboutUsValuesProps =
  SliceComponentProps<Content.AboutUsValuesSlice>;

/**
 * Component for "AboutUsValues" Slices.
 */
const AboutUsValues = ({ slice }: AboutUsValuesProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for about_us_values (variation: {slice.variation})
      Slices
    </section>
  );
};

export default AboutUsValues;
