import Card from './card';
import { cardData } from '@/data/admin-dashboard-card-data'


export default function CardList() {
  return (
    <div className='flex flex-wrap gap-5 col-span-3 h-full'>
      {cardData.map((card, index) => (
        <div key={index}>
          <Card {...card} />
        </div>
      ))}
    </div>
  )
}
