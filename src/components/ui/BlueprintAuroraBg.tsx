import { clsx } from 'clsx'
import './blueprint-aurora-bg.css'

export default function BlueprintAuroraBg({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className="relative overflow-hidden">
      {/* Aurora ribbons — flowing gradient bands */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="aurora-ribbon aurora-ribbon-1"
          style={{
            top: '10%',
            height: '250px',
            filter: 'blur(80px)',
            background:
              'linear-gradient(90deg, transparent 0%, rgba(66,202,215,0.4) 20%, rgba(51,204,102,0.35) 45%, rgba(66,202,215,0.25) 70%, transparent 100%)',
          }}
        />
        <div
          className="aurora-ribbon aurora-ribbon-2"
          style={{
            top: '45%',
            height: '200px',
            filter: 'blur(70px)',
            background:
              'linear-gradient(90deg, transparent 0%, rgba(64,128,232,0.35) 25%, rgba(66,202,215,0.3) 55%, rgba(64,128,232,0.2) 80%, transparent 100%)',
          }}
        />
        <div
          className="aurora-ribbon aurora-ribbon-3"
          style={{
            top: '75%',
            height: '220px',
            filter: 'blur(75px)',
            background:
              'linear-gradient(90deg, transparent 0%, rgba(51,204,102,0.3) 15%, rgba(64,128,232,0.4) 50%, rgba(51,204,102,0.2) 85%, transparent 100%)',
          }}
        />
      </div>

      {/* Blueprint grid — between ribbons and content */}
      <div
        className="pointer-events-none absolute inset-0 z-[3]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(108,122,163,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(108,122,163,0.1) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Content — above grid and ribbons */}
      <div className={clsx('relative z-[5]', className)}>{children}</div>
    </div>
  )
}
