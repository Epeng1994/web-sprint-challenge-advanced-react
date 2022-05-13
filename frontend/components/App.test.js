// Write your tests here
import AppClass from './AppClass.js'
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';


test('App renders', () => {
  render(<AppClass/>)
})

test('Arrows are present', () => {
  render(<AppClass/>)
  expect(screen.getByText(/UP/i)).toBeInTheDocument()
  expect(screen.getByText(/DOWN/i)).toBeInTheDocument()
  expect(screen.getByText(/LEFT/i)).toBeInTheDocument()
  expect(screen.getByText(/RIGHT/i)).toBeInTheDocument()
})

test('Moves/Coordinates change upon click', () => {
  render(<AppClass/>)
  const upArrow = screen.getByText(/UP/i)
  fireEvent.click(upArrow)
  expect(screen.getByText('You moved 1 time')).toBeInTheDocument()
  expect(screen.getByText('Coordinates (2,1)')).toBeInTheDocument()
})

test('Email is present and accepts input', () => {
  render(<AppClass/>)
  const emailBox = screen.getByPlaceholderText('type email')
  fireEvent.change(email, { target: { value: 'lady@gaga.com' } })
})

test('Error appears when out of bounds', () => {
  render(<AppClass/>)
  const upArrow = screen.getByText(/UP/i)
  fireEvent.click(upArrow)
  fireEvent.click(upArrow)
  expect(screen.getByText('You can\'t go up')).toBeInTheDocument()
})