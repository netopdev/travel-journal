import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Rithynea's Journal — Wandering & Writing",
  description:
    'A personal record of places loved, meals eaten, and moments kept.',
}

// ---------------------------------------------------------------------------
// Placeholder trip data — will be replaced by real DB queries in Milestone 4
// ---------------------------------------------------------------------------
const PLACEHOLDER_TRIPS = [
  {
    id: 1,
    title: 'Golden Hour in Lisbon',
    location: 'Lisbon, Portugal',
    date: 'June 2025',
    dateTime: '2025-06',
  },
  {
    id: 2,
    title: 'Rainy Days in Kyoto',
    location: 'Kyoto, Japan',
    date: 'March 2025',
    dateTime: '2025-03',
  },
  {
    id: 3,
    title: 'Salt Flats at Sunrise',
    location: 'Uyuni, Bolivia',
    date: 'January 2025',
    dateTime: '2025-01',
  },
]

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------
function SiteHeader() {
  return (
    <header
      style={{
        background: 'var(--paper-deep)',
        borderBottom: '1px solid var(--line)',
      }}
    >
      <div
        style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1.5rem' }}
        className="flex items-center justify-between py-4"
      >
        {/* Site name */}
        <Link
          href="/"
          aria-label="Rithynea's Journal — home"
          style={{
            fontFamily: 'var(--font-fraunces), Georgia, serif',
            fontWeight: 900,
            fontSize: '1.25rem',
            color: 'var(--accent)',
            textDecoration: 'none',
            letterSpacing: '-0.01em',
          }}
        >
          Rithynea&rsquo;s Journal
        </Link>

        {/* Navigation */}
        <nav aria-label="Main navigation">
          <ul
            className="flex items-center gap-6"
            style={{ listStyle: 'none', margin: 0, padding: 0 }}
          >
            {[
              { label: 'Home', href: '#' },
              { label: 'Map', href: '#' },
              { label: 'About', href: '#' },
            ].map(({ label, href }) => (
              <li key={label}>
                <a href={href} className="nav-link">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------
function HeroSection() {
  return (
    <section
      aria-label="Introduction"
      style={{ background: 'var(--paper)' }}
      className="py-16 md:py-24"
    >
      <div
        style={{
          maxWidth: '48rem',
          margin: '0 auto',
          padding: '0 1.5rem',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-fraunces), Georgia, serif',
            fontWeight: 900,
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            color: 'var(--ink)',
            letterSpacing: '-0.02em',
            marginBottom: '1rem',
          }}
        >
          Wandering &amp; Writing
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '1.125rem',
            color: 'var(--ink-soft)',
            maxWidth: '36rem',
            margin: '0 auto',
            lineHeight: 1.7,
          }}
        >
          A personal record of places loved, meals eaten, and moments kept.
        </p>

        {/* Decorative divider */}
        <div
          aria-hidden="true"
          style={{
            width: '3rem',
            height: '3px',
            background: 'var(--accent)',
            borderRadius: '9999px',
            margin: '2rem auto 0',
          }}
        />
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Trip Card
// ---------------------------------------------------------------------------
interface TripCardProps {
  title: string
  location: string
  date: string
  dateTime: string
}

function TripCard({ title, location, date, dateTime }: TripCardProps) {
  return (
    <article
      style={{
        background: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 2px 10px rgba(44,38,32,.07)',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
      }}
    >
      {/* Placeholder image area */}
      <div
        aria-hidden="true"
        role="img"
        style={{
          background: 'var(--paper-deep)',
          borderRadius: '16px',
          height: '200px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Simple SVG mountain/landscape placeholder */}
        <svg
          width="64"
          height="48"
          viewBox="0 0 64 48"
          fill="none"
          aria-hidden="true"
          style={{ opacity: 0.35 }}
        >
          <path
            d="M4 44 L20 16 L36 34 L44 22 L60 44 Z"
            fill="var(--accent)"
          />
          <circle cx="50" cy="12" r="7" fill="var(--warn)" />
        </svg>
      </div>

      {/* Card body */}
      <div style={{ padding: '0 0.25rem' }}>
        <h3
          style={{
            fontFamily: 'var(--font-fraunces), Georgia, serif',
            fontWeight: 700,
            fontSize: '1.125rem',
            color: 'var(--ink)',
            margin: '0 0 0.25rem',
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '0.875rem',
            color: 'var(--ink-soft)',
            margin: '0 0 0.125rem',
          }}
        >
          {location}
        </p>
        <time
          dateTime={dateTime}
          style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '0.8125rem',
            color: 'var(--ink-soft)',
            opacity: 0.75,
          }}
        >
          {date}
        </time>
      </div>
    </article>
  )
}

// ---------------------------------------------------------------------------
// Recent Trips section
// ---------------------------------------------------------------------------
function RecentTripsSection() {
  return (
    <section
      aria-labelledby="recent-trips-heading"
      style={{ background: 'var(--paper)' }}
      className="py-16 md:py-24"
    >
      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1.5rem' }}>
        <h2
          id="recent-trips-heading"
          style={{
            fontFamily: 'var(--font-fraunces), Georgia, serif',
            fontWeight: 700,
            fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
            color: 'var(--ink)',
            letterSpacing: '-0.02em',
            marginBottom: '2rem',
          }}
        >
          Recent Trips
        </h2>

        {/* Responsive grid: 1-col mobile → 3-col desktop */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(1, 1fr)',
            gap: '1.5rem',
          }}
          className="sm:grid-cols-2 lg:grid-cols-3"
        >
          {PLACEHOLDER_TRIPS.map((trip) => (
            <TripCard
              key={trip.id}
              title={trip.title}
              location={trip.location}
              date={trip.date}
              dateTime={trip.dateTime}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------
function SiteFooter() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--line)',
        background: 'var(--paper-deep)',
        padding: '2rem 1.5rem',
        textAlign: 'center',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
          fontSize: '0.875rem',
          color: 'var(--ink-soft)',
          margin: 0,
        }}
      >
        Made with love, 2025
      </p>
    </footer>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <RecentTripsSection />
      </main>
      <SiteFooter />
    </>
  )
}
