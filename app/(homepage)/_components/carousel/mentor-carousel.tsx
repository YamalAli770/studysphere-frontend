"use client"

import useEmblaCarousel, { EmblaOptionsType } from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import Slide from "./_components/slide"
import { carouselData } from '@/data/carousel-data'

export default function MentorCarousel() {
  const [emblaRef] = useEmblaCarousel({loop: true}, [Autoplay()]);
  
  return (
    <div className="py-24 bg-secondary-bg">
      <div className="container">
        <div className="flex flex-col gap-y-24">
          {/* Top */}
          <section className="flex justify-between">
            <h1 className="text-4xl">
              Meet Our Inspiring<br /> Mentors
            </h1>
            <p className="text-sm w-72">
              Meet our experienced mentors who have successfully guided students through their study abroad journeys and are here to support you in reaching your educational goals.
            </p>
          </section>
          {/* Bottom */}
          <section>
            <div className="embla overflow-hidden" ref={emblaRef}>
              <div className="embla__container flex">
                {carouselData.map((slide, index) => (
                  <div className="embla__slide mr-8" key={index}>
                    <Slide {...slide} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
