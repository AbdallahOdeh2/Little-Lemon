import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import App from '../App'

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('App Component', () => {
  it('renders navigation bar', () => {
    renderWithRouter(<App />)
    
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('renders footer', () => {
    renderWithRouter(<App />)
    
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('displays header content on home page', () => {
    renderWithRouter(<App />)
    
    expect(screen.getByText(/little lemon/i)).toBeInTheDocument()
  })

  it('renders main content area', () => {
    renderWithRouter(<App />)
    
    // Check that the main content div exists
    const mainDiv = screen.getByText(/little lemon/i).closest('div')
    expect(mainDiv).toBeInTheDocument()
  })
})
