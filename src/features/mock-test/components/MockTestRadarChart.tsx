import React from 'react';

interface MockTestRadarChartProps {
  listening: number;
  reading: number;
  writing: number;
  speaking: number;
  targetBand?: 'B1' | 'B2' | 'C1';
}

interface AxisPoint {
  label: string;
  value: number;
  angle: number; // in radians
  x: number;
  y: number;
}

export const MockTestRadarChart: React.FC<MockTestRadarChartProps> = ({
  listening,
  reading,
  writing,
  speaking,
  targetBand = 'B1',
}) => {
  const size = 320;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 105;

  // 4 Axes: North (Listening), East (Reading), South (Writing), West (Speaking)
  const axes: { label: string; value: number; angle: number }[] = [
    { label: 'Nghe (Listening)', value: listening, angle: -Math.PI / 2 },
    { label: 'Đọc (Reading)', value: reading, angle: 0 },
    { label: 'Viết (Writing)', value: writing, angle: Math.PI / 2 },
    { label: 'Nói (Speaking)', value: speaking, angle: Math.PI },
  ];

  const targetScoreMap: Record<'B1' | 'B2' | 'C1', number> = {
    B1: 4.0,
    B2: 6.0,
    C1: 8.5,
  };
  const targetThreshold = targetScoreMap[targetBand];

  // Grid levels (2, 4 [B1], 6 [B2], 8.5 [C1], 10)
  const gridLevels = [2, 4, 6, 8.5, 10];

  // Helper to map (value, angle) to (x, y)
  const getCoordinates = (value: number, angle: number): { x: number; y: number } => {
    const clamped = Math.max(0, Math.min(10, value));
    const r = (clamped / 10) * radius;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    };
  };

  // User polygon points
  const userPoints: AxisPoint[] = axes.map((axis) => {
    const { x, y } = getCoordinates(axis.value, axis.angle);
    return { ...axis, x, y };
  });
  const userPolygonSvg = userPoints.map((p) => `${p.x},${p.y}`).join(' ');

  // Target band polygon points
  const targetPolygonSvg = axes
    .map((axis) => {
      const { x, y } = getCoordinates(targetThreshold, axis.angle);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div
      className="card-surface"
      style={{
        padding: 'var(--space-4)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--space-3)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
        <h3 style={{ fontSize: 'var(--fs-sm)', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
          Biểu Đồ Radar Năng Lực 4 Kỹ Năng
        </h3>
        <span className="badge badge-primary" style={{ fontSize: '10px' }}>
          Mục tiêu: {targetBand} ({targetThreshold})
        </span>
      </div>

      <svg
        viewBox={`0 0 ${size} ${size}`}
        style={{ width: '100%', maxWidth: 320, height: 'auto', overflow: 'visible' }}
        role="img"
        aria-label="Biểu đồ Radar so sánh điểm 4 kỹ năng"
      >
        {/* Concentric Grid Polygons */}
        {gridLevels.map((lvl) => {
          const points = axes
            .map((axis) => {
              const { x, y } = getCoordinates(lvl, axis.angle);
              return `${x},${y}`;
            })
            .join(' ');
          const isTargetLine = lvl === targetThreshold;

          return (
            <polygon
              key={lvl}
              points={points}
              fill="none"
              stroke={isTargetLine ? 'var(--primary)' : 'var(--border)'}
              strokeWidth={isTargetLine ? 1.5 : 1}
              strokeDasharray={isTargetLine ? '3 3' : undefined}
              opacity={isTargetLine ? 0.8 : 0.5}
            />
          );
        })}

        {/* Axis Spokes */}
        {axes.map((axis) => {
          const { x, y } = getCoordinates(10, axis.angle);
          return (
            <line
              key={axis.label}
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke="var(--border-strong)"
              strokeWidth={1}
            />
          );
        })}

        {/* Target Band Benchmark Polygon */}
        <polygon
          points={targetPolygonSvg}
          fill="var(--primary-subtle)"
          stroke="var(--primary)"
          strokeWidth={1.5}
          strokeDasharray="4 4"
          opacity={0.4}
        />

        {/* Candidate Score Polygon */}
        <polygon
          points={userPolygonSvg}
          fill="var(--emerald-subtle)"
          stroke="var(--emerald)"
          strokeWidth={2.5}
        />

        {/* Candidate Vertices & Values */}
        {userPoints.map((pt) => (
          <g key={pt.label}>
            <circle
              cx={pt.x}
              cy={pt.y}
              r={4.5}
              fill="var(--emerald)"
              stroke="var(--bg-surface)"
              strokeWidth={2}
            />
          </g>
        ))}

        {/* Axis Labels */}
        {axes.map((axis) => {
          // Push labels slightly further out
          const labelDist = radius + 22;
          const lx = cx + labelDist * Math.cos(axis.angle);
          const ly = cy + labelDist * Math.sin(axis.angle);

          let textAnchor: 'middle' | 'start' | 'end' = 'middle';
          if (Math.abs(Math.cos(axis.angle)) > 0.3) {
            textAnchor = Math.cos(axis.angle) > 0 ? 'start' : 'end';
          }

          return (
            <g key={`lbl-${axis.label}`}>
              <text
                x={lx}
                y={ly}
                textAnchor={textAnchor}
                dominantBaseline="central"
                fill="var(--text-secondary)"
                fontSize="11"
                fontWeight="700"
              >
                {axis.label}
              </text>
              <text
                x={lx}
                y={ly + (axis.angle > 0 ? 12 : -12)}
                textAnchor={textAnchor}
                dominantBaseline="central"
                fill="var(--emerald)"
                fontSize="11"
                fontWeight="800"
              >
                {axis.value.toFixed(1)}/10
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div
        style={{
          display: 'flex',
          gap: 'var(--space-4)',
          fontSize: 'var(--fs-xs)',
          color: 'var(--text-secondary)',
          marginTop: 'var(--space-2)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 12, height: 12, borderRadius: 'var(--radius-sm)', background: 'var(--emerald)' }} />
          <span>Điểm của bạn</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span
            style={{
              width: 12,
              height: 2,
              borderBottom: '2px dashed var(--primary)',
            }}
          />
          <span>Chuẩn {targetBand} ({targetThreshold})</span>
        </div>
      </div>
    </div>
  );
};
