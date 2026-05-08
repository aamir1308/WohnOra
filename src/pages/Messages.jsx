import React from 'react'
import { Link } from 'react-router-dom'
import { messages } from '../data/mockData'
import { Icons } from '../components/Icons'

const C = { primary: '#C1121f', darkRed: '#780000', accent: '#669bbc', cream: '#fdf0d5', navy: '#003049', white: '#fff', muted: '#666' }

export default function Messages() {
  return (
    <div style={{ minHeight: '100vh', background: C.cream }}>
      <div style={{ 
        background: `linear-gradient(135deg, ${C.darkRed}, ${C.navy})`, 
        color: 'white', 
        padding: '16px 24px'
      }}>
        <h1 style={{ margin: 0, fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icons.MessageCircle size={24} color={C.accent} /> Nachrichten
        </h1>
        <p style={{ margin: '4px 0 0 0', opacity: 0.9, fontSize: '0.9rem' }}>
          Deine Konversationen mit Vermietern und Verkäufern
        </p>
      </div>

      <div style={{ 
        maxWidth: '1200px', 
        margin: '32px auto', 
        padding: '0 24px'
      }}>
        {/* Messages Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '24px'
        }}>
          <h2 style={{ color: C.primary, margin: 0 }}>
            Nachrichten ({messages.length})
          </h2>
        </div>

        {/* Messages List */}
        {messages.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '64px 24px', 
            color: '#666',
            background: C.white,
            borderRadius: 12,
            boxShadow: '0 2px 12px rgba(0,0,0,0.1)'
          }}>
            <Icons.MessageCircle size={48} color={C.primary} style={{ marginBottom: 16 }} />
            <h3 style={{ color: C.primary, marginBottom: '12px' }}>
              Noch keine Nachrichten
            </h3>
            <p>
              Sobald du eine Anfrage sendest oder eine erhältst, erscheinen sie hier.
            </p>
          </div>
        ) : (
          <div style={{ 
            background: C.white, 
            borderRadius: '12px', 
            overflow: 'hidden', 
            boxShadow: '0 2px 12px rgba(0,0,0,0.1)'
          }}>
            {messages.map((message, index) => (
              <div 
                key={message.id} 
                style={{ 
                  padding: '16px 20px', 
                  borderBottom: index < messages.length - 1 ? '1px solid #eee' : 'none',
                  background: !message.read ? C.cream : 'white'
                }}
              >
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div 
                    style={{ 
                      width: '40px', 
                      height: '40px', 
                      borderRadius: '50%', 
                      background: C.primary, 
                      color: 'white', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontWeight: 600,
                      fontSize: '1rem',
                      flexShrink: 0
                    }}
                  >
                    {(message.sender_name || 'E').charAt(0)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span 
                        style={{ 
                          fontWeight: message.read ? 500 : 700, 
                          fontSize: '0.9rem' 
                        }}
                      >
                        {message.sender_name || 'Eigentümer'}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: '#666' }}>
                        {message.timestamp}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#333', marginBottom: '4px' }}>
                      {message.property_title}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#222', lineHeight: 1.5 }}>
                      {message.content}
                    </div>
                    {!message.read && <span 
                      style={{ 
                        width: '8px', 
                        height: '8px', 
                        borderRadius: '50%', 
                        background: C.primary,
                        flexShrink: 0, 
                        marginTop: '6px' 
                      }}
                    />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}