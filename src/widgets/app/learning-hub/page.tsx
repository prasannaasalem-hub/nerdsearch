'use client';

import { useTheme, useWidgetSDK } from '@nitrostack/widgets';

export const dynamic = 'force-dynamic';

interface RoadmapStep {
  step: number;
  title: string;
  description: string;
}

interface LearningHubData {
  topic: string;
  level: string;
  roadmap: RoadmapStep[];
}

export default function LearningHubWidget() {
  const theme = useTheme();
  const { isReady, getToolOutput } = useWidgetSDK();
  const data = getToolOutput<LearningHubData>();

  const isDark = theme === 'dark';
  const bgColor = isDark ? '#1a1a1a' : '#ffffff';
  const textColor = isDark ? '#ffffff' : '#000000';
  const borderColor = isDark ? '#333333' : '#e5e7eb';
  const cardBg = isDark ? '#2d2d2d' : '#f9fafb';
  const mutedColor = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)';
  const accent = '#3B82F6';

  if (!isReady) {
    return <div style={{ padding: '24px', textAlign: 'center' }}>Initializing...</div>;
  }

  if (!data) {
    return <div style={{ padding: '24px', textAlign: 'center' }}>Loading...</div>;
  }

  const roadmap = data.roadmap ?? [];

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
        Learning roadmap: {data.topic}
      </h2>
      <p style={{ margin: '0 0 20px 0', fontSize: '12px', color: mutedColor, textTransform: 'capitalize' }}>
        Level: {data.level}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {roadmap.map((step, idx) => (
          <div key={step.step} style={{ display: 'flex', gap: '14px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: accent,
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '13px',
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {step.step}
              </div>
              {idx < roadmap.length - 1 && (
                <div style={{ width: '2px', flex: 1, background: borderColor, marginTop: '4px', marginBottom: '4px' }} />
              )}
            </div>
            <div style={{ paddingBottom: '20px' }}>
              <div
                style={{
                  padding: '12px 14px',
                  background: cardBg,
                  borderRadius: '8px',
                  border: `1px solid ${borderColor}`,
                }}
              >
                <h3 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 600 }}>{step.title}</h3>
                <p style={{ margin: 0, fontSize: '12px', color: mutedColor }}>{step.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
