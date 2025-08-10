import ThemeToggle from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="p-5">
      <div className="flex w-100 justify-end gap-x-5">
        <UserButton />
        <ThemeToggle />
      </div>
      <h1 className="font-barlow text-3xl font-bold text-blue-900">
        Home Page
      </h1>

      <Button variant={"destructive"}>Click Here</Button>
    </div>
  );
}
