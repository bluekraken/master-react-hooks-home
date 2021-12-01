import { useFetch } from "../utils/hooks";
import Link from "next/link";

function Stories() {
    const rawStories = useFetch("http://localhost:3005/topstories", []);
    const stories = rawStories.filter((story) => story.id !== 29379346 && story.url);

    return (
        <div className="Stories">
            <h3>Top 10 stories</h3>
            {stories.map((story) => {
                const { id, by, time, title, url } = story;

                return (
                    <div key={id}>
                        <Link href={url}>
                            <a>{title}</a>
                        </Link>
                        <div>
                            {by} - {new Date(time * 1000).toLocaleString("en-GB")}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Stories;
