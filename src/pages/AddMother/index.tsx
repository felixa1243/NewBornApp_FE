import {SubmitHandler, useForm} from "react-hook-form";
import {useMutation} from "react-query";
import {MotherService} from "../../services/Mothers";
import {formatDate} from "../../utils/dateFormat";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../common/constants/routes";

const AddMother = () => {
    type MotherInput = {
        name: string,
        birth_day: Date
    }
    const {handleSubmit, register, formState: {errors}} = useForm<MotherInput>()
    const navigate = useNavigate()
    const mutation = useMutation("addMother", {mutationFn: (data) => MotherService.addMother(data)})
    const onSubmit: SubmitHandler<MotherInput> = data => {
        const birth_day = formatDate(data.birth_day)
        mutation.mutate({...data, birth_day})
    }
    useEffect(() => {
        if (mutation.isSuccess) {
            navigate(ROUTES.mothers)
        }
    }, [mutation.isSuccess])
    return (
        <div>
            <form className={"flex flex-col gap-3"} onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor={"name"}>Name</label>
                <input
                    id={"name"}
                    {...register("name", {required: true})}
                    className={"border py-1 px-3"}
                />
                {errors.name && <ErrorText/>}
                <label htmlFor={"birthday"}>Birth day</label>
                <input
                    {...register("birth_day", {required: true})}
                    id={"birhday"}
                    className={"border"}
                    type={"date"}
                />
                {errors.birth_day && <ErrorText/>}
                <button type={"submit"}>add mother</button>
            </form>
        </div>
    );
};
const ErrorText = () => (<p className={"text-red-500"}>This field is required</p>)
export default AddMother;