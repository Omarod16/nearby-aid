import React from 'react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-slate-200 bg-white text-slate-700">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
        {/* Core Disclaimer Box */}
        <div className="rounded-2xl bg-slate-50 border border-slate-200/90 p-4 sm:p-5 text-xs sm:text-sm text-slate-700 space-y-2 leading-relaxed">
          <p className="font-extrabold text-slate-900">
            Important Medical & Safety Notice:
          </p>
          <p>
            NearbyAid is an independent UK service directory. <strong>NearbyAid is NOT an NHS service and is not affiliated with, endorsed by, or part of the National Health Service (NHS).</strong>
          </p>
          <p>
            This website does not offer medical advice, diagnosis, or triage. If you are experiencing a life-threatening emergency, call <strong>999</strong> immediately. For non-emergency medical guidance, contact <strong>NHS 111</strong> (dial 111 or visit 111.nhs.uk).
          </p>
        </div>

        {/* Footer Navigation & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm font-medium">
          <div className="flex items-center gap-2">
            <span className="font-black text-slate-900">NearbyAid</span>
            <span>&copy; {currentYear} nearbyaid.co.uk. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-700">
            <span>Independent UK Utility</span>
            <span>•</span>
            <span>Built with Next.js & Cloudflare</span>
            <span>•</span>
            <span>Phase 1 UI Foundation</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
