import PropTypes from 'prop-types';

const StoryCard = ({story}) => {
    return (
        <div className="card bg-[#E7F6F2] dark:bg-[#2C3333] dark:text-[#E7F6F2] shadow-2xl">
            <div className="card-body">
                <p className='text-xl italic text-center'><span className='text-3xl font-bold'>&#34;</span>{story.success_story}<span className='text-3xl font-bold'>&#34;</span></p>
            </div>
            <p className='text-center text-lg font-bold'>{story.name}</p>
            <p className='text-center mb-8'>{story.location}</p>
        </div>
    );
};

StoryCard.propTypes = {
    story: PropTypes.object.isRequired,
};

export default StoryCard;