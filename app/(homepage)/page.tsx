import Hero from './_components/hero'
import Meetup from './_components/meetup'
import MentorCarousel from './_components/carousel/mentor-carousel'
import Mockup from './_components/mockup'

export default function Home() {
  return (
    <div>
      <Hero />
      <Meetup />
      <Mockup />
      <MentorCarousel />
    </div>
  )
}
