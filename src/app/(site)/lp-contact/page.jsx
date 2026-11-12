import { pageMeta } from '@/lib/pages';
import LandingNav from '@/components/ui/LandingNav';
import LandingFooter from '@/components/ui/LandingFooter';
import Hero from '@/components/pages/lp-contact/Hero';
import LetterStory from '@/components/pages/lp-contact/LetterStory';
import Folder from '@/components/pages/lp-contact/Folder';
import CopyLines from '@/components/pages/lp-contact/CopyLines';
import ContactForm from '@/components/pages/lp-contact/ContactForm';
import Signoff from '@/components/pages/lp-contact/Signoff';
import s from '@/components/pages/lp-contact/lp-contact.module.css';

export const metadata = pageMeta('lp-contact');

// Contact, in order (nav and footer shared): 1 nav   2 hero: the business card (m08) turning beside the three
// contact blocks set large   3 the story: the envelope (m10) pinned at the RIGHT while the letter's paragraphs
// pass   4 the dark folder (m10) beside its From block   5 every contact line with a copy button, on Dark
// Chocolate   6 a form on Beige with real states   7 the sign-off on Black   8 footer.
export default function Page() {
  return (
    <section className={`page ${s.page}`} style={{ paddingBottom: 0 }} id="p-lp-contact" aria-label="Landing: Contact">
      <LandingNav current="lp-contact" />
      <Hero />
      <LetterStory />
      <Folder />
      <CopyLines />
      <ContactForm />
      <Signoff />
      <LandingFooter />
    </section>
  );
}
