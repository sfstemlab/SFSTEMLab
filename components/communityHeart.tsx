'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export interface HeartPerson {
    name: string;
    picture?: string;
    bio?: string;
    titles?: string[];
    email?: string;
}

interface CommunityHeartProps {
    people: HeartPerson[];
    collaborators: HeartPerson[];
    getImportance: (person: HeartPerson) => number;
}

const GOLDEN_ANGLE = 2.399963229728653; // radians, ~137.5deg

// Classic implicit heart curve: (x^2 + y^2 - 1)^3 - x^2*y^3 <= 0 is "inside".
// Math orientation: lobes at +y, point at -y. Flipped to CSS coords at render time.
function isInsideHeart(x: number, y: number): boolean {
    const a = x * x + y * y - 1;
    return a * a * a - x * x * y * y * y <= 0;
}

function findHeartBounds() {
    let xMin = Infinity, xMax = -Infinity, yMin = Infinity, yMax = -Infinity;
    const step = 0.02;
    for (let x = -1.6; x <= 1.6; x += step) {
        for (let y = -1.6; y <= 1.6; y += step) {
            if (isInsideHeart(x, y)) {
                if (x < xMin) xMin = x;
                if (x > xMax) xMax = x;
                if (y < yMin) yMin = y;
                if (y > yMax) yMax = y;
            }
        }
    }
    return { xMin, xMax, yMin, yMax };
}

// Farthest-point (blue-noise-style) sampling: greedily picks the candidate that
// maximizes the minimum distance to everything already chosen. Produces a much more
// evenly-spaced result than taking every Nth point from a radius-ordered list, which
// can still leave uneven gaps/clusters.
function farthestPointSample<T extends { x: number; y: number }>(
    candidates: T[],
    count: number,
    seedX: number,
    seedY: number
): T[] {
    if (candidates.length <= count) return candidates;

    let seedIdx = 0;
    let bestSeedDist = Infinity;
    for (let i = 0; i < candidates.length; i++) {
        const d = (candidates[i].x - seedX) ** 2 + (candidates[i].y - seedY) ** 2;
        if (d < bestSeedDist) {
            bestSeedDist = d;
            seedIdx = i;
        }
    }

    const selected: T[] = [candidates[seedIdx]];
    const minDist = new Array(candidates.length).fill(Infinity);
    const updateMinDist = (px: number, py: number) => {
        for (let i = 0; i < candidates.length; i++) {
            const dx = candidates[i].x - px;
            const dy = candidates[i].y - py;
            const d = dx * dx + dy * dy;
            if (d < minDist[i]) minDist[i] = d;
        }
    };
    updateMinDist(candidates[seedIdx].x, candidates[seedIdx].y);

    while (selected.length < count) {
        let bestIdx = -1;
        let bestDist = -1;
        for (let i = 0; i < candidates.length; i++) {
            if (minDist[i] > bestDist) {
                bestDist = minDist[i];
                bestIdx = i;
            }
        }
        selected.push(candidates[bestIdx]);
        updateMinDist(candidates[bestIdx].x, candidates[bestIdx].y);
    }

    return selected;
}

function generateHeartSlots(count: number, bounds: ReturnType<typeof findHeartBounds>) {
    if (count === 0) return [];

    const { xMin, xMax, yMin, yMax } = bounds;
    const cx = (xMin + xMax) / 2;
    const cy = (yMin + yMax) / 2;
    const boundW = xMax - xMin;
    const boundH = yMax - yMin;
    const maxRadius = Math.sqrt(boundW * boundW + boundH * boundH) / 2;

    // Dense candidate pool covering the whole heart — feeds the farthest-point
    // sampler below, which is what actually produces the even spacing.
    const poolSize = Math.max(2000, count * 120);
    const candidates: { x: number; y: number }[] = [];
    for (let i = 0; i < poolSize; i++) {
        const r = maxRadius * Math.sqrt((i + 0.5) / poolSize);
        const theta = i * GOLDEN_ANGLE;
        const x = cx + r * Math.cos(theta);
        const y = cy + r * Math.sin(theta);
        if (isInsideHeart(x, y)) {
            candidates.push({ x, y });
        }
    }

    return farthestPointSample(candidates, count, cx, cy);
}

