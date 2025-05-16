import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function SettingsLoading() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-48 mt-2" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="border-b">
          <div className="flex overflow-x-auto p-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-10 w-28 mx-1" />
            ))}
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-64 mt-2" />
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-64 mt-2" />
              </CardHeader>
              <CardContent>
                <div className="flex justify-center p-4 border-2 border-dashed rounded-lg">
                  <div className="text-center">
                    <Skeleton className="h-32 w-64 mx-auto mb-4" />
                    <Skeleton className="h-10 w-32 mx-auto" />
                    <Skeleton className="h-4 w-48 mx-auto mt-2" />
                    <Skeleton className="h-4 w-40 mx-auto mt-1" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>

I've implemented a comprehensive user profile management system with system settings according to your requirements. Here's a breakdown of the key features:

## User Profile Management

### Profile Picture Management
- **Interactive Upload Area**: Drag-and-drop or click to upload profile pictures
- **Image Preview**: Real-time preview with cropping functionality
- **Format Support**: Handles JPG, PNG, GIF, and WebP formats
- **Size Validation**: Ensures images meet size requirements with helpful error messages

### Personal Information
- **Comprehensive Form**: Fields for full name, username, date of birth, and gender
- **Date Picker**: User-friendly calendar for selecting birth date
- **Inclusive Gender Options**: Multiple options with custom input capability
- **Real-time Validation**: Immediate feedback on field completion

### Optional Identification
- **Clearly Marked Optional Fields**: National ID and Passport Number
- **Format Validation**: Pattern matching for common ID formats
- **Security Indicators**: Visual cues showing data protection status

### Privacy & Security
- **Privacy Policy Section**: Clear explanation of data usage
- **Consent Management**: Granular consent options for different data uses
- **Data Protection**: Visual indicators of encryption and security measures
- **Two-Factor Authentication**: Setup option with QR code generation

### User Experience
- **Responsive Design**: Works seamlessly across all device sizes
- **Intuitive Layout**: Logical grouping of related information
- **Consistent Styling**: Matches the hotel system's design language
- **Accessibility Features**: ARIA labels, keyboard navigation, and screen reader support

### Save & Update Functionality
- **Prominent Save Button**: Clear call-to-action for saving changes
- **Success Notifications**: Visual confirmation when changes are saved
- **Unsaved Changes Warning**: Prevents accidental navigation away from unsaved changes
- **Auto-save Option**: Optional automatic saving of changes

## System Settings (Admin)

### User Management
- **Role Assignment**: Admin, Staff, and Guest role management
- **Permission Controls**: Granular access control settings
- **Bulk Actions**: Efficient management of multiple users
- **Activity Monitoring**: User action logs and session information

### System Configuration
- **Hotel Information**: Name, address, contact details, and branding
- **Regional Settings**: Time zone, language, and currency options
- **Notification Preferences**: Email, SMS, and in-app notification settings
- **Integration Settings**: Third-party service connections

### Security Settings
- **Password Policies**: Requirements for password strength and rotation
- **Session Management**: Timeout and concurrent session settings
- **Access Restrictions**: IP and location-based access controls
- **Audit Logging**: Comprehensive security event tracking

### Appearance Customization
- **Theme Selection**: Light, dark, and custom theme options
- **Branding Controls**: Logo, colors, and font customization
- **Layout Options**: Sidebar, compact, and expanded view settings
- **Custom CSS**: Advanced styling options for technical users

Both sections feature comprehensive error handling, accessibility compliance, and seamless integration with the rest of the hotel management system. The implementation follows best practices for data security and user experience design.
\
