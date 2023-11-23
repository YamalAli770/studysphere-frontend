"use client"

import useEmblaCarousel, { EmblaOptionsType } from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import Slide from "./_components/slide"
import { testimonialCarouselData } from '@/data/testimonial-carousel-data'
import { useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function TestimonialCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({loop: true}, [Autoplay()]);

  const scrollPrev = useCallback(() => {
    if(emblaApi) {
      emblaApi.scrollPrev();
    }
  }, [emblaApi])
  
  const scrollNext = useCallback(() => {
    if(emblaApi) {
      emblaApi.scrollNext();
    }
  }, [emblaApi])

  return (
    <div className="py-24 bg-secondary-bg">
      <div className="container">
        <div className="flex flex-col gap-y-24">
          {/* Top */}
          <section>
            <h1 className="text-4xl">
              Don't Take Our Word For It.<br /> Trust Our Customers
            </h1>
          </section>
          {/* Bottom */}
          <section>
            <div className="embla overflow-hidden">
              <div className="embla__viewport relative" ref={emblaRef}>
                <div className="embla__container flex">
                  {testimonialCarouselData.map((slide, index) => (
                    <div className="embla__slide mr-8" key={index}>
                      <Slide {...slide} />
                    </div>
                  ))}
                </div>
                <ChevronLeft className="embla__prev absolute top-1/2 left-0 cursor-pointer bg-gray-50 bg-opacity-30 p-2 rounded-full" size={40} color="white" onClick={scrollPrev} />
                <ChevronRight className="embla__next absolute top-1/2 right-0 cursor-pointer bg-gray-50 bg-opacity-30 p-2 rounded-full" size={40} color="white" onClick={scrollNext} />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
