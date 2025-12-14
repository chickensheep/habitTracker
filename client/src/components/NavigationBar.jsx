import { Link } from "react-router-dom";
import "../styles/NavigationBar.css";

const NavigationBar = () => {
	return (
		<>
			<nav className="navigationBarContainer">
				<div className="navigationBarLeft">
					<Link to="/" className="navigationBarCalander">
						Calander
					</Link>
				</div>

				<div className="navigationBarRight">
					<div className="navigationBarHabitDiv">
						<Link to="Habit" className="navigationBarHabit">
							Habits
						</Link>
					</div>
					<div className="navigationBarHistoryDiv">
						<Link to="Stats" className="navigationBarHistory">
							Stats
						</Link>
					</div>
					<div className="navigationBarProfileDiv">
						<Link className="navigationBarProfile">Profile</Link>
					</div>
				</div>
			</nav>
		</>
	);
};

export { NavigationBar };
