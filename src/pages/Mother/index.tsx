import {useEffect} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useMutation, useQuery} from 'react-query';
import {MotherService} from '../../services/Mothers';
import {ROUTES} from '../../common/constants/routes';

const Mother = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const {data, isLoading, isError} = useQuery('getById', () => {
        if (id) {
            return MotherService.findById(id);
        }
        return Promise.resolve(null);
    });

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
            <Link to={ROUTES.mothers}>
                {
                    "<=back"
                }
            </Link>
            {
                data?.data ? (
                    <div>
                        {data?.data?.id} <br/>
                        {data?.data?.name}
                        <button
                            className={"bg-red-500"}
                            onClick={() => mutation.mutate()}>Delete data
                        </button>
                    </div>
                ) : (
                    <div>
                    </div>
                )
            }
        </div>
    );
};

export default Mother;
