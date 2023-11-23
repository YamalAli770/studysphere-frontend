import Hero from './_components/hero'
import Meetup from './_components/meetup'
import MentorCarousel from './_components/mentor-carousel/mentor-carousel'
import Mockup from './_components/mockup'
import Registration from './_components/registration'
import TestimonialCarousel from './_components/testimonial-carousel/testimonial-carousel'

export default function Home() {
  return (
    <div>
      <Hero />
      <Meetup />
      <Mockup />
      <MentorCarousel />
      <Registration />
      <TestimonialCarousel />
    </div>
  )
}
