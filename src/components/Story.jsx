import StoryCard from './StoryCard';
import axios from 'axios';
import {
    useQuery
  } from '@tanstack/react-query';

const Story = () => {
    const { isPending, data:stories } = useQuery({ queryKey: ['stories'], queryFn: async() => {
        const data = await axios.get('https://job-quest-server-alpha.vercel.app/stories');
        return data.data;
    } })

    if (isPending) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
                <div className="skeleton h-48"></div>
                <div className="skeleton h-48"></div>
                <div className="skeleton h-48"></div>
            </div>
        )
    }

    return (
        <div className="mt-16">
            <h1 className="text-center dark:text-[#E7F6F2] text-2xl md:text-3xl lg:text-4xl font-bold">Success Stories</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
                {
                    stories.map((story, idx) => <StoryCard key={idx} story={story}></StoryCard>)
                }
            </div>
        </div>
    );
};

export default Story;