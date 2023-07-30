import {useEffect} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useMutation, useQuery} from 'react-query';
import {MotherService} from '../../services/Mothers';
import {ROUTES} from '../../common/constants/routes';
import {formatDate} from "../../utils/dateFormat";

const Mother = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const today = new Date();
    const {data, isLoading, isError} = useQuery('getById', async () => {
        if (id) {
            return await MotherService.findById(id);
        }
        return Promise.resolve(null);
    });
    const birthday = new Date(data?.data?.birth_day)
    let age = today.getFullYear() - birthday.getFullYear()
    const m = today.getMonth() - birthday.getMonth()
    if (m < 0 || (m == 0 && today.getDate() < birthday.getDate())) {
        age--
    }
    const mutation = useMutation('deleteData', {
        mutationFn: () => {
            if (id) {
                return MotherService.delete(id);
            }
            return Promise.resolve(null);
        },
    });

    const {isSuccess, isError: isErrorMutate} = mutation;
    if (isErrorMutate) {
        console.log("an error occured")
    }
    useEffect(() => {
        if (isSuccess) {
            alert('delete data success');
            navigate(ROUTES.mothers);
        }
    }, [isSuccess, navigate]);

    if (!id) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>An error occurred</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Link to={ROUTES.mothers} className={"flex gap-1 mb-5"}>
                <p>&larr;</p> <p>Back</p>
            </Link>
            {
                data?.data && (
                    <div>
                        <p>Name: {data?.data?.name}</p>
                        <p>Age: {age}</p>
                        <p>Birth day: {formatDate(data?.data?.birth_day)}</p>
                        <div className={"flex gap-1 mt-5"}>
                            <button
                                className={"bg-rose-600 px-3 py-1 rounded-md text-white"}
                                onClick={() => mutation.mutate()}>Delete data
                            </button>
                            <button
                                className={"bg-blue-600 px-3 py-1 rounded-md text-white"}
                                onClick={() => navigate(ROUTES.updateMother)}>Update Data
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default Mother;
