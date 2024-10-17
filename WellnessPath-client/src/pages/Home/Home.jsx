import React from 'react'
import Header from '../../components/Header'
import { assets } from '../../components/assets'

const Home = () => {
  return (
    <div>
      <div className='scrollContainer'>
      <div className='bg-parent'>
                <img src={assets.abstract} alt="" />
            </div>
            <main className='homecontent'>
                <section className=''>
                   <p>Leading the way to <br /> better medicine</p>
               </section>
            </main>
            </div>
        <Header />
    </div>
  )
}

export default Home