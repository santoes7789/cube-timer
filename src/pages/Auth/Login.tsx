// import { type ActionFunctionArgs, Link, redirect, useFetcher } from 'react-router'
//
// export const action = async ({ request }: ActionFunctionArgs) => {
//   const { supabase, headers } = createClient(request)
//
//   const formData = await request.formData()
//
//   const email = formData.get('email') as string
//   const password = formData.get('password') as string
//
//   const { error } = await supabase.auth.signInWithPassword({
//     email,
//     password,
//   })
//
//   if (error) {
//     return {
//       error: error instanceof Error ? error.message : 'An error occurred',
//     }
//   }
//
//   // Update this route to redirect to an authenticated route. The user already has an active session.
//   return redirect('/protected', { headers })
// }

function Login() {
  // const fetcher = useFetcher<typeof action>()
  //
  // const error = fetcher.data?.error
  // const loading = fetcher.state === 'submitting'

  return (
    <div className="popout-container">

    </div>
  )
}

export default Login;
