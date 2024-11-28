"use client";

import { DatePickerWithRange } from "@/lib/DateRangePicker";
import { Content, createClient } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import {
  PrismicProvider,
  SliceComponentProps,
  useAllPrismicDocumentsByType,
  usePrismicDocumentByUID
} from "@prismicio/react";
import { addDays } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { DateRange } from "react-day-picker";
import Select from "react-select";

/**
 * Props for `ContactForm`.
 */
export type ContactFormProps = SliceComponentProps<Content.ContactFormSlice>;

const FirstStep = ({
  handleGoForward,
  searchParams
}: {
  slice: ContactFormProps["slice"];
  searchParams: URLSearchParams;
  handleGoForward: () => void;
}) => {
  const [documents, { state }] = useAllPrismicDocumentsByType("viajes");
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
    searchParams.set("complement", JSON.stringify({}));
    searchParams.set(
      "amountOfTravelers",
      JSON.stringify(formValues.amountOfTravelers)
    );
    handleGoForward();
  }

  if (!documents?.length || state === "loading") {
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
          className="border rounded-full w-full h-[46px] font-martel border-[#162136] px-4"
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
  searchParams,
  handleGoForward,
  handleGoBackward
}: {
  slice: ContactFormProps["slice"];
  searchParams: URLSearchParams;
  handleGoForward: () => void;
  handleGoBackward: () => void;
}) => {
  const queryParamsTrip = JSON.parse(searchParams.get("trip") ?? "{}");
  const [document, { state }] = usePrismicDocumentByUID(
    "viajes",
    queryParamsTrip.value
  );
  const queryParamsPrice = searchParams.get("price")
    ? JSON.parse(searchParams.get("price")!)
    : undefined;
  const queryParamsComplement = JSON.parse(
    searchParams.get("complement") ?? "{}"
  );

  const [formValues, setFormValues] = useState({
    price: +queryParamsPrice,
    complement: queryParamsComplement ?? {}
  });

  const tripHasComplement = document?.data.options.length;

  if (
    state === "loaded" &&
    !tripHasComplement &&
    Object.keys(formValues.complement).length
  ) {
    setFormValues({ ...formValues, complement: {} });
  }

  function handleSubmit() {
    searchParams.set("price", JSON.stringify(formValues.price));
    if (tripHasComplement)
      searchParams.set("complement", JSON.stringify(formValues.complement));
    handleGoForward();
  }

  if (!document || state === "loading") {
    return <>loading...</>;
  }

  if (queryParamsPrice && !formValues.price) {
    setFormValues({ ...formValues, price: +queryParamsPrice });
  } else if (document.data.min_budget && !formValues.price) {
    setFormValues({ ...formValues, price: document.data.min_budget });
  }

  const complements = document.data.options.map(
    (option: { price: number; label: string }) => ({
      price: option.price,
      label: option.label
    })
  );

  return (
    <div className="w-full h-full flex flex-col gap-5">
      <div className="absolute top-3 left-3 font-playfair text-5xl">2/5</div>
      <div className="mt-10 w-full font-playfair text-center text-[#162136] text-2xl">
        Presupuesto <strong>por persona</strong>
      </div>

      <div className="flex flex-col gap-4 w-full">
        <div className="font-martel text-[#162136] text-lg">
          Destino: {(document.data.label as string).toUpperCase()}
        </div>
        <div className="w-full">
          <input
            type="range"
            value={formValues.price}
            onChange={(event) =>
              setFormValues({ ...formValues, price: +event.target.value })
            }
            min={document.data.min_budget}
            max={document.data.max_budget}
            className="accent-[#162136] bg-white w-full"
          />
          <div className="font-martel text-[#162136] text-xs">
            Mín: {document.data.min_budget}
          </div>
          {!!tripHasComplement && (
            <div className="font-martel text-[#162136] text-2xl">
              {formValues.price}€
            </div>
          )}
        </div>
      </div>

      {!!tripHasComplement && (
        <div className="w-full flex flex-col gap-2 mt-2">
          <div className="font-martel text-[#162136] text-sm">
            Puedes combinarlo con:
          </div>
          <div className="flex flex-wrap gap-4 max-w-[550px]">
            {complements.map(
              (item: { label: string; price: number }, index: number) => (
                <button
                  key={index}
                  className={`flex flex-col gap-1 items-center justify-center w-[100px] ${(formValues.complement as any).label === item.label ? "bg-[#707FC3]" : "bg-[#001159]"} h-[70px] text-white rounded-xl`}
                  onClick={() =>
                    setFormValues({ ...formValues, complement: item })
                  }
                >
                  <div className="font-martel text-sm">{item.label}</div>
                  <div className="font-martel text-[8px]">{item.price}€</div>
                  <div className="font-martel text-sm border border-white rounded-full w-[18px] h-[18px] leading-[19px]">
                    +
                  </div>
                </button>
              )
            )}
          </div>
        </div>
      )}

      <div className="font-martel text-3xl text-[#162136]">
        Total:{" "}
        {+formValues.price + +((formValues.complement as any).price ?? 0)}€
      </div>

      <div className="flex justify-between gap-2">
        <button
          onClick={handleGoBackward}
          className="font-playfair disabled:text-white text-xl px-8 py-4 md:py-3 rounded-full border border-[#162136] disabled:bg-[#162136] disabled:bg-opacity-60 bg-opacity-20 mt-5 md:mt-4"
        >
          Atras
        </button>
        <button
          onClick={handleSubmit}
          className="font-playfair disabled:text-white text-xl px-6 md:px-8 py-4 md:py-3 rounded-full border border-[#162136] disabled:bg-[#162136] disabled:bg-opacity-60 bg-opacity-20 mt-5 md:mt-4"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

const ThirdStep = ({
  slice,
  searchParams,
  handleGoForward,
  handleGoBackward
}: {
  slice: ContactFormProps["slice"];
  searchParams: URLSearchParams;
  handleGoForward: () => void;
  handleGoBackward: () => void;
}) => {
  const queryParamsCity = searchParams.get("city");
  const queryParamsType = searchParams.get("type");
  const [formValues, setFormValues] = useState<{
    city: string;
    type: string;
  }>({
    city: queryParamsCity ?? "",
    type: queryParamsType ?? ""
  });
  const isDisabled = !(formValues.city && formValues.type);

  function handleSubmit() {
    searchParams.set("city", formValues.city);
    searchParams.set("type", formValues.type);
    handleGoForward();
  }

  return (
    <div className="w-full h-full flex flex-col gap-5">
      <div className="absolute top-3 left-3 font-playfair text-5xl">3/5</div>
      <div className="mt-10 w-full font-playfair text-center text-[#162136] text-2xl">
        ¿Desde <strong>dónde</strong> nos escribes?
      </div>
      <div className="w-full">
        <input
          placeholder="Ciudad de residencia"
          value={formValues.city}
          onChange={(event) =>
            setFormValues({
              ...formValues,
              city: event.target.value
            })
          }
          className="border rounded-full w-full h-[46px] font-martel border-[#162136] px-4"
        />
      </div>
      <div className="w-full font-playfair text-center text-[#162136] text-2xl">
        ¿Qué <strong>tipo de viaje</strong> deseas?
      </div>
      <div className="flex flex-wrap items-center gap-2 justify-center">
        {slice.primary.type_of_trip.map(({ label }) => (
          <button
            key={label}
            className={`${label === formValues.type ? "bg-[#707FC3]" : "bg-[#001159]"} max-w-[125px] h-[60px] md:h-max md:max-w-max py-2 md:py-6 px-6 md:px-8 font-playfair text-sm rounded-full text-white`}
            onClick={() => setFormValues({ ...formValues, type: label! })}
          >
            {label?.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="flex justify-between gap-2">
        <button
          onClick={handleGoBackward}
          className="font-playfair disabled:text-white text-xl px-8 py-4 md:py-3 rounded-full border border-[#162136] disabled:bg-[#162136] disabled:bg-opacity-60 bg-opacity-20 mt-5 md:mt-4"
        >
          Atras
        </button>
        <button
          disabled={isDisabled}
          onClick={handleSubmit}
          className="font-playfair disabled:text-white text-xl px-6 md:px-8 py-4 md:py-3 rounded-full border border-[#162136] disabled:bg-[#162136] disabled:bg-opacity-60 bg-opacity-20 mt-5 md:mt-4"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

const FourthStep = ({
  searchParams,
  handleGoForward,
  handleGoBackward
}: {
  slice: ContactFormProps["slice"];
  searchParams: URLSearchParams;
  handleGoForward: () => void;
  handleGoBackward: () => void;
}) => {
  const queryParamsDate = searchParams.get("date")
    ? JSON.parse(searchParams.get("date")!)
    : undefined;
  const queryParamsIsFlexible = JSON.parse(
    searchParams.get("isFlexible") ?? "false"
  );
  const [formValues, setFormValues] = useState<{
    date: DateRange;
    isFlexible: boolean;
  }>({
    date: queryParamsDate ?? {
      from: new Date(),
      to: addDays(new Date(), 1)
    },
    isFlexible: queryParamsIsFlexible || false
  });
  const isDisabled = !(formValues.isFlexible || formValues.date);

  function handleSubmit() {
    searchParams.set("date", JSON.stringify(formValues.date));
    searchParams.set("isFlexible", JSON.stringify(formValues.isFlexible));
    handleGoForward();
  }

  return (
    <div className="w-full h-full flex flex-col gap-5">
      <div className="absolute top-3 left-3 font-playfair text-5xl">4/5</div>
      <div className="mt-10 w-full font-playfair text-center text-[#162136] text-2xl">
        ¿Qué <strong>fechas</strong> tienes pensadas para tu viaje?
      </div>
      <div className="w-full">
        <DatePickerWithRange
          value={formValues.date}
          onChange={(newValue) =>
            setFormValues({ ...formValues, date: newValue! })
          }
        />
      </div>
      <button
        className="flex items-center gap-2"
        onClick={() =>
          setFormValues({ ...formValues, isFlexible: !formValues.isFlexible })
        }
      >
        <div
          className={`${formValues.isFlexible ? "bg-[#162136]" : "bg-white"} min-w-[12px] min-h-[12px] border border-[#162136] rounded-full`}
        />
        Tengo flexibilidad
      </button>
      <div className="flex justify-between">
        <button
          onClick={handleGoBackward}
          className="font-playfair disabled:text-white text-xl px-8 py-4 md:py-3 rounded-full border border-[#162136] disabled:bg-[#162136] disabled:bg-opacity-60 bg-opacity-20 mt-5 md:mt-4"
        >
          Atras
        </button>
        <button
          disabled={isDisabled}
          onClick={handleSubmit}
          className="font-playfair disabled:text-white text-xl px-8 py-4 md:py-3 rounded-full border border-[#162136] disabled:bg-[#162136] disabled:bg-opacity-60 bg-opacity-20 mt-5 md:mt-4"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

const FifthStep = ({
  slice,
  searchParams,
  handleGoBackward
}: {
  slice: ContactFormProps["slice"];
  searchParams: URLSearchParams;
  handleGoForward: () => void;
  handleGoBackward: () => void;
}) => {
  const queryParamsFullName = searchParams.get("fullName");
  const queryParamsEmail = searchParams.get("email");
  const queryParamsPrefix = searchParams.get("phone");
  const queryParamsPhone = searchParams.get("phone");
  const queryParamsQuestion = searchParams.get("question");
  const queryParamsMarketing = JSON.parse(
    searchParams.get("marketing") ?? "false"
  );
  const [formValues, setFormValues] = useState<{
    fullName: string;
    email: string;
    prefix: string;
    phone: string;
    question: string;
    marketing: boolean;
    policy: boolean;
  }>({
    fullName: queryParamsFullName ?? "",
    email: queryParamsEmail ?? "",
    prefix: queryParamsPrefix ?? "",
    phone: queryParamsPhone ?? "",
    question: queryParamsQuestion ?? "",
    marketing: queryParamsMarketing ?? false,
    policy: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit() {
    searchParams.set("fullName", formValues.fullName);
    searchParams.set("email", formValues.email);
    searchParams.set("prefix", formValues.prefix);
    searchParams.set("phone", formValues.phone);
    searchParams.set("question", formValues.question);
    searchParams.set("marketing", JSON.stringify(formValues.marketing));

    const body = Object.fromEntries(
      Object.entries(Object.fromEntries(searchParams)).map(([key, value]) => {
        try {
          return [key, JSON.parse(value)];
        } catch (error) {
          return [key, value];
        }
      })
    );

    console.log(body);

    setIsLoading(true);
    const response = await fetch("/api/contact", {
      method: "post",
      body: JSON.stringify(body)
    });

    if (response.ok) {
      setIsSuccess(true);
    }
    setIsLoading(false);
  }

  const isDisabled =
    !formValues.policy ||
    !(
      formValues.fullName &&
      formValues.email &&
      formValues.prefix &&
      formValues.phone &&
      formValues.question
    ) ||
    isLoading;

  return (
    <div className="w-full h-full flex flex-col gap-5">
      <div className="absolute top-3 left-3 font-playfair text-5xl">5/5</div>
      <div className="mt-10 w-full font-playfair text-center text-[#162136] text-2xl">
        Datos personales
      </div>
      <div className="w-full">
        <input
          placeholder="*Nombre y apellidos"
          value={formValues.fullName}
          onChange={(event) =>
            setFormValues({
              ...formValues,
              fullName: event.target.value
            })
          }
          className="border rounded-full w-full h-[46px] font-martel border-[#162136] px-4"
        />
      </div>
      <div className="w-full flex flex-col md:flex-row gap-4">
        <input
          placeholder="*Email"
          value={formValues.email}
          onChange={(event) =>
            setFormValues({
              ...formValues,
              email: event.target.value
            })
          }
          className="border rounded-full w-full h-[46px] font-martel border-[#162136] px-4"
        />
        <div className="flex gap-4 w-full">
          <input
            placeholder="+34"
            value={formValues.prefix}
            onChange={(event) =>
              setFormValues({
                ...formValues,
                prefix: event.target.value
              })
            }
            className="border rounded-full w-[64px] h-[46px] border-[#162136] px-4"
          />
          <input
            placeholder="*Teléfono"
            value={formValues.phone}
            onChange={(event) =>
              setFormValues({
                ...formValues,
                phone: event.target.value
              })
            }
            className="border rounded-full w-full h-[46px] font-martel border-[#162136] px-4"
          />
        </div>
      </div>
      <div className="w-full">
        <input
          placeholder="*¿Còmo nos has conocido?"
          value={formValues.question}
          onChange={(event) =>
            setFormValues({
              ...formValues,
              question: event.target.value
            })
          }
          className="border rounded-full w-full h-[46px] font-martel border-[#162136] px-4"
        />
      </div>
      <button
        className="flex items-center gap-2 font-martel text-[#162136] text-[10px]"
        onClick={() =>
          setFormValues({ ...formValues, policy: !formValues.policy })
        }
      >
        <div
          className={`${formValues.policy ? "bg-[#162136]" : "bg-white"} min-w-[12px] min-h-[12px] border border-[#162136] rounded-full`}
        />
        <div>
          <PrismicNextLink field={slice.primary.privacy_policy_pdf} />
        </div>
      </button>
      <button
        className="-mt-4 flex items-center gap-2 font-martel text-[#162136] text-[10px]"
        onClick={() =>
          setFormValues({ ...formValues, marketing: !formValues.marketing })
        }
      >
        <div
          className={`${formValues.marketing ? "bg-[#162136]" : "bg-white"} min-w-[12px] min-h-[12px] border border-[#162136] rounded-full`}
        />
        Me gustaría mantenerme informado sobre las últimas tendencias y
        novedades en viajes.
      </button>
      <div className="flex justify-between">
        <button
          disabled={isLoading}
          onClick={handleGoBackward}
          className="font-playfair disabled:text-white text-xl px-8 py-4 md:py-3 rounded-full border border-[#162136] disabled:bg-[#162136] disabled:bg-opacity-60 bg-opacity-20 mt-5 md:mt-4"
        >
          Atras
        </button>
        <button
          disabled={isDisabled}
          onClick={handleSubmit}
          className="font-playfair disabled:text-white text-xl px-8 py-4 md:py-3 rounded-full border border-[#162136] disabled:bg-[#162136] disabled:bg-opacity-60 bg-opacity-20 mt-5 md:mt-4"
        >
          {isSuccess ? "✔" : "Enviar"}
        </button>
      </div>
    </div>
  );
};

const Steps = [FirstStep, SecondStep, ThirdStep, FourthStep, FifthStep];

/**
 * Component for "ContactForm" Slices.
 */
const ContactForm = ({ slice }: ContactFormProps): JSX.Element => {
  const searchParams = new URLSearchParams(useSearchParams().toString());
  const queryParamsStep = searchParams.get("step");
  const formattedStep = +(searchParams.get("step") ?? 0);
  const router = useRouter();
  const [step, setStep] = useState(formattedStep);
  const Step = Steps[step];

  if (queryParamsStep === null || queryParamsStep === undefined) {
    searchParams.set("step", "0");
    router.push(
      window.location.origin + `/contacto` + `?${searchParams.toString()}`
    );
  }

  function handleGoForward() {
    searchParams.set("step", `${step + 1}`);
    router.push(
      window.location.origin + `/contacto` + `?${searchParams.toString()}`
    );
    setStep(step + 1);
  }

  function handleGoBackward() {
    searchParams.set("step", `${step - 1}`);
    router.push(
      window.location.origin + `/contacto` + `?${searchParams.toString()}`
    );
    setStep(step - 1);
  }

  return (
    <section
      firstta-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full bg-no-repeat bg-cover bg-top h-full min-h-[900px] flex flex-col items-center justify-center gap-8 px-6 md:mt-0"
      style={{
        backgroundImage: `linear-gradient(360deg, rgb(22, 33, 54,1) 0%, rgba(22, 33, 54, 0) 50%), url('${slice.primary.background_image.url}')`
      }}
    >
      <div className="font-playfair text-5xl text-[#162136] md:text-center ">
        ¿Quieres saber más?
      </div>
      <div className="bg-white rounded-3xl w-full max-w-[375px] md:max-w-[600px] md:min-w-[600px] p-10 relative">
        <Step
          slice={slice}
          searchParams={searchParams}
          handleGoForward={handleGoForward}
          handleGoBackward={handleGoBackward}
        />
      </div>
      {step === 1 && (
        <div className="flex gap-2 w-full max-w-[600px] mx-auto text-left self-start">
          <div className="min-w-[16px] h-[16px] rounded-full font-playfair border border-white text-white opacity-70 text-[10px] italic leading-none flex items-center justify-center">
            i
          </div>
          <div className="text-white text-xs opacity-70">
            El presupuesto por persona puede variar en función del destino,
            <br /> las fechas del viaje y su duración.
          </div>
        </div>
      )}
    </section>
  );
};

const ClientProvider = (props: ContactFormProps) => {
  const client = createClient("voiash");

  return (
    <PrismicProvider client={client}>
      <Suspense>
        <ContactForm {...props} />
      </Suspense>
    </PrismicProvider>
  );
};

export default ClientProvider;
