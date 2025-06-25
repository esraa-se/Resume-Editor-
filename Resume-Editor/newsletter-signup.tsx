import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Mail, Facebook, Twitter, Github, Shield } from "lucide-react"

export default function Component() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            {/* Brand Logo */}
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center mb-6">
              <Mail className="w-8 h-8 text-white" />
            </div>

            {/* Headlines */}
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Subscribe to My Newsletter</h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              Get the latest insights, tips, and exclusive content delivered straight to your inbox every week.
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Social Sign-up Options */}
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-3">
                <Button variant="outline" className="h-11 border-gray-200 hover:bg-gray-50">
                  <Facebook className="w-5 h-5 text-blue-600" />
                </Button>
                <Button variant="outline" className="h-11 border-gray-200 hover:bg-gray-50">
                  <Twitter className="w-5 h-5 text-sky-500" />
                </Button>
                <Button variant="outline" className="h-11 border-gray-200 hover:bg-gray-50">
                  <Github className="w-5 h-5 text-gray-900" />
                </Button>
              </div>
            </div>

            <div className="relative">
              <Separator />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white px-3 text-xs text-gray-500 uppercase tracking-wide">
                  Or continue with email
                </span>
              </div>
            </div>

            {/* Email Form */}
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="h-11 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>

              <Button type="submit" className="w-full h-11 bg-purple-600 hover:bg-purple-700 text-white font-medium">
                Subscribe Now
              </Button>
            </form>

            {/* Additional Links */}
            <div className="flex justify-center space-x-6 text-xs">
              <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors">
                Terms
              </a>
              <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors">
                Privacy
              </a>
              <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors">
                Help
              </a>
            </div>

            {/* Trust Indicator */}
            <div className="flex items-center justify-center space-x-2 pt-4 border-t border-gray-100">
              <Shield className="w-4 h-4 text-green-600" />
              <span className="text-xs text-gray-600">We respect your privacy</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
