import React from "react";

const Text = () => {
    const handleKeyDown = (e: any) => {
        if (e.key === "Tab") {
            e.preventDefault();
            console.log(`pressed tab key`);
        }
    };

    return <textarea onKeyDown={handleKeyDown}></textarea>;
};

export default Text;
