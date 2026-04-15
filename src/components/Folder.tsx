import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import './Folder.css'

interface FolderItem {
  id: number
  title: string
  icon: LucideIcon
  emphasis?: 'legal' | 'warning'
  onClick: () => void
}

interface FolderProps {
  color?: string
  size?: number
  items: FolderItem[]
  className?: string
}

const darkenColor = (hex: string, percent: number): string => {
  let color = hex.startsWith('#') ? hex.slice(1) : hex
  if (color.length === 3) {
    color = color.split('').map(c => c + c).join('')
  }
  const num = parseInt(color, 16)
  let r = (num >> 16) & 0xff
  let g = (num >> 8) & 0xff
  let b = num & 0xff
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))))
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))))
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))))
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
}

export default function Folder({
  color = '#42CAD7',
  size = 2,
  items,
  className = '',
}: FolderProps) {
  const [open, setOpen] = useState(false)
  const folderBackColor = darkenColor(color, 0.08)

  const handleFolderClick = () => {
    setOpen(prev => !prev)
  }

  const handleCardClick = (e: React.MouseEvent, item: FolderItem) => {
    if (!open) return
    e.stopPropagation()
    item.onClick()
  }

  return (
    <div
      style={{ transform: `scale(${size})` }}
      className={className}
    >
      <div
        className={`folder ${open ? 'open' : ''}`}
        style={
          {
            '--folder-color': color,
            '--folder-back-color': folderBackColor,
          } as React.CSSProperties
        }
        onClick={handleFolderClick}
      >
        <div className="folder__back">
          {items.map((item, i) => {
            const Icon = item.icon
            const emphasisClass =
              item.emphasis === 'warning'
                ? 'paper--warning'
                : item.emphasis === 'legal'
                  ? 'paper--legal'
                  : ''

            return (
              <div
                key={item.id}
                className={`paper paper-${i + 1} ${emphasisClass} ${open ? 'cursor-target' : ''}`}
                onClick={(e) => handleCardClick(e, item)}
              >
                <div className="paper__content">
                  <Icon className="paper__icon" />
                  <span className="paper__title">{item.title}</span>
                </div>
              </div>
            )
          })}
          <div className="folder__front" />
          <div className="folder__front right" />
        </div>
        <span className="folder__hint">Click para explorar</span>
      </div>
    </div>
  )
}
