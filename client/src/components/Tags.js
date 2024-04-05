import React from 'react';

const Tags = ({ tags }) => {
    return (
        <div className="flex flex-wrap mt-4">
            {tags.map((tag, index) => (
                <span key={index} className="bg-gray-200 rounded-xl px-2 py-1 text-sm text-gray-500 mr-2 mb-2">
          {tag}
        </span>
            ))}
        </div>
    );
};

export default Tags;