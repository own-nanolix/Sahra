import { pageMeta } from '@/lib/pages';
import Board from '@/components/pages/campaign/Board';

export const metadata = pageMeta('campaign');

export default function Page() {
  return (
    <section className="page" id="p-campaign" aria-label="Campaign">
      <Board />
    </section>
  );
}
