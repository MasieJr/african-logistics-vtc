import { ElementType } from "react";

type EventIconsProp = {
  icon: ElementType;
  label: string;
};

export default function EventIcons({ icon: Icon, label }: EventIconsProp) {
  return (
    <div className="flex flex-row items-center">
      <Icon className="w-5 h-5 text-logistics-orange" />
      <span className="ml-1">{label}</span>
    </div>
  );
}
