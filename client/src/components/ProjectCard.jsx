import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_PROJECT } from "../mutations/projectMutation";
import { GET_PROJECTS } from "../queries/ProjectQueries";

export default function ProjectCard({ project }) {
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: project.id },
    update(cache, { data: { deleteProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: projects.filter((p) => p.id !== deleteProject.id) },
      });
    },
  });

  return (
    <div class="bg-white rounded-lg border p-4">
      <div class="px-1 py-4">
        <div class="font-bold text-xl mb-2">{project.name}</div>
        <p class="text-gray-700 text-base">{project.description}</p>
        <p class="sm">
          Status : <strong>{project.status}</strong>
        </p>
      </div>
      <div className="flex items-center pt-2 justify-center border-t border-solid border-blueGray-200 rounded-b">
        <button
          className="text-white bg-yellow-400 rounded py-2 px-3 outline-none focus:outline-none mr-1"
          type="button"
          onClick={() => setShowModal(false)}
        >
          <FaPencilAlt className="inline" />
          Update
        </button>
        <button
          className="text-white bg-red-500  px-3 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none"
          type="submit"
          onClick={deleteProject}
        >
          <FaTrashAlt className="inline" />
          Delete
        </button>
      </div>
    </div>
  );
}
