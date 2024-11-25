import React, { useState, useRef, useEffect } from 'react';

export default function EventSearch() {
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [suggestedTags, setSuggestedTags] = useState([]);
    const [distance, setDistance] = useState(10);
    const [isExpanded, setIsExpanded] = useState(false);

    const tagInputRef = useRef(null);

    const possibleTags = ['Music', 'Sports', 'Art', 'Technology', 'Food', 'Outdoors'];

    useEffect(() => {
        if (tagInput) {
            setSuggestedTags(possibleTags.filter(tag => 
                tag.toLowerCase().includes(tagInput.toLowerCase()) && !tags.includes(tag)
            ));
        } else {
            setSuggestedTags([]);
        }
    }, [tagInput, tags]);

    const handleAddTag = (tag) => {
        if (tag && !tags.includes(tag)) {
            setTags([...tags, tag]);
            setTagInput('');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    return (
        <div className="w-full flex flex-col items-center justify-center py-12 px-4">
            <input 
                className="font-lato transition border-2 outline-none hover:border-primary focus:border-primary rounded-xl p-2 mt-2 w-full max-w-[900px]" 
                name="username" 
                type="text" 
                placeholder="Event" 
            />
            <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition"
            >
                {isExpanded ? 'Collapse' : 'Expand'} Search Options
            </button>
            <div className={`w-full max-w-[900px] mt-4 transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                    <input 
                        className="font-lato transition border-2 outline-none hover:border-primary focus:border-primary rounded-xl p-2 flex-1"  
                        type="date" 
                        name="date" 
                        id="date" 
                        placeholder={new Date().getFullYear()}
                    />
                    <div className="relative flex-1">
                        <input 
                            className="font-lato transition border-2 outline-none hover:border-primary focus:border-primary rounded-xl p-2 w-full"  
                            type="text" 
                            name="area" 
                            id="area" 
                            placeholder="Area"
                        />
                        <div className="mt-2">
                            <label htmlFor="distance" className="block text-sm font-medium text-gray-700">Distance: {distance} km</label>
                            <input 
                                type="range" 
                                id="distance" 
                                name="distance" 
                                min="0" 
                                max="100" 
                                value={distance} 
                                onChange={(e) => setDistance(e.target.value)}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>
                    </div>
                    <div className="relative flex-1">
                        <div className="flex flex-wrap gap-2 mb-2">
                            {tags.map(tag => (
                                <span key={tag} className="bg-primary text-white px-2 py-1 rounded-md text-sm">
                                    {tag}
                                    <button onClick={() => handleRemoveTag(tag)} className="ml-2 font-bold">&times;</button>
                                </span>
                            ))}
                        </div>
                        <input 
                            ref={tagInputRef}
                            className="font-lato transition border-2 outline-none hover:border-primary focus:border-primary rounded-xl p-2 w-full"  
                            type="text" 
                            name="tag" 
                            id="tag" 
                            placeholder="Add tags"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleAddTag(tagInput);
                                }
                            }}
                        />
                        {suggestedTags.length > 0 && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                                {suggestedTags.map((tag) => (
                                    <div 
                                        key={tag} 
                                        className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-white"
                                        onClick={() => handleAddTag(tag)}
                                    >
                                        {tag}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}