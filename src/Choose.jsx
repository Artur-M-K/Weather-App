
const Choose = ({ isActive, click }) => {

    return (
        <div className="choose">
            <button
                id="daily"
                className={isActive ? 'active' : null}
                onClick={!isActive ? click : undefined}>
                <span>Daily</span>
            </button>
            <button
                id="hourly"
                className={isActive ? null : 'active'}
                onClick={isActive ? click : undefined}>
                <span>Hourly</span>
            </button>
        </div>

    );
}

export default Choose;