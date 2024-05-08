export const TOOLTIP_ALIGN = {
  BOTTOM_CENTER: 'BOTTOM_CENTER',
  BOTTOM_LEFT: 'BOTTOM_LEFT',
  BOTTOM_RIGHT: 'BOTTOM_RIGHT',
  TOP_CENTER: 'TOP_CENTER',
  TOP_LEFT: 'TOP_LEFT',
  TOP_RIGHT: 'TOP_RIGHT',
} as const;

export const BODY_OFFSET = {
  SPACE_6_NEGATIVE: '-24px',
  SPACE_5_NEGATIVE: '-20px',
  SPACE_4_NEGATIVE: '-16px',
  SPACE_3_NEGATIVE: '-12px',
  SPACE_2_NEGATIVE: '-8px',
  SPACE_1_NEGATIVE: '-4px',
  NO_OFFSET: '0px',
  SPACE_1: '4px',
  SPACE_2: '8px',
  SPACE_3: '12px',
  SPACE_4: '16px',
  SPACE_5: '20px',
  SPACE_6: '24px',
} as const;

type TObjectValues<T> = T[keyof T];

export type TTooltipAlign = TObjectValues<typeof TOOLTIP_ALIGN>;
export type TBodyOffset = TObjectValues<typeof BODY_OFFSET>;
