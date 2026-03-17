import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Pricing from '../Pricing'

describe('Pricing', () => {
  it('shows monthly prices by default', () => {
    render(<Pricing />)
    expect(screen.getByText('€99')).toBeInTheDocument()
    expect(screen.getByText('€199.99')).toBeInTheDocument()
  })

  it('switches to annual prices when toggled', async () => {
    const user = userEvent.setup()
    render(<Pricing />)
    await user.click(screen.getByRole('button', { name: /annual/i }))
    expect(screen.getByText('€990')).toBeInTheDocument()
    expect(screen.getByText('€1,999')).toBeInTheDocument()
  })
})
