'use client';

export default function FloatingContact() {
  return (
    <div className="fab">
      <a className="chat" href="https://wa.me/917701999395?text=Hello%20KUMAR%20VASHISHTHA%20AND%20ASSOCIATES,%20I%20would%20like%20to%20know%20more%20about%20your%20services." aria-label="Chat" target="_blank" rel="noopener noreferrer">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 11.5a8.4 8.4 0 01-8.9 8.4 8.6 8.6 0 01-3.4-.7L3 20l1-4.5A8.4 8.4 0 1121 11.5z" />
        </svg>
      </a>
      <a className="call" href="tel:+917701999395" aria-label="Call">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 5c0 8 7 15 15 15l3-4-6-3-2 2c-2-1-4-3-5-5l2-2-3-6z" />
        </svg>
      </a>
    </div>
  );
}
