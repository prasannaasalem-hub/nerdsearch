'use client';

import { useTheme, useWidgetSDK } from '@nitrostack/widgets';

export const dynamic = 'force-dynamic';

interface Blueprint {
  research: string;
  datasets: string;
  github: string;
  hardware: string;
  learning: string;
}

interface ArchitectHubData {
  projectName: string;
  domain: string;
  blueprint: Blueprint;
}

const SECTION_ICONS: Record<keyof Blueprint, string> = {
  research: '📚',
  datasets: '🗂️',
  github: '🐙',
  hardware: '🔧',
  learning: '🎓',
};

const SECTION_LABELS: Record<keyof Blueprint, string> = {
  research: 'Research',
  datasets: 'Datasets',
  github: 'GitHub',
  hardware: 'Hardware',
  learning: 'Learning',
};

export default function ArchitectHubWidget() {
  const theme = useTheme();
  const { isReady, getToolOutput } = useWidgetSDK();
  const data = getToolOutput<ArchitectHubData>();

  const isDark = theme === 'dark';
  const bgColor = isDark ? '#1a1a1a' : '#ffffff';
  const textColor = isDark ? '#ffffff' : '#000000';
  const borderColor = isDark ? '#333333' : '#e5e7eb';
  const cardBg = isDark ? '#2d2d2d' : '#f9fafb';
  const mutedColor = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)';

  if (!isReady) {
    return <div style={{ padding: '24px', textAlign: 'center' }}>Initializing...</div>;
  }

  if (!data) {
    return <div style={{ padding: '24px', textAlign: 'center' }}>Loading...</div>;
  }

  const blueprint = data.blueprint ?? ({} as Blueprint);
  const sections = (Object.keys(SECTION_LABELS) as Array<keyof Blueprint>).filter(
    (key) => blueprint[key]
  );

  return (
    <div
      style={{
        padding: '24px',
        background: bgColor,
        color: textColor,
        borderRadius: '12px',
        minHeight: '300px',
        maxWidth: '680px',
      }}
    >
      <h2 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: 600 }}>
        {data.projectName}
      </h2>
      <p style={{ margin: '0 0 16px 0', fontSize: '12px', color: mutedColor }}>
        Domain: {data.domain}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
        {sections.map((key) => (
          <div
            key={key}
            style={{
              display: 'flex',
              gap: '12px',
              padding: '12px 14px',
              background: cardBg,
              borderRadius: '8px',
              border: `1px solid ${borderColor}`,
            }}
          >
            <span style={{ fontSize: '20px' }}>{SECTION_ICONS[key]}</span>
            <div>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '13px', fontWeight: 600 }}>
                {SECTION_LABELS[key]}
              </h3>
              <p style={{ margin: 0, fontSize: '12px', color: mutedColor }}>{blueprint[key]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
