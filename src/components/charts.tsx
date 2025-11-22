type Segment = { label: string; value: number; color: string }

export function DonutChart({ segments, size = 140, strokeWidth = 18 }: { segments: Segment[]; size?: number; strokeWidth?: number }) {
    const total = segments.reduce((sum, s) => sum + s.value, 0) || 1
    let offset = 0
    const radius = (size - strokeWidth) / 2
    const center = size / 2

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {segments.map((seg, idx) => {
                const dash = (seg.value / total) * 2 * Math.PI * radius
                const dashArray = `${dash} ${2 * Math.PI * radius}`
                const circle = (
                    <circle
                        key={seg.label}
                        cx={center}
                        cy={center}
                        r={radius}
                        fill="transparent"
                        stroke={seg.color}
                        strokeWidth={strokeWidth}
                        strokeDasharray={dashArray}
                        strokeDashoffset={-offset}
                        strokeLinecap="butt"
                    />
                )
                offset += dash
                return circle
            })}
        </svg>
    )
}

export function Legend({ segments }: { segments: Segment[] }) {
    return (
        <div className="flex flex-wrap gap-3 text-xs text-white/80">
            {segments.map((seg) => (
                <div key={seg.label} className="inline-flex items-center gap-2">
                    <span className="inline-block h-3 w-3 rounded-sm" style={{ backgroundColor: seg.color }} />
                    <span>{seg.label} ({seg.value})</span>
                </div>
            ))}
        </div>
    )
}
