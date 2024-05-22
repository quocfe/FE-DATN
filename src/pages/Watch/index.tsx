import HorizontalVideoCard from './components/HorizontalVideoCard'
import SwiperVideoCard from './components/SwiperVideoCard'
import FormCreateVideo from './components/form-create-video'

const array = [1, 2, 3, 4, 5, 6, 7, 8]

function Watch() {
  return (
    <div>
      <FormCreateVideo />

      {/* Swiper video media */}
      <SwiperVideoCard />
      {/* card list  */}
      <div className='box mt-6 p-6'>
        {array.map((item) => {
          return <HorizontalVideoCard key={item} />
        })}
      </div>
      {/* load more */}
      <div className='my-6 flex justify-center'>
        <button type='button' className='dark:bg-dark2 rounded-full bg-white px-5 py-2 text-sm font-semibold shadow-md'>
          Load more...
        </button>
      </div>
    </div>
  )
}

export default Watch
