import { AuthenticationState } from '@/Store/Authentication'
import { useSelector } from 'react-redux'
export default function () {
  const currentUser = useSelector(
    (state: { authentication: AuthenticationState }) =>
      state.authentication.user,
  )
  const isLogged = useSelector(
    (state: { authentication: AuthenticationState }) =>
      state.authentication.isLogged,
  )

  return { currentUser, isLogged }
}
