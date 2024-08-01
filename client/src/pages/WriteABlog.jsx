import JoditEditor from 'jodit-react';
import { useMemo, useRef, useState } from 'react';

const WriteABlog = ({ placeholder }) => {
    const editor = useRef(null);
    const [content, setContent] = useState('');

    const config = useMemo(() => ({
        readonly: false,
        placeholder: placeholder || 'Start typing...',
    }), [placeholder]);
    return (
        <main className="w-11/12 py-20 md:py-40 mx-auto">
            <h1 className="text-3xl md:text-5xl text-center mb-16 font-semibold tracking-wide">Write a Blog for <b className="gilroy-extraBold">world to see</b></h1>
            <div className="flex mb-5 gap-5 justify-between">
                <div className=' w-full md:w-1/4 shadow-md bg-white md:p-3 rounded-sm'>

                    <h3>Blog Details</h3>
                    <input placeholder='Title' />
                    <input />


                </div>

                <div className="md:w-3/4 bg-white rounded-lg">
                    <JoditEditor
                        ref={editor}
                        value={content}
                        config={config}
                        tabIndex={1}
                        onBlur={newContent => setContent(newContent)}
                        onChange={newContent => { }}
                        className='shadow-lg'
                    />
                </div>
            </div>

        </main>
    )
};

export default WriteABlog;
