import Link from 'next/link'
import { Metadata } from 'next'

export function generateMetadata(): Metadata {
  return {
    title: 'Feedback',
  }
}

export default function Feedback() {
  return (
    <>
      <h1>Feedback</h1>

      <p>
        Please feel free to submit{' '}
        <span className="inline-flex gap-1">
          <span>🐛</span>
          <a
            href="https://github.com/christophermiles/monster-hit-dice-app/discussions/categories/bug-reports"
            className="link"
          >
            bug reports
          </a>
        </span>
        ,
        <span className="inline-flex gap-1">
          <span>💡</span>
          <a
            href="https://github.com/christophermiles/monster-hit-dice-app/discussions/categories/ideas"
            className="link"
          >
            feature ideas
          </a>
        </span>{' '}
        (but check the{' '}
        <Link href="/roadmap" className="link">
          Roadmap
        </Link>{' '}
        first!) and{' '}
        <span className="inline-flex gap-1">
          <span>✏️</span>
          <a
            href="https://github.com/christophermiles/monster-hit-dice-app/discussions/categories/feedback"
            className="link"
          >
            other feedback
          </a>
        </span>
        .
      </p>
    </>
  )
}
