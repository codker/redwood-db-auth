import { useAuth } from '@redwoodjs/auth'
import { useState } from 'react'

import { useSignup } from './useSignup'

const HomePage = () => {
  const { currentUser, isAuthenticated, logIn, logOut } = useAuth()
  const [signup] = useSignup()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <>
      <h1>Local Auth Example</h1>
      <p>Try to signup, you should automatically be logged in.</p>
      <p>Try to logout and login again.</p>
      <p>
        Read how it works in README.md and take a look around in the code.
        Enjoy!
      </p>
      <p>
        {isAuthenticated && (
          <a
            href=""
            onClick={(e) => {
              e.preventDefault()
              logOut()
            }}
          >
            ({currentUser.email}) Log out
          </a>
        )}
      </p>
      <div>
        {!isAuthenticated && (
          <form
            onSubmit={async (e) => {
              e.preventDefault()

              await signup({ variables: { email, password } })
              logIn({ email, password })
            }}
          >
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit">Signup</button>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                logIn({
                  email,
                  password,
                })
              }}
            >
              Log in
            </button>
          </form>
        )}
      </div>
    </>
  )
}

export default HomePage
