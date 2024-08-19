import { auth, signOut } from "@/auth";
import { Button } from "@nextui-org/react";

export default async function Home() {
  const session = await auth()
  return (
    <div>
      <h1 className="text-3xl text-black-500 font-semibold justify-center text-center flex">Home</h1>
      <h3 className="text-2xl font-semibold">User session data:</h3>
      {
        session ? (
          <div>
            <pre>{JSON.stringify(session,null,2)}</pre>
            <form action={async () => {
              'use server'
              await signOut()
            }}>
              <Button
                type="submit"
                color="primary"
                variant="bordered"
              >
                Sign Out
              </Button>
            </form>
          </div>
        ):(
          <div>Not Signed In</div>
        )
      }
    </div>
  );
}
