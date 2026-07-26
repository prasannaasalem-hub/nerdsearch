'use client';

import { useTheme, useWidgetSDK } from '@nitrostack/widgets';

export const dynamic = 'force-dynamic';

export default function ResearchHubWidget() {
  const theme = useTheme();
  const { isReady, getToolOutput } = useWidgetSDK();

  const output = getToolOutput();

  if (!isReady) {
    return <div style={{ padding: '24px', textAlign: 'center' }}>Initializing...</div>;
  }

  if (!output) {
    return <div style={{ padding: '24px', textAlign: 'center' }}>Loading...</div>;
  }

  const isDark = theme === 'dark';
  const bgColor = isDark ? '#1a1a1a' : '#ffffff';
  const textColor = isDark ? '#ffffff' : '#000000';
  const borderColor = isDark ? '#333333' : '#e5e7eb';
  const cardBg = isDark ? '#2d2d2d' : '#f9fafb';
  const mutedColor = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)';

  // Determine if this is search results or collections data
  const isSearchData = (output as any)?.results !== undefined;
  const isCollectionsData = (output as any)?.collections !== undefined;

  const items = isSearchData ? ((output as any)?.results ?? []) : [];
  const colls = isCollectionsData ? ((output as any)?.collections ?? []) : [];

  const handleMouseEnter = (e: any) => {
    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
    e.currentTarget.style.transform = 'translateY(-2px)';
  };

  const handleMouseLeave = (e: any) => {
    e.currentTarget.style.boxShadow = 'none';
    e.currentTarget.style.transform = 'translateY(0)';
  };

  return (
    <div style={{
      display: 'flex',
      gap: '24px',
      padding: '24px',
      background: bgColor,
      color: textColor,
      borderRadius: '12px',
      minHeight: '400px',
      maxWidth: '1200px',
    }}>
      {/* Left Pane: research papers */}
      {isSearchData && (
        <div style={{
          flex: 1,
          minWidth: '0',
          borderRight: `1px solid ${borderColor}`,
          paddingRight: '24px',
        }}>
          <h2 style={{
            margin: '0 0 16px 0',
            fontSize: '18px',
            fontWeight: '600',
          }}>
            research papers ({items.length})
          </h2>

          {items.length === 0 ? (
            <div style={{
              padding: '32px 16px',
              textAlign: 'center',
              color: mutedColor,
            }}>
              No papers found.
            </div>
          ) : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              maxHeight: '500px',
              overflowY: 'auto',
            }}>
              {items.map((item: any) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    gap: '12px',
                    padding: '12px',
                    background: cardBg,
                    borderRadius: '8px',
                    border: `1px solid ${borderColor}`,
                    transition: 'all 0.2s',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div style={{
                    width: '60px',
                    height: '60px',
                    flexShrink: 0,
                    borderRadius: '6px',
                    overflow: 'hidden',
                    background: '#e5e7eb',
                  }}>
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    ) : (
                      <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#d1d5db',
                        fontSize: '24px',
                      }}>
                        📄
                      </div>
                    )}
                  </div>

                  <div style={{ flex: 1, minWidth: '0' }}>
                    <h3 style={{
                      margin: '0 0 4px 0',
                      fontSize: '14px',
                      fontWeight: '600',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {item.title}
                    </h3>
                    <p style={{
                      margin: '0 0 6px 0',
                      fontSize: '12px',
                      color: mutedColor,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {item.authors?.join(', ') || 'Unknown'}
                    </p>
                    <p style={{
                      margin: '0',
                      fontSize: '11px',
                      color: mutedColor,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}>
                      {item.abstract}
                    </p>
                    <div style={{
                      display: 'flex',
                      gap: '8px',
                      marginTop: '6px',
                      fontSize: '11px',
                      color: mutedColor,
                    }}>
                      <span>{item.journal}</span>
                      <span>•</span>
                      <span>{item.year}</span>
                      <span>•</span>
                      <span>{item.citations} citations</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Right Pane: research collections */}
      {isCollectionsData && (
        <div style={{
          flex: 1,
          minWidth: '0',
          paddingLeft: isSearchData ? '24px' : '0',
        }}>
          <h2 style={{
            margin: '0 0 16px 0',
            fontSize: '18px',
            fontWeight: '600',
          }}>
            research collections ({colls.length})
          </h2>

          {colls.length === 0 ? (
            <div style={{
              padding: '32px 16px',
              textAlign: 'center',
              color: mutedColor,
            }}>
              No collections yet.
            </div>
          ) : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              maxHeight: '500px',
              overflowY: 'auto',
            }}>
              {colls.map((coll: any) => (
                <div
                  key={coll.id}
                  style={{
                    display: 'flex',
                    gap: '12px',
                    padding: '12px',
                    background: cardBg,
                    borderRadius: '8px',
                    border: `1px solid ${borderColor}`,
                    transition: 'all 0.2s',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div style={{
                    width: '60px',
                    height: '60px',
                    flexShrink: 0,
                    borderRadius: '6px',
                    overflow: 'hidden',
                    background: '#e5e7eb',
                  }}>
                    {coll.imageUrl ? (
                      <img
                        src={coll.imageUrl}
                        alt={coll.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    ) : (
                      <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#d1d5db',
                        fontSize: '24px',
                      }}>
                        📁
                      </div>
                    )}
                  </div>

                  <div style={{ flex: 1, minWidth: '0' }}>
                    <h3 style={{
                      margin: '0 0 4px 0',
                      fontSize: '14px',
                      fontWeight: '600',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {coll.name}
                    </h3>
                    <p style={{
                      margin: '0 0 6px 0',
                      fontSize: '12px',
                      color: mutedColor,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}>
                      {coll.description}
                    </p>
                    <div style={{
                      display: 'flex',
                      gap: '8px',
                      marginTop: '6px',
                      fontSize: '11px',
                      color: mutedColor,
                    }}>
                      <span>{coll.paperCount} papers</span>
                      {coll.tags && coll.tags.length > 0 && (
                        <>
                          <span>•</span>
                          <span>{coll.tags.slice(0, 2).join(', ')}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