function generateHaloSlots(count: number, bounds: ReturnType<typeof findHeartBounds>) {
    const { xMin, xMax, yMin, yMax } = bounds;
    const cx = (xMin + xMax) / 2;
    const cy = (yMin + yMax) / 2;
    const boundW = xMax - xMin;
    const boundH = yMax - yMin;
    const haloRadius = Math.sqrt(boundW * boundW + boundH * boundH) / 2 * 1.08;

    if (count === 0) return [];
    if (count === 1) {
        const angle = (Math.PI / 2);
        return [{ x: cx + haloRadius * Math.cos(angle), y: cy + haloRadius * Math.sin(angle) }];
    }

    const slots: { x: number; y: number }[] = [];
    const startDeg = 20;
    const endDeg = 160;
    for (let j = 0; j < count; j++) {
        const deg = startDeg + ((endDeg - startDeg) * j) / (count - 1);
        const angle = (deg * Math.PI) / 180;
        slots.push({
            x: cx + haloRadius * Math.cos(angle),
            y: cy + haloRadius * Math.sin(angle),
        });
    }
    return slots;
}

// Delaunay triangulation (Bowyer-Watson, incremental insertion). Unlike a k-nearest
// -neighbor graph, this guarantees every gap in the mesh (the "negative space") is a
// triangle — no crossing edges, no quads or irregular gaps — because that's the
// defining property of a triangulation.
function orient(a: { x: number; y: number }, b: { x: number; y: number }, c: { x: number; y: number }) {
    return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
}

function circumcircleContainsPoint(
    a: { x: number; y: number },
    b: { x: number; y: number },
    c: { x: number; y: number },
    p: { x: number; y: number }
): boolean {
    let A = a, B = b, C = c;
    if (orient(A, B, C) < 0) {
        const t = B;
        B = C;
        C = t;
    }
    const ax = A.x - p.x, ay = A.y - p.y;
    const bx = B.x - p.x, by = B.y - p.y;
    const cx = C.x - p.x, cy = C.y - p.y;
    const det =
        (ax * ax + ay * ay) * (bx * cy - cx * by) -
        (bx * bx + by * by) * (ax * cy - cx * ay) +
        (cx * cx + cy * cy) * (ax * by - bx * ay);
    return det > 0;
}

function delaunayEdges(points: { x: number; y: number }[]): [number, number][] {
    const n = points.length;
    if (n < 3) {
        // Not enough points to triangulate — just connect what's there.
        return n === 2 ? [[0, 1]] : [];
    }

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const p of points) {
        minX = Math.min(minX, p.x);
        maxX = Math.max(maxX, p.x);
        minY = Math.min(minY, p.y);
        maxY = Math.max(maxY, p.y);
    }
    const deltaMax = Math.max(maxX - minX, maxY - minY, 1) * 10;
    const midx = (minX + maxX) / 2;
    const midy = (minY + maxY) / 2;

    // Super-triangle large enough to contain every point, removed at the end.
    const superPoints = [
        { x: midx - 2 * deltaMax, y: midy - deltaMax },
        { x: midx, y: midy + 2 * deltaMax },
        { x: midx + 2 * deltaMax, y: midy - deltaMax },
    ];
    const allPoints = [...points, ...superPoints];
    const [i1, i2, i3] = [n, n + 1, n + 2];

    let triangles: [number, number, number][] = [[i1, i2, i3]];

    for (let i = 0; i < n; i++) {
        const p = allPoints[i];
        const badTriangles = triangles.filter(([ia, ib, ic]) =>
            circumcircleContainsPoint(allPoints[ia], allPoints[ib], allPoints[ic], p)
        );

        // Boundary of the hole left by removing bad triangles: edges that belong to
        // exactly one bad triangle (shared internal edges get cancelled out).
        const edgeCount = new Map<string, { count: number; edge: [number, number] }>();
        const edgeKey = (a: number, b: number) => (a < b ? `${a}-${b}` : `${b}-${a}`);
        for (const [ia, ib, ic] of badTriangles) {
            for (const [ea, eb] of [[ia, ib], [ib, ic], [ic, ia]] as [number, number][]) {
                const key = edgeKey(ea, eb);
                const existing = edgeCount.get(key);
                if (existing) existing.count++;
                else edgeCount.set(key, { count: 1, edge: [ea, eb] });
            }
        }
        const boundary: [number, number][] = [];
        edgeCount.forEach(({ count, edge }) => {
            if (count === 1) boundary.push(edge);
        });

        triangles = triangles.filter((t) => !badTriangles.includes(t));
        for (const [ea, eb] of boundary) {
            triangles.push([ea, eb, i]);
        }
    }

    // Drop any triangle still touching a super-triangle vertex.
    triangles = triangles.filter(([a, b, c]) => a < n && b < n && c < n);

    const edgeSet = new Set<string>();
    const edges: [number, number][] = [];
    for (const [a, b, c] of triangles) {
        for (const [x, y] of [[a, b], [b, c], [c, a]] as [number, number][]) {
            const lo = Math.min(x, y);
            const hi = Math.max(x, y);
            const key = `${lo}-${hi}`;
            if (!edgeSet.has(key)) {
                edgeSet.add(key);
                edges.push([lo, hi]);
            }
        }
    }

    return edges;
}

