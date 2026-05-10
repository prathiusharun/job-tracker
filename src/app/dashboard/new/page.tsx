import { createJobApplication } from "@/app/actions/jobs"

export default function NewApplicationPage() {
  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Add Job Application</h1>
      <form action={createJobApplication} className="flex flex-col gap-4">
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          required
          className="border rounded-md p-2"
        />
        <input
          type="text"
          name="roleTitle"
          placeholder="Role Title"
          required
          className="border rounded-md p-2"
        />
        <input
          type="text"
          name="salary"
          placeholder="Salary (optional)"
          className="border rounded-md p-2"
        />
        <select name="locationType" className="border rounded-md p-2">
          <option value="remote">Remote</option>
          <option value="onsite">Onsite</option>
          <option value="hybrid">Hybrid</option>
        </select>
        <select name="employmentType" className="border rounded-md p-2">
          <option value="full-time">Full Time</option>
          <option value="contract">Contract</option>
        </select>
        <textarea
          name="notes"
          placeholder="Notes (optional)"
          className="border rounded-md p-2"
          rows={3}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Add Application
        </button>
      </form>
    </div>
  )
}