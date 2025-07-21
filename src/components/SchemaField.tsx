import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Plus } from "lucide-react";
import type { FieldType } from "../types/schema";

interface SchemaFieldProps {
  nestPath: string;
  index: number;
  onRemove: () => void;
  canRemove: boolean;
  depth?: number;
}

const SchemaFieldComponent: React.FC<SchemaFieldProps> = ({
  nestPath,
  index,
  depth = 0,
}) => {
  const { register, watch, setValue } = useFormContext();
  const fieldPath = `${nestPath}.${index}`;
  const fieldType = watch(`${fieldPath}.type`) as FieldType;

  const {
    fields: nestedFields,
    append: appendNested,
    remove: removeNested,
  } = useFieldArray({
    name: `${fieldPath}.children`,
  });

  const handleTypeChange = (newType: FieldType) => {
    setValue(`${fieldPath}.type`, newType);
    if (newType === "nested") {
      setValue(`${fieldPath}.children`, []);
    } else {
      setValue(`${fieldPath}.children`, undefined);
    }
  };

  return (
    <div className={`space-y-2 ml-[${depth * 1}rem]`}>
      <div className="flex items-center gap-2">
        <Input
          {...register(`${fieldPath}.name`)}
          placeholder="Field name"
          className="flex-1 h-9"
        />

        <Select value={fieldType || ""} onValueChange={handleTypeChange}>
          <SelectTrigger className="w-36 h-9">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="string">String</SelectItem>
            <SelectItem value="number">Number</SelectItem>
            <SelectItem value="float">Float</SelectItem>
            <SelectItem value="boolean">Boolean</SelectItem>
            <SelectItem value="objectId">ObjectId</SelectItem>
            <SelectItem value="array">Array</SelectItem>
            <SelectItem value="nested">Nested</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {fieldType === "nested" && (
        <div className="ml-4 mt-1 space-y-2 border-l border-gray-200 pl-4">
          {nestedFields.map((field, nestedIndex) => (
            <SchemaFieldComponent
              key={field.id}
              nestPath={`${fieldPath}.children`}
              index={nestedIndex}
              onRemove={() => removeNested(nestedIndex)}
              canRemove={nestedFields.length > 1}
              depth={depth + 1}
            />
          ))}

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              appendNested({
                id: `field_${Date.now()}_${Math.random()}`,
                name: "",
                type: "",
              })
            }
            className="w-full bg-blue-600 hover:bg-blue-700 mt-2 text-white"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Nested Field
          </Button>
        </div>
      )}
    </div>
  );
};

export default SchemaFieldComponent;
