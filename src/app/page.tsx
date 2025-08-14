import ThemeToggle from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { UserButton, SignInButton, useUser } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = await auth();

  return (
    <div className="p-5">
      <div className="mb-4 flex w-100 justify-end gap-x-5">
        {userId ? (
          <UserButton />
        ) : (
          <SignInButton>
            <Button>Entrar</Button>
          </SignInButton>
        )}
        {/* <ThemeToggle /> */}
      </div>

      <h1 className="font-barlow text-3xl font-bold text-blue-900">
        Home Page
      </h1>

      <Button variant={"destructive"}>Click Here</Button>

      {userId && (
        <p className="mt-4 text-green-600">Usuário autenticado! ID: {userId}</p>
      )}
    </div>
  );
}
