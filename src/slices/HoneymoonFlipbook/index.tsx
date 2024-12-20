"use client";

import Flipbook from "@/components/Flipbook";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import dynamic from "next/dynamic";

/**
 * Props for `HoneymoonFlipbook`.
 */
export type HoneymoonFlipbookProps =
  SliceComponentProps<Content.HoneymoonFlipbookSlice>;

/**
 * Component for "HoneymoonFlipbook" Slices.
 */
const HoneymoonFlipbook = ({ slice }: HoneymoonFlipbookProps): JSX.Element => {
  if (typeof window === "undefined") return <></>;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full max-w-screen-xl m-auto flex items-center justify-center pt-8 pb-20"
    >
      <Flipbook pdfLink={(slice.primary.pdf as any).url} />
    </section>
  );
};

export default dynamic(() => Promise.resolve(HoneymoonFlipbook), {
  ssr: false
});
