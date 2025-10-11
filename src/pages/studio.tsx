import { useState } from "react";
import AddProjectForm from "@/components/add-project-form";

const Studio = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  return (
    <div className="bg-background h-screen text-foreground overflow-hidden">
      <div className="px-4 sm:px-8 py-6 sm:py-10 mt-10 h-full overflow-y-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">API'Verse Studio</h1>

        <div className="mt-6 flex flex-col sm:flex-row gap-4 sm:gap-0 sm:justify-between sm:items-center">
          <div className="flex-1 sm:flex-none sm:flex sm:gap-2">
            <input 
              type="text" 
              placeholder="Search API Projects" 
              className="w-full rounded-md border border-input bg-background px-3 sm:px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-sm sm:text-base" 
            />
          </div>
          <button
            onClick={openForm}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md font-medium transition-colors text-sm sm:text-base whitespace-nowrap">
            + Add API Project
          </button>
        </div>

        <div className="mt-8 sm:mt-16 text-center px-4 sm:px-0">
          <p className="text-base sm:text-lg font-semibold text-foreground">You don't have any API Projects</p>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base max-w-md mx-auto">
            Add a new API Project from scratch or use our "Demo Project" to explore API Projects features
          </p>
          <button 
            onClick={openForm}
            className="mt-4 sm:mt-6 px-4 py-2 border border-border bg-background hover:bg-accent hover:text-accent-foreground rounded-md transition-colors text-sm sm:text-base">
            + Add API Project
          </button>

          {/* <div className="mt-12 mx-auto bg-card w-full max-w-md rounded-xl shadow-sm p-6 text-left border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-lg">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/556/556690.png"
                  alt="Demo"
                  className="w-6 h-6"
                />
              </div>
              <div>
                <h2 className="font-semibold text-card-foreground flex items-center gap-2">
                  👋 Demo Project
                </h2>
                <p className="text-sm text-muted-foreground">This Project is created as demo</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground/70 mt-3">Updated today at 4:33 PM</p>
          </div> */}
        </div>
      </div>
      
      {/* Add Project Form Modal */}
      <AddProjectForm isOpen={isFormOpen} onClose={closeForm} />
    </div>
  );
};
export default Studio;
