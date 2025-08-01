import PropTypes from "prop-types";

const ThemeToggle = ({ theme, toggleTheme }) => {
    return (
        <button
            onClick={toggleTheme}
            style={{
                position: "absolute",
                top: 20,
                right: 20,
                padding: "8px 18px",
                borderRadius: "8px",
                border: "none",
                background: theme === "dark" ? "#00ffe7" : "#232526",
                color: theme === "dark" ? "#232526" : "#00ffe7",
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 0 12px #00ffe7aa",
                zIndex: 100,
            }}
        >
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>
    );
};

ThemeToggle.propTypes = {
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

export default ThemeToggle;
