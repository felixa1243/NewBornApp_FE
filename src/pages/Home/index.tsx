import {useQuery} from "react-query";
import {InfantsService} from "../../services/Infants";
import {decimalFormater} from "../../utils/decimalFormater";
import {useState} from "react";

type AnalyticRequest = {
    month: number,
    gender: {
        male: {
            count: number | null,
            weight_average: number | null
        },
        female: {
            count: number | null,
            weight_average: number | null
        }
    }
}
const Home = () => {
    const [year, setYear] = useState<string>(String(new Date().getFullYear()));
    const [input, setInput] = useState<string>(year);
    const {data, isError, isLoading} = useQuery(["getAnalytics", year], () => InfantsService.getAnalytics(year))
    if (isError) {
        return (
            <div>
                <p className={"text-rose-500"}>an error occured</p>
            </div>
        )
    }
    if (isLoading) {
        return (
            <div>
                <p>
                    loading...
                </p>
            </div>
        )
    }
    return (
        <div className={"flex w-full flex-col items-center"}>
            <div
                className={"flex flex-col w-1/2 mb-5"}>
                <h2 className={"text-center"}>Analytics</h2>
                <form onSubmit={() => setYear(input)}>
                    <input
                        type={"number"}
                        className={"border py-2 px-5"}
                        placeholder={"insert year"}
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value)
                        }}/>
                    <button
                        className={"bg-blue-500 py-2 px-5 rounded-md ml-3 text-white"}
                        type={"submit"}>Find data
                    </button>
                </form>
            </div>
            <table className={"border table-auto w-full mx-10 text-sm text-left"}>
                <tr className={"text-center border bg-gray-700 text-gray-300"}>
                    <td className={"border"}
                        rowSpan={3}>Months
                    </td>
                    <td colSpan={4}>Gender</td>
                </tr>
                <tr className={"text-center border border-gray-600 bg-gray-700 text-gray-300"}>
                    <td colSpan={2} className={"border"}>Male</td>
                    <td colSpan={2}>Female</td>
                </tr>

                <tr className={"text-center border border-gray-600 bg-gray-700 text-gray-300"}>
                    <td className={"border"}>Count</td>
                    <td className={"border"}>Average weight</td>
                    <td className={"border"}>Count</td>
                    <td className={"border"}>Average weight</td>
                </tr>
                <tbody>
                {
                    data?.data?.length && (
                        data?.data?.map((el: AnalyticRequest, index: number) => (
                            <tr key={el.month}
                                className={"border bg-gray-700 border-gray-600  text-gray-300 hover:bg-gray-500"}>
                                <td className={"border text-center"}>{index + 1}</td>
                                <td className={"border text-center"}>{el.gender.male.count ? el.gender.male.count : 0}</td>
                                <td className={"border text-center"}>{el.gender.male.weight_average ? decimalFormater(el.gender.male.weight_average.toFixed(2)) : 0}</td>
                                <td className={"border text-center"}>{el.gender.female.count ? el.gender.female.count : 0}</td>
                                <td className={"border text-center"}>{el.gender.female.weight_average ? decimalFormater(el.gender.female.weight_average.toFixed(2)) : 0}</td>
                            </tr>
                        ))
                    )
                }
                </tbody>
            </table>
        </div>
    );
};

export default Home;