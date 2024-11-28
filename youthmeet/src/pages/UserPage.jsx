export default function UserPage() {
  return (
      <div className="bg-gray-100 min-h-screen font-lato mt-16">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-oranienbaum text-primary">User Settings</h1>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Section title="Profile Information">
                <InputField label="Name" type="text" name="name" />
                <InputField label="Email" type="email" name="email" />
              </Section>
              <Section title="Account Settings">
                <InputField label="New Password" type="password" name="password" />
                <InputField label="Confirm New Password" type="password" name="confirm-password" />
              </Section>
              <Section title="Preferences" fullWidth>
                <CheckboxField 
                  id="notifications" 
                  label="Receive email notifications" 
                  description="Get notified about account activity via email." 
                />
                <CheckboxField 
                  id="newsletter" 
                  label="Subscribe to newsletter" 
                  description="Receive our weekly newsletter with updates and offers." 
                />
              </Section>
            </div>
            <div className="mt-6 flex justify-end">
              <button type="button" className="bg-primary text-white px-8 py-3 rounded-lg text-lg font-poppins hover:brightness-110 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                Save Changes
              </button>
            </div>
          </div>
        </main>
      </div>
  );
}

const Section = ({ title, children, fullWidth = false }) => (
<section className={`bg-white shadow rounded-lg ${fullWidth ? 'sm:col-span-2' : ''}`}>
  <div className="px-6 py-5">
    <h2 className="text-2xl font-poppins text-primary mb-4">{title}</h2>
    <div className="space-y-4">
      {children}
    </div>
  </div>
</section>
);

const InputField = ({ label, type, name }) => (
<div>
  <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
  <input 
    type={type} 
    name={name} 
    id={name} 
    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition duration-200"
  />
</div>
);

const CheckboxField = ({ id, label, description }) => (
<div className="flex items-start">
  <div className="flex items-center h-5">
    <input 
      id={id} 
      name={id} 
      type="checkbox" 
      className="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded transition duration-200"
    />
  </div>
  <div className="ml-3 text-sm">
    <label htmlFor={id} className="font-medium text-gray-700">{label}</label>
    <p className="text-gray-500">{description}</p>
  </div>
</div>
);