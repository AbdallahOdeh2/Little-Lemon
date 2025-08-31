import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import Header from '../Header'

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('Header Component', () => {
  it('renders main heading correctly', () => {
    renderWithRouter(<Header />)
    
    expect(screen.getByText('Little Lemon')).toBeInTheDocument()
  })

  it('renders call-to-action button', () => {
    renderWithRouter(<Header />)
    
    expect(screen.getByRole('button', { name: 'On Click' })).toBeInTheDocument()
  })

  it('renders descriptive text', () => {
    renderWithRouter(<Header />)
    
    expect(screen.getByText(/mediterranean/i)).toBeInTheDocument()
    expect(screen.getByText(/family owned/i)).toBeInTheDocument()
  })

  it('renders location text', () => {
    renderWithRouter(<Header />)
    
    expect(screen.getByText('Amman')).toBeInTheDocument()
  })

  it('renders food image', () => {
    renderWithRouter(<Header />)
    
    const image = screen.getByAltText(/delicious mediterranean restaurant food/i)
    expect(image).toBeInTheDocument()
  })
})
