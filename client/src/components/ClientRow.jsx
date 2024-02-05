import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "../mutations/clientMutation";
import { GET_CLIENTS } from "../queries/ClientQueries";

export default function ClientRow({ client }) {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    // update the cache to immediately reflect changes on UI
    // refetchQueries: [{ query: GET_CLIENTS }] is another method tosolve error but it's not optimal solution
    update(cache, { data: { deleteClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: clients.filter((c) => c.id !== deleteClient.id) },
      });
    },
  });

  return (
    <tr>
      <td className="py-4 px-6 border-b border-gray-200 truncate">
        {client.name}
      </td>
      <td className="py-4 px-6 border-b border-gray-200 truncate">
        {client.email}
      </td>
      <td className="py-4 px-6 border-b border-gray-200">{client.phone}</td>
      <td className="py-4 px-6 border-b border-gray-200">
        <button
          onClick={deleteClient}
          type="button"
          className="mr-3 text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
