import { Metadata } from 'next';
import { UserProfile } from '@/types/profile';
import ProfileSettings from '@/components/settings/ProfileSettings';
import NotificationSettings from '@/components/settings/NotificationSettings';
import PrivacySettings from '@/components/settings/PrivacySettings';
import PaymentSettings from '@/components/settings/PaymentSettings';
import PurchaseHistory from '@/components/settings/PurchaseHistory';

export const metadata: Metadata = {
  title: 'Account Settings - Xelus Academy',
  description: 'Manage your account settings, notifications, and payment methods.',
};

// This would typically come from an API
const getUserProfile = async (): Promise<UserProfile> => {
  return {
    id: '1',
    email: 'user@example.com',
    name: 'John Doe',
    avatar: '/images/avatars/default.jpg',
    bio: 'Passionate learner',
    location: 'San Francisco, CA',
    website: 'https://example.com',
    socialLinks: {
      twitter: 'johndoe',
      linkedin: 'johndoe',
      github: 'johndoe'
    },
    preferences: {
      emailNotifications: {
        courseUpdates: true,
        newCourses: true,
        promotions: false,
        achievements: true
      },
      privacy: {
        showProfile: true,
        showCourses: true,
        showAchievements: true
      }
    },
    paymentMethods: [
      {
        id: 'pm_1',
        type: 'card',
        isDefault: true,
        card: {
          brand: 'visa',
          last4: '4242',
          expiryMonth: 12,
          expiryYear: 2025
        }
      }
    ],
    billingAddress: {
      name: 'John Doe',
      line1: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94105',
      country: 'US'
    },
    purchaseHistory: [
      {
        id: 'po_1',
        courseId: '1',
        courseName: 'Web Development Fundamentals',
        amount: 49.99,
        date: '2025-01-12T10:00:00Z',
        paymentMethod: {
          type: 'card',
          last4: '4242'
        },
        status: 'completed',
        invoice: 'inv_1'
      }
    ]
  };
};

export default async function SettingsPage() {
  const profile = await getUserProfile();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Navigation Sidebar */}
          <nav className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 space-y-2">
              <NavItem href="#profile" label="Profile" />
              <NavItem href="#notifications" label="Notifications" />
              <NavItem href="#privacy" label="Privacy" />
              <NavItem href="#payment" label="Payment Methods" />
              <NavItem href="#history" label="Purchase History" />
            </div>
          </nav>

          {/* Settings Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Profile Settings */}
            <section id="profile" className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6">Profile Settings</h2>
              <ProfileSettings profile={profile} />
            </section>

            {/* Notification Settings */}
            <section id="notifications" className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6">Notification Settings</h2>
              <NotificationSettings
                notifications={profile.preferences.emailNotifications}
              />
            </section>

            {/* Privacy Settings */}
            <section id="privacy" className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6">Privacy Settings</h2>
              <PrivacySettings privacy={profile.preferences.privacy} />
            </section>

            {/* Payment Settings */}
            <section id="payment" className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6">Payment Methods</h2>
              <PaymentSettings
                paymentMethods={profile.paymentMethods}
                billingAddress={profile.billingAddress}
              />
            </section>

            {/* Purchase History */}
            <section id="history" className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6">Purchase History</h2>
              <PurchaseHistory purchases={profile.purchaseHistory} />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

interface NavItemProps {
  href: string;
  label: string;
}

function NavItem({ href, label }: NavItemProps) {
  return (
    <a
      href={href}
      className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
    >
      {label}
    </a>
  );
}
