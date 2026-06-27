import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { Copy, Check, Play, Terminal, RotateCcw } from "lucide-react";

interface EditorContainerProps {
  jsonInput: string;
  onChangeJson: (val: string) => void;
  tsOutput: string;
  error: string | null;
  onReset: () => void;
}

export const EditorContainer: React.FC<EditorContainerProps> = ({
  jsonInput,
  onChangeJson,
  tsOutput,
  error,
  onReset,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!tsOutput) return;
    try {
      await navigator.clipboard.writeText(tsOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text", err);
    }
  };

  const handleFormatJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      onChangeJson(JSON.stringify(parsed, null, 2));
    } catch (err) {
      // Let standard validation hooks raise the syntax flags
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-zinc-950">
      {/* Editor Main Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-0 border-b border-zinc-800 min-h-0">
        
        {/* Input Panel */}
        <div className="flex flex-col border-b lg:border-b-0 lg:border-r border-zinc-800 min-h-0 h-full">
          <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-800 text-zinc-400 flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 inline-block"></span>
              <span className="text-xs font-mono font-medium tracking-wide uppercase">Input JSON</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={onReset}
                className="px-2.5 py-1 text-xs text-rose-400 hover:bg-rose-950/30 hover:text-rose-300 transition rounded flex items-center gap-1.5 border border-transparent hover:border-rose-900/40"
                title="Reset to initial template and settings"
              >
                <RotateCcw size={12} />
                Reset
              </button>
              <button
                onClick={handleFormatJson}
                className="px-2.5 py-1 text-xs hover:bg-zinc-800 hover:text-zinc-200 transition rounded flex items-center gap-1.5 border border-transparent hover:border-zinc-700"
              >
                <Play size={12} className="text-sky-400" />
                Auto-Format
              </button>
            </div>
          </div>
          <div className="flex-1 relative overflow-hidden min-h-0">
            <Editor
              height="100%"
              defaultLanguage="json"
              theme="vs-dark"
              value={jsonInput}
              onChange={(val) => onChangeJson(val || "")}
              options={{
                minimap: { enabled: false },
                fontSize: 13,
                lineHeight: 20,
                tabSize: 2,
                automaticLayout: true,
                padding: { top: 12 },
                scrollbar: { verticalScrollbarSize: 8, horizontalScrollbarSize: 8 },
              }}
            />
          </div>
        </div>

        {/* Output Panel */}
        <div className="flex flex-col min-h-0 h-full bg-zinc-950">
          <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-800 text-zinc-400 flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span>
              <span className="text-xs font-mono font-medium tracking-wide uppercase">TypeScript Interface</span>
            </div>
            <button
              onClick={handleCopy}
              disabled={!tsOutput}
              className={`px-3 py-1 text-xs transition rounded flex items-center gap-1.5 border ${
                copied
                  ? "bg-green-950 text-green-300 border-green-800"
                  : "hover:bg-zinc-800 hover:text-zinc-200 border-transparent hover:border-zinc-700"
              }`}
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? "Copied" : "Copy Output"}
            </button>
          </div>
          <div className="flex-1 relative overflow-hidden min-h-0">
            <Editor
              height="100%"
              defaultLanguage="typescript"
              theme="vs-dark"
              value={tsOutput}
              options={{
                readOnly: true,
                minimap: { enabled: false },
                fontSize: 13,
                lineHeight: 20,
                tabSize: 2,
                automaticLayout: true,
                padding: { top: 12 },
                scrollbar: { verticalScrollbarSize: 8, horizontalScrollbarSize: 8 },
              }}
            />
          </div>
        </div>
      </div>

      {/* Compiler / Output Terminal Status Bar */}
      <footer className="h-10 px-4 py-1.5 bg-zinc-900 border-t border-zinc-800 flex items-center justify-between text-xs font-mono select-none flex-shrink-0">        {error ? (
          <div className="flex items-center gap-2 text-rose-400 animate-pulse">
            <span className="inline-block w-2 h-2 rounded-full bg-rose-500" />
            <span className="truncate max-w-[90vw]">{error}</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-emerald-400">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
            <span>Success: Schema generated successfully.</span>
          </div>
        )}
        <div className="hidden sm:flex items-center gap-3 text-zinc-500">
          <div className="flex items-center gap-1">
            <Terminal size={12} />
            <span>UTF-8</span>
          </div>
          <span>TypeScript 5.x</span>
        </div>
      </footer>
    </div>
  );
};