import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import App from './App'
import { SITE_NAME } from './site'

// The template ships no tests; this is the welcome page as it behaves.
afterEach(cleanup)

describe('the welcome page', () => {
  it("is headed by the site's name", () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(SITE_NAME)
  })

  it('links the Vite and React logos to their docs', () => {
    render(<App />)
    expect(screen.getByAltText('Vite logo').closest('a')?.getAttribute('href')).toBe('https://vitejs.dev')
    expect(screen.getByAltText('React logo').closest('a')?.getAttribute('href')).toBe('https://react.dev')
  })

  it('counts each click', () => {
    render(<App />)
    const button = screen.getByRole('button')
    expect(button.textContent).toBe('count is 0')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(button.textContent).toBe('count is 2')
  })

  it('keeps the HMR hint and the docs line', () => {
    render(<App />)
    expect(screen.getByText(/and save to test HMR/).textContent).toBe('Edit src/App.tsx and save to test HMR')
    expect(screen.getByText('Click on the Vite and React logos to learn more')).toBeTruthy()
  })
})
