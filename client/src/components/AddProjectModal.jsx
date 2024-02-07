import { useState } from "react";
import { FaFolderPlus } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_PROJECT } from "../mutations/projectMutation";
import { GET_PROJECTS } from "../queries/ProjectQueries";
import { GET_CLIENTS } from "../queries/ClientQueries";

export default function AddClientModal() {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("new");
  const [clientId, setClientId] = useState("");

  const { loading, error, data } = useQuery(GET_CLIENTS);
  if (loading) return null;
  if (error) return `error : ${error.message}`;

  const onSubmit = (e) => {
    e.preventDefault();
    if (!name || !description || !status || !clientId) {
      return alert("Please fill in all fields");
    }
    addProject({
      variables: {
        name,
        description,
        status,
        clientId,
      },
    });
    setShowModal(false);
    setName("");
    setDescription("");
    setStatus("new");
    setClientId("");
  };

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, status, clientId },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
  });

  return (
    <>
      {!loading && !error && (
        <>
          <div className="mx-4 md:mx-10 lg:mx-10 mt-4 ">
            <button
              className="bg-blue-400 flex-1 w-40 text-black p-3 m-auto rounded shadow hover:shadow-lg outline-none focus:outline-none"
              type="button"
              onClick={() => setShowModal(true)}
            >
              <div>
                <FaFolderPlus className="inline mr-2" />
                Add Project
              </div>
            </button>
            {showModal ? (
              <>
                <div className="block justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div className="border-b-3 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      <div className="flex items-start bg-gray-200 justify-between px-5 py-3 border-b border-solid border-gray-300 rounded-t ">
                        <p className="text-xl font=semibold">
                          Project Details :
                        </p>
                      </div>
                      <div className="relative p-4 flex-auto">
                        <form
                          onSubmit={onSubmit}
                          className="bg-gray-200 shadow-md rounded p-4 w-full"
                        >
                          <label className="block text-black text-sm font-bold mb-1">
                            Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="shadow appearance-none border rounded w-full mb-2 py-2 px-1 text-black"
                          />

                          <label className="block text-black text-sm font-bold mb-1">
                            Description
                          </label>
                          <textarea
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="shadow appearance-none border rounded w-full mb-2 py-2 px-1 text-black"
                          ></textarea>

                          <label className="block text-black text-sm font-bold mb-1">
                            Status
                          </label>
                          <select
                            name="status"
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="shadow appearance-none border rounded w-full mb-2 py-2 px-1 text-black"
                          >
                            <option value="new">Not Started</option>
                            <option value="progress">In Progress</option>
                            <option value="completed">Completed</option>
                          </select>

                          <label className="block text-black text-sm font-bold mb-1">
                            Client ID
                          </label>
                          <select
                            name="clientId"
                            id="clientId"
                            value={clientId}
                            onChange={(e) => setClientId(e.target.value)}
                            className="shadow appearance-none border rounded w-full mb-2 py-2 px-1 text-black"
                          >
                            {data.clients.map((client) => (
                              <option key={client.id} value={client.id}>
                                {client.id + " : " + client.name}
                              </option>
                            ))}
                          </select>

                          <div className="flex items-center mt-2 justify-center border-t border-solid border-blueGray-200 rounded-b">
                            <button
                              className="text-white bg-blue-400 rounded py-2 px-3 outline-none focus:outline-none mr-1"
                              type="button"
                              onClick={() => setShowModal(false)}
                            >
                              Close
                            </button>
                            <button
                              className="text-white bg-green-600  px-3 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none"
                              type="submit"
                            >
                              Submit
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </>
      )}
    </>
  );
}
