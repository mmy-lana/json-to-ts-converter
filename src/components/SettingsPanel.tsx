import React from "react";
import { Sliders, HelpCircle } from "lucide-react";
import type { ConvertOptions } from "../utils/converter";

interface SettingsPanelProps {
  options: ConvertOptions;
  onChangeOption: <K extends keyof ConvertOptions>(key: K, value: ConvertOptions[K]) => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ options, onChangeOption }) => {
  return (
    <aside className="w-full lg:w-80 bg-zinc-900 border-b lg:border-b-0 lg:border-r border-zinc-800 text-zinc-300 p-6 flex flex-col space-y-6">
      <div className="flex items-center space-x-2 border-b border-zinc-800 pb-3">
        <Sliders size={18} className="text-sky-500" />
        <h2 className="font-semibold text-sm tracking-wide text-white uppercase">Generator Settings</h2>
      </div>

      <div className="space-y-4">
        {/* Root Interface Name */}
        <div>
          <label className="block text-xs font-semibold text-zinc-400 uppercase mb-2">
            Root Object Name
          </label>
          <input
            type="text"
            value={options.rootName}
            onChange={(e) => onChangeOption("rootName", e.target.value || "RootObject")}
            placeholder="RootObject"
            className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
        </div>

        {/* Declaration Type Toggle */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-zinc-400 uppercase">
            Declaration Style
          </label>
          <div className="grid grid-cols-2 gap-2 bg-zinc-950 p-1 rounded border border-zinc-800">
            <button
              onClick={() => onChangeOption("useTypeAlias", false)}
              className={`py-1.5 text-xs font-medium rounded transition ${
                !options.useTypeAlias
                  ? "bg-sky-600 text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Interface
            </button>
            <button
              onClick={() => onChangeOption("useTypeAlias", true)}
              className={`py-1.5 text-xs font-medium rounded transition ${
                options.useTypeAlias
                  ? "bg-sky-600 text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Type Alias
            </button>
          </div>
        </div>

        {/* Toggle Settings */}
        <div className="space-y-3 pt-3">
          <label className="block text-xs font-semibold text-zinc-400 uppercase border-b border-zinc-800 pb-2">
            Formatting & Types
          </label>

          {/* Export Prefix */}
          <label className="flex items-center justify-between cursor-pointer group">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-zinc-300 group-hover:text-white">Export interfaces</span>
              <span className="text-xs text-zinc-500">Add `export` statement</span>
            </div>
            <input
              type="checkbox"
              checked={options.exportPrefix}
              onChange={(e) => onChangeOption("exportPrefix", e.target.checked)}
              className="w-4 h-4 rounded bg-zinc-950 border-zinc-800 accent-sky-500 focus:ring-0"
            />
          </label>

          {/* Optional Properties */}
          <label className="flex items-center justify-between cursor-pointer group">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-zinc-300 group-hover:text-white">Make properties optional</span>
              <span className="text-xs text-zinc-500">Add `?` modifier to properties</span>
            </div>
            <input
              type="checkbox"
              checked={options.makeOptional}
              onChange={(e) => onChangeOption("makeOptional", e.target.checked)}
              className="w-4 h-4 rounded bg-zinc-950 border-zinc-800 accent-sky-500 focus:ring-0"
            />
          </label>

          {/* Read-Only Modifier */}
          <label className="flex items-center justify-between cursor-pointer group">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-zinc-300 group-hover:text-white">Readonly properties</span>
              <span className="text-xs text-zinc-500">Append `readonly` key flags</span>
            </div>
            <input
              type="checkbox"
              checked={options.readOnlyProperties}
              onChange={(e) => onChangeOption("readOnlyProperties", e.target.checked)}
              className="w-4 h-4 rounded bg-zinc-950 border-zinc-800 accent-sky-500 focus:ring-0"
            />
          </label>
        </div>
      </div>

      <div className="mt-auto bg-zinc-950 p-4 rounded border border-zinc-800/80 text-xs text-zinc-500 flex items-start gap-2.5">
        <HelpCircle size={16} className="text-zinc-400 flex-shrink-0 mt-0.5" />
        <p>
          Inputs are dynamically monitored. Output adjusts immediately when you alter properties or nested payloads.
        </p>
      </div>
    </aside>
  );
};