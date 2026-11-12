import { pageMeta } from '@/lib/pages';

export const metadata = pageMeta('feature');

export default function Page() {
  return (
    <section className="page" id="p-feature" aria-label="Plan explorer" data-stub="">
      <h1 tabIndex={-1}>Plan explorer</h1>
    </section>
  );
}
