export default {

    getActiveClassForLink: (
        pathName: string,
        link: string) => {
        return pathName.includes(link)
            ? "text-link-active"
            : "";
    },

    getActiveClassButtonForLink: (
        pathName: string,
        link: string) => {
        return pathName.includes(link)
            ? "action-button action-button-active"
            : "action-button";
    }

}