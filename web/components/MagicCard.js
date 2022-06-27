import React, { useState } from 'react';
import { Stack } from '@mui/material';
import Image from 'next/image';

import LabelSwitch from './LabelSwitch';
import styles from '../styles/Card.module.css';

export default function MagicCard({ imageSource, cardName }) {
	const [displayedFace, setDisplayedFace] = useState(0);
	const [switchState, setSwitchState] = useState(false);

	const handleChange = (e) => {
		setSwitchState(e.target.checked);
		setDisplayedFace(e.target.checked ? 1 : 0);
	};

	return (
		<React.Fragment>
			<Stack justifyContent='center' alignItems='center' spacing={1}>
				<Image
					src={imageSource[displayedFace]}
					layout='intrinsic'
					alt={cardName}
					width={488}
					height={680}
					className={styles.rounded}
				/>
				{imageSource.length > 1 ? (
					<LabelSwitch
						offLabel='Front'
						onLabel='Back'
						switchState={switchState}
						handleChange={handleChange}
					/>
				) : null}
			</Stack>
		</React.Fragment>
	);
}
