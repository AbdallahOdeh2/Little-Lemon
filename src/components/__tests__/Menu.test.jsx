import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import Menu from '../Menu'

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('Menu Component', () => {
  it('renders menu heading correctly', () => {
    renderWithRouter(<Menu />)
    
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(screen.getByText(/our special menu/i)).toBeInTheDocument()
  })

  it('renders menu description', () => {
    renderWithRouter(<Menu />)
    
    expect(screen.getByText(/mediterranean dishes/i)).toBeInTheDocument()
    expect(screen.getByText(/finest ingredients/i)).toBeInTheDocument()
  })

  it('displays back to home link', () => {
    renderWithRouter(<Menu />)
    
    expect(screen.getByText(/back to home/i)).toBeInTheDocument()
  })

  it('shows call to action section', () => {
    renderWithRouter(<Menu />)
    
    expect(screen.getByText(/hungry for more/i)).toBeInTheDocument()
    expect(screen.getByText(/reserve your table/i)).toBeInTheDocument()
  })
})
