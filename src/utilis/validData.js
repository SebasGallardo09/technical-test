const isBlank = (text) => {
    if (text) {
        return text.length === 0;
    }
    return true;
};

export default { isBlank };
