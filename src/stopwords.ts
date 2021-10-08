export default (token: string[], stopwords: { [key in string]: boolean }) => {
    return token.filter((word) => !stopwords[word.toLowerCase()]);
};

export const words = (language: string) => {
    switch (language) {
        case "en": {
            return en;
        }
        default: {
            return {};
        }
    }
};

const en = {
    the: true,
};
