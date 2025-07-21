import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Plus } from "lucide-react";
import SchemaFieldComponent from "./SchemaField";
import type { SchemaData, SchemaField } from "../types/schema";

const SchemaBuilder: React.FC = () => {
  const { control, handleSubmit } = useFormContext<SchemaData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "fields",
  });

  const addField = () => {
    const newField: SchemaField = {
      id: `field_${Date.now()}_${Math.random()}`,
      name: "",
      type: "",
    };
    append(newField);
  };

  const onSubmit = (data: SchemaData) => {
    console.log("Submitted Schema:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl mx-auto p-2"
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800">
            Schema Fields
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-1">
            {fields.map((field, index) => (
              <SchemaFieldComponent
                key={field.id}
                nestPath="fields"
                index={index}
                onRemove={() => remove(index)}
                canRemove={fields.length > 1}
              />
            ))}
            <Button
              type="button"
              onClick={addField}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Field
            </Button>
          </div>
        </CardContent>
      </Card>

      <Button
        type="submit"
        className="w-100px bg-gray-400 hover:bg-gray-700 text-white mt-4"
      >
        Submit
      </Button>
    </form>
  );
};

export default SchemaBuilder;
