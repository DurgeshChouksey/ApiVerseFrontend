import Features from '@/components/features';
import Hero from '@/components/hero';
import CTA from '@/components/cta';
import Testimonials from '@/components/testimonials';
import Faq from '@/components/faq';
import Footer from '@/components/footer';



const Landing = () => {

  return (
    <div>
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
