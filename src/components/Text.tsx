import React, { useState } from "react";

const Text = (): JSX.Element => {
    const [text, setText] = useState("");
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key.includes("Arrow")) {
            e.preventDefault();
            console.log(`pressed ${e.key} key`);
        }
    };

    return (
        <textarea onChange={handleChange} onKeyDown={handleKeyDown}></textarea>
    );
};

export default Text;
