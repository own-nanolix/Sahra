import { pageMeta } from '@/lib/pages';
import LandingNav from '@/components/ui/LandingNav';
import LandingFooter from '@/components/ui/LandingFooter';
import Hero from '@/components/pages/lp-contact/Hero';
import LetterStory from '@/components/pages/lp-contact/LetterStory';
import CopyLines from '@/components/pages/lp-contact/CopyLines';
import ContactForm from '@/components/pages/lp-contact/ContactForm';
import Signoff from '@/components/pages/lp-contact/Signoff';
import s from '@/components/pages/lp-contact/lp-contact.module.css';

export const metadata = pageMeta('lp-contact');

// Contact: the business card turning beside the large contact blocks, the letter rising out of the dark
// envelope, every contact line with a copy button, a form with real states, and the sign-off.
export default function Page() {
  return (
    <section className={`page ${s.page}`} style={{ paddingBottom: 0 }} id="p-lp-contact" aria-label="Landing: Contact">
      <LandingNav current="lp-contact" />
      <Hero />
      <LetterStory />
      <CopyLines />
      <ContactForm />
      <Signoff />
      <LandingFooter />
    </section>
  );
}
