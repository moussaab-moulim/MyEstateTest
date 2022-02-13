export default {
  welcome: 'Welcome to React Native MyEstateTest by moussaab',
  actions: {
    continue: 'Continue',
  },
  example: {
    helloUser: 'I am a fake user, my name is {{name}}',
    labels: {
      userId: 'Enter a user id',
    },
  },
  signIn: {
    form: {
      title: 'sign in',
      fields: {
        email: {
          label: 'email',
          placeholde: 'your email',
        },
        password: {
          label: 'password',
          placeholde: 'your password',
          condition: 'must be between 6 and 32 caracters',
        },
      },
      errors: {
        required: '{{field}} cannot be empty',
        format: 'invalid {{field}} format.',
        credentials: 'no user found with these credentials',
      },
    },
  },
}
