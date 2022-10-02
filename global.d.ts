type StringNumber = string | number | null;
type StringValue = string | null;
type NumberValue = number | null;
type BooleanValue = boolean | null;
type DateValue = Date | null | string | number | any;

interface ITAlert {
  msg?: string;
  type?: string;
  show?: BooleanValue;
}

interface ITAppDateState {
  loading: BooleanValue;
  alert?: ITAlert | null;
}
