import { Customisation } from './types';

export const defaultCustomisation: Customisation = {
  text: '',
  intro: '',
};

// Global values
export const TOTAL_AREA = 243_000_000; // in thousands
export const SQUARE_VALUE = 5_000; // in thousands
export const NUM_COLUMNS = 15;
export const GRID_PADDING = 1;

// Dollar markers on the left-hand side
export const FIRST_MARKER_VALUE = 1_000; // in millions
export const ROWS_PER_MARKER = 20; // in millions

// Big black line to highlight waypoints on the way
export const FIRST_DIVIDER = 53_000; // in millions
export const FIRST_DIVIDER_ROWS = 120;

export const COLOURS = {
  // grid boxes
  bg: '#98bee3',
  // blocks deployed throughout
  primary: '#f9f9f9',
};
