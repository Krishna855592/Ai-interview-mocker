import { SignIn } from '@clerk/nextjs'


export default function Page() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex justify-center h-screen">
        {/* Left image panel */}
        <div
          className="hidden bg-cover lg:block lg:w-2/3"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')",
          }}
        >
          <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">Welcome To Ai Interview Mocker</h2>
              <p className="max-w-xl mt-3 text-gray-300">
                Prepare yourself with AI-powered mock interviews for your dream job. Our platform helps you practice with real-world scenarios, giving you the edge you need to succeed in your job interviews.

              </p>
            </div>
          </div>
        </div>

        {/* Right sign-in panel */}
        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              {/* Logo removed */}
              <p className="mt-3 text-gray-500 dark:text-gray-300">
                Sign in to access your account
              </p>
            </div>

            <div className="mt-8">
              <SignIn />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
