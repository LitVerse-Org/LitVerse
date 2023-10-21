const TopBar = () => {
    return (
        <div style={{
            width: "100%",
            height: "250px",
            backgroundColor: "#333",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <span style={{
                fontSize: "3em",
                color: "#E9E9E9",
                textShadow: "2px 2px 4px #000",
                fontFamily: "'Arial', sans-serif",
                fontWeight: "bold"
            }}>
                Home
            </span>
        </div>
    );
};

export default TopBar;
