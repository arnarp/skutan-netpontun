import * as React from 'react'
import './LoadingPage.css'
import { SkutanLogo } from './SkutanLogo'

export const LoadingPage = () => (
  <div aria-busy="true" className="LoadingPage">
    <SkutanLogo className="App-logo" />
    <h1>Hleður</h1>
  </div>
)
