export default function PixelHeart({ className }: { className?: string }) {
  // A standard 8x8 or similar pixel heart grid mapped to SVG rects for crispness
  return (
    <div className={className}>
      <svg 
        viewBox="0 0 14 12" 
        fill="currentColor" 
        className="w-full h-full"
        style={{ shapeRendering: 'crispEdges' }} // Ensures pixelated look
      >
        {/* Row 1 */}
        <path d="M2 0h4v2H2zM8 0h4v2H8z" />
        {/* Row 2 */}
        <path d="M0 2h2v4H0zM6 2h2v2H6zM12 2h2v4H12z" />
        {/* Row 3 - already covered by sides largely, filling center */}
        <path d="M2 2h10v2H2z" />
        {/* Row 4 */}
        <path d="M2 4h10v2H2z" />
        {/* Row 5 */}
        <path d="M2 6h10v2H2z" />
        {/* Row 6 tapering */}
        <path d="M4 8h6v2H4z" />
        {/* Row 7 tip */}
        <path d="M6 10h2v2H6z" />
      </svg>
    </div>
  )
}
