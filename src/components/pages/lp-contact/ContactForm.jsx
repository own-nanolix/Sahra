'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Field from '@/components/ui/Field';
import Reveal from '@/components/site/Reveal';
import { Lines } from '@/components/ui/Card';
import { toast } from '@/components/site/Toast';
import { copy } from '@/lib/site';
import { LINES, CONTACT } from '@/lib/brand';
import { tEnter, tMove } from '@/lib/motion';
import s from './lp-contact.module.css';

// A contact form on Beige with real states: required fields, an invalid email, and a sent state. The sent
// state says plainly that no network request is made: nothing leaves the page.
const TOPICS = [
  { value: 'support', label: 'Support', to: CONTACT.support },
  { value: 'partnerships', label: 'Partnerships', to: CONTACT.partnerships },
  { value: 'info', label: 'Information', to: CONTACT.info },
];
const EMPTY = { name: '', email: '', topic: 'support', message: '' };

function check(v) {
  const e = {};
  if (!v.name.trim()) e.name = 'Enter your name.';
  if (!v.email.trim()) e.email = 'Enter your email address.';
  else if (!/^\S+@\S+\.\S+$/.test(v.email.trim())) e.email = 'This email address is not valid.';
  if (!v.message.trim()) e.message = 'Write a message.';
  return e;
}

export default function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [tried, setTried] = useState(false);
  const [sent, setSent] = useState(false);

  const topic = TOPICS.find((t) => t.value === values.topic) || TOPICS[0];
  const set = (k) => (ev) => {
    const next = { ...values, [k]: ev.target.value };
    setValues(next);
    if (tried) setErrors(check(next));
  };
  const blur = (k) => () => {
    if (!tried && !values[k]) return;
    setErrors((prev) => {
      const all = check(values);
      return { ...prev, [k]: all[k] };
    });
  };

  const submit = (ev) => {
    ev.preventDefault();
    const e = check(values);
    setTried(true);
    setErrors(e);
    const first = ['name', 'email', 'message'].find((k) => e[k]);
    if (first) {
      const el = document.getElementById(`lp-contact-${first}`);
      if (el) el.focus();
      return;
    }
    setSent(true); // no network request: nothing is posted anywhere
  };

  const reset = () => {
    setValues(EMPTY);
    setErrors({});
    setTried(false);
    setSent(false);
  };

  const summary = `To: ${topic.to}\nName: ${values.name}\nEmail: ${values.email}\n\n${values.message}`;
  const copyMessage = async () => {
    const ok = await copy(summary);
    toast(ok ? 'Message copied' : 'Could not copy the message');
  };

  const bind = (k) => ({
    value: values[k],
    onChange: set(k),
    onBlur: blur(k),
    'aria-invalid': errors[k] ? 'true' : undefined,
  });
  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <section className={s.formSection} aria-labelledby="lp-contact-form-h">
      <div className={`wrap ${s.formGrid}`}>
        <div className={s.formCopy}>
          <Reveal>
            <p className="t-label sand-ink">Write to Sahra</p>
            <Lines as="h2" id="lp-contact-form-h" rows={LINES.builtAround.rows} className="t-h1" />
          </Reveal>
          <Reveal delay={120}>
            <p className="t-lead muted" style={{ marginTop: 24, maxWidth: '24em' }}>{LINES.refined.text}</p>
          </Reveal>
        </div>

        <div className={s.formCard}>
          <AnimatePresence mode="wait" initial={false}>
            {sent ? (
              <motion.div key="sent" className={s.sent} role="status" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0, transition: tEnter }} exit={{ opacity: 0, transition: tMove }}>
                <p className="t-label sand-ink">Message ready</p>
                <h3 className="t-h2">Nothing was sent.</h3>
                <p className="t-body" style={{ marginTop: 14 }}>
                  This page makes no network request, so your message has not left this page. To reach Sahra, copy it and write to {topic.to}.
                </p>
                <pre className={s.preview}>{summary}</pre>
                <div className="row" style={{ marginTop: 20 }}>
                  <Button icon="copy" onClick={copyMessage}>Copy message</Button>
                  <Button variant="outline" onClick={() => setSent(false)}>Edit message</Button>
                  <Button variant="ghost" onClick={reset}>Clear</Button>
                </div>
              </motion.div>
            ) : (
              <motion.form key="form" className={s.form} onSubmit={submit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1, transition: tEnter }} exit={{ opacity: 0, transition: tMove }}>
                {errorCount > 0 && (
                  <p role="alert" className={s.alert}>
                    {errorCount === 1 ? 'One field needs attention.' : `${errorCount} fields need attention.`}
                  </p>
                )}
                <div className={`${s.two}`}>
                  <Field id="lp-contact-name" label="Name" autoComplete="name" required className={errors.name ? s.invalid : ''} hint={errors.name} {...bind('name')} />
                  <Field id="lp-contact-email" label="Email" type="email" autoComplete="email" required className={errors.email ? s.invalid : ''} hint={errors.email} {...bind('email')} />
                </div>
                <Field
                  id="lp-contact-topic"
                  label="Topic"
                  as="select"
                  value={values.topic}
                  onChange={set('topic')}
                  hint={`This goes to ${topic.to}.`}
                >
                  {TOPICS.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                </Field>
                <Field id="lp-contact-message" label="Message" as="textarea" rows={6} required className={errors.message ? s.invalid : ''} hint={errors.message} {...bind('message')} />
                <div className="row" style={{ gap: 16 }}>
                  <Button type="submit" size="lg">Send message</Button>
                  <p className="t-small">No network request is made from this form.</p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
