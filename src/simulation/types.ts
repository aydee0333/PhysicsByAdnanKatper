// === Simulation Engine Type Definitions ===

export interface SimulationState {
  running: boolean;
  speed: number;
  elapsed: number;
  dt: number;
}

export interface SimulationConfig {
  width: number;
  height: number;
  dpr: number;
  reducedMotion: boolean;
}

export interface SimInputState {
  mouseX: number;
  mouseY: number;
  mouseDown: boolean;
  touchActive: boolean;
  dragging: boolean;
}

export interface SimulationInstance {
  init: (ctx: CanvasRenderingContext2D, config: SimulationConfig) => void;
  update: (state: SimulationState, input: SimInputState) => void;
  draw: (ctx: CanvasRenderingContext2D, config: SimulationConfig) => void;
  reset: () => void;
  destroy: () => void;
}

export type SimulationFactory = (
  ctx: CanvasRenderingContext2D,
  config: SimulationConfig
) => SimulationInstance;

export interface SliderConfig {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  unit?: string;
  color?: string;
}