// The pfp positioned closest to the top-center of the heart, right at the notch
// between the two lobes. Used as a "guard": no line should pass directly over it to
// connect the top of the left lobe straight across to the top of the right lobe.
function findTopCenterIndex(
    points: { x: number; y: number }[],
    bounds: ReturnType<typeof findHeartBounds>
): number {
    const topCenter = { x: (bounds.xMin + bounds.xMax) / 2, y: bounds.yMax };
    let closestIdx = 0;
    let bestDist = Infinity;
    points.forEach((p, idx) => {
        const d = (p.x - topCenter.x) ** 2 + (p.y - topCenter.y) ** 2;
        if (d < bestDist) {
            bestDist = d;
            closestIdx = idx;
        }
    });
    return closestIdx;
}

// True if straight line a-b passes directly over `guard` — it spans guard's
// x-position, and at that x it's at or above guard's height. That's exactly what a
// line connecting the top of one lobe straight across to the top of the other does.
function passesAboveGuard(
    a: { x: number; y: number },
    b: { x: number; y: number },
    guard: { x: number; y: number }
): boolean {
    const minX = Math.min(a.x, b.x);
    const maxX = Math.max(a.x, b.x);
    if (guard.x < minX || guard.x > maxX || a.x === b.x) return false;
    const t = (guard.x - a.x) / (b.x - a.x);
    const yAtGuardX = a.y + t * (b.y - a.y);
    return yAtGuardX >= guard.y;
}

function initials(name: string) {
    return name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join('');
}

// w-72 (18rem/288px) baseline; 1.5x (27rem/432px) when there's more than just a name
// to show, so the extra room is only used when there's actually text that needs it.
const TOOLTIP_WIDTH_BASE = 288;
const TOOLTIP_WIDTH_WIDE = 432;

function tooltipHasExtraText(person: HeartPerson) {
    return Boolean((person.titles && person.titles.length > 0) || person.bio || person.email);
}

function Tooltip({ person, side }: { person: HeartPerson; side: 'left' | 'right' }) {
    const wide = tooltipHasExtraText(person);
    return (
        <div
            className={cn(
                'pointer-events-none absolute top-1/2 -translate-y-1/2 z-50',
                wide ? 'w-[27rem]' : 'w-72',
                'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 group-focus-within:opacity-100 group-focus-within:scale-100',
                'transition-all duration-150',
                side === 'right' ? 'left-full ml-4 origin-left' : 'right-full mr-4 origin-right'
            )}
        >
            <div className="bg-cardColor rounded-2xl shadow-xl p-4 text-white text-left">
                <h4 className="font-extrabold text-redBrand text-xl">{person.name}</h4>
                {person.titles && person.titles.length > 0 && (
                    <p className="text-base text-brand font-semibold mt-1">{person.titles.join(', ')}</p>
                )}
                {person.bio && (
                    <p className="text-base text-white/90 mt-2">{person.bio}</p>
                )}
                {person.email && (
                    <p className="text-base text-brand mt-2 break-all">{person.email}</p>
                )}
            </div>
        </div>
    );
}

