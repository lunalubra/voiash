"use client";

import { Content, createClient } from "@prismicio/client";
import {
  PrismicProvider,
  SliceComponentProps,
  useAllPrismicDocumentsByType,
  usePrismicDocumentByUID
} from "@prismicio/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Select from "react-select";

/**
 * Props for `ContactForm`.
 */
export type ContactFormProps = SliceComponentProps<Content.ContactFormSlice>;

const FirstStep = ({
  slice,
  handleGoForward
}: {
  slice: ContactFormProps["slice"];
  handleGoForward: () => void;
}) => {
  const [documents] = useAllPrismicDocumentsByType("viajes");
  const router = useRouter();
  const searchParams = new URLSearchParams(useSearchParams().toString());
  const queryParamsTrip = JSON.parse(searchParams.get("trip") ?? "{}");
  const queryParamsAmountOfTravelers = searchParams.get("amountOfTravelers");
  const [formValues, setFormValues] = useState({
    trip: queryParamsTrip ?? {},
    amountOfTravelers: +(queryParamsAmountOfTravelers ?? 1)
  });
  const isTripSelected = !!Object.keys(formValues.trip).length;
  const isDisabled = !(formValues.amountOfTravelers > 0 && isTripSelected);

  function handleSubmit() {
    searchParams.set("trip", JSON.stringify(formValues.trip));
    searchParams.set(
      "amountOfTravelers",
      JSON.stringify(formValues.amountOfTravelers)
    );
    router.push(`?${searchParams.toString()}`);
    handleGoForward();
  }

  if (!documents?.length) {
    return <>loading...</>;
  }

  const trips = documents?.map((trip) => ({
    value: trip.uid,
    label: trip.data.label
  }));

  return (
    <div className="w-full h-full flex flex-col gap-5">
      <div className="absolute top-3 left-3 font-playfair text-5xl">1/5</div>
      <div className="mt-10 w-full font-playfair text-center text-[#162136] text-2xl">
        ¿A qué <strong>lugar del mundo</strong> te gustaría viajar?
      </div>
      <div>
        <Select
          options={trips}
          defaultValue={isTripSelected ? formValues.trip : null}
          value={isTripSelected ? formValues.trip : null}
          onChange={(newValue) =>
            setFormValues({ ...formValues, trip: newValue! })
          }
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              borderColor: "#162136",
              borderRadius: "10000px",
              fontFamily: "Playfair display",
              height: "46px"
            }),
            indicatorSeparator: (baseStyles) => ({
              ...baseStyles,
              width: 0
            }),
            menu: (baseStyles) => ({
              ...baseStyles,
              backgroundColor: "#e8eefc"
            }),
            option: (baseStyles, state) => ({
              ...baseStyles,
              fontFamily: "Playfair display",
              backgroundColor: state.isFocused ? "#707fc3" : "none",
              color: state.isFocused ? "white" : "black"
            })
          }}
        />
      </div>
      <div className="w-full font-playfair text-center text-[#162136] text-2xl">
        ¿<strong>Cuántos</strong> viajeros seréis?
      </div>
      <div className="w-full">
        <input
          type="number"
          min={1}
          value={formValues.amountOfTravelers}
          onChange={(event) =>
            setFormValues({
              ...formValues,
              amountOfTravelers: +event.target.value
            })
          }
          className="border rounded-full w-full h-[46px] border-[#162136] px-4"
        />
      </div>
      <button
        disabled={isDisabled}
        onClick={handleSubmit}
        className="ml-auto font-playfair disabled:text-white text-xl px-8 py-4 md:py-3 rounded-full border border-[#162136] disabled:bg-[#162136] disabled:bg-opacity-60 bg-opacity-20 mt-5 md:mt-4"
      >
        Siguiente
      </button>
    </div>
  );
};

const SecondStep = ({
  slice,
  handleGoForward
}: {
  slice: ContactFormProps["slice"];
  handleGoForward: () => void;
}) => {
  const searchParams = new URLSearchParams(useSearchParams().toString());
  const queryParamsTrip = JSON.parse(searchParams.get("trip") ?? "{}");
  const [document] = usePrismicDocumentByUID("viajes", queryParamsTrip.value);
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    price: document?.data.min_budget,
    complement: {}
  });
  const tripHasComplement = document?.data.options.length;

  console.log(queryParamsTrip, document);

  function handleSubmit() {
    searchParams.set("price", JSON.stringify(formValues.price));
    if (tripHasComplement)
      searchParams.set("complement", JSON.stringify(formValues.complement));
    router.push(`?${searchParams.toString()}`);
    handleGoForward();
  }

  if (!document) {
    return <>loading...</>;
  }

  const complements = document?.data.options.map((option) => ({
    value: option.id,
    label: option.label
  }));

  return (
    <div className="w-full h-full flex flex-col gap-5">
      <div className="absolute top-3 left-3 font-playfair text-5xl">2/5</div>
      <div className="mt-10 w-full font-playfair text-center text-[#162136] text-2xl">
        Presupuesto <strong>por persona</strong>
      </div>
      <button
        onClick={handleSubmit}
        className="ml-auto font-playfair disabled:text-white text-xl px-8 py-4 md:py-3 rounded-full border border-[#162136] disabled:bg-[#162136] disabled:bg-opacity-60 bg-opacity-20 mt-5 md:mt-4"
      >
        Siguiente
      </button>
    </div>
  );
};

const Steps = [FirstStep, SecondStep];

/**
 * Component for "ContactForm" Slices.
 */
const ContactForm = ({ slice }: ContactFormProps): JSX.Element => {
  const searchParams = new URLSearchParams(useSearchParams().toString());
  const queryParamsStep = +(searchParams.get("step") ?? 0);
  const router = useRouter();
  const [step, setStep] = useState(queryParamsStep);
  const Step = Steps[step];

  function handleGoForward() {
    searchParams.set("step", JSON.stringify(step + 1));
    router.push(`?${searchParams.toString()}`);
    setStep(step + 1);
  }

  function handleGoBackward() {
    searchParams.set("step", JSON.stringify(step - 1));
    router.push(`?${searchParams.toString()}`);
    setStep(step - 1);
  }

  return (
    <section
      firstta-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full bg-no-repeat bg-cover bg-top h-full min-h-screen flex flex-col items-center justify-center gap-8"
      style={{
        backgroundImage: `linear-gradient(360deg, rgb(22, 33, 54,1) 0%, rgba(22, 33, 54, 0) 50%), url('${slice.primary.background_image.url}')`
      }}
    >
      <div className="font-playfair text-5xl text-[#162136] text-center">
        ¿Quieres saber más?
      </div>
      <div className="bg-white rounded-3xl min-w-[600px] p-10 relative">
        <Step
          slice={slice}
          handleGoForward={handleGoForward}
          handleGoBackward={handleGoBackward}
        />
      </div>
    </section>
  );
};

const ClientProvider = (props: ContactFormProps) => {
  const client = createClient("voiash");

  return (
    <PrismicProvider client={client}>
      <ContactForm {...props} />
    </PrismicProvider>
  );
};

export default ClientProvider;
