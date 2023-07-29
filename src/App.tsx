import "./assets/index.css"
import {Route, Routes} from "react-router-dom";
import {ROUTES} from "./common/constants/routes";
import {Home, Infant, Infants, Mother, Mothers} from "./pages"

function App() {

    return (
        <div className={"w-full flex justify-center items-center h-screen"}>
            <Routes>
                <Route path={ROUTES.home}>
                    <Route element={<Home/>} index/>
                    <Route path={ROUTES.infants}>
                        <Route element={<Infants/>} index/>
                        <Route path={ROUTES.infants + "/:id"} element={<Infant/>}/>
                    </Route>
                    <Route path={ROUTES.mothers}>
                        <Route element={<Mothers/>} index/>
                        <Route element={<Mother/>} path={ROUTES.mothers + "/:id"}/>
                    </Route>
                </Route>
            </Routes>
        </div>
    )
}

export default App
