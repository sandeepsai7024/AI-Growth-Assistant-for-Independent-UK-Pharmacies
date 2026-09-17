import { useState } from 'react';
import { X, Layers, CheckCircle2, Shield, ArrowUpRight, Zap } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function IntegrationsModal({ isOpen, onClose }: Props) {
  const [connectedMap, setConnectedMap] = useState<Record<string, boolean>>({
    ga4: true,
    gsc: false,
    gbp: false,
    meta: false,
    pharmoutcomes: false,
    nhsmail: false,
  });

  if (!isOpen) return null;

  const toggleConnect = (key: string) => {
    setConnectedMap((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const integrations = [
    {
      id: 'gsc',
      name: 'Google Search Console',
      category: 'SEO & Organic Visibility',
      description: 'Sync real search queries, keyword impressions, and local rankings directly into the SEO audit module.',
      status: 'Architecture Ready',
      docsUrl: 'https://developers.google.com/webmaster-tools',
    },
    {
      id: 'gbp',
      name: 'Google Business Profile API',
      category: 'Local Map Pack',
      description: 'Automate 1-click publishing of weekly service updates, holiday opening hour flags, and review monitoring.',
      status: 'Architecture Ready',
      docsUrl: 'https://developers.google.com/my-business',
    },
    {
      id: 'ga4',
      name: 'Google Analytics 4 (GA4)',
      category: 'Traffic & Conversion',
      description: 'Native REST API streaming of daily visitor sessions, bounce rates, and appointment booking goals.',
      status: 'Simulated Mode Active',
      docsUrl: 'https://developers.google.com/analytics',
    },
    {
      id: 'pharmoutcomes',
      name: 'PharmOutcomes / Sonar Health',
      category: 'NHS Clinical Services',
      description: 'Synchronise NHS Pharmacy First consultation totals to benchmark local service capacity with web traffic.',
      status: 'Architecture Ready',
      docsUrl: 'https://pharmoutcomes.org',
    },
    {
      id: 'meta',
      name: 'Meta Business Suite (Instagram / Facebook)',
      category: 'Social Channels',
      description: 'Direct publishing pipeline for educational carousel posts and community health awareness campaigns.',
      status: 'Architecture Ready',
      docsUrl: 'https://developers.facebook.com',
    },
    {
      id: 'nhsmail',
      name: 'NHSmail & NHS.uk Service Finder',
      category: 'NHS England Directory',
      description: 'Ensure directory listings and NHS profile opening times reflect your current clinical capabilities.',
      status: 'Architecture Ready',
      docsUrl: 'https://www.nhs.uk',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Future Integrations Architecture</h3>
              <p className="text-xs text-slate-500">
                Plug-and-play connector architecture for Google services, NHS directories, and booking platforms.
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Security & Data Privacy Notice */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-600 flex items-start gap-2">
          <Shield className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>UK GDPR & Caldicott Guardian Compliance:</strong> Any future external API connector transmits aggregated marketing metadata only. Patient personal data, NHS numbers, or identifiable clinical notes are strictly isolated and never accessed.
          </p>
        </div>

        {/* Integration Cards */}
        <div className="space-y-3 overflow-y-auto flex-1 pr-1">
          {integrations.map((item) => {
            const isConnected = connectedMap[item.id];
            return (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs sm:text-sm text-slate-900">{item.name}</span>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-md">{item.description}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                  <button
                    onClick={() => toggleConnect(item.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                      isConnected
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                        : 'bg-slate-900 text-white hover:bg-slate-800'
                    }`}
                  >
                    {isConnected ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Connected</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-3.5 h-3.5" />
                        <span>Configure Connector</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-400">
          <span>Webhooks & Zapier connectors available in production build</span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
