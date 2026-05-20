import type { ComponentType } from 'react';
import ProjectileMotion from '../simulations/ProjectileMotion';
import SHMSimulation from '../simulations/SHMSimulation';
import WaveSimulation from '../simulations/WaveSimulation';
import ForceSimulation from '../simulations/ForceSimulation';
import CircuitSimulation from '../simulations/CircuitSimulation';
import ReflectionSim from '../simulations/ReflectionSim';
import VectorSimulation from '../simulations/VectorSimulation';
import SoundSimulation from '../simulations/SoundSimulation';
import LensSimulation from '../simulations/LensSimulation';
import ElectricFieldSim from '../simulations/ElectricFieldSim';
import LogicGatesSim from '../simulations/LogicGatesSim';
import RadioactivitySim from '../simulations/RadioactivitySim';
import ChargeSimulation from '../simulations/ChargeSimulation';
import ElectromagnetSimulation from '../simulations/ElectromagnetSimulation';
import RubeGoldbergEnergySim from '../simulations/RubeGoldbergEnergySim';
import WorkEnergyTheoremSim from '../simulations/WorkEnergyTheoremSim';
import EnergyMatchingGame from '../simulations/EnergyMatchingGame';
import KECalculator from '../simulations/KECalculator';
import PESim from '../simulations/PESim';
import EnergyConversionChain from '../simulations/EnergyConversionChain';
import PendulumSim from '../simulations/PendulumSim';
import PowerComparison from '../simulations/PowerComparison';
import EfficiencyCalculator from '../simulations/EfficiencyCalculator';
import RollerCoasterSim from '../simulations/RollerCoasterSim';
import ElasticCollisionSim from '../simulations/ElasticCollisionSim';
import HeatTransferSim from '../simulations/HeatTransferSim';
import VirtualThermometer from '../simulations/VirtualThermometer';
import ThermalExpansionSim from '../simulations/ThermalExpansionSim';
import SpecificHeatSim from '../simulations/SpecificHeatSim';
import IceMeltingSim from '../simulations/IceMeltingSim';
import WaterCycleDiagram from '../simulations/WaterCycleDiagram';
import WetClothSim from '../simulations/WetClothSim';
import BoylesLawSim from '../simulations/BoylesLawSim';
import HeatingCurveSim from '../simulations/HeatingCurveSim';
import CharlesLawSim from '../simulations/CharlesLawSim';
import HookeGraphPlotter from '../simulations/HookeGraphPlotter';
import SpringSim5 from '../simulations/SpringSim5';
import PressureTester from '../simulations/PressureTester';
import StressStrainGraph from '../simulations/StressStrainGraph';
import DensityCalculator from '../simulations/DensityCalculator';
import BuoyancySim from '../simulations/BuoyancySim';
import AtmosphericPressureSim from '../simulations/AtmosphericPressureSim';
import HydraulicPressSim from '../simulations/HydraulicPressSim';
import EscapeVelocityCalc from '../simulations/EscapeVelocityCalc';
import GravForceCalc from '../simulations/GravForceCalc';
import PlanetWeightCalc from '../simulations/PlanetWeightCalc';
import EarthMassCalc from '../simulations/EarthMassCalc';
import GVariationGraph from '../simulations/GVariationGraph';
import SatelliteOrbitSim from '../simulations/SatelliteOrbitSim';
import SatelliteTypesInfo from '../simulations/SatelliteTypesInfo';
import WeightlessnessSim from '../simulations/WeightlessnessSim';
import GravitationalFieldLinesSim from '../simulations/GravitationalFieldLinesSim';
import OrbitShapeVisualizer from '../simulations/OrbitShapeVisualizer';
import GVsDepthGraph from '../simulations/GVsDepthGraph';
import StreamlineFlowSim from '../simulations/StreamlineFlowSim';
import ParticleAnimation from '../simulations/ParticleAnimation';
import SpringSim7 from '../simulations/SpringSim7';
import LiquidPressureSim from '../simulations/LiquidPressureSim';
import PascalLawSim from '../simulations/PascalLawSim';
import SurfaceTensionSim from '../simulations/SurfaceTensionSim';
import ViscositySim from '../simulations/ViscositySim';
import HookeLawExp from '../simulations/HookeLawExp';
import BernoulliSim from '../simulations/BernoulliSim';
import ThreeDProjectileSim from '../simulations/ThreeDProjectileSim';
import PhysicsSandbox from '../simulations/PhysicsSandbox';
import CircuitBuilderSim from '../simulations/CircuitBuilderSim';
import WaveInterferenceSim from '../simulations/WaveInterferenceSim';
import OpticsRayTracer from '../simulations/OpticsRayTracer';
import CenterOfMassFinder from '../simulations/CenterOfMassFinder';
import EquilibriumPuzzle from '../simulations/EquilibriumPuzzle';
import MomentArmSim from '../simulations/MomentArmSim';
import PrincipleOfMomentsSim from '../simulations/PrincipleOfMomentsSim';
import SeeSawSim from '../simulations/SeeSawSim';
import ForceCombineSim from '../simulations/ForceCombineSim';
import BlockStabilitySim from '../simulations/BlockStabilitySim';
import BalancedBeamSim from '../simulations/BalancedBeamSim';
import MotionTypesAnimation from '../simulations/MotionTypesAnimation';
import DistanceDisplacementExplainer from '../simulations/DistanceDisplacementExplainer';
import SpeedVelocityComparison from '../simulations/SpeedVelocityComparison';
import UniformMotionExplainer from '../simulations/UniformMotionExplainer';
import VectorRepresentation from '../simulations/VectorRepresentation';
import DistanceTimeGraph from '../simulations/DistanceTimeGraph';
import VelocityTimeGraphAnalyzer from '../simulations/VelocityTimeGraphAnalyzer';
import EquationsOfMotionCalc from '../simulations/EquationsOfMotionCalc';
import RelativeMotionSim from '../simulations/RelativeMotionSim';
import TickerTapeSimulation from '../simulations/TickerTapeSimulation';
import PushPullSim from '../simulations/PushPullSim';
import CoinCardExperiment from '../simulations/CoinCardExperiment';
import FmaCalculator from '../simulations/FmaCalculator';
import ActionReactionGame from '../simulations/ActionReactionGame';
import WeightCalculator from '../simulations/WeightCalculator';
import CollisionSim from '../simulations/CollisionSim';
import FrictionSlopeSim from '../simulations/FrictionSlopeSim';
import CircularMotionSim from '../simulations/CircularMotionSim';
import InertiaRaceSim from '../simulations/InertiaRaceSim';
import ImpulseMomentumSim from '../simulations/ImpulseMomentumSim';
import FreeBodyDiagramSim from '../simulations/FreeBodyDiagramSim';
import StaticSlidingFrictionSim from '../simulations/StaticSlidingFrictionSim';
import MatchingGame from '../simulations/MatchingGame';
import TransverseLongitudinalSim from '../simulations/TransverseLongitudinalSim';
import WaveBehaviorsSim from '../simulations/WaveBehaviorsSim';
import WaveInRopeSim from '../simulations/WaveInRopeSim';

