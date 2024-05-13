import { useEffect, useState } from 'react';
import StoryCard from './StoryCard';
import axios from 'axios';

const Story = () => {
    const [stories, setStories] = useState([]);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        axios.get('http://localhost:3000/stories')
        .then(data => {
            setStories(data.data);
            setLoaded(true);
        });
    }, []);
    return (
        <div className="mt-16">
            <h1 className="text-center dark:text-white text-2xl md:text-3xl lg:text-4xl font-bold">Success Stories</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
                {
                    !loaded &&
                    <>
                        <div className="skeleton h-32"></div>
                        <div className="skeleton h-32"></div>
                        <div className="skeleton h-32"></div>
                    </>
                }
                {
                    stories.map((story, idx) => <StoryCard key={idx} story={story}></StoryCard>)
                }
            </div>
        </div>
    );
};

export default Story;