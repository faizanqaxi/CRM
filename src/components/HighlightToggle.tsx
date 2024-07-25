interface HighlightToggleProps {
	isHighlighted: boolean;
	onToggle: (isHighlighted: boolean) => void;
}

const HighlightToggle = ({ isHighlighted, onToggle }: HighlightToggleProps) => {
	return (
		<label className="highlight-toggle">
			<input
				type="checkbox"
				checked={isHighlighted}
				onChange={(e) => onToggle(e.target.checked)}
			/>
			Highlight oldest users in each city
		</label>
	);
};

export default HighlightToggle;
