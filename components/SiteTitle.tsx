export const SiteTitle = () => {

    const titleStyle = {
        color: '#2f3330',
        paddingBottom: '5px',
    };

    const subTitleStyle = {
        color: 'white',
    };

    const supStyle = {
        marginLeft: '-5px',
        fontSize: '1.3rem',
    };

    return (
        <span style={titleStyle}>(INFO) &middot; <span style={subTitleStyle}>TERRA</span> <sup style={supStyle}>2</sup></span>
    );
}