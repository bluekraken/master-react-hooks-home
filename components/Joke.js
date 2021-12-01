import { useFetch } from "../utils/hooks";

function Joke() {
    const { setup, delivery } = useFetch("https://v2.jokeapi.dev/joke/Any?type=twopart", {});

    return (
        <div>
            <h3>Joke of the session</h3>
            <p>{setup}</p>
            <p>
                <em>{delivery}</em>
            </p>
        </div>
    );
}

export default Joke;
