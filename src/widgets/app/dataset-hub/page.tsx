'use client';

import { useTheme, useWidgetSDK } from '@nitrostack/widgets';

export const dynamic = 'force-dynamic';

interface DatasetItem {
  id: string;
  name: string;
  source: string;
  description: string;
  url: string;
  size: string;
  tags: string[];
}

interface DatasetHubData {
  query: string;
  source: string;
  results: DatasetItem[];
  total: number;
}

export default function DatasetHubWidget() {
  const theme = useTheme();
  const { isReady, getToolOutput } = useWidgetSDK();
  const data = getToolOutput<DatasetHubData>();

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

  const results = data.results ?? [];

  return (
    <div
      style={{
        padding: '24px',
        background: bgColor,
        color: textColor,
        borderRadius: '12px',
        minHeight: '300px',
        maxWidth: '700px',
      }}
    >
      <h2 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: 600 }}>
        Datasets for &ldquo;{data.query}&rdquo;
      </h2>
      <p style={{ margin: '0 0 16px 0', fontSize: '12px', color: mutedColor }}>
        Source: {data.source}
      </p>

      {results.length === 0 ? (
        <div style={{ padding: '32px 16px', textAlign: 'center', color: mutedColor }}>
          No datasets found.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {results.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'block',
                padding: '14px',
                background: cardBg,
                borderRadius: '8px',
                border: `1px solid ${borderColor}`,
                textDecoration: 'none',
                color: textColor,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, fontSize: '14px' }}>{item.name}</span>
                <span style={{ fontSize: '12px', color: mutedColor }}>{item.size}</span>
              </div>
              <p style={{ margin: '6px 0 0 0', fontSize: '12px', color: mutedColor }}>
                {item.description}
              </p>
              <div style={{ display: 'flex', gap: '6px', marginTop: '8px', flexWrap: 'wrap' }}>
                <span
                  style={{
                    fontSize: '11px',
                    padding: '2px 8px',
                    borderRadius: '999px',
                    background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                  }}
                >
                  {item.source}
                </span>
                {item.tags?.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: '11px',
                      padding: '2px 8px',
                      borderRadius: '999px',
                      background: isDark ? 'rgba(59,130,246,0.2)' : 'rgba(59,130,246,0.1)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
