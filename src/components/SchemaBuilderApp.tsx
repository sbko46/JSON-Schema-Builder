import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import SchemaBuilder from "./SchemaBuilder";
import JsonPreview from "./JsonPreview";
import type { SchemaData } from "../types/schema";

const SchemaBuilderApp: React.FC = () => {
  const methods = useForm<SchemaData>({
    defaultValues: {
      fields: [
        {
          id: "field_1",
          name: "",
          type: "",
        },
      ],
    },
  });

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-gray-50 ">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-2"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <SchemaBuilder />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <JsonPreview />
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default SchemaBuilderApp;
