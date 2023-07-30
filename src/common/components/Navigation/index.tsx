import {Link} from "react-router-dom";
import {ROUTES} from "../../constants/routes";

const Navigation = () => {
    return (
        <nav>
            <ul className={"flex justify-center items-center gap-5 h-[60px] bg-gray-700 text-gray-300"}>
                <li>
                    <Link to={ROUTES.home}>Home</Link>
                </li>
                <li>
                    <Link to={ROUTES.mothers}>Mothers</Link>
                </li>
                <li>
                    <Link to={ROUTES.infants}>infants</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;