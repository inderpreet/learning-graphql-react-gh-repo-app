import React, {useEffect, useState} from 'react';
import github from "./db";
import query from "./Query";

function App() {

    let [userName, setUserName] = useState('');

    useEffect(() => {


        fetch(github.baseURL, {
            method: "POST",
            headers: github.headers,
            body: JSON.stringify(query),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);
                setUserName(data.data.viewer.name);
            })
            .catch((err) => {
                console.log(err);
            })
    });

    return (
        <div className="App container mt-5">
            <h1 className="text-primary">
                <i className="bi bi-diagram-2-fill"></i>Repos
            </h1>
            <p>
                Hey there {userName}
            </p>
        </div>
    );
}

export default App;
