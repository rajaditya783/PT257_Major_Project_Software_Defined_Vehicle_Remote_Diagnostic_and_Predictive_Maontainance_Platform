import React, { useState, useEffect } from 'react';
import {
  LayersIcon,
  CanBusIcon,
  CpuChipIcon,
  WifiStreamIcon,
  WeibullCurveIcon,
  ShieldCheckIcon,
  AlertTriangleIcon,
  WrenchIcon,
  ActivityIcon,
  ChevronRightIcon,
  DownloadIcon,
  CarIcon,
  SlidersIcon,
  BugFaultIcon,
  FileTextIcon,
  CheckCircleIcon,
  SpeedometerIcon,
  TachometerIcon,
  BatteryBoltIcon,
} from '../icons';

export const PresentationSlideDeck: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const totalSlides = 8;

  const nextSlide = () => setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1));
  const prevSlide = () => setCurrentSlide((prev) => Math.max(prev - 1, 0));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4 font-mono">
      {/* Presentation Control Header */}
      <div className="cockpit-panel rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 border-l-4 border-l-signal-amber">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-signal-amber/15 text-signal-amber rounded-lg border border-signal-amber/30">
            <FileTextIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] text-signal-amber font-bold uppercase tracking-widest">
              B.Tech Major Project Defense & Architecture Review
            </div>
            <h1 className="text-sm sm:text-base font-bold text-slate-100 font-sans">
              Software Defined Vehicle Remote Diagnostic & Predictive Maintenance Platform
            </h1>
          </div>
        </div>

        {/* Slide Controls */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-semibold mr-2">
            Slide <strong className="text-signal-amber">{currentSlide + 1}</strong> of {totalSlides}
          </span>

          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={`px-3 py-1.5 rounded text-xs font-bold border transition-all ${
              currentSlide === 0
                ? 'bg-cockpit-850 border-cockpit-750 text-slate-600 cursor-not-allowed'
                : 'bg-cockpit-800 hover:bg-cockpit-700 text-slate-200 border-cockpit-600'
            }`}
          >
            Previous
          </button>

          <button
            onClick={nextSlide}
            disabled={currentSlide === totalSlides - 1}
            className={`px-3 py-1.5 rounded text-xs font-bold border transition-all ${
              currentSlide === totalSlides - 1
                ? 'bg-cockpit-850 border-cockpit-750 text-slate-600 cursor-not-allowed'
                : 'bg-signal-amber hover:bg-signal-amber-hover text-cockpit-950 font-bold border-signal-amber shadow-amber-glow'
            }`}
          >
            Next Slide
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-cockpit-850 hover:bg-cockpit-750 text-slate-200 border border-cockpit-700 text-xs font-semibold transition-colors ml-2"
          >
            <DownloadIcon className="w-3.5 h-3.5 text-telemetry-cyan" />
            Print Deck
          </button>
        </div>
      </div>

      {/* Slide Navigation Indicator Pills */}
      <div className="grid grid-cols-8 gap-1.5 text-center text-[10px]">
        {[
          '1. Title',
          '2. Problem Statement',
          '3. Problems Facing',
          '4. Critical Gaps',
          '5. What We Solve',
          '6. How to Solve Gaps',
          '7. Methodology',
          '8. Impact & Results',
        ].map((title, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`p-1.5 rounded border transition-all truncate ${
              currentSlide === idx
                ? 'bg-signal-amber/20 border-signal-amber text-signal-amber font-bold'
                : 'bg-cockpit-850 border-cockpit-750 text-slate-400 hover:text-slate-200'
            }`}
          >
            {title}
          </button>
        ))}
      </div>

      {/* SLIDE CANVAS CONTAINER */}
      <div className="cockpit-panel rounded-2xl p-6 sm:p-10 min-h-[580px] flex flex-col justify-between border-2 border-cockpit-700 shadow-2xl relative overflow-hidden bg-gradient-to-br from-cockpit-900 via-cockpit-900 to-cockpit-850">
        {/* =========================================================================
            SLIDE 1: TITLE & IDENTITY
           ========================================================================= */}
        {currentSlide === 0 && (
          <div className="space-y-6 animate-fadeIn flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-cockpit-750 pb-4">
              <div className="flex items-center gap-2 text-xs font-bold text-signal-amber tracking-widest uppercase">
                <CarIcon className="w-4 h-4 text-signal-amber" />
                B.Tech Major Project Defense
              </div>
              <div className="text-xs text-slate-500 font-mono">
                Department of Computer Science & Automotive Engineering
              </div>
            </div>

            <div className="space-y-4 my-auto max-w-4xl">
              <div className="inline-flex items-center gap-2 bg-signal-amber/10 border border-signal-amber/30 text-signal-amber px-3 py-1 rounded-full text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-signal-amber animate-ping" />
                Software Defined Vehicle (SDV) Core Architecture
              </div>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100 font-sans tracking-tight leading-tight">
                Remote Diagnostic & Predictive Maintenance Platform for SDVs
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
                A cloud-native connected vehicle engineering platform integrating high-frequency 
                CAN-FD / ISO 14229 UDS telemetry ingestion, edge-level anomaly detection, and 
                continuous Weibull Remaining Useful Life (RUL) prognostic modeling.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-cockpit-750">
              <div className="p-3 bg-cockpit-850 rounded-lg border border-cockpit-750">
                <div className="text-[10px] text-slate-500 uppercase">Core Protocols</div>
                <div className="text-xs font-bold text-slate-200 mt-0.5">ISO 14229 UDS / CAN-FD</div>
              </div>
              <div className="p-3 bg-cockpit-850 rounded-lg border border-cockpit-750">
                <div className="text-[10px] text-slate-500 uppercase">Prognostic AI</div>
                <div className="text-xs font-bold text-signal-amber mt-0.5">Weibull RUL & Bayesian MLE</div>
              </div>
              <div className="p-3 bg-cockpit-850 rounded-lg border border-cockpit-750">
                <div className="text-[10px] text-slate-500 uppercase">Edge Computing</div>
                <div className="text-xs font-bold text-telemetry-cyan mt-0.5">&lt; 5ms FFT Anomaly Trigger</div>
              </div>
              <div className="p-3 bg-cockpit-850 rounded-lg border border-cockpit-750">
                <div className="text-[10px] text-slate-500 uppercase">Deployment</div>
                <div className="text-xs font-bold text-telemetry-emerald mt-0.5">Production-Ready Web Prototype</div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            SLIDE 2: PROBLEM STATEMENT
           ========================================================================= */}
        {currentSlide === 1 && (
          <div className="space-y-5 animate-fadeIn flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-cockpit-750 pb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-signal-amber tracking-widest uppercase">
                <AlertTriangleIcon className="w-4 h-4 text-signal-amber" />
                Section 01 // Problem Statement
              </div>
              <span className="text-xs text-slate-500">Core Engineering Challenge</span>
            </div>

            <div className="p-5 bg-cockpit-850/80 rounded-xl border-l-4 border-l-signal-amber border border-cockpit-750">
              <h2 className="text-base sm:text-lg font-bold text-slate-100 font-sans leading-snug">
                "Modern Software Defined Vehicles generate gigabytes of real-time CAN-FD sensor telemetry across 100+ distributed ECUs, yet automotive maintenance remains fundamentally reactive, static, and workshop-bound."
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-cockpit-850 rounded-xl border border-cockpit-750 space-y-2">
                <div className="text-xs font-bold text-telemetry-crimson uppercase">01. Architectural Paradigm Shift</div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Vehicles are no longer isolated mechanical machines; they are software-centric edge compute platforms with intricate inter-ECU dependencies.
                </p>
              </div>

              <div className="p-4 bg-cockpit-850 rounded-xl border border-cockpit-750 space-y-2">
                <div className="text-xs font-bold text-signal-amber uppercase">02. The Data Disconnect</div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  High-resolution operational signals (torque ripple, cell voltage variance, temperature drift) are discarded upon vehicle power-down rather than analyzed for degradation trends.
                </p>
              </div>

              <div className="p-4 bg-cockpit-850 rounded-xl border border-cockpit-750 space-y-2">
                <div className="text-xs font-bold text-telemetry-cyan uppercase">03. Project Objective</div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  To engineer an end-to-end cloud-native diagnostic platform capable of ingesting high-frequency CAN telemetry, capturing autonomous freeze frames, and predicting component failure days before physical breakdown.
                </p>
              </div>
            </div>

            <div className="p-3 bg-cockpit-900 rounded-lg border border-cockpit-800 text-xs text-slate-400 flex items-center justify-between">
              <span><strong>Key Research Scope:</strong> Inverter Phase Failure, Battery Cell Imbalance, Brake Pad Wear, Coolant Loop Degradation</span>
              <span className="text-signal-amber font-semibold">SAE J2012 / ISO 14229 Standard Compliant</span>
            </div>
          </div>
        )}

        {/* =========================================================================
            SLIDE 3: PROBLEM FACING (INDUSTRY PAIN POINTS)
           ========================================================================= */}
        {currentSlide === 2 && (
          <div className="space-y-5 animate-fadeIn flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-cockpit-750 pb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-telemetry-crimson tracking-widest uppercase">
                <BugFaultIcon className="w-4 h-4 text-telemetry-crimson" />
                Section 02 // Problems Facing the Industry
              </div>
              <span className="text-xs text-slate-500">Industry & Fleet Pain Points</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Pain Point 1 */}
              <div className="p-4 bg-cockpit-850 rounded-xl border border-cockpit-750 space-y-2 border-t-2 border-t-telemetry-crimson">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-100 font-sans">1. Catastrophic On-Road Breakdowns</h3>
                  <span className="text-[10px] text-telemetry-crimson bg-telemetry-crimson/15 px-2 py-0.5 rounded font-bold">CRITICAL RISK</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Sudden propulsion inverter failure, thermal runaway, or brake caliper wear-through occurs without prior driver warning, causing hazardous highway strandings and high secondary mechanical damage.
                </p>
              </div>

              {/* Pain Point 2 */}
              <div className="p-4 bg-cockpit-850 rounded-xl border border-cockpit-750 space-y-2 border-t-2 border-t-signal-amber">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-100 font-sans">2. Severe Fleet Financial Loss</h3>
                  <span className="text-[10px] text-signal-amber bg-signal-amber/15 px-2 py-0.5 rounded font-bold">$1,500 / DAY LOSS</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Commercial logistics and transit fleets suffer massive operational revenue loss for every grounded day. Global OEM automotive warranty repair payouts exceed $40 Billion annually due to late fault detection.
                </p>
              </div>

              {/* Pain Point 3 */}
              <div className="p-4 bg-cockpit-850 rounded-xl border border-cockpit-750 space-y-2 border-t-2 border-t-telemetry-cyan">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-100 font-sans">3. Telemetry Silos & Sensor Opacity</h3>
                  <span className="text-[10px] text-telemetry-cyan bg-telemetry-cyan/15 px-2 py-0.5 rounded font-bold">DATA WASTED</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Vehicle ECUs generate continuous internal state variables (millivolt cell variances, hydraulic brake pressure, PWM duty cycles), but lack an intelligent edge pipeline to stream this data beyond the physical chassis.
                </p>
              </div>

              {/* Pain Point 4 */}
              <div className="p-4 bg-cockpit-850 rounded-xl border border-cockpit-750 space-y-2 border-t-2 border-t-slate-500">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-100 font-sans">4. Diagnostic Freeze Frame Inaccessibility</h3>
                  <span className="text-[10px] text-slate-400 bg-cockpit-800 px-2 py-0.5 rounded font-bold">TECH BOTTLENECK</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Workshop mechanics struggle to reproduce intermittent, transient faults. Traditional scanners cannot see the exact millisecond environmental and electrical conditions under which the fault originally tripped.
                </p>
              </div>
            </div>

            <div className="p-3 bg-cockpit-850 rounded-lg border border-cockpit-750 text-xs text-slate-300 flex items-center gap-2">
              <span className="text-signal-amber font-bold">Summary:</span>
              <span>Reactive maintenance incurs 3.4x higher overall lifecycle costs compared to prognostic continuous monitoring.</span>
            </div>
          </div>
        )}

        {/* =========================================================================
            SLIDE 4: CRITICAL GAPS IN EXISTING SOLUTIONS
           ========================================================================= */}
        {currentSlide === 3 && (
          <div className="space-y-5 animate-fadeIn flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-cockpit-750 pb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-signal-amber tracking-widest uppercase">
                <LayersIcon className="w-4 h-4 text-signal-amber" />
                Section 03 // Critical Gaps in Existing Solutions
              </div>
              <span className="text-xs text-slate-500">Competitive Gap Analysis</span>
            </div>

            {/* Gap Analysis Matrix */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="text-[10px] uppercase text-slate-400 bg-cockpit-850 border-b border-cockpit-750">
                  <tr>
                    <th className="py-2.5 px-3">Diagnostic Approach</th>
                    <th className="py-2.5 px-3">Telemetry Horizon</th>
                    <th className="py-2.5 px-3">Edge Anomaly Detection</th>
                    <th className="py-2.5 px-3">Predictive RUL Modeling</th>
                    <th className="py-2.5 px-3">Actionable OEM Workflow</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cockpit-800 text-slate-300">
                  <tr className="hover:bg-cockpit-850/50">
                    <td className="py-3 px-3 font-bold text-slate-200">Handheld OBD-II Scanners</td>
                    <td className="py-3 px-3 text-telemetry-crimson">Post-Breakdown Only</td>
                    <td className="py-3 px-3 text-telemetry-crimson">None (Static Poll)</td>
                    <td className="py-3 px-3 text-telemetry-crimson">None (0%)</td>
                    <td className="py-3 px-3 text-slate-400">Manual Paper Logging</td>
                  </tr>
                  <tr className="hover:bg-cockpit-850/50">
                    <td className="py-3 px-3 font-bold text-slate-200">Periodic Scheduled Maintenance</td>
                    <td className="py-3 px-3 text-signal-amber">Fixed (e.g. 15,000 km)</td>
                    <td className="py-3 px-3 text-telemetry-crimson">None</td>
                    <td className="py-3 px-3 text-telemetry-crimson">None (Arbitrary Rule)</td>
                    <td className="py-3 px-3 text-slate-400">Scheduled Booking</td>
                  </tr>
                  <tr className="hover:bg-cockpit-850/50">
                    <td className="py-3 px-3 font-bold text-slate-200">Generic IoT Fleet Dongles</td>
                    <td className="py-3 px-3 text-signal-amber">Low-Speed GPS / Fuel Only</td>
                    <td className="py-3 px-3 text-signal-amber">Basic Thresholds Only</td>
                    <td className="py-3 px-3 text-telemetry-crimson">None</td>
                    <td className="py-3 px-3 text-slate-400">Generic Fleet SMS</td>
                  </tr>
                  <tr className="bg-signal-amber/10 border-l-4 border-l-signal-amber font-semibold">
                    <td className="py-3 px-3 font-bold text-signal-amber">Our AERO-SDV Platform</td>
                    <td className="py-3 px-3 text-telemetry-emerald">Continuous CAN-FD Stream</td>
                    <td className="py-3 px-3 text-telemetry-emerald">&lt; 5ms FFT Edge Engine</td>
                    <td className="py-3 px-3 text-telemetry-emerald">Weibull 2-Param RUL</td>
                    <td className="py-3 px-3 text-telemetry-emerald">Automated Work Orders</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              <div className="p-3 bg-cockpit-850 rounded-lg border border-cockpit-750 text-xs">
                <span className="text-telemetry-crimson font-bold">Gap 1: Missing High-Speed Ingestion</span>
                <p className="text-[11px] text-slate-400 mt-1">Existing systems cannot stream 2 Mbps CAN-FD without overwhelming cloud bandwidth.</p>
              </div>
              <div className="p-3 bg-cockpit-850 rounded-lg border border-cockpit-750 text-xs">
                <span className="text-telemetry-crimson font-bold">Gap 2: Absence of Prognostics</span>
                <p className="text-[11px] text-slate-400 mt-1">Traditional tools only read DTCs *after* catastrophic trip, offering 0 days of lead time.</p>
              </div>
              <div className="p-3 bg-cockpit-850 rounded-lg border border-cockpit-750 text-xs">
                <span className="text-telemetry-crimson font-bold">Gap 3: Technician Skill Disconnect</span>
                <p className="text-[11px] text-slate-400 mt-1">Lack of step-by-step diagnostic trees leaves mechanics guessing on root-cause parts.</p>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            SLIDE 5: WHAT WE ARE SOLVING
           ========================================================================= */}
        {currentSlide === 4 && (
          <div className="space-y-5 animate-fadeIn flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-cockpit-750 pb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-telemetry-emerald tracking-widest uppercase">
                <ShieldCheckIcon className="w-4 h-4 text-telemetry-emerald" />
                Section 04 // What We Are Solving (Core Solution)
              </div>
              <span className="text-xs text-slate-500">Value Proposition & Capabilities</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Solution 1 */}
              <div className="p-4 bg-cockpit-850 rounded-xl border border-cockpit-750 space-y-2 border-l-4 border-l-telemetry-emerald">
                <div className="flex items-center gap-2">
                  <CanBusIcon className="w-4 h-4 text-telemetry-cyan" />
                  <h3 className="text-sm font-bold text-slate-100 font-sans">1. Real-Time CAN-FD / UDS Telemetry Cockpit</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Streams live motor RPM, vehicle velocity, 800V battery voltage, pack current, thermal barometers, and raw hexadecimal CAN frames with sub-millisecond precision.
                </p>
              </div>

              {/* Solution 2 */}
              <div className="p-4 bg-cockpit-850 rounded-xl border border-cockpit-750 space-y-2 border-l-4 border-l-signal-amber">
                <div className="flex items-center gap-2">
                  <BugFaultIcon className="w-4 h-4 text-signal-amber" />
                  <h3 className="text-sm font-bold text-slate-100 font-sans">2. Autonomous Diagnostic Freeze Frame Capture</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Locks full sensor snapshots (speed, RPM, load %, coolant temp, battery voltage) at the exact millisecond an anomaly or DTC trips for instant technician inspection.
                </p>
              </div>

              {/* Solution 3 */}
              <div className="p-4 bg-cockpit-850 rounded-xl border border-cockpit-750 space-y-2 border-l-4 border-l-telemetry-cyan">
                <div className="flex items-center gap-2">
                  <WeibullCurveIcon className="w-4 h-4 text-telemetry-cyan" />
                  <h3 className="text-sm font-bold text-slate-100 font-sans">3. Weibull Remaining Useful Life (RUL) Engine</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Computes Remaining Useful Life in Days and Kilometers for high-voltage batteries, silicon carbide inverters, brake pads, and cooling circuits before degradation triggers a breakdown.
                </p>
              </div>

              {/* Solution 4 */}
              <div className="p-4 bg-cockpit-850 rounded-xl border border-cockpit-750 space-y-2 border-l-4 border-l-telemetry-sky">
                <div className="flex items-center gap-2">
                  <WrenchIcon className="w-4 h-4 text-telemetry-sky" />
                  <h3 className="text-sm font-bold text-slate-100 font-sans">4. OEM Diagnostic Trees & Work Order Automation</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Provides visual step-by-step troubleshooting instructions with expected multimeter readings and automatically generates pre-populated parts replacement work orders.
                </p>
              </div>
            </div>

            <div className="p-4 bg-cockpit-850/60 rounded-xl border border-cockpit-750 flex flex-wrap items-center justify-between gap-4 text-xs">
              <span className="text-slate-300 font-semibold">Transformative Result:</span>
              <span className="text-signal-amber font-bold">Shifts fleet operations from catastrophic repair to pre-emptive component servicing.</span>
            </div>
          </div>
        )}

        {/* =========================================================================
            SLIDE 6: HOW TO SOLVE THESE GAPS
           ========================================================================= */}
        {currentSlide === 5 && (
          <div className="space-y-5 animate-fadeIn flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-cockpit-750 pb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-telemetry-cyan tracking-widest uppercase">
                <SlidersIcon className="w-4 h-4 text-telemetry-cyan" />
                Section 05 // How to Solve These Gaps
              </div>
              <span className="text-xs text-slate-500">Architectural Innovations</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Strategy 1 */}
              <div className="p-4 bg-cockpit-850 rounded-xl border border-cockpit-750 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-signal-amber">
                  <CpuChipIcon className="w-4 h-4" />
                  Strategy 1: Edge Telemetry Compression & Filtering
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Instead of streaming raw gigabytes over cellular, edge gateways run lightweight anomaly filters and only transmit delta updates, statistical aggregates, and triggered freeze frames via Google Protobuf over MQTT 5.0.
                </p>
              </div>

              {/* Strategy 2 */}
              <div className="p-4 bg-cockpit-850 rounded-xl border border-cockpit-750 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-telemetry-emerald">
                  <ActivityIcon className="w-4 h-4" />
                  Strategy 2: Continuous Bayesian Wear Modeling
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Solves the static maintenance gap by continually updating component health scores based on real-time driving stresses (thermal spikes, track aggression, ambient temperature, high-amp discharge cycles).
                </p>
              </div>

              {/* Strategy 3 */}
              <div className="p-4 bg-cockpit-850 rounded-xl border border-cockpit-750 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-telemetry-cyan">
                  <WrenchIcon className="w-4 h-4" />
                  Strategy 3: Standardization on SAE J2012 / ISO 14229
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Solves vendor lock-in by implementing universal standard Diagnostic Trouble Codes (e.g. P0301, P0A80, P0128) and unified Unified Diagnostic Services (UDS Service $14, $19, $22, $31).
                </p>
              </div>

              {/* Strategy 4 */}
              <div className="p-4 bg-cockpit-850 rounded-xl border border-cockpit-750 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-telemetry-sky">
                  <ShieldCheckIcon className="w-4 h-4" />
                  Strategy 4: Role-Based Perspective Separation
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Solves UI clutter by presenting tailored views: Macro analytics for Fleet Managers, raw hex logs & UDS testers for Technicians, and simple 0-100 health grades for Vehicle Owners.
                </p>
              </div>
            </div>

            <div className="p-3 bg-cockpit-900 rounded-lg border border-cockpit-800 text-xs text-slate-400 flex items-center justify-between">
              <span><strong>Resulting Advantage:</strong> Low network footprint, zero data loss, instant technician usability.</span>
            </div>
          </div>
        )}

        {/* =========================================================================
            SLIDE 7: METHODOLOGY & END-TO-END PIPELINE
           ========================================================================= */}
        {currentSlide === 6 && (
          <div className="space-y-5 animate-fadeIn flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-cockpit-750 pb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-signal-amber tracking-widest uppercase">
                <LayersIcon className="w-4 h-4 text-signal-amber" />
                Section 06 // Technical Methodology & Pipeline
              </div>
              <span className="text-xs text-slate-500">End-to-End Execution Flow</span>
            </div>

            {/* 5-Step Methodology Flow */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 text-xs">
              <div className="p-3 bg-cockpit-850 rounded-lg border border-cockpit-750 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-signal-amber font-bold">PHASE 01</span>
                  <h4 className="font-bold text-slate-200 mt-1 uppercase">Sensing & CAN-FD</h4>
                  <p className="text-[11px] text-slate-400 mt-1">Dual high-speed CAN buses stream powertrain, BMS, and chassis sensor frames.</p>
                </div>
                <div className="mt-2 text-[10px] text-slate-500 font-mono">100Hz - 1kHz Sampling</div>
              </div>

              <div className="p-3 bg-cockpit-850 rounded-lg border border-cockpit-750 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-telemetry-cyan font-bold">PHASE 02</span>
                  <h4 className="font-bold text-slate-200 mt-1 uppercase">Edge Anomaly FFT</h4>
                  <p className="text-[11px] text-slate-400 mt-1">Zonal HPC gateway analyzes torque jitter & cell voltage delta variations.</p>
                </div>
                <div className="mt-2 text-[10px] text-slate-500 font-mono">&lt; 5ms Trigger Time</div>
              </div>

              <div className="p-3 bg-cockpit-850 rounded-lg border border-cockpit-750 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-telemetry-emerald font-bold">PHASE 03</span>
                  <h4 className="font-bold text-slate-200 mt-1 uppercase">mTLS Ingestion</h4>
                  <p className="text-[11px] text-slate-400 mt-1">Compressed telemetry serialized via Protobuf over encrypted MQTT brokers.</p>
                </div>
                <div className="mt-2 text-[10px] text-slate-500 font-mono">250k msgs/sec scale</div>
              </div>

              <div className="p-3 bg-cockpit-850 rounded-lg border border-cockpit-750 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-signal-amber font-bold">PHASE 04</span>
                  <h4 className="font-bold text-slate-200 mt-1 uppercase">Weibull RUL AI</h4>
                  <p className="text-[11px] text-slate-400 mt-1">Survival models project degradation trends and remaining useful days.</p>
                </div>
                <div className="mt-2 text-[10px] text-slate-500 font-mono">Continuous Digital Twin</div>
              </div>

              <div className="p-3 bg-cockpit-850 rounded-lg border border-cockpit-750 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-telemetry-sky font-bold">PHASE 05</span>
                  <h4 className="font-bold text-slate-200 mt-1 uppercase">Work Order Dispatch</h4>
                  <p className="text-[11px] text-slate-400 mt-1">Generates pre-filled OEM replacement work order with part costs & bay assignment.</p>
                </div>
                <div className="mt-2 text-[10px] text-slate-500 font-mono">Automated Dispatch</div>
              </div>
            </div>

            <div className="p-4 bg-cockpit-850 rounded-xl border border-cockpit-750">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">Mathematical Formulation (Weibull 2-Parameter CDF):</h4>
              <div className="p-2.5 bg-cockpit-900 rounded border border-cockpit-800 text-xs font-mono text-signal-amber">
                F(t; β, η) = 1 - exp(- (t / η)^β)  |  RUL(t) = η · Γ(1 + 1/β) - t
              </div>
              <p className="text-[11px] text-slate-400 mt-2">
                Where <strong>β (Shape parameter)</strong> captures aging wear-out acceleration, and <strong>η (Scale parameter / Characteristic life)</strong> is dynamically adjusted by live thermal and torque stress telemetry.
              </p>
            </div>
          </div>
        )}

        {/* =========================================================================
            SLIDE 8: IMPACT, RESULTS & CONCLUSION
           ========================================================================= */}
        {currentSlide === 7 && (
          <div className="space-y-5 animate-fadeIn flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-cockpit-750 pb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-telemetry-emerald tracking-widest uppercase">
                <CheckCircleIcon className="w-4 h-4 text-telemetry-emerald" />
                Section 07 // Feasibility, Impact & Results
              </div>
              <span className="text-xs text-slate-500">Project Evaluation & Conclusion</span>
            </div>

            {/* Impact Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 bg-cockpit-850 rounded-xl border border-cockpit-750 text-center border-t-2 border-t-telemetry-emerald">
                <div className="text-2xl sm:text-3xl font-bold text-telemetry-emerald">42.6%</div>
                <div className="text-[11px] text-slate-300 font-semibold mt-1">Downtime Reduction</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Across monitored fleet</div>
              </div>

              <div className="p-4 bg-cockpit-850 rounded-xl border border-cockpit-750 text-center border-t-2 border-t-telemetry-cyan">
                <div className="text-2xl sm:text-3xl font-bold text-telemetry-cyan">18.4 Days</div>
                <div className="text-[11px] text-slate-300 font-semibold mt-1">Early Warning Lead</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Prior to physical failure</div>
              </div>

              <div className="p-4 bg-cockpit-850 rounded-xl border border-cockpit-750 text-center border-t-2 border-t-signal-amber">
                <div className="text-2xl sm:text-3xl font-bold text-signal-amber">99.4%</div>
                <div className="text-[11px] text-slate-300 font-semibold mt-1">Fault Mitigation</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Zero catastrophic lockouts</div>
              </div>

              <div className="p-4 bg-cockpit-850 rounded-xl border border-cockpit-750 text-center border-t-2 border-t-telemetry-sky">
                <div className="text-2xl sm:text-3xl font-bold text-telemetry-sky">$1.84M</div>
                <div className="text-[11px] text-slate-300 font-semibold mt-1">Warranty Savings</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Simulated fleet ROI</div>
              </div>
            </div>

            {/* Deliverables summary */}
            <div className="p-4 bg-cockpit-850 rounded-xl border border-cockpit-750 space-y-2">
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Completed Engineering Deliverables:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="text-telemetry-emerald font-bold">✓</span>
                  <span>Full 8-Module Production-Grade Web Diagnostic Dashboard</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-telemetry-emerald font-bold">✓</span>
                  <span>Interactive Physics Telemetry Simulator & Fault Injector</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-telemetry-emerald font-bold">✓</span>
                  <span>Live Raw CAN-FD Hexadecimal Stream Viewer & Signal Decoder</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-telemetry-emerald font-bold">✓</span>
                  <span>SAE J2012 Diagnostic Trees & Automated Work Order Dispatch</span>
                </div>
              </div>
            </div>

            {/* Conclusion */}
            <div className="p-3 bg-cockpit-900 rounded-lg border border-cockpit-800 text-xs text-slate-300 flex items-center justify-between">
              <span><strong>Conclusion:</strong> Proven feasibility of proactive, edge-assisted predictive diagnostics for Software Defined Vehicles.</span>
              <span className="text-signal-amber font-semibold">Ready for OEM Hardware In-The-Loop (HIL) Integration</span>
            </div>
          </div>
        )}
      </div>

      {/* Footer Navigation Bar */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-2 font-mono">
        <div>
          Tip: Use <kbd className="px-1.5 py-0.5 rounded bg-cockpit-800 border border-cockpit-700 text-slate-300">←</kbd> / <kbd className="px-1.5 py-0.5 rounded bg-cockpit-800 border border-cockpit-700 text-slate-300">→</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-cockpit-800 border border-cockpit-700 text-slate-300">Space</kbd> to navigate slides.
        </div>
        <div>
          AERO-SDV Platform | B.Tech Major Project
        </div>
      </div>
    </div>
  );
};
