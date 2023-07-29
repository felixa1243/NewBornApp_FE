import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {BrowserRouter as Router} from "react-router-dom";
import {QueryClientProvider} from "react-query";
import {queryClient} from "./config/queryClient";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Router>
                <App/>
            </Router>
        </QueryClientProvider>
    </React.StrictMode>,
)
