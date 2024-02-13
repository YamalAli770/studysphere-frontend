import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export default async function UserNavbar() {  
  const session = await auth();
  return (
    <div>
      <div className="border border-b-gray-300">
        <form action={async () => {
          "use server"
          await signOut();
        }} className="py-6 px-4 flex items-center justify-end gap-3">
          <span>{JSON.stringify(session?.user)}</span>
          <Button type="submit">
            Logout
          </Button>
        </form>
      </div>
    </div>
  )
}
