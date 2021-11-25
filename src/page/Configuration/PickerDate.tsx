import {
  DatePicker,
  IDatePicker,
  defaultDatePickerStrings,
} from "@fluentui/react";
import { useCallback, useRef } from "react";
import { useConfiguration } from "../../context/FormConfig";

export const onFormatDate = (date?: Date): string => {
  return !date
    ? ""
    : date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
};

const PickerDate = () => {
  const { date, setDate } = useConfiguration();
  const datePickerRef = useRef<IDatePicker>(null);

  const onParseDateFromString = useCallback(
    (newValue: string): Date => {
      const previousValue = date || new Date();
      const newValueParts = (newValue || "").trim().split("/");
      const day =
        newValueParts.length > 0
          ? Math.max(1, Math.min(31, parseInt(newValueParts[0], 10)))
          : previousValue.getDate();
      const month =
        newValueParts.length > 1
          ? Math.max(1, Math.min(12, parseInt(newValueParts[1], 10))) - 1
          : previousValue.getMonth();
      let year =
        newValueParts.length > 2
          ? parseInt(newValueParts[2], 10)
          : previousValue.getFullYear();
      if (year < 100) {
        year +=
          previousValue.getFullYear() - (previousValue.getFullYear() % 100);
      }
      return new Date(year, month, day);
    },
    [date]
  );

  return (
    <DatePicker
      componentRef={datePickerRef}
      label="Fecha"
      formatDate={onFormatDate}
      allowTextInput
      value={date}
      parseDateFromString={onParseDateFromString}
      onSelectDate={setDate as (date?: Date | null) => void}
      strings={defaultDatePickerStrings}
    />
  );
};

export default PickerDate;