function Avatar({
    person,
    size,
    left,
    top,
    side,
    ring,
}: {
    person: HeartPerson;
    size: number;
    left: string;
    top: string;
    side: 'left' | 'right';
    ring: 'brand' | 'redBrand';
}) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [resolvedSide, setResolvedSide] = useState<'left' | 'right'>(side);

    useEffect(() => {
        setResolvedSide(side);
    }, [side]);

    // Re-check right before the tooltip opens: with the preferred side, would it run
    // past the edge of the browser window? If so, open it on the other side instead.
    const checkOverflow = () => {
        const el = wrapperRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const tooltipWidth = tooltipHasExtraText(person) ? TOOLTIP_WIDTH_WIDE : TOOLTIP_WIDTH_BASE;
        const gap = 16; // ml-4 / mr-4
        if (side === 'right' && rect.right + gap + tooltipWidth > window.innerWidth) {
            setResolvedSide('left');
        } else if (side === 'left' && rect.left - gap - tooltipWidth < 0) {
            setResolvedSide('right');
        } else {
            setResolvedSide(side);
        }
    };

    return (
        <div
            ref={wrapperRef}
            className="group absolute z-10 hover:z-30 focus-within:z-30"
            style={{ left, top, transform: 'translate(-50%, -50%)' }}
            onMouseEnter={checkOverflow}
            onFocus={checkOverflow}
        >
            <button
                style={{ width: size, height: size }}
                className={cn(
                    'rounded-full overflow-hidden flex items-center justify-center transition-transform duration-300 shadow-md group-hover:scale-110',
                    ring === 'brand' ? 'border-2 border-brand' : 'border-2 border-redBrand'
                )}
            >
                {person.picture ? (
                    <img src={person.picture} alt={person.name} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-cardColor flex items-center justify-center text-white font-bold text-xs">
                        {initials(person.name)}
                    </div>
                )}
            </button>
            <Tooltip person={person} side={resolvedSide} />
        </div>
    );
}

