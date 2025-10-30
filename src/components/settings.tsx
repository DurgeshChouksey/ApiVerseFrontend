import { useState } from "react";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

const Settings = () => {
  const [projectName, setProjectName] = useState("");

  const handleDelete = () => {
    if (projectName === "delete") {
      console.log("API Project deleted");
      // Your delete logic here (API call, etc.)
    } else {
      alert("Please type 'delete' to confirm deletion");
    }
  };

  return (
    <div className="space-y-3 px-6 mt-5">
      <h1 className="text-2xl font-bold">Delete API Project</h1>
      <p>
        Permanently deleting this API project will remove it from the RapidAPI Hub Listing,
        and destroy your team’s data from Requests, Testing, and Descriptions.
        This action is not reversible.
      </p>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">Delete</Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete API Project</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to permanently delete this API Project? This action
              <strong> cannot be undone.</strong>
              <ul className="list-disc list-inside mt-3 text-sm">
                <li>Your API subscribers (1)</li>
                <li>Your API data & analysis</li>
                <li>Your API documentation</li>
                <li>Any data from RapidAPI Testing</li>
                <li>Any data from RapidAPI Requests (previously known as Paw)</li>
              </ul>
              <div className="mt-4">
                <p className="mb-2">
                  Type <code>"delete"</code> to confirm the deletion:
                </p>
                <input
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="border rounded-md p-2 w-full"
                  placeholder='Type "delete"'
                />
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              Delete API Project
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Settings;
