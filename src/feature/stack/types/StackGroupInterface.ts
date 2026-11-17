export interface StackItemInterface {
  label: string;
  skills: string;
}

export interface StackGroupInterface {
  id: string;
  title: string;
  tone: "cyan" | "violet";
  items: StackItemInterface[];
}
