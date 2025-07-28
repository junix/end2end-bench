import React from 'react';
import { ThroughputSection } from './components/ThroughputSection';
import { QualitySection } from './components/QualitySection';
import { SpeedSection } from './components/SpeedSection';

export function ProductivityDashboard() {
  return (
    <div className="min-h-screen bg-[#0A0A0B]">
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-white mb-6">Productivity</h1>
        
        <div className="flex gap-3 mb-6">
          <select className="bg-[#1A1A1B] text-gray-200 text-sm px-3 py-1.5 rounded border border-gray-800 focus:outline-none focus:border-gray-700">
            <option>Last 4 weeks</option>
            <option>Last 8 weeks</option>
            <option>Last 12 weeks</option>
          </select>
          <select className="bg-[#1A1A1B] text-gray-200 text-sm px-3 py-1.5 rounded border border-gray-800 focus:outline-none focus:border-gray-700">
            <option>All members</option>
            <option>Team members</option>
            <option>Individual</option>
          </select>
          <select className="bg-[#1A1A1B] text-gray-200 text-sm px-3 py-1.5 rounded border border-gray-800 focus:outline-none focus:border-gray-700">
            <option>All repositories</option>
            <option>Frontend</option>
            <option>Backend</option>
          </select>
        </div>

        <ThroughputSection />
        <QualitySection />
        <SpeedSection />
      </div>
    </div>
  );
}