import Spinner from "./Spinner";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/ProjectQueries";
import ProjectCard from "./ProjectCard";
import AddProjectModal from "./AddProjectModal";

export default function Project() {
  const { loading, error, data } = useQuery(GET_PROJECTS);
  if (loading) return <Spinner />;
  if (error) return <p>Error : '${error.message}'</p>;
  return (
    <>
      <AddProjectModal />
      {!loading && !error && data.projects.length > 0 ? (
        <div class=" flex flex-col items-start">
          <div class="container mx-auto p-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
              {data.projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>0 projects found</div>
      )}
    </>
  );
}
