import {useParams} from "react-router-dom";

const Infant = () => {
    const {id} = useParams();
    return (
        <div>
            {id}
        </div>
    );
};

export default Infant;