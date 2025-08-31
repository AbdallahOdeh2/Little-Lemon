import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import Navbar from '../Navbar'

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('Navbar Component', () => {
  it('renders navigation links correctly', () => {
    renderWithRouter(<Navbar />)
    
    expect(screen.getByText(/home/i)).toBeInTheDocument()
    expect(screen.getByText(/menu/i)).toBeInTheDocument()
    expect(screen.getByText(/reservations/i)).toBeInTheDocument()
  })

  it('renders logo image', () => {
    renderWithRouter(<Navbar />)
    
    const logo = screen.getByAltText(/logo image/i)
    expect(logo).toBeInTheDocument()
  })

  it('has proper navigation structure', () => {
    renderWithRouter(<Navbar />)
    
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
  })

  it('renders mobile menu button', () => {
    renderWithRouter(<Navbar />)
    
    expect(screen.getByText('☰')).toBeInTheDocument()
  })
})
