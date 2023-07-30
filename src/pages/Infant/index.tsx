import {Link, useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {ROUTES} from "../../common/constants/routes";
import {InfantsService} from "../../services/Infants";

const Infant = () => {
    const {id} = useParams();
    const {data, isLoading, isError} = useQuery("getByid", async () => {
        if (id) {
            return await InfantsService.findById(id)
        }
        return Promise.resolve(null)
    })
    if (isLoading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }
    if (isError) {
        return (
            <div>
                <p className={"text-rose-500"}>An error occured..</p>
            </div>
        )
    }
    return (
        <div>
            <Link to={ROUTES.infants}
                  className={"flex gap-1 mb-5"}
            >
                <p>&larr;</p><p>Back</p>
            </Link>
            {
                data?.data && (
                    <div className={"flex flex-col"}>
                        <table className={"border"}>
                            <thead>
                            <th className={"px-5 border"}>
                                Name
                            </th>
                            <th className={"px-5 border"}>
                                Gender
                            </th>
                            <th className={"px-5 border"}>
                                Birth day
                            </th>
                            <th className={"px-5 border"}>
                                Gestational age
                            </th>
                            </thead>
                            <tbody>
                            <tr>
                                <td className={"px-5 border"}>{data?.data.name}</td>
                                <td className={"px-5 border"}>{data?.data?.gender}</td>
                                <td className={"px-5 border"}>
                                    {new Date(data?.data?.birth_day).toDateString()}
                                </td>
                                <td className={"px-5 border"}>
                                    {data?.data?.gestational_age_weeks} weeks
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <div className={"flex flex-row-reverse gap-1 mt-5"}>
                            <button className={"px-3 py-1 bg-blue-600 text-white rounded-lg"}>Update Infant</button>
                            <button className={"px-3 py-1 bg-red-600 text-white rounded-lg"}>Delete Infant</button>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default Infant;