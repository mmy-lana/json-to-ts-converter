import { useState, useEffect, useCallback } from "react";
import { jsonToTs, type ConvertOptions } from "../utils/converter";

const DEFAULT_JSON = `{
  "id": "project-09a8d7f",
  "name": "Cloud Infrastructure Dashboard",
  "active": true,
  "owner": {
    "userId": "usr-8821",
    "name": "Sarah Connor",
    "email": "sarah.connor@cyberdyne.io",
    "roles": ["Administrator", "BillingManager"]
  },
  "settings": {
    "notifications": {
      "email": true,
      "slack": false,
      "frequency": "realtime"
    },
    "backupSchedule": {
      "enabled": true,
      "retentionDays": 30,
      "preferredTime": "02:00 UTC"
    },
    "allowedIps": ["192.168.1.1", "10.0.0.1", null]
  },
  "metrics": {
    "cpuUsagePercent": 42.8,
    "memoryUsageBytes": 17179869184,
    "status": "healthy"
  },
  "deployments": [
    {
      "id": "dep_1",
      "version": "v2.1.0-rc3",
      "timestamp": "2026-06-28T02:11:00Z",
      "successful": true,
      "artifacts": {
        "buildSizeMb": 142.5,
        "hash": "sha256:d8a7f92e3a84b1d"
      }
    },
    {
      "id": "dep_2",
      "version": "v2.0.9",
      "timestamp": "2026-06-20T14:32:00Z",
      "successful": true,
      "artifacts": null
    }
  ],
  "tags": ["production", "aws", "critical"]
}`;

export function useConverter() {
  const [jsonInput, setJsonInput] = useState<string>(DEFAULT_JSON);
  const [tsOutput, setTsOutput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  
  const [options, setOptions] = useState<ConvertOptions>({
    rootName: "RootObject",
    useTypeAlias: false,
    makeOptional: false,
    exportPrefix: true,
    readOnlyProperties: false,
  });

const updateOption = <K extends keyof ConvertOptions>(key: K, value: ConvertOptions[K]) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  };

  const resetToDefault = () => {
    setJsonInput(DEFAULT_JSON);
    setOptions({
      rootName: "RootObject",
      useTypeAlias: false,
      makeOptional: false,
      exportPrefix: true,
      readOnlyProperties: false,
    });
    setError(null);
  };

  const handleConvert = useCallback(() => {
    if (!jsonInput.trim()) {
      setTsOutput("");
      setError(null);
      return;
    }
    try {
      const result = jsonToTs(jsonInput, options);
      setTsOutput(result);
      setError(null);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during parsing.");
    }
  }, [jsonInput, options]);

  useEffect(() => {
    handleConvert();
  }, [handleConvert]);

  const loadMockData = (type: "user" | "ecommerce" | "analytics") => {
    let mock = "";
    switch (type) {
      case "user":
        mock = DEFAULT_JSON;
        break;
      case "ecommerce":
        mock = `{
  "orderId": "ord_x9a8b1",
  "customer": {
    "email": "customer@example.com",
    "shippingAddress": {
      "city": "Seattle",
      "zip": "98101"
    }
  },
  "items": [
    { "productId": "p_01", "quantity": 2, "price": 49.99 }
  ],
  "discounts": null
}`;
        break;
      case "analytics":
        mock = `{
  "timestamp": "2026-06-28T01:57:00Z",
  "visits": 12840,
  "sources": ["search", "direct", "referral"],
  "meta": {
    "serverLoad": 0.45,
    "healthy": true
  }
}`;
        break;
    }
    setJsonInput(mock);
  };

  return {
    jsonInput,
    setJsonInput,
    tsOutput,
    error,
    options,
    updateOption,
    loadMockData,
    resetToDefault,
  };
}