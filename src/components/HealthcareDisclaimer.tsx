import { ShieldAlert, Info } from 'lucide-react';

interface Props {
  compact?: boolean;
}

export function HealthcareDisclaimer({ compact = false }: Props) {
  if (compact) {
    return (
      <div className="bg-amber-50 border-l-4 border-amber-500 px-3 py-2 text-xs text-amber-900 flex items-center gap-2">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
        <span>
          <strong>Healthcare Safety Notice:</strong> Business & marketing assistant only. Never provide patient-specific clinical diagnosis, prescribing, or dosage advice. All clinical topics require registered pharmacist review.
        </span>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 border border-emerald-200 rounded-xl p-4 my-4 shadow-xs">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div className="flex-1 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="font-semibold text-emerald-900 tracking-tight">
              UK Pharmacy Regulatory & Ethical Compliance Notice
            </span>
            <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded-full font-medium">
              GPhC Standards Aligned
            </span>
          </div>
          <p className="text-slate-600">
            This tool is an <strong>operational business intelligence and marketing assistant</strong> designed specifically for independent UK community pharmacies. It is <strong>NOT</strong> a medical diagnostic tool, clinical decision-support system, prescribing tool, or replacement for a registered pharmacist. Always recommend appropriate clinical/pharmacist review before publishing patient communications.
          </p>
        </div>
      </div>
    </div>
  );
}