// Registry of interactive components that can be referenced from content files.
export const INTERACTIVE_COMPONENTS: Record<string, ComponentType<Record<string, unknown>>> = {
  ProjectileMotion,
  SHMSimulation,
  WaveSimulation,
  ForceSimulation,
  CircuitSimulation,
  ReflectionSim,
  VectorSimulation,
  SoundSimulation,
  LensSimulation,
  ElectricFieldSim,
  LogicGatesSim,
  RadioactivitySim,
  ChargeSimulation,
  ElectromagnetSimulation,
  RubeGoldbergEnergySim,
  WorkEnergyTheoremSim,
  EnergyMatchingGame,
  KECalculator,
  PESim,
  EnergyConversionChain,
  PendulumSim,
  PowerComparison,
  EfficiencyCalculator,
  RollerCoasterSim,
  ElasticCollisionSim,
  HeatTransferSim,
  VirtualThermometer,
  ThermalExpansionSim,
  SpecificHeatSim,
  IceMeltingSim,
  WaterCycleDiagram,
  WetClothSim,
  BoylesLawSim,
  HeatingCurveSim,
  CharlesLawSim,
  HookeGraphPlotter,
  SpringSim5,
  PressureTester,
  StressStrainGraph,
  DensityCalculator,
  BuoyancySim,
  AtmosphericPressureSim,
  HydraulicPressSim,
  EscapeVelocityCalc,
  GravForceCalc,
  PlanetWeightCalc,
  EarthMassCalc,
  GVariationGraph,
  SatelliteOrbitSim,
  SatelliteTypesInfo,
  WeightlessnessSim,
  GravitationalFieldLinesSim,
  OrbitShapeVisualizer,
  GVsDepthGraph,
  StreamlineFlowSim,
  ParticleAnimation,
  SpringSim7,
  LiquidPressureSim,
  PascalLawSim,
  SurfaceTensionSim,
  ViscositySim,
  HookeLawExp,
  BernoulliSim,
  ThreeDProjectileSim,
  PhysicsSandbox,
  CircuitBuilderSim,
  WaveInterferenceSim,
  OpticsRayTracer,
  CenterOfMassFinder,
  EquilibriumPuzzle,
  MomentArmSim,
  PrincipleOfMomentsSim,
  SeeSawSim,
  ForceCombineSim,
  BlockStabilitySim,
  BalancedBeamSim,
  MotionTypesAnimation,
  DistanceDisplacementExplainer,
  SpeedVelocityComparison,
  UniformMotionExplainer,
  VectorRepresentation,
  DistanceTimeGraph,
  VelocityTimeGraphAnalyzer,
  EquationsOfMotionCalc,
  RelativeMotionSim,
  TickerTapeSimulation,
  PushPullSim,
  CoinCardExperiment,
  FmaCalculator,
  ActionReactionGame,
  WeightCalculator,
  CollisionSim,
  FrictionSlopeSim,
  CircularMotionSim,
  InertiaRaceSim,
  ImpulseMomentumSim,
  FreeBodyDiagramSim,
  StaticSlidingFrictionSim,
  MatchingGame,
  TransverseLongitudinalSim,
  WaveBehaviorsSim,
  WaveInRopeSim,
};
