import {useState} from "react";
import {useQuery} from "react-query";
import {InfantsService} from "../../services/Infants";
import {Link} from "react-router-dom";
import {ROUTES} from "../../common/constants/routes";

type InfantRequest = {
    id: string,
    name: string
}
const Infants = () => {
    const [page, setPage] = useState(1)
    const {data} = useQuery(["getAllInfants", page], () => InfantsService.getAll(page))
    const goToNextPage = () => {
        if (data && page < data.last_page) {
            setPage(page + 1)
        }
    }
    const goToPrevPage = () => {
        if (page > 1) {
            setPage(page - 1)
        }
    }
    const getInfantIndex = (index: number) => (page - 1) * 10 + index + 1
    return (
        <div className={"w-full px-10 py-3"}>
            <table className={"w-full text-sm text-left text-gray-300"}>
                {
                    data?.data?.length > 0 ? (
                        <>
                            <thead
                                className={"text-xs text-gray-500 uppercase bg-slate-500 dark:text-gray-400 rounded-lg"}>
                            <tr>
                                <th scope={"col"} className={"px-6 py-3"}>
                                    No
                                </th>
                                <th scope={"col"} className={"px-6 py-3"}>
                                    Name
                                </th>
                                <th scope={"col"} className={"px-6 py-3"}>
                                    Link
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                data?.data?.map((el: InfantRequest, index: number) => (
                                    <tr className={"border-b bg-gray-800 hover:bg-gray-600"} key={el.id}>
                                        <td className={"px-5"}>
                                            {getInfantIndex(index)}
                                        </td>
                                        <td className={"px-5 py-3"}>
                                            {el.name}
                                        </td>
                                        <td>
                                            <Link to={ROUTES.infants + "/" + el.id}>View more</Link>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </>
                    ) : (
                        <>
                        </>
                    )
                }
            </table>
            {
                data && (
                    <div className={"flex mt-5"}>
                        {
                            page !== 1 && (
                                <button
                                    className={`bg-gray-700 px-5 py-1 ${page !== data?.last_page ? "rounded-l-lg" : "rounded-lg"} text-gray-300 flex justify-start`}
                                    onClick={goToPrevPage}>Previous page</button>
                            )
                        }
                        {
                            page !== data?.last_page && (
                                <button
                                    className={`bg-gray-700 px-5 py-1 ${page !== 1 ? "rounded-r-lg" : "rounded-lg"} text-gray-300 justify-end`}
                                    onClick={goToNextPage} disabled={page === data.last_page}>Next page
                                </button>
                            )
                        }
                    </div>
                )
            }
        </div>
    );
};

export default Infants;