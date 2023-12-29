export type CheckBoxContainerValues = {
  [key: string]: boolean;
};

export interface CheckboxContainerProps {
  values: CheckBoxContainerValues;
  title: string;
  setChange: (value: CheckBoxContainerValues) => void;
}
