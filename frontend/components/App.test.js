// Write your tests here
import AppClass from './AppClass.js'
import { render, screen, waitFor } from '@testing-library/react';


test('App renders', () => {
  render(<AppClass/>)
})
