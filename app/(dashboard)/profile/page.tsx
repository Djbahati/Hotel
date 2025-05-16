"use client"

import { Checkbox } from "@/components/ui/checkbox"

import { useState, useRef } from "react"
import { Camera, Save, Trash2, Shield, Eye, EyeOff, CheckCircle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export default function ProfilePage() {
  // State for profile data
  const [profile, setProfile] = useState({
    fullName: "John Doe",
    username: "johndoe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    dob: new Date(1990, 0, 1),
    gender: "male",
    nationalId: "",
    passportNumber: "",
    address: "123 Main St, Anytown, USA",
    bio: "Hotel manager with 5 years of experience in hospitality industry.",
    emailNotifications: true,
    smsNotifications: true,
    marketingEmails: false,
    twoFactorAuth: false,
  })

  // State for profile picture
  const [profilePicture, setProfilePicture] = useState("/placeholder.svg?height=200&width=200")
  const [isUploading, setIsUploading] = useState(false)
  const [showCropper, setShowCropper] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  })
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [activeTab, setActiveTab] = useState("personal")
  const [unsavedChanges, setUnsavedChanges] = useState(false)

  const fileInputRef = useRef(null)

  // Handle profile picture upload
  const handleProfilePictureUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setIsUploading(true)

      // Simulate upload delay
      setTimeout(() => {
        const reader = new FileReader()
        reader.onload = (event) => {
          setProfilePicture(event.target.result)
          setIsUploading(false)
          setUnsavedChanges(true)
        }
        reader.readAsDataURL(file)
      }, 1000)
    }
  }

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }))
    setUnsavedChanges(true)

    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }))
    }
  }

  // Handle switch changes
  const handleSwitchChange = (name, checked) => {
    setProfile((prev) => ({
      ...prev,
      [name]: checked,
    }))
    setUnsavedChanges(true)
  }

  // Handle date change
  const handleDateChange = (date) => {
    setProfile((prev) => ({
      ...prev,
      dob: date,
    }))
    setUnsavedChanges(true)
  }

  // Handle password change
  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPassword((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Calculate password strength if changing new password
    if (name === "new") {
      calculatePasswordStrength(value)
    }
  }

  // Calculate password strength
  const calculatePasswordStrength = (password) => {
    let strength = 0

    if (password.length >= 8) strength += 1
    if (/[A-Z]/.test(password)) strength += 1
    if (/[a-z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1

    setPasswordStrength(strength)
  }

  // Handle save profile
  const handleSaveProfile = () => {
    // Validate form
    const newErrors = {}

    if (!profile.fullName.trim()) newErrors.fullName = "Full name is required"
    if (!profile.username.trim()) newErrors.username = "Username is required"
    if (!profile.email.trim()) newErrors.email = "Email is required"
    if (profile.email && !/^\S+@\S+\.\S+$/.test(profile.email)) newErrors.email = "Invalid email format"

    // Password validation
    if (activeTab === "security") {
      if (password.new && !password.current) newErrors.current = "Current password is required"
      if (password.new && password.new !== password.confirm) newErrors.confirm = "Passwords do not match"
      if (password.new && password.new.length < 8) newErrors.new = "Password must be at least 8 characters"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Simulate saving
    setIsSaving(true)

    setTimeout(() => {
      setIsSaving(false)
      setSaveSuccess(true)
      setUnsavedChanges(false)

      // Reset password fields
      if (activeTab === "security") {
        setPassword({
          current: "",
          new: "",
          confirm: "",
        })
      }

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false)
      }, 3000)
    }, 1500)
  }

  // Handle remove profile picture
  const handleRemoveProfilePicture = () => {
    setProfilePicture("/placeholder.svg?height=200&width=200")
    setUnsavedChanges(true)
  }

  // Password strength indicator
  const renderPasswordStrength = () => {
    const strengthLabels = ["Very Weak", "Weak", "Medium", "Strong", "Very Strong"]
    const strengthColors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-400", "bg-green-600"]

    return (
      <div className="mt-2">
        <div className="text-sm mb-1">{strengthLabels[passwordStrength]}</div>
        <div className="flex gap-1 h-1">
          {[0, 1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className={cn(
                "flex-1 rounded-full",
                index < passwordStrength ? strengthColors[passwordStrength] : "bg-gray-200",
              )}
            />
          ))}
        </div>
      </div>
    )
  }

  // Warn about unsaved changes when changing tabs
  const handleTabChange = (value) => {
    if (unsavedChanges) {
      if (window.confirm("You have unsaved changes. Are you sure you want to leave this tab?")) {
        setActiveTab(value)
      }
    } else {
      setActiveTab(value)
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>
        <div className="flex items-center gap-4">
          {unsavedChanges && <span className="text-sm text-amber-600">You have unsaved changes</span>}
          <Button onClick={handleSaveProfile} disabled={isSaving || !unsavedChanges}>
            {isSaving ? (
              <>Saving...</>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      {saveSuccess && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-600">Success</AlertTitle>
          <AlertDescription>Your profile has been updated successfully.</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Profile sidebar */}
        <Card className="md:col-span-1">
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-white shadow">
                  {isUploading ? (
                    <div className="h-full w-full flex items-center justify-center bg-gray-100">
                      <span className="text-sm text-gray-500">Uploading...</span>
                    </div>
                  ) : (
                    <img
                      src={profilePicture || "/placeholder.svg"}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <div className="absolute bottom-0 right-0 flex space-x-1">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-8 w-8 rounded-full shadow"
                    onClick={() => fileInputRef.current.click()}
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                  {profilePicture !== "/placeholder.svg?height=200&width=200" && (
                    <Button
                      size="icon"
                      variant="destructive"
                      className="h-8 w-8 rounded-full shadow"
                      onClick={handleRemoveProfilePicture}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleProfilePictureUpload}
                />
              </div>

              <div className="text-center">
                <h3 className="font-medium text-lg">{profile.fullName}</h3>
                <p className="text-sm text-muted-foreground">@{profile.username}</p>
              </div>

              <Separator />

              <div className="w-full">
                <h4 className="font-medium mb-2">Account Status</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Email Verified</span>
                    <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                      Verified
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">2FA</span>
                    <Badge
                      variant={profile.twoFactorAuth ? "outline" : "secondary"}
                      className={profile.twoFactorAuth ? "bg-green-50 text-green-600 border-green-200" : ""}
                    >
                      {profile.twoFactorAuth ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Account Type</span>
                    <Badge>Admin</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main content */}
        <div className="md:col-span-3 space-y-6">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            {/* Personal Information Tab */}
            <TabsContent value="personal" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details and contact information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={profile.fullName}
                        onChange={handleInputChange}
                        className={errors.fullName ? "border-red-500" : ""}
                      />
                      {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="username">
                        Username <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="username"
                        name="username"
                        value={profile.username}
                        onChange={handleInputChange}
                        className={errors.username ? "border-red-500" : ""}
                      />
                      {errors.username && <p className="text-sm text-red-500">{errors.username}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email Address <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={profile.email}
                        onChange={handleInputChange}
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" name="phone" value={profile.phone} onChange={handleInputChange} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dob">Date of Birth</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !profile.dob && "text-muted-foreground",
                            )}
                          >
                            {profile.dob ? format(profile.dob, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={profile.dob} onSelect={handleDateChange} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select
                        value={profile.gender}
                        onValueChange={(value) => {
                          setProfile((prev) => ({ ...prev, gender: value }))
                          setUnsavedChanges(true)
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="non-binary">Non-binary</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                          <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" name="address" value={profile.address} onChange={handleInputChange} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      name="bio"
                      rows={4}
                      className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={profile.bio}
                      onChange={handleInputChange}
                    />
                    <p className="text-sm text-muted-foreground">
                      Brief description for your profile. URLs are hyperlinked.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Identification</CardTitle>
                  <CardDescription>Optional identification information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Alert variant="outline" className="bg-blue-50 border-blue-200">
                    <Info className="h-4 w-4 text-blue-600" />
                    <AlertTitle className="text-blue-600">Optional Information</AlertTitle>
                    <AlertDescription>
                      This information is optional and will be used only for verification purposes when required.
                    </AlertDescription>
                  </Alert>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="nationalId">National ID Number</Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="w-80">
                                Your National ID will be encrypted and used only for verification purposes.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <Input
                        id="nationalId"
                        name="nationalId"
                        value={profile.nationalId}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="passportNumber">Passport Number</Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="w-80">
                                Your Passport Number will be encrypted and used only for verification purposes.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <Input
                        id="passportNumber"
                        name="passportNumber"
                        value={profile.passportNumber}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>Update your password to keep your account secure</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="current"
                          name="current"
                          type={showPassword ? "text" : "password"}
                          value={password.current}
                          onChange={handlePasswordChange}
                          className={errors.current ? "border-red-500 pr-10" : "pr-10"}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {errors.current && <p className="text-sm text-red-500">{errors.current}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="new">New Password</Label>
                      <div className="relative">
                        <Input
                          id="new"
                          name="new"
                          type={showPassword ? "text" : "password"}
                          value={password.new}
                          onChange={handlePasswordChange}
                          className={errors.new ? "border-red-500 pr-10" : "pr-10"}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {errors.new && <p className="text-sm text-red-500">{errors.new}</p>}
                      {password.new && renderPasswordStrength()}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm">Confirm New Password</Label>
                      <Input
                        id="confirm"
                        name="confirm"
                        type={showPassword ? "text" : "password"}
                        value={password.confirm}
                        onChange={handlePasswordChange}
                        className={errors.confirm ? "border-red-500" : ""}
                      />
                      {errors.confirm && <p className="text-sm text-red-500">{errors.confirm}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Password requirements:</p>
                    <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                      <li>At least 8 characters long</li>
                      <li>Must include at least one uppercase letter</li>
                      <li>Must include at least one lowercase letter</li>
                      <li>Must include at least one number</li>
                      <li>Must include at least one special character</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                  <CardDescription>Add an extra layer of security to your account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Two-Factor Authentication</div>
                      <div className="text-sm text-muted-foreground">
                        Protect your account with an additional security layer
                      </div>
                    </div>
                    <Switch
                      checked={profile.twoFactorAuth}
                      onCheckedChange={(checked) => handleSwitchChange("twoFactorAuth", checked)}
                    />
                  </div>

                  {profile.twoFactorAuth && (
                    <div className="pt-4 space-y-4">
                      <div className="p-4 border rounded-lg bg-muted">
                        <div className="text-center space-y-4">
                          <div className="mx-auto w-40 h-40 bg-white p-2 rounded-lg">
                            <img src="/placeholder.svg?height=160&width=160" alt="QR Code" className="w-full h-full" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Scan this QR code with your authenticator app</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              We recommend using Google Authenticator or Authy
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="verificationCode">Verification Code</Label>
                        <Input id="verificationCode" placeholder="Enter 6-digit code" maxLength={6} />
                        <p className="text-sm text-muted-foreground">
                          Enter the 6-digit code from your authenticator app to verify setup
                        </p>
                      </div>

                      <Button className="w-full">Verify and Activate</Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Data and Privacy</CardTitle>
                  <CardDescription>Manage your data and privacy settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-muted-foreground" />
                      <h3 className="font-medium">Data Protection</h3>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      Your personal data is encrypted and stored securely. We never share your information with third
                      parties without your explicit consent.
                    </p>

                    <div className="pt-2">
                      <Button variant="outline">Download My Data</Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium">Account Actions</h3>

                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        Deactivate Account
                      </Button>
                      <p className="text-xs text-muted-foreground">
                        Temporarily disable your account. You can reactivate it anytime.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        Delete Account
                      </Button>
                      <p className="text-xs text-muted-foreground">
                        Permanently delete your account and all associated data. This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Email Notifications</div>
                        <div className="text-sm text-muted-foreground">Receive notifications via email</div>
                      </div>
                      <Switch
                        checked={profile.emailNotifications}
                        onCheckedChange={(checked) => handleSwitchChange("emailNotifications", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">SMS Notifications</div>
                        <div className="text-sm text-muted-foreground">Receive notifications via text message</div>
                      </div>
                      <Switch
                        checked={profile.smsNotifications}
                        onCheckedChange={(checked) => handleSwitchChange("smsNotifications", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Marketing Emails</div>
                        <div className="text-sm text-muted-foreground">Receive promotional emails and offers</div>
                      </div>
                      <Switch
                        checked={profile.marketingEmails}
                        onCheckedChange={(checked) => handleSwitchChange("marketingEmails", checked)}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium">Notification Types</h3>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start space-x-3">
                          <Checkbox id="notify-bookings" defaultChecked />
                          <div className="space-y-1 leading-none">
                            <Label htmlFor="notify-bookings" className="font-medium">
                              Booking Updates
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Notifications about your bookings and reservations
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <Checkbox id="notify-messages" defaultChecked />
                          <div className="space-y-1 leading-none">
                            <Label htmlFor="notify-messages" className="font-medium">
                              New Messages
                            </Label>
                            <p className="text-sm text-muted-foreground">Notifications when you receive new messages</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <Checkbox id="notify-system" defaultChecked />
                          <div className="space-y-1 leading-none">
                            <Label htmlFor="notify-system" className="font-medium">
                              System Alerts
                            </Label>
                            <p className="text-sm text-muted-foreground">Important system notifications and updates</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <Checkbox id="notify-offers" />
                          <div className="space-y-1 leading-none">
                            <Label htmlFor="notify-offers" className="font-medium">
                              Special Offers
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Notifications about promotions and special offers
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Display Preferences</CardTitle>
                  <CardDescription>Customize your display settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Theme</h3>

                    <RadioGroup defaultValue="system" className="grid grid-cols-3 gap-4">
                      <div>
                        <RadioGroupItem value="light" id="theme-light" className="peer sr-only" />
                        <Label
                          htmlFor="theme-light"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 hover:border-gray-300 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mb-3 h-6 w-6"
                          >
                            <circle cx="12" cy="12" r="4" />
                            <path d="M12 2v2" />
                            <path d="M12 20v2" />
                            <path d="m4.93 4.93 1.41 1.41" />
                            <path d="m17.66 17.66 1.41 1.41" />
                            <path d="M2 12h2" />
                            <path d="M20 12h2" />
                            <path d="m6.34 17.66-1.41 1.41" />
                            <path d="m19.07 4.93-1.41 1.41" />
                          </svg>
                          Light
                        </Label>
                      </div>

                      <div>
                        <RadioGroupItem value="dark" id="theme-dark" className="peer sr-only" />
                        <Label
                          htmlFor="theme-dark"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 hover:border-gray-300 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mb-3 h-6 w-6"
                          >
                            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                          </svg>
                          Dark
                        </Label>
                      </div>

                      <div>
                        <RadioGroupItem value="system" id="theme-system" className="peer sr-only" />
                        <Label
                          htmlFor="theme-system"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 hover:border-gray-300 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mb-3 h-6 w-6"
                          >
                            <rect width="20" height="14" x="2" y="3" rx="2" />
                            <line x1="8" x2="16" y1="21" y2="21" />
                            <line x1="12" x2="12" y1="17" y2="21" />
                          </svg>
                          System
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium">Language</h3>

                    <Select defaultValue="en">
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="zh">Chinese</SelectItem>
                        <SelectItem value="ja">Japanese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium">Time Zone</h3>

                    <Select defaultValue="utc">
                      <SelectTrigger>
                        <SelectValue placeholder="Select time zone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc">UTC (Coordinated Universal Time)</SelectItem>
                        <SelectItem value="est">EST (Eastern Standard Time)</SelectItem>
                        <SelectItem value="cst">CST (Central Standard Time)</SelectItem>
                        <SelectItem value="mst">MST (Mountain Standard Time)</SelectItem>
                        <SelectItem value="pst">PST (Pacific Standard Time)</SelectItem>
                        <SelectItem value="gmt">GMT (Greenwich Mean Time)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
