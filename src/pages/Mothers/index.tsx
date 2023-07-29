import {useQuery} from "react-query";
import {MotherService} from "../../services/Mothers";
import {Link} from "react-router-dom";
import {ROUTES} from "../../common/constants/routes";
import {useState} from "react";

type MotherRequest = {
    "id": string,
    "name": string,
    "birth_day": "string"
};

const Mothers = () => {
    const [page, setPage] = useState(1);
    const {data} = useQuery(["getAllMothers", page], () => MotherService.getAll(page));

    const goToNextPage = () => {
        if (data && page < data.last_page) {
            setPage(page + 1);
        }
    };

    const goToPreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };
    const getMotherIndex = (index: number) => {
        return (page - 1) * 10 + index + 1;
    };
    return (
        <div className={"w-full px-10 py-3"}>
            {
                data?.data?.length > 0 ? (
                    <table className={"w-full text-sm text-left  dark:text-gray-400"}>
                        <thead className="text-xs text-gray-500 uppercase bg-slate-500 dark:text-gray-400 rounded-lg">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                No.
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Link
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            data?.data?.map((el: MotherRequest, index: number) => (
                                <tr className={"border-b bg-gray-800 hover:"} key={el.id}>
                                    <td className={"px-5"}>{getMotherIndex(index)}</td>
                                    <td className={"px-5 py-3"}>{el.name}</td>
                                    <td>
                                        <Link to={ROUTES.mothers + "/" + el.id}>View More</Link>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                ) : (
                    <div>
                        <p>
                            Mother are empty
                        </p>
                    </div>
                )
            }
            {
                data && (
                    <div className={"flex mt-5"}>
                        {
                            page !== 1 && (
                                <button
                                    className={`bg-gray-700 px-5 py-1 ${page !== data?.last_page ?"rounded-l-lg" :"rounded-lg"} text-gray-300 flex justify-start`}
                                    onClick={goToPreviousPage}>Previous page</button>
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

export default Mothers;
