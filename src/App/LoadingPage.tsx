import * as React from 'react'
import './LoadingPage.css'
import { SkutanLogo } from './SkutanLogo'

export const LoadingPage = () => (
  <div aria-busy="true" className="LoadingPage">
    <SkutanLogo className="App-logo" />
  </div>
)
