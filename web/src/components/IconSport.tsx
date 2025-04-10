import { ElementType } from "react";

import {
  Basketball,
  IconProps,
  PersonSimpleThrow,
  Racquet,
  SoccerBall,
  Strategy,
  TennisBall,
} from "@phosphor-icons/react";

import { SportsType } from "../interfaces/Event.interface";

interface IconSportProps extends IconProps {
  type: SportsType;
  size?: number;
}

const iconMap: Record<SportsType, ElementType> = {
  soccer: SoccerBall,
  basketball: Basketball,
  volleyball: PersonSimpleThrow,
  tennis: TennisBall,
  table_tennis: Racquet,
  other: Strategy,
};

const sizeIconTypeEvent = 70;

export const IconSport = ({
  type,
  size = sizeIconTypeEvent,
  ...rest
}: IconSportProps) => {
  const IconComponent = iconMap[type];

  return <>{IconComponent ? <IconComponent {...rest} size={size} /> : null}</>;
};
