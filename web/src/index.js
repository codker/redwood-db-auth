import ReactDOM from 'react-dom'
import { AuthProvider } from '@redwoodjs/auth'
import { RedwoodProvider, FatalErrorBoundary } from '@redwoodjs/web'
import FatalErrorPage from 'src/pages/FatalErrorPage'

import Routes from 'src/Routes'
import { DBClient } from 'src/lib/db-client'

import './index.css'

const dbClient = new DBClient()

ReactDOM.render(
  <FatalErrorBoundary page={FatalErrorPage}>
    <AuthProvider client={dbClient} type="custom">
      <RedwoodProvider>
        <Routes />
      </RedwoodProvider>
    </AuthProvider>
  </FatalErrorBoundary>,
  document.getElementById('redwood-app')
)
