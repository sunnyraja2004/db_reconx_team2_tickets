import React from 'react';

export default function PageSkeleton() {
  return (
    <div
      style={{
        padding: '24px'
      }}
    >
      <div
        style={{
          height: '32px',
          width: '220px',
          background: '#e5e5e5',
          marginBottom: '20px',
          borderRadius: '6px'
        }}
      />

      {[1, 2, 3].map((item) => (
        <div
          key={item}
          style={{
            height: '70px',
            background: '#f3f3f3',
            borderRadius: '6px',
            marginBottom: '12px'
          }}
        />
      ))}
    </div>
  );
}
