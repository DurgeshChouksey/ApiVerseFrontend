import Features from '@/components/features';
import Hero from '@/components/hero';
import CTA from '@/components/cta';
import Navbar from '@/components/navbar';
import Testimonials from '@/components/testimonials';
import Faq from '@/components/faq';
import Footer from '@/components/footer';



const Landing = () => {

  return (
    <div>
      <Navbar isLoggedIn={false ? true : false} currentPage='landing'></Navbar>
      <Hero></Hero>
      <Features></Features>
      <CTA></CTA>
      <Testimonials></Testimonials>
      <Faq></Faq>
      <Footer></Footer>
    </div>
  )
}

export default Landing
