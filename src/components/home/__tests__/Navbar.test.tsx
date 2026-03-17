import { render, screen } from '@testing-library/react'
import Navbar from '../Navbar'

describe('Navbar', () => {
  it('renders logo text', () => {
    render(<Navbar />)
    expect(screen.getByText((content, element) => element?.tagName === 'SPAN' && /RecruitAI/i.test(element?.textContent || ''))).toBeInTheDocument()
  })

  it('renders Start Free Trial CTA', () => {
    render(<Navbar />)
    expect(screen.getByRole('link', { name: /start free trial/i })).toBeInTheDocument()
  })
})
