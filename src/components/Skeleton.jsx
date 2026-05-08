import React from 'react'

export const Skeleton = ({ width = '100%', height = 20, borderRadius = 4, style = {} }) => (
  <div 
    style={{
      width,
      height,
      borderRadius,
      background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
      backgroundSize: '200% 100%',
      animation: 'loading 1.5s infinite',
      ...style
    }}
    aria-hidden="true"
  />
)

export const PropertyCardSkeleton = () => (
  <div 
    style={{
      background: '#fff', 
      borderRadius: 12, 
      overflow: 'hidden',
      boxShadow: '0 2px 12px rgba(0,0,0,0.1)'
    }}
    aria-hidden="true"
  >
    <Skeleton height={200} borderRadius={0} />
    <div style={{ padding: '16px' }}>
      <Skeleton width="40%" height={24} style={{ marginBottom: 12 }} />
      <Skeleton width="70%" height={18} style={{ marginBottom: 8 }} />
      <Skeleton width="50%" height={14} style={{ marginBottom: 12 }} />
      <div style={{ display: 'flex', gap: 12 }}>
        <Skeleton width={60} height={14} />
        <Skeleton width={60} height={14} />
      </div>
    </div>
  </div>
)

export const PropertyListSkeleton = ({ count = 6 }) => (
  <div style={{ 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
    gap: '24px' 
  }}>
    {Array.from({ length: count }).map((_, i) => (
      <PropertyCardSkeleton key={i} />
    ))}
  </div>
)

export const TextSkeleton = ({ lines = 3 }) => (
  <div aria-hidden="true">
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton 
        key={i} 
        width={i === lines - 1 ? '60%' : '100%'} 
        height={14} 
        style={{ marginBottom: 8 }} 
      />
    ))}
  </div>
)

export default Skeleton