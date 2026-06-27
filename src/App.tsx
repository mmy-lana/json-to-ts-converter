import { Header } from "./components/Header";
import { SettingsPanel } from "./components/SettingsPanel";
import { EditorContainer } from "./components/EditorContainer";
import { useConverter } from "./hooks/useConverter";

export default function App() {
  const {
    jsonInput,
    setJsonInput,
    tsOutput,
    error,
    options,
    updateOption,
    loadMockData,
    resetToDefault,
  } = useConverter();

  return (
    <div className="h-screen flex flex-col bg-zinc-950 text-zinc-100 font-sans overflow-hidden">
      {/* Visual Navigation Bar */}
      <Header onLoadMock={loadMockData} />

      {/* Workspace Panel Assembly */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0">
        <SettingsPanel options={options} onChangeOption={updateOption} />
        <EditorContainer
          jsonInput={jsonInput}
          onChangeJson={setJsonInput}
          tsOutput={tsOutput}
          error={error}
          onReset={resetToDefault}
        />
      </main>
    </div>
  );
}