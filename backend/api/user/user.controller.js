export async function login(req, res) {
  const { username, password } = req.body

  try {
    const user = await userService.login(username, password)

    const loginToken = authService.getLoginToken(user)

    res.cookie('loginToken', loginToken, { sameSite: 'None', secure: true })
    res.json(user)
  } catch (err) {
    res.status(401).send({ err: 'Failed to Login' })
  }
}

export async function signUp(req, res) {
    try {
        const credentials = req.body
    
        // Don't log sensitive data like passwords
        const account = await authService.signup(credentials)
    
        const user = await authService.login(
        credentials.username,
        credentials.password
        )
    
        const loginToken = authService.getLoginToken(user)
        res.cookie('loginToken', loginToken, { sameSite: 'None', secure: true })
    
        res.json(user)
    } catch (err) {
        res.status(400).send({ err: 'Failed to signup' })
    }
}