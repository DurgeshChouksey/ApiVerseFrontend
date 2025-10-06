import Features from '@/components/features';
import Hero from '@/components/hero';
import CTA from '@/components/cta';
import Navbar from '@/components/navbar';
import Testimonials from '@/components/testimonials';
import Faq from '@/components/faq';
import Footer from '@/components/footer';
import { useQuery } from '@tanstack/react-query';
import { fetchWithAuth } from '@/lib/fetchWithAuth';

const Landing = () => {

  const userInfo = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => fetchWithAuth('api/v1/auth/check-auth', {
      method: 'POST'
    })
  })

  const user = userInfo?.data?.data?.user;

  return (
    <div>
      <Navbar isLoggedIn={user ? true : false} currentPage='landing'></Navbar>
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
