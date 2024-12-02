"use client";

import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { useEffect, useState } from "react";
import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import CloseIcon from "../../images/CloseIcon";
import { useRef } from "react";
import Arrow from "../../images/Arrow";

/**
 * Props for `TravelTrips`.
 */
export type TravelTripsProps = SliceComponentProps<Content.TravelTripsSlice>;

const getChildWithCol = ({
  children,
  index
}: {
  children: React.ReactNode;
  index: number;
}) => {
  return (
    <>
      <div
        className={`flex md:hidden ${index === 3 ? "col-span-2" : "col-span-1"}`}
      >
        {children}
      </div>
      <div
        className={`hidden md:flex ${index <= 3 ? "col-span-2" : "col-span-3"}`}
      >
        {children}
      </div>
    </>
  );
};

const TripTypes = ({
  tripTypes,
  index
}: {
  tripTypes: Content.TiposDeViajesDocument<string>;
  index: number;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trips, setTrips] =
    useState<(Content.ViajesDocument<string> | undefined)[]>();
  const [isLoading, setIsLoading] = useState(false);
  const client = createClient();
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getTrips = async () => {
      setIsLoading(true);
      const trips = await Promise.all(
        tripTypes.data.viajes.map((item) => {
          if (isFilled.contentRelationship(item.trip) && item.trip.uid) {
            return client.getByUID("viajes", item.trip.uid);
          }
        })
      );
      setTrips(trips);
      setIsLoading(false);
    };

    if (!trips?.length && !isLoading) getTrips();
    return () => {};
  }, [trips?.length, isLoading, client, tripTypes?.data?.viajes]);

  const Card = getChildWithCol({
    children: (
      <div
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.3) 50%), url('${tripTypes.data?.image.url}')`
        }}
        className={`hover:brightness-125 w-full ${index === 3 ? "h-[180px]" : "h-[415px]"} md:h-[310px] rounded-xl bg-no-repeat bg-cover bg-center flex items-end px-2 py-2 md:px-7 md:py-4 font-playfair text-white text-3xl md:text-4xl`}
        onClick={() => setIsModalOpen(true)}
      >
        <PrismicRichText field={tripTypes.data.title} />
      </div>
    ),
    index
  });

  return (
    <>
      {Card}

      {isModalOpen && (
        <div className="bg-black bg-opacity-80 fixed top-0 left-0 w-full min-h-full max-h-full overflow-y-auto z-50 flex items-center justify-center">
          {isLoading ? (
            "loading..."
          ) : (
            <div className="flex flex-col md:flex-row w-full h-full items-center justify-center max-w-screen-xl m-auto pt-24 md:pt-0">
              <div
                className="absolute top-10 right-10 opacity-70 hover:opacity-100 z-[100]"
                onClick={() => setIsModalOpen(false)}
              >
                <CloseIcon />
              </div>
              <div className="flex flex-col items-center gap-7 md:flex-1 px-6">
                <div className="font-playfair text-5xl md:text-6xl text-center max-w-full md:max-w-[350px] text-brand-beige">
                  <PrismicRichText field={tripTypes.data.title} />
                </div>
                <div className="font-playfair text-2xl text-center max-w-full md:max-w-[515px] text-brand-beige">
                  <PrismicRichText field={tripTypes.data.punchline} />
                </div>
                <div className="font-martel md:text-lg text-justify max-w-full md:max-w-[432px] text-brand-beige">
                  <PrismicRichText field={tripTypes.data.description} />
                </div>
                <div className="font-playfair text-brand-beige text-xl px-8 py-4 md:py-3 rounded-full border border-brand-beige mb-6">
                  <PrismicNextLink field={tripTypes.data.cta} />
                </div>
              </div>
              <div className="flex gap-4 items-center flex-1 max-w-full md:max-w-[unset] overflow-hidden">
                <div
                  className="hidden md:flex relative z-[60]"
                  onClick={() => {
                    console.log(carouselRef.current?.scrollLeft);
                    carouselRef.current?.scrollTo({
                      left: carouselRef.current?.scrollLeft - 246,
                      behavior: "smooth"
                    });
                  }}
                >
                  <Arrow />
                </div>
                <div
                  ref={carouselRef}
                  className="flex gap-4 max-w-full md:max-w-[unset] overflow-auto no-scrollbar px-6 mt-2 md:mt-0 md:px-0"
                >
                  {trips?.map((trip, index) => (
                    <div key={`${trip?.id}-${index}`}>
                      <div
                        style={
                          trip?.data.shouldrendertext
                            ? {
                                backgroundImage: `linear-gradient(360deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 25%), url('${trip?.data.image.url}')`
                              }
                            : {
                                backgroundImage: `url('${trip?.data.image.url}')`
                              }
                        }
                        className="w-[200px] h-[360px] md:w-[246px] md:h-[429px] bg-cover bg-no-repeat bg-bottom flex items-end text-brand-beige font-playfair text-4xl p-4"
                      >
                        {trip?.data.shouldrendertext && (
                          <div>
                            <PrismicRichText field={trip?.data.title} />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  className="hidden md:flex  relative z-[60] rotate-180"
                  onClick={() => {
                    carouselRef.current?.scrollBy({
                      left: carouselRef.current?.scrollLeft + 246,
                      behavior: "smooth"
                    });
                  }}
                >
                  <Arrow />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

const getChildWithGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <section
        className={`px-2 w-full max-w-screen-xl m-auto grid gap-5 md:hidden grid-cols-2`}
      >
        {children}
      </section>
      <section
        className={`w-full max-w-screen-xl m-auto gap-5 hidden md:grid grid-cols-6`}
      >
        {children}
      </section>
    </>
  );
};

const TravelTrips = ({ slice }: TravelTripsProps): JSX.Element => {
  const [tripsTypes, setTripsTypes] =
    useState<(Content.TiposDeViajesDocument<string> | undefined)[]>();
  const [isLoading, setIsLoading] = useState(false);
  const client = createClient();

  useEffect(() => {
    const getTripsTypes = async () => {
      setIsLoading(true);
      const tripsTypes = await Promise.all(
        slice.primary.trips_types.map((item) => {
          if (
            isFilled.contentRelationship(item.trip_types) &&
            item.trip_types.uid
          ) {
            return client.getByUID("tipos_de_viajes", item.trip_types.uid);
          }
        })
      );
      setTripsTypes(tripsTypes);
      setIsLoading(false);
    };

    if (!tripsTypes?.length && !isLoading) getTripsTypes();
    return () => {};
  }, [tripsTypes?.length, isLoading, client, slice.primary?.trips_types]);

  if (isLoading) {
    return <>loading...</>;
  }

  const Wrapper = getChildWithGrid({
    children: (
      <>
        {tripsTypes?.map((tripTypes, index) => (
          <TripTypes
            key={tripTypes?.id}
            index={index + 1}
            tripTypes={tripTypes!}
          />
        ))}
      </>
    )
  });

  return <>{Wrapper}</>;
};

export default TravelTrips;
