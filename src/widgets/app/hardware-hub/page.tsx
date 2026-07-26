'use client';

import { useTheme, useWidgetSDK } from '@nitrostack/widgets';

export const dynamic = 'force-dynamic';

interface HardwareRecommendation {
  component: string;
  useCase: string;
  notes: string;
}

interface HardwareHubData {
  projectType: string;
  budget: string;
  recommendations: HardwareRecommendation[];
}

export default function HardwareHubWidget() {
  const theme = useTheme();
  const { isReady, getToolOutput } = useWidgetSDK();
  const data = getToolOutput<HardwareHubData>();

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

  const recommendations = data.recommendations ?? [];

  return (
    <div
      style={{
        padding: '24px',
        background: bgColor,
        color: textColor,
        borderRadius: '12px',
        minHeight: '300px',
        maxWidth: '640px',
      }}
    >
      <h2 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: 600 }}>
        Hardware for {data.projectType}
      </h2>
      <p style={{ margin: '0 0 16px 0', fontSize: '12px', color: mutedColor, textTransform: 'capitalize' }}>
        Budget: {data.budget}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {recommendations.map((rec) => (
          <div
            key={rec.component}
            style={{
              padding: '14px',
              background: cardBg,
              borderRadius: '8px',
              border: `1px solid ${borderColor}`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '20px' }}>🔧</span>
              <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>{rec.component}</h3>
            </div>
            <p style={{ margin: '8px 0 4px 0', fontSize: '12px', fontWeight: 600, color: mutedColor }}>
              {rec.useCase}
            </p>
            <p style={{ margin: 0, fontSize: '12px', color: mutedColor }}>{rec.notes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
