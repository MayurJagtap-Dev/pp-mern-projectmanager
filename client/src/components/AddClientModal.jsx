import { useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { ADD_CLIENT } from "../mutations/clientMutation";
import { GET_CLIENTS } from "../queries/ClientQueries";

export default function AddClientModal() {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...clients, addClient] },
      });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      return alert("Please fill in all fields");
    }
    addClient({
      variables: {
        name,
        email,
        phone,
      },
    });
    setShowModal(false);
    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <>
      <div className="mx-4 md:mx-10 lg:mx-10 mt-4 ">
        <button
          className="bg-blue-400 flex-1 w-40 text-black p-3 m-auto rounded shadow hover:shadow-lg outline-none focus:outline-none"
          type="button"
          onClick={() => setShowModal(true)}
        >
          <div>
            <FaUserPlus className="inline mr-2" />
            Add Client
          </div>
        </button>
        {showModal ? (
          <>
            <div className="block justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-b-3 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex items-start bg-gray-200 justify-between px-5 py-3 border-b border-solid border-gray-300 rounded-t ">
                    <p className="text-xl font=semibold">Client Details :</p>
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
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="shadow appearance-none border rounded w-full mb-2 py-2 px-1 text-black"
                      />
                      <label className="block text-black text-sm font-bold mb-1">
                        Phone
                      </label>
                      <input
                        type="text"
                        name="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="shadow appearance-none border rounded w-full mb-2 py-2 px-1 text-black"
                      />

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
                          onClick={() => {}}
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
  );
}
