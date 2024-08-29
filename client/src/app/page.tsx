import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ChevronRight } from "lucide-react"
import LoginPage from "./(auth)/login/page";
import Link from "next/link";
import ButtonRedirect from "./components/ButtonRedirect";
import { redirect } from "next/navigation";

const isAuth = true
export default function Home() {
  if (!isAuth) {
    redirect('/login')
  }

 
  return (

    <main>
     <ButtonRedirect />
    </main>

  )
}