import React from 'react'
import { Link } from 'react-router-dom'
import { messages } from '../data/mockData'
import { Icons } from '../components/Icons'

const C = { primary: '#0a0a0a', brandGreen: '#00d4a4', white: '#ffffff', surface: '#f7f7f7', steel: '#5a5a5c', ink: '#0a0a0a', hairline: '#e5e5e5' }

export default function Messages() {
  return (
    <div style={{ minHeight: '100vh', background: C.surface }}>
      <div style={{ 
        background: C.ink, 
        color: C.white, 
        padding: '16px 24px'
      }}>
        <h1 style={{ margin: 0, fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icons.MessageCircle size={24} color={C.brandGreen} /> Nachrichten
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
          <h2 style={{ color: C.ink, margin: 0 }}>
            Nachrichten ({messages.length})
          </h2>
        </div>

        {/* Messages List */}
        {messages.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '64px 24px', 
            color: C.steel,
            background: C.white,
            borderRadius: 12,
            boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
            border: `1px solid ${C.hairline}`
          }}>
            <Icons.MessageCircle size={48} color={C.brandGreen} style={{ marginBottom: 16 }} />
            <h3 style={{ color: C.ink, marginBottom: '12px' }}>
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
            boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
            border: `1px solid ${C.hairline}`
          }}>
            {messages.map((message, index) => (
              <div 
                key={message.id} 
                style={{ 
                  padding: '16px 20px', 
                  borderBottom: index < messages.length - 1 ? `1px solid ${C.hairline}` : 'none',
                  background: !message.read ? C.surface : C.white
                }}
              >
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div 
                    style={{ 
                      width: '40px', 
                      height: '40px', 
                      borderRadius: '50%', 
                      background: C.brandGreen, 
                      color: C.ink, 
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
                          fontSize: '0.9rem',
                          color: C.ink
                        }}
                      >
                        {message.sender_name || 'Eigentümer'}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: C.steel }}>
                        {message.timestamp}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.9rem', color: C.ink, marginBottom: '4px' }}>
                      {message.property_title}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: C.steel, lineHeight: 1.5 }}>
                      {message.content}
                    </div>
                    {!message.read && <span 
                      style={{ 
                        width: '8px', 
                        height: '8px', 
                        borderRadius: '50%', 
                        background: C.brandGreen,
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