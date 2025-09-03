// app/signin/page.tsx

interface LabelledInputProps {
  label: string;
  placeholder: string;
  type?: string;
}

function LabelledInput({ label, placeholder, type }: LabelledInputProps) {
  return (
    <div>
      <label className="block mb-2 text-sm text-black font-semibold pt-4">
        {label}
      </label>
      <input
        type={type || "text"}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
}

export default function Signin() {
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="max-w-sm w-full p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
        <div className="mb-6">
          <h2 className="text-3xl font-extrabold text-center">Sign in</h2>
        </div>
        <LabelledInput label="Username" placeholder="your-email@example.com" />
        <LabelledInput
          label="Password"
          type="password"
          placeholder="********"
        />
        <button
          type="button"
          className="mt-8 w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
        >
          Sign in
        </button>
      </div>
    </div>
  );
}