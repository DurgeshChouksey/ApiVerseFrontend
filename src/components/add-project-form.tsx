import React, { useState } from "react";

const categories = [
  "Authentication",
  "Payments",
  "Data Storage",
  "Analytics",
  "Notifications",
  "Maps",
  "Machine Learning",
  "Search",
  "Email",
  "Social Media",
];
 
interface ProjectFormData {
  projectName: string;
  description: string;
  category: string;
  team: string;
  baseUrl: string;
  visibility: string;
  requiresApiKey: boolean;
}

interface FormErrors {
  projectName?: string;
  description?: string;
  category?: string;
  team?: string;
  baseUrl?: string;
}

interface AddProjectFormProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProject: (data: ProjectFormData) => void;
}

const AddProjectForm: React.FC<AddProjectFormProps> = ({
  isOpen,
  onClose,
  onAddProject,
}) => {
  const [form, setForm] = useState<ProjectFormData>({
    projectName: "",
    description: "",
    category: "",
    team: "Personal",
    baseUrl: "",
    visibility: "public",
    requiresApiKey: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const closeForm = () => {
    onClose();
    setErrors({});
    setForm({
      projectName: "",
      description: "",
      category: "",
      team: "Personal",
      baseUrl: "",
      visibility: "public",
      requiresApiKey: false,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const newErrors: FormErrors = {};
    if (!form.projectName.trim())
      newErrors.projectName = "Project Name is required";
    if (!form.description.trim())
      newErrors.description = "Description is required";
    if (!form.category.trim()) newErrors.category = "Category is required";
    if (!form.team.trim()) newErrors.team = "Team is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    onAddProject(form);
    closeForm();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4"
      onClick={closeForm}
    >
      <div
        className="bg-background border border-border rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-sm sm:max-w-md lg:max-w-lg max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-foreground">
          Add API Project
        </h2>
        <form onSubmit={onSubmit} noValidate>
          {/* Project Name */}
          <div className="mb-4">
            <label
              htmlFor="projectName"
              className="block font-semibold mb-1 text-foreground text-sm sm:text-base"
            >
              Project Name
            </label>
            <input
              id="projectName"
              name="projectName"
              type="text"
              value={form.projectName}
              onChange={handleChange}
              className={`w-full border rounded-md px-3 py-2 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-sm sm:text-base ${
                errors.projectName ? "border-destructive" : "border-input"
              }`}
            />
            {errors.projectName && (
              <p className="text-destructive text-xs sm:text-sm mt-1">
                {errors.projectName}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block font-semibold mb-1 text-foreground text-sm sm:text-base"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className={`w-full border rounded-md px-3 py-2 resize-none bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-sm sm:text-base ${
                errors.description ? "border-destructive" : "border-input"
              }`}
            />
            {errors.description && (
              <p className="text-destructive text-xs sm:text-sm mt-1">
                {errors.description}
              </p>
            )}
          </div>

          {/* Category */}
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block font-semibold mb-1 text-foreground text-sm sm:text-base"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              className={`w-full border rounded-md px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-sm sm:text-base ${
                errors.category ? "border-destructive" : "border-input"
              }`}
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-destructive text-xs sm:text-sm mt-1">
                {errors.category}
              </p>
            )}
          </div>

          {/* Team */}
          <div className="mb-6">
            <label
              htmlFor="team"
              className="block font-semibold mb-1 text-foreground text-sm sm:text-base"
            >
              Team
            </label>
            <select
              id="team"
              name="team"
              value={form.team}
              onChange={handleChange}
              className={`w-full border rounded-md px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-sm sm:text-base ${
                errors.team ? "border-destructive" : "border-input"
              }`}
            >
              <option value="Personal">Personal</option>
            </select>
            {errors.team && (
              <p className="text-destructive text-xs sm:text-sm mt-1">
                {errors.team}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-2">
            <button
              type="button"
              onClick={closeForm}
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors text-sm sm:text-base order-2 sm:order-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm sm:text-base order-1 sm:order-2"
            >
              Add API Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProjectForm;
