'use client';

export default function StoryButton() {
  const handleStoryClick = () => {
    alert('Our story page coming soon!');
  };

  return (
    <button 
      onClick={handleStoryClick}
      className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-8 py-3 text-sm font-medium tracking-wide hover:bg-rose-600 dark:hover:bg-rose-600 dark:hover:text-white transition-all duration-300"
    >
      DISCOVER OUR STORY
    </button>
  );
}