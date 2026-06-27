// [Lines above remain unchanged]
import React from "react";
import { Terminal } from "lucide-react";

interface HeaderProps {
  onLoadMock: (type: "user" | "ecommerce" | "analytics") => void;
}

// Inline SVG matching the Lucide design specifications
const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const Header: React.FC<HeaderProps> = ({ onLoadMock }) => {
  return (
    <header className="flex flex-col md:flex-row items-center justify-between px-6 py-4 bg-zinc-900 border-b border-zinc-800 text-zinc-200">
      <div className="flex items-center space-x-3 mb-4 md:mb-0">
        <div className="bg-sky-600 p-2 rounded">
          <Terminal size={22} className="text-white" />
        </div>
        <div>
          <h1 className="text-lg font-semibold tracking-wide flex items-center gap-2">
            JSON <span className="text-sky-400">to</span> TypeScript
          </h1>
          <p className="text-xs text-zinc-400">Real-time interface & type alias generation</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex bg-zinc-800 rounded p-1 border border-zinc-700">
          <button
            onClick={() => onLoadMock("user")}
            className="px-3 py-1.5 text-xs font-medium rounded hover:bg-zinc-700 transition"
          >
            Mock User
          </button>
          <button
            onClick={() => onLoadMock("ecommerce")}
            className="px-3 py-1.5 text-xs font-medium rounded hover:bg-zinc-700 transition"
          >
            Mock Order
          </button>
          <button
            onClick={() => onLoadMock("analytics")}
            className="px-3 py-1.5 text-xs font-medium rounded hover:bg-zinc-700 transition"
          >
            Mock Analytics
          </button>
        </div>

        <a
          href="https://github.com/mmy-lana/json-to-ts-converter"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-zinc-800 border border-zinc-700 rounded hover:bg-zinc-700 text-zinc-300 transition flex items-center justify-center"
          title="GitHub Repository"
        >
          <GithubIcon size={18} />
        </a>
      </div>
    </header>
  );
};