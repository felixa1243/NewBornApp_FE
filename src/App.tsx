import "./assets/index.css"
import {Route, Routes} from "react-router-dom";
import {ROUTES} from "./common/constants/routes";
import {AddInfant, AddMother, Home, Infant, Infants, Mother, Mothers, UpdateInfant, UpdateMother} from "./pages"
import {Navigation} from "./common/components";

function App() {

    return (
        <div className={"w-full flex flex-col h-screen"}>
            <Navigation/>
            <div className={"flex justify-center items-center h-full"}>
                <Routes>
                    <Route path={ROUTES.home}>
                        <Route element={<Home/>} index/>
                        <Route path={ROUTES.infants}>
                            <Route element={<Infants/>} index/>
                            <Route path={ROUTES.infants + "/:id"} element={<Infant/>}/>
                            <Route path={ROUTES.addInfants} element={<AddInfant/>}/>
                            <Route path={ROUTES.updateInfants + "/:id"} element={<UpdateInfant/>}/>
                        </Route>
                        <Route path={ROUTES.mothers}>
                            <Route element={<Mothers/>} index/>
                            <Route element={<Mother/>} path={ROUTES.mothers + "/:id"}/>
                            <Route element={<AddMother/>} path={ROUTES.addMother}/>
                            <Route element={<UpdateMother/>} path={ROUTES.updateMother}/>
                        </Route>
                    </Route>
                </Routes>
            </div>
        </div>
    )
}

export default App
