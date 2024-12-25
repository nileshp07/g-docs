interface FullScreenLoaderProps {
	label?: string;
}

import {LoaderIcon} from 'lucide-react';
import React from 'react';

export const FullscreenLoader = ({label}: FullScreenLoaderProps) => {
	return (
		<div className='min-h-screen flex flex-col items-center justify-center gap-2'>
			<LoaderIcon className='size-6 text-muted-foreground animate-spin' />
			{label && <p className='text-sm text-muted-foreground'>{label}</p>}
		</div>
	);
};
