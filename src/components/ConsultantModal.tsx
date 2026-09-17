import { useState } from 'react';
import { X, Briefcase, Plus, Check, Trash2, Building2 } from 'lucide-react';
import { ConsultantProject, PharmacyProfile } from '../types/pharmacy';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  consultantProject: ConsultantProject;
  onSaveConsultantSettings: (project: ConsultantProject) => void;
  currentProfile: PharmacyProfile;
  onSwitchClient: (profile: PharmacyProfile) => void;
}

export function ConsultantModal({
  isOpen,
  onClose,
  consultantProject,
  onSaveConsultantSettings,
  currentProfile,
  onSwitchClient,
}: Props) {
  const [enabled, setEnabled] = useState(consultantProject.enabled);
  const [agencyName, setAgencyName] = useState(consultantProject.agencyName || 'UK Pharmacy Growth Advisory');
  const [clientName, setClientName] = useState(consultantProject.clientName || currentProfile.name);
  const [clientCode, setClientCode] = useState(consultantProject.clientCode || 'GC-BHAM-01');

  // Multi-client roster
  const [savedClients, setSavedClients] = useState<Array<{ name: string; location: string; code: string }>>([
    { name: 'GreenCare Pharmacy', location: 'Harborne, Birmingham', code: 'GC-BHAM-01' },
    { name: 'Apex Care Pharmacy', location: 'Richmond, London', code: 'AC-LND-02' },
    { name: 'WellLife Community Chemist', location: 'Didsbury, Manchester', code: 'WL-MAN-03' },
  ]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveConsultantSettings({
      enabled,
      agencyName,
      clientName,
      clientCode,
    });
    onClose();
  };

  const handleSelectClient = (client: { name: string; location: string; code: string }) => {
    setClientName(client.name);
    setClientCode(client.code);
    onSwitchClient({
      ...currentProfile,
      name: client.name,
      location: `${client.location}, UK`,
      website: `https://www.${client.name.toLowerCase().replace(/\s+/g, '')}.co.uk`,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-purple-100 text-purple-800 rounded-lg">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Consultancy Mode (Multi-Client)</h3>
              <p className="text-xs text-slate-500">Manage separate pharmacy clients, export branded reports, and isolate audit datasets.</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toggle Enable */}
        <div className="flex items-center justify-between p-3.5 bg-purple-50/60 border border-purple-200 rounded-xl">
          <div>
            <span className="text-xs font-bold text-purple-950 block">Enable Consultant Workspace</span>
            <span className="text-[11px] text-purple-800">Allows switching client rosters and white-labeling executive reports.</span>
          </div>
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
            className="w-5 h-5 accent-purple-600 cursor-pointer"
          />
        </div>

        {/* Agency Config */}
        <div className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Advisory / Agency Brand Name:
            </label>
            <input
              type="text"
              value={agencyName}
              onChange={(e) => setAgencyName(e.target.value)}
              className="w-full p-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
              placeholder="e.g. UK Pharmacy Commercial Advisory"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Active Client Pharmacy:
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full p-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Client Project Code:
              </label>
              <input
                type="text"
                value={clientCode}
                onChange={(e) => setClientCode(e.target.value)}
                className="w-full p-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none font-mono"
              />
            </div>
          </div>
        </div>

        {/* Client Roster Switcher */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Quick Switch Client Account:
          </label>
          <div className="space-y-2">
            {savedClients.map((c) => (
              <div
                key={c.code}
                onClick={() => handleSelectClient(c)}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  clientName === c.name
                    ? 'bg-purple-50 border-purple-400 text-purple-950 font-semibold'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-2 text-xs">
                  <Building2 className="w-4 h-4 text-slate-500" />
                  <div>
                    <span className="font-bold">{c.name}</span>
                    <span className="text-slate-500 ml-2">({c.location})</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-slate-200">
                  {c.code}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 text-xs font-semibold bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-xs"
          >
            Save Consultancy Settings
          </button>
        </div>
      </div>
    </div>
  );
}
