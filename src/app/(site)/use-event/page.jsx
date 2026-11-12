import { pageMeta } from '@/lib/pages';
import EventPage from '@/components/pages/use-event/EventPage';

export const metadata = pageMeta('use-event');

export default function Page() {
  return <EventPage title="Event" />;
}
