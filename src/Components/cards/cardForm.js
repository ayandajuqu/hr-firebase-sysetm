
import React from 'react';
import { Card, Button, Label, TextInput, Checkbox } from 'flowbite-react';

const CardForm = ({ title, formFields, onSubmit, error }) => {
  return (
    <Card className="max-w-sm">
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        {formFields.map((field, index) => (
          <div key={index}>
            <div className="mb-2 block">
              <Label htmlFor={field.id} value={field.label} />
            </div>
            <TextInput
              id={field.id}
              type={field.type}
              placeholder={field.placeholder}
              value={field.value}
              onChange={field.onChange}
              required={field.required}
            />
          </div>
        ))}
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex items-center gap-2">
          {formFields.some(field => field.type === 'checkbox') && (
            <Checkbox id="remember" />
          )}
         
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Card>
  );
};

export default CardForm;
