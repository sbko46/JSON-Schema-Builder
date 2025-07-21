import React from "react";
import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import type { SchemaData, SchemaField } from "../types/schema";

const JsonPreview: React.FC = () => {
  const { watch } = useFormContext<SchemaData>();
  const formData = watch();

  const generateJsonFromField = (field: SchemaField): any => {
    if (!field.name.trim()) return null;

    switch (field.type) {
      case "string":
      case "number":
      case "float":
      case "boolean":
      case "objectId":
        return field.type;

      case "array":
        return [`${field.type}_item`];

      case "nested":
        if (!field.children || field.children.length === 0) return {};
        const nestedObj: Record<string, any> = {};
        field.children.forEach((child) => {
          const childValue = generateJsonFromField(child);
          if (childValue !== null && child.name.trim()) {
            nestedObj[child.name] = childValue;
          }
        });
        return nestedObj;

      default:
        return null;
    }
  };

  const generateJson = (): Record<string, any> => {
    const result: Record<string, any> = {};
    if (formData.fields) {
      formData.fields.forEach((field) => {
        const value = generateJsonFromField(field);
        if (value !== null && field.name.trim()) {
          result[field.name] = value;
        }
      });
    }
    return result;
  };

  const jsonOutput = generateJson();

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">
          JSON Preview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-100 rounded-md p-4 font-mono text-sm overflow-auto max-h-96">
          <pre className="whitespace-pre-wrap text-gray-800">
            {JSON.stringify(jsonOutput, null, 2)}
          </pre>
        </div>
        <div className="mt-4 text-xs text-gray-500"></div>
      </CardContent>
    </Card>
  );
};

export default JsonPreview;
