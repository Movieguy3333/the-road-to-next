"use client";

import * as React from "react";

import { format } from "date-fns";
import { LucideCalendar } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState, useImperativeHandle } from "react";

export type ImperativeHandleFromDatePicker = {
  reset: () => void;
} | null;

type DatePickerProps = {
  id: string;
  name: string;
  defaultValue?: string;
  imperativeHandleRef?: React.RefObject<ImperativeHandleFromDatePicker>;
};

export function DatePicker({
  id,
  name,
  defaultValue,
  imperativeHandleRef,
}: DatePickerProps) {
  const [date, setDate] = useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : new Date(),
  );

  const [open, setOpen] = useState(false);
  const formattedStringDate = date ? format(date, "yyyy-MM-dd") : "";

  function handleSelectDate(selectedDate: Date | undefined) {
    setDate(selectedDate);
    setOpen(false);
  }

  /* Note: date stays private state here, but we expose one function (reset) onto
   the parent's ref so it can reset us without owning our state directly.

   Also thi is what the useImperativeHandle hook does. 

   1st argument (imperativeHandleRef): the ref that was passed down from the parent — the "box" to fill.
2nd argument (() => ({...})): a function that returns whatever object you want exposed. React calls this function and assigns its return value to imperativeHandleRef.current.
   */
  useImperativeHandle(imperativeHandleRef, () => ({
    reset: () => setDate(new Date()),
  }));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {/* Note: this hidden input because ticket upsert action gets the form data from an actual input field, hence the nessesary hidden input. */}
      <input type="hidden" name={name} value={formattedStringDate} />
      <PopoverTrigger
        className="w-full"
        id={id}
        render={
          <Button
            variant="outline"
            data-empty={!date}
            className="justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
          />
        }
      >
        <LucideCalendar />
        {formattedStringDate}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={handleSelectDate} />
      </PopoverContent>
    </Popover>
  );
}
