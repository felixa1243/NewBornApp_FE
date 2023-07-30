import {SubmitHandler, useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {useMutation, useQuery} from "react-query";
import {MotherService} from "../../services/Mothers";
import {Dropdown} from "../../common/components";
import {InfantsService} from "../../services/Infants";
import {useNavigate, useParams} from "react-router-dom";
import {ROUTES} from "../../common/constants/routes";
import {formatDate} from "../../utils/dateFormat";

const UpdateInfant = () => {
    const {id} = useParams()
    type InfantInput = {
        name: string,
        height: number,
        weight: number,
        birth_day: Date,
        gestational_begin: Date
    }
    const [page, setPage] = useState(1);
    const [motherId, setMotherId] = useState<string | null>(null)
    const [motherName, setMotherName] = useState<string | null>(null)
    const {register, handleSubmit, formState: {errors}} = useForm<InfantInput>()
    const [gender, setGender] = useState<"male" | "female" | null>(null);
    const onSubmit: SubmitHandler<InfantInput> = (data) => {
        if (motherId) {
            const birth_day = formatDate(data.birth_day);
            const gestational_begin = formatDate(data.gestational_begin)
            const infantData = {...data, birth_day, gestational_begin, gender, mother_id: motherId};
            mutation.mutate(infantData);
        } else {
            console.log("Please select a mother first.");
        }
    };
    const genders = ["male", "female"]
    const {data} = useQuery(["getAllMothers", page], () => MotherService.getAll(page));
    const mutation = useMutation("updateInfant", (data: InfantInput) => InfantsService.updateInfants(id, data))
    const navigate = useNavigate();
    useEffect(() => {
        if (mutation.isSuccess) {
            alert("update data is success")
            navigate(ROUTES.infants)
        }
    }, [mutation.isSuccess])
    return (
        <div onSubmit={handleSubmit(onSubmit)}>
            <form className={"flex flex-col"}>
                <label htmlFor={"name"}>Name</label>
                <input {...register("name", {required: true})}
                       className={"border"}
                       id={"name"}
                />
                {errors.name && <ErrorText/>}
                <label htmlFor={"birth_day"}>Birth day</label>
                <input type={"date"}
                       className={"border"}
                       id={"birth_day"}
                       {...register("birth_day", {required: true})}
                />
                {errors.birth_day && <ErrorText/>}
                <label htmlFor={"gestational"}>Gestational begin</label>
                <input type={"date"}
                       className={"border"}
                       {...register("gestational_begin", {required: true})}
                />
                {errors.gestational_begin && <ErrorText/>}
                <label htmlFor={"height"}>Height</label>
                <input {...register("height", {required: true})}
                       type={"number"}
                       className={"border"}
                       id={"height"}
                />
                {errors.height && <ErrorText/>}
                <label htmlFor={"weight"}>weight</label>
                <input {...register("weight", {required: true})}
                       type={"number"}
                       className={"border"}
                       id={"weight"}
                />
                {errors.weight && <ErrorText/>}
                <Dropdown title={gender ? gender : "select gender"} className={"border mt-3"}>
                    <Dropdown.Body>
                        <ul>
                            {
                                genders.map((el, index) => (
                                    <li key={index} onClick={() => setGender(el)}>
                                        {el}
                                    </li>
                                ))
                            }
                        </ul>
                    </Dropdown.Body>
                </Dropdown>
                <Dropdown title={motherName ? motherName : "Select Mother"} className={"border mt-3"}>
                    <Dropdown.Body>
                        {
                            data?.data?.length > 0 ? data?.data?.map((el) => (
                                <ul key={el.id}>
                                    <li onClick={() => {
                                        setMotherName(el.name)
                                        setMotherId(el.id)
                                    }}>
                                        {el.name}
                                    </li>
                                </ul>
                            )) : (
                                <div>
                                    Empty...
                                </div>
                            )
                        }
                        <div className={"flex"}>
                            <button
                                disabled={page !== data?.last_page}
                                onClick={() => setPage(page + 1)}
                            >Next page
                            </button>
                            <button onClick={() => setPage(page - 1)}>Prev page</button>
                        </div>
                    </Dropdown.Body>
                </Dropdown>
                <button type={"submit"}>Update infant</button>
            </form>
        </div>
    );
};
const ErrorText = () => (<p className={"text-red-500"}>This field is required</p>)
export default UpdateInfant;