import { useQuery } from "@apollo/client";
import ClientRow from "./ClientRow";
import Spinner from "./Spinner";
import { GET_CLIENTS } from "../queries/ClientQueries";
import AddClientModal from "./AddClientModal";

export default function Client() {
  const { loading, error, data } = useQuery(GET_CLIENTS);
  if (loading) return <Spinner />;
  if (error) return <p>Error : '${error.message}'(</p>;

  return (
    <>
      <AddClientModal />
      {!loading && !error && (
        <div className="shadow-lg rounded-lg overflow-hidden m-4 md:mx-10">
          <table className="w-full table-fixed">
            <thead>
              <tr className="border bg-white">
                <th className="w-1/6 py-4 px-6 text-left text-gray-600 font-bold">
                  Name
                </th>
                <th className="w-1/6 py-4 px-6 text-left text-gray-600 font-bold">
                  Email
                </th>
                <th className="w-1/6 py-4 px-6 text-left text-gray-600 font-bold">
                  Phone
                </th>
                <th className="w-1/6 py-4 px-6 text-left text-gray-600 font-bold">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {data.clients.map((client) => (
                <ClientRow key={client.id} client={client} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
