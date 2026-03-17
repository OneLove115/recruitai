import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import OtpInput from '../OtpInput'

describe('OtpInput', () => {
  it('renders 6 input boxes', () => {
    render(<OtpInput value="" onChange={() => {}} />)
    const inputs = screen.getAllByRole('textbox')
    expect(inputs).toHaveLength(6)
  })

  it('calls onChange with concatenated value as digits are entered', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<OtpInput value="" onChange={onChange} />)
    const inputs = screen.getAllByRole('textbox')
    await user.type(inputs[0], '1')
    expect(onChange).toHaveBeenCalledWith('1')
  })
})
