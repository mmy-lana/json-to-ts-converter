export interface ConvertOptions {
  rootName: string;
  useTypeAlias: boolean;
  makeOptional: boolean;
  exportPrefix: boolean;
  readOnlyProperties: boolean;
}

interface GeneratedInterface {
  name: string;
  body: string;
}

export function jsonToTs(jsonStr: string, options: ConvertOptions): string {
  if (!jsonStr.trim()) {
    return "";
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonStr);
  } catch (err: any) {
    throw new Error(`Invalid JSON: ${err.message}`);
  }

  const generatedInterfaces: GeneratedInterface[] = [];
  const knownNames = new Set<string>();

  function capitalize(str: string): string {
    if (!str) return "Unknown";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function getUniqueName(baseName: string): string {
    let name = capitalize(baseName);
    let counter = 1;
    while (knownNames.has(name)) {
      name = `${capitalize(baseName)}${counter}`;
      counter++;
    }
    knownNames.add(name);
    return name;
  }

  function getType(val: unknown, parentKey: string): string {
    if (val === null) return "any";
    if (typeof val === "string") return "string";
    if (typeof val === "number") return "number";
    if (typeof val === "boolean") return "boolean";

    if (Array.isArray(val)) {
      if (val.length === 0) return "any[]";
      
      // Determine array types
      const types = new Set<string>();
      val.forEach((item) => {
        types.add(getType(item, parentKey));
      });
      
      const unionType = Array.from(types).join(" | ");
      if (types.size > 1) {
        return `(${unionType})[]`;
      }
      return `${unionType}[]`;
    }

    if (typeof val === "object") {
      const typeName = getUniqueName(parentKey || "NestedObject");
      buildInterface(val as Record<string, unknown>, typeName);
      return typeName;
    }

    return "any";
  }

  function buildInterface(obj: Record<string, unknown>, interfaceName: string) {
    let output = "";
    const prefix = options.exportPrefix ? "export " : "";
    const declType = options.useTypeAlias ? "type" : "interface";
    const assignment = options.useTypeAlias ? " = " : " ";

    output += `${prefix}${declType} ${interfaceName}${assignment}{\n`;

    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      const isOptional = options.makeOptional || value === null || value === undefined;
      const readonlyPrefix = options.readOnlyProperties ? "readonly " : "";
      const optionalSuffix = isOptional ? "?" : "";
      
      let nestedTypeName = key;
      // Handle array of objects specifically for clean subtype names
      if (Array.isArray(value) && value.length > 0 && typeof value[0] === "object" && value[0] !== null) {
        nestedTypeName = key.endsWith("s") ? key.slice(0, -1) : key;
      }

      const propType = getType(value, nestedTypeName);
      output += `  ${readonlyPrefix}${key}${optionalSuffix}: ${propType};\n`;
    });

    output += "}";
    generatedInterfaces.push({ name: interfaceName, body: output });
  }

  if (parsed === null || typeof parsed !== "object") {
    const prefix = options.exportPrefix ? "export " : "";
    const declType = options.useTypeAlias ? "type" : "interface";
    return `${prefix}${declType} ${options.rootName} = ${typeof parsed};`;
  }

  if (Array.isArray(parsed)) {
    if (parsed.length === 0) {
      const prefix = options.exportPrefix ? "export " : "";
      const declType = options.useTypeAlias ? "type" : "interface";
      return `${prefix}${declType} ${options.rootName} = any[];`;
    }
    const representative = parsed[0];
    if (typeof representative === "object" && representative !== null) {
      buildInterface(representative as Record<string, unknown>, options.rootName);
    } else {
      const prefix = options.exportPrefix ? "export " : "";
      const declType = options.useTypeAlias ? "type" : "interface";
      return `${prefix}${declType} ${options.rootName} = ${typeof representative}[];`;
    }
  } else {
    buildInterface(parsed as Record<string, unknown>, options.rootName);
  }

  // Reverse list to ensure nested/child structures are printed first (dependency order)
  return generatedInterfaces
    .reverse()
    .map((item) => item.body)
    .join("\n\n");
}