// "use client"

// import { useState } from "react"
// import Link from "next/link"
// import { Menu, X, Sun, Moon, User, Settings, LogOut } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { useTheme } from "next-themes"

// const navigation = [
//   { name: "Home", href: "/" },
//   { name: "About", href: "/about" },
//   { name: "Services", href: "/services" },
//   { name: "Contact", href: "/contact" },
// ]

// export function Header() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
//   const { theme, setTheme } = useTheme()

//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex h-16 items-center justify-between">
//           {/* Logo */}
//           <div className="flex items-center">
//             <Link href="/" className="flex items-center space-x-2">
//               <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
//                 <span className="text-primary-foreground font-bold text-lg">L</span>
//               </div>
//               <span className="font-bold text-xl">Logo</span>
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center space-x-8">
//             {navigation.map((item) => (
//               <Link
//                 key={item.name}
//                 href={item.href}
//                 className="text-foreground/80 hover:text-foreground transition-colors duration-200 font-medium"
//               >
//                 {item.name}
//               </Link>
//             ))}
//           </nav>

//           {/* Desktop Actions */}
//           <div className="hidden md:flex items-center space-x-4">
//             {/* Dark Mode Toggle */}
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//               className="h-9 w-9"
//             >
//               <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
//               <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
//               <span className="sr-only">Toggle theme</span>
//             </Button>

//             {/* User Menu */}
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" className="relative h-9 w-9 rounded-full">
//                   <Avatar className="h-9 w-9">
//                     <AvatarImage src="/diverse-user-avatars.png" alt="User" />
//                     <AvatarFallback>JD</AvatarFallback>
//                   </Avatar>
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent className="w-56" align="end" forceMount>
//                 <div className="flex items-center justify-start gap-2 p-2">
//                   <div className="flex flex-col space-y-1 leading-none">
//                     <p className="font-medium">John Doe</p>
//                     <p className="w-[200px] truncate text-sm text-muted-foreground">john.doe@example.com</p>
//                   </div>
//                 </div>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem>
//                   <User className="mr-2 h-4 w-4" />
//                   <span>Profile</span>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem>
//                   <Settings className="mr-2 h-4 w-4" />
//                   <span>Settings</span>
//                 </DropdownMenuItem>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem>
//                   <LogOut className="mr-2 h-4 w-4" />
//                   <span>Log out</span>
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden flex items-center space-x-2">
//             {/* Mobile Dark Mode Toggle */}
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//               className="h-9 w-9"
//             >
//               <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
//               <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
//               <span className="sr-only">Toggle theme</span>
//             </Button>

//             <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="h-9 w-9">
//               {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
//               <span className="sr-only">Toggle menu</span>
//             </Button>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {mobileMenuOpen && (
//           <div className="md:hidden">
//             <div className="px-2 pt-2 pb-3 space-y-1 border-t">
//               {navigation.map((item) => (
//                 <Link
//                   key={item.name}
//                   href={item.href}
//                   className="block px-3 py-2 text-base font-medium text-foreground/80 hover:text-foreground hover:bg-accent rounded-md transition-colors duration-200"
//                   onClick={() => setMobileMenuOpen(false)}
//                 >
//                   {item.name}
//                 </Link>
//               ))}

//               {/* Mobile User Menu */}
//               <div className="pt-4 pb-3 border-t">
//                 <div className="flex items-center px-3">
//                   <Avatar className="h-10 w-10">
//                     <AvatarImage src="/diverse-user-avatars.png" alt="User" />
//                     <AvatarFallback>JD</AvatarFallback>
//                   </Avatar>
//                   <div className="ml-3">
//                     <div className="text-base font-medium">John Doe</div>
//                     <div className="text-sm text-muted-foreground">john.doe@example.com</div>
//                   </div>
//                 </div>
//                 <div className="mt-3 space-y-1">
//                   <Link
//                     href="/profile"
//                     className="flex items-center px-3 py-2 text-base font-medium text-foreground/80 hover:text-foreground hover:bg-accent rounded-md transition-colors duration-200"
//                     onClick={() => setMobileMenuOpen(false)}
//                   >
//                     <User className="mr-3 h-4 w-4" />
//                     Profile
//                   </Link>
//                   <Link
//                     href="/settings"
//                     className="flex items-center px-3 py-2 text-base font-medium text-foreground/80 hover:text-foreground hover:bg-accent rounded-md transition-colors duration-200"
//                     onClick={() => setMobileMenuOpen(false)}
//                   >
//                     <Settings className="mr-3 h-4 w-4" />
//                     Settings
//                   </Link>
//                   <button
//                     className="flex items-center w-full px-3 py-2 text-base font-medium text-foreground/80 hover:text-foreground hover:bg-accent rounded-md transition-colors duration-200 text-left"
//                     onClick={() => setMobileMenuOpen(false)}
//                   >
//                     <LogOut className="mr-3 h-4 w-4" />
//                     Log out
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </header>
//   )
// }