export default function CommunityHeart({
    people,
    collaborators,
    getImportance,
}: CommunityHeartProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const observer = new ResizeObserver((entries) => {
            const { width, height } = entries[0].contentRect;
            setContainerSize({ width, height });
        });
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const bounds = useMemo(() => findHeartBounds(), []);

    const heartSlots = useMemo(
        () => generateHeartSlots(people.length, bounds),
        [people.length, bounds]
    );
    const haloSlots = useMemo(
        () => generateHaloSlots(collaborators.length, bounds),
        [collaborators.length, bounds]
    );
    // Straight Delaunay edges — no bending, which is what guarantees no crossings (a
    // triangulation is planar and straight-line by construction). The one exception:
    // drop whichever edge(s) pass directly over the top-center pfp, since that's the
    // only case where a straight Delaunay connection visibly caps across the notch
    // and connects the two lobes' peaks directly instead of following the silhouette.
    const edgePaths = useMemo(() => {
        const edges = delaunayEdges(heartSlots);
        const guardIdx = findTopCenterIndex(heartSlots, bounds);
        const guard = heartSlots[guardIdx];
        return edges
            .filter(([i, j]) => {
                if (i === guardIdx || j === guardIdx) return true;
                return !passesAboveGuard(heartSlots[i], heartSlots[j], guard);
            })
            .map(([i, j]) => ({ i, j, path: [heartSlots[i], heartSlots[j]] }));
    }, [heartSlots, bounds]);

    const { canvas, minImportance, maxImportance } = useMemo(() => {
        const allX = [
            ...heartSlots.map((s) => s.x),
            ...haloSlots.map((s) => s.x),
        ];
        const allY = [
            ...heartSlots.map((s) => s.y),
            ...haloSlots.map((s) => s.y),
        ];
        const pad = 0.08;
        const xMin = Math.min(...allX, bounds.xMin) - pad;
        const xMax = Math.max(...allX, bounds.xMax) + pad;
        const yMin = Math.min(...allY, bounds.yMin) - pad;
        const yMax = Math.max(...allY, bounds.yMax) + pad;

        const importances = people.map(getImportance);
        return {
            canvas: { xMin, xMax, yMin, yMax },
            minImportance: Math.min(...importances, 1),
            maxImportance: Math.max(...importances, 1),
        };
    }, [heartSlots, haloSlots, bounds, people, getImportance]);

    function toPercent(x: number, y: number) {
        const left = ((x - canvas.xMin) / (canvas.xMax - canvas.xMin)) * 100;
        const top = 100 - ((y - canvas.yMin) / (canvas.yMax - canvas.yMin)) * 100;
        return { left, top };
    }

    // Subtle size range: less important (higher number) = smaller.
    function sizeFor(person: HeartPerson) {
        const MIN_SIZE = 58;
        const MAX_SIZE = 66;
        const importance = getImportance(person);
        if (maxImportance === minImportance) return (MIN_SIZE + MAX_SIZE) / 2;
        const t = (importance - minImportance) / (maxImportance - minImportance);
        return MAX_SIZE - t * (MAX_SIZE - MIN_SIZE);
    }

    const aspect = (canvas.xMax - canvas.xMin) / (canvas.yMax - canvas.yMin);
    const COLLABORATOR_SIZE = 92;
    const LINE_GAP = 14; // px between where a line stops and the circle it's heading toward

    // Trim just the first and last point of a path (2 points for a straight
    // connection, 3 for one bent around a concave dip) inward by `gap` px along
    // that end's own segment, so it stops short of the circle instead of running
    // into it — any middle waypoint (the bend) is left untouched.
    function trimPath(points: { x: number; y: number }[], radiusA: number, radiusB: number) {
        const pts = points.map((p) => ({ ...p }));
        const trimEnd = (from: { x: number; y: number }, toward: { x: number; y: number }, radius: number) => {
            const dx = toward.x - from.x;
            const dy = toward.y - from.y;
            const len = Math.hypot(dx, dy) || 1;
            const trim = Math.min(radius + LINE_GAP, len - 1);
            return { x: from.x + (dx / len) * trim, y: from.y + (dy / len) * trim };
        };
        pts[0] = trimEnd(pts[0], pts[1], radiusA);
        pts[pts.length - 1] = trimEnd(pts[pts.length - 1], pts[pts.length - 2], radiusB);
        return pts;
    }

    function toPixels(p: { x: number; y: number }) {
        const pos = toPercent(p.x, p.y);
        return { x: (pos.left / 100) * containerSize.width, y: (pos.top / 100) * containerSize.height };
    }

    return (
        <div
            ref={containerRef}
            className="relative w-3/4 mx-auto"
            style={{ aspectRatio: `${aspect}` }}
        >
            {/* Constellation lines between heart points only — behind the avatars */}
            {containerSize.width > 0 && (
                <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    viewBox={`0 0 ${containerSize.width} ${containerSize.height}`}
                >
                    {edgePaths.map(({ i, j, path }, idx) => {
                        const pixelPath = path.map(toPixels);
                        const trimmed = trimPath(pixelPath, sizeFor(people[i]) / 2, sizeFor(people[j]) / 2);
                        return (
                            <polyline
                                key={idx}
                                points={trimmed.map((p) => `${p.x},${p.y}`).join(' ')}
                                fill="none"
                                stroke="#c7e1ec"
                                strokeOpacity={0.3}
                                strokeWidth={1.8}
                                strokeLinecap="round"
                            />
                        );
                    })}
                </svg>
            )}

            {collaborators.map((c, i) => {
                const slot = haloSlots[i];
                if (!slot) return null;
                const pos = toPercent(slot.x, slot.y);
                return (
                    <Avatar
                        key={c.name}
                        person={c}
                        size={COLLABORATOR_SIZE}
                        left={`${pos.left}%`}
                        top={`${pos.top}%`}
                        side={pos.left < 50 ? 'left' : 'right'}
                        ring="redBrand"
                    />
                );
            })}
            {people.map((p, i) => {
                const slot = heartSlots[i];
                if (!slot) return null;
                const pos = toPercent(slot.x, slot.y);
                return (
                    <Avatar
                        key={p.name}
                        person={p}
                        size={sizeFor(p)}
                        left={`${pos.left}%`}
                        top={`${pos.top}%`}
                        side={pos.left < 50 ? 'left' : 'right'}
                        ring="brand"
                    />
                );
            })}
        </div>
    );
}
