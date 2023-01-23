import { Customisation } from './types';

export const defaultCustomisation: Customisation = {
  text: '',
  intro: '',
};

// Global values
export const TOTAL_VALUE = 243_000; // in millions
export const SQUARE_VALUE = 5; // in millions
export const NUM_COLUMNS = 20;
export const GRID_PADDING = 0.5;

// Value to dock at
export const DIVIDER_VALUE = 53_000; // in millions
// Length of docked section
export const DIVIDER_ROWS = 150;

export const COLOURS = {
  //
  // First part (blue)
  //
  // grid boxes
  bg: '#007BC7',
  // blocks deployed throughout
  blocks: '#004788',

  //
  // Second part (red)
  //
  // grid boxes
  bgRed: '#E52A00',
  // blocks deployed throughout
  blocksRed: '#990808',
};
