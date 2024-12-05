"use client";

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Redirect`.
 */
export type RedirectProps = SliceComponentProps<Content.RedirectSlice>;

/**
 * Component for "Redirect" Slices.
 */
const Redirect = ({ slice }: RedirectProps): JSX.Element => {
  if (typeof window !== "undefined")
    window.location.href = (slice.primary.redirect as any).url;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    ></section>
  );
};

export default Redirect;
